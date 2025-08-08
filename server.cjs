// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2/promise');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Replace with your own port (between 1024–65535)
const PORT = 20322;

// CORS config — adjust the origin if needed
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

// Basic test route
app.get('/api', (req, res) => {
  res.send({ message: 'OK' });
});

// DB pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
});

// RESET endpoint - call stored procedure from DDL.sql
app.post('/api/reset', async (req, res) => {
  try {
    const [result] = await pool.query('CALL sp_reset_fitness()');
    res.json({ ok: true, result });
  } catch (err) {
    console.error('RESET failed', err);
    res.status(500).json({ ok: false, error: 'RESET failed' });
  }
});

// Install stored procedures from sql files (DDL.sql defines sp_reset_fitness, PL.sql defines demo delete)
app.post('/api/install-procs', async (req, res) => {
  try {
    const ddlRaw = fs.readFileSync(path.join(__dirname, 'src', 'DDL.sql'), 'utf8');
    const plRaw = fs.readFileSync(path.join(__dirname, 'src', 'PL.sql'), 'utf8');

    const preprocess = (sql) =>
      sql
        .replace(/^\s*DELIMITER\s+.*$/gim, '')
        .replace(/END\s*\/\//g, 'END;')
        .replace(/\s*\/\//g, ';');

    const ddl = preprocess(ddlRaw);
    const pl = preprocess(plRaw);

    await pool.query(ddl);
    await pool.query(pl);
    res.json({ ok: true });
  } catch (err) {
    console.error('Install procs failed', err);
    res.status(500).json({ ok: false, error: 'Install failed' });
  }
});

// Demo CUD endpoint
app.post('/api/demo-delete', async (req, res) => {
  try {
    const [result] = await pool.query('CALL sp_demo_delete_bob_smith()');
    res.json({ ok: true, result });
  } catch (err) {
    console.error('Demo delete failed', err);
    res.status(500).json({ ok: false, error: 'Demo delete failed' });
  }
});

// SELECT endpoints
app.get('/api/clients', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT clientID, firstName, lastName, email, phoneNumber, membershipStartDate, membershipActive, monthlyFee FROM Clients');
    res.json(rows);
  } catch (err) {
    console.error('Clients query failed', err);
    res.status(500).json({ ok: false });
  }
});

app.get('/api/instructors', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT instructorID, firstName, lastName, certification, email, phoneNumber FROM Instructors');
    res.json(rows);
  } catch (err) {
    console.error('Instructors query failed', err);
    res.status(500).json({ ok: false });
  }
});

app.get('/api/rooms', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT roomNum, capacity FROM Rooms');
    res.json(rows);
  } catch (err) {
    console.error('Rooms query failed', err);
    res.status(500).json({ ok: false });
  }
});

app.get('/api/classes', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT classID, className, classDescription, classCapacity, instructorID, roomNum, startTime, endTime FROM Classes');
    res.json(rows);
  } catch (err) {
    console.error('Classes query failed', err);
    res.status(500).json({ ok: false });
  }
});

app.get('/api/registrations', async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT r.registrationID, r.clientID, r.classID, r.registerDate, CONCAT(c.firstName, ' ', c.lastName) AS clientName, cl.className FROM Registrations r JOIN Clients c ON r.clientID = c.clientID JOIN Classes cl ON r.classID = cl.classID");
    res.json(rows);
  } catch (err) {
    console.error('Registrations query failed', err);
    res.status(500).json({ ok: false });
  }
});


// Serve static files (React build) and fallback only for known client routes
app.use(express.static(path.join(__dirname, 'dist')));
const clientRoutes = ['/', '/clients', '/classes', '/instructors', '/rooms', '/registrations'];
clientRoutes.forEach((routePath) => {
  app.get(routePath, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});