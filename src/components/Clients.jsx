import { useEffect, useState } from 'react';

const CLIENT_OPTIONS = [
  { id: '1', name: 'Bob Smith' },
  { id: '2', name: 'Brian Fang' },
  { id: '3', name: 'Jalen Brunson' },
  { id: '4', name: 'Jayson Tatum' },
];

export default function Clients() {
  const [client, setClient] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    membershipStartDate: '',
    membershipActive: false,
    monthlyFee: ''
  });
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/clients');
        const data = await res.json();
        setRows(data);
      } catch (e) {
        setRows([]);
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setClient((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div>
      <h2>Clients Table</h2>
      <table border="1">
        <thead>
            <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Start Date</th>
            <th>Active</th>
            <th>Monthly Fee</th>
            </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.clientID}>
              <td>{r.clientID}</td>
              <td>{r.email}</td>
              <td>{r.firstName}</td>
              <td>{r.lastName}</td>
              <td>{r.phoneNumber}</td>
              <td>{r.membershipStartDate}</td>
              <td>{r.membershipActive ? 'Yes' : 'No'}</td>
              <td>${'{'}r.monthlyFee{'}'}</td>
            </tr>
          ))}
        </tbody>
        </table>


      <h3>Add New Client</h3>
      <form>
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="firstName" placeholder="First Name" onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} />
        <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
        <input name="membershipStartDate" type="date" onChange={handleChange} />
        <label>
          Active Member:
          <input name="membershipActive" type="checkbox" onChange={handleChange} />
        </label>
        <input name="monthlyFee" type="number" step="0.01" placeholder="Monthly Fee" onChange={handleChange} />
        <button type="button">Submit</button>
      </form>

      <h3>Update Client</h3>
      <form>
        <label>
          Select Client to Update:
          <select name="clientID" defaultValue="">
            <option value="" disabled>Select a client</option>
            {CLIENT_OPTIONS.map((c) => (
              <option key={c.id} value={c.id}>{c.id} - {c.name}</option>
            ))}
          </select>
        </label>
        <input name="email" placeholder="New Email" />
        <input name="phoneNumber" placeholder="New Phone Number" />
        <button type="button">Update</button>
      </form>

      <h3>Delete Client</h3>
      <form>
        <label>
          Select Client to Delete:
          <select name="clientID" defaultValue="">
            <option value="" disabled>Select a client</option>
            {CLIENT_OPTIONS.map((c) => (
              <option key={c.id} value={c.id}>{c.id} - {c.name}</option>
            ))}
          </select>
        </label>
        <button type="button">Delete</button>
      </form>
    </div>
  );
}