import { useEffect, useState } from 'react';

export default function Rooms() {
  const [form, setForm] = useState({ roomCapacity: '' });
  const [rows, setRows] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/rooms');
        const data = await res.json();
        setRows(data);
      } catch (e) {
        setRows([]);
      }
    })();
  }, []);

  return (
    <div>
      <h2>Rooms Table</h2>
      <table border="1">
        <thead>
            <tr>
            <th>Room Number</th>
            <th>Capacity</th>
            </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.roomNum}>
              <td>{r.roomNum}</td>
              <td>{r.capacity}</td>
            </tr>
          ))}
        </tbody>
        </table>


      <h3>Add New Room</h3>
      <form>
        <input name="roomCapacity" type="number" placeholder="Capacity" onChange={handleChange} />
        <button type="button">Submit</button>
      </form>

      <h3>Update Room</h3>
      <form>
        <label>
          Select Room to Update:
          <select name="roomNum" defaultValue="">
            <option value="" disabled>Select a room</option>
            <option value="1">1 - capacity 10</option>
            <option value="2">2 - capacity 50</option>
            <option value="3">3 - capacity 25</option>
          </select>
        </label>
        <input name="roomCapacity" type="number" placeholder="New Capacity" onChange={handleChange} />
        <button type="button">Update</button>
      </form>

      <h3>Delete Room</h3>
      <form>
        <label>
          Select Room to Delete:
          <select name="roomNum" defaultValue="">
            <option value="" disabled>Select a room</option>
            <option value="1">1 - capacity 10</option>
            <option value="2">2 - capacity 50</option>
            <option value="3">3 - capacity 25</option>
          </select>
        </label>
        <button type="button">Delete</button>
      </form>
    </div>
  );
}