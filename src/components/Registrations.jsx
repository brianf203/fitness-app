import { useEffect, useState } from 'react';

export default function Registrations() {
  const [form, setForm] = useState({
    clientID: '',
    classID: '',
    registerDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const [rows, setRows] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/registrations');
        const data = await res.json();
        setRows(data);
      } catch (e) {
        setRows([]);
      }
    })();
  }, []);

  return (
    <div>
      <h2>Registrations Table</h2>
      <table border="1">
        <thead>
            <tr>
            <th>Registration ID</th>
            <th>Client ID</th>
            <th>Class ID</th>
            <th>Registration Date</th>
            </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.registrationID}>
              <td>{r.registrationID}</td>
              <td>{r.clientID}</td>
              <td>{r.classID}</td>
              <td>{r.registerDate}</td>
            </tr>
          ))}
        </tbody>
        </table>


      <h3>Add New Registration</h3>
      <form>
        <label>
          Client:
          <select name="clientID" defaultValue="" onChange={handleChange}>
            <option value="" disabled>Select a client</option>
            <option value="1">1 - Bob Smith</option>
            <option value="2">2 - Brian Fang</option>
            <option value="3">3 - Jalen Brunson</option>
            <option value="4">4 - Jayson Tatum</option>
          </select>
        </label>
        <label>
          Class:
          <select name="classID" defaultValue="" onChange={handleChange}>
            <option value="" disabled>Select a class</option>
            <option value="1">1 - Yoga</option>
            <option value="2">2 - Cardio</option>
            <option value="3">3 - Strength Training</option>
          </select>
        </label>
        <input name="registerDate" type="date" onChange={handleChange} />
        <button type="button">Submit</button>
      </form>

      <h3>Update Registration</h3>
      <form>
        <label>
          Select Registration to Update:
          <select name="registrationID" defaultValue="">
            <option value="" disabled>Select a registration</option>
            <option value="1">1 - client 1 in class 1</option>
            <option value="2">2 - client 2 in class 2</option>
            <option value="3">3 - client 3 in class 1</option>
            <option value="4">4 - client 1 in class 3</option>
            <option value="5">5 - client 4 in class 2</option>
          </select>
        </label>
        <input name="registerDate" type="date" placeholder="New Registration Date" />
        <button type="button">Update</button>
      </form>

      <h3>Delete Registration</h3>
      <form>
        <label>
          Select Registration to Delete:
          <select name="registrationID" defaultValue="">
            <option value="" disabled>Select a registration</option>
            <option value="1">1 - client 1 in class 1</option>
            <option value="2">2 - client 2 in class 2</option>
            <option value="3">3 - client 3 in class 1</option>
            <option value="4">4 - client 1 in class 3</option>
            <option value="5">5 - client 4 in class 2</option>
          </select>
        </label>
        <button type="button">Delete</button>
      </form>
    </div>
  );
}