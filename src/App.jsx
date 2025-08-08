import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Clients from './components/Clients';
import Classes from './components/Classes';
import Instructors from './components/Instructors';
import Rooms from './components/Rooms';
import Registrations from './components/Registrations';

export default function App() {
  return (
    <Router>
      <div
        className="flex flex-col min-h-screen"
        style={{
          padding: 0,
          margin: 0,
          width: '100vw',     
          maxWidth: '100vw',   
          boxSizing: 'border-box',
        }}
      >
        <nav
          style={{
            backgroundColor: '#d1d5db',
            width: '100%',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Navigation:</span>
          <Link to="/">Home</Link>
          <Link to="/clients">Clients</Link>
          <Link to="/classes">Classes</Link>
          <Link to="/instructors">Instructors</Link>
          <Link to="/rooms">Rooms</Link>
          <Link to="/registrations">Registrations</Link>
            <button
              onClick={async () => {
                try {
                  await fetch('/api/reset', { method: 'POST' });
                  alert('Database reset complete');
                } catch (e) {
                  alert('Reset failed');
                }
              }}
              style={{ marginLeft: 'auto' }}
            >
              RESET DB
            </button>
            <button
              onClick={async () => {
                try {
                  await fetch('/api/demo-delete', { method: 'POST' });
                  alert('Demo delete executed');
                } catch (e) {
                  alert('Demo delete failed');
                }
              }}
            >
              Demo Delete
            </button>
        </nav>

        <main
          style={{
            flexGrow: 1,
            padding: '24px 24px',
            width: '100%',      
            maxWidth: '1200px', 
            marginLeft: '0',   
            marginRight: 'auto',
          }}
        >
          <h1 style={{ marginBottom: '24px' }}>Community Fitness Center Management</h1>
          <p>Use the RESET DB button to rebuild tables and reinsert sample data. Use Demo Delete to remove Bob Smith to verify RESET.</p>
          <Routes>
            <Route path="/clients" element={<Clients />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/instructors" element={<Instructors />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/registrations" element={<Registrations />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}