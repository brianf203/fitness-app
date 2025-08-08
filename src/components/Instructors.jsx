import { useEffect, useState } from 'react';

export default function Instructors() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/instructors');
        const data = await res.json();
        setRows(data);
      } catch (e) {
        setRows([]);
      }
    })();
  }, []);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    certification: '',
    email: '',
    phoneNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2>Instructors Table</h2>
      <table border="1">
        <thead>
            <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Certification</th>
            <th>Email</th>
            <th>Phone Number</th>
            </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.instructorID}>
              <td>{r.instructorID}</td>
              <td>{r.firstName}</td>
              <td>{r.lastName}</td>
              <td>{r.certification}</td>
              <td>{r.email}</td>
              <td>{r.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
        </table>


      <h3>Add New Instructor</h3>
      <form>
        <input name="firstName" placeholder="First Name" onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} />
        <input name="certification" placeholder="Certification" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
        <button type="button">Submit</button>
      </form>

      <h3>Update Instructor</h3>
      <form>
        <label>
          Select Instructor to Update:
          <select name="instructorID" defaultValue="">
            <option value="" disabled>Select an instructor</option>
            <option value="1">1 - Paolo Banchero</option>
            <option value="2">2 - Anthony Edwards</option>
            <option value="3">3 - VJ Edgecombe</option>
          </select>
        </label>
        <input name="email" placeholder="New Email" />
        <button type="button">Update</button>
      </form>

      <h3>Delete Instructor</h3>
      <form>
        <label>
          Select Instructor to Delete:
          <select name="instructorID" defaultValue="">
            <option value="" disabled>Select an instructor</option>
            <option value="1">1 - Paolo Banchero</option>
            <option value="2">2 - Anthony Edwards</option>
            <option value="3">3 - VJ Edgecombe</option>
          </select>
        </label>
        <button type="button">Delete</button>
      </form>
    </div>
  );
}