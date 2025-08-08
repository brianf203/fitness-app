import { useEffect, useState } from 'react';

export default function Classes() {
  const [form, setForm] = useState({
    className: '',
    classDescription: '',
    classCapacity: '',
    instructorID: '',
    roomNum: '',
    startTime: '',
    endTime: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const [rows, setRows] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/classes');
        const data = await res.json();
        setRows(data);
      } catch (e) {
        setRows([]);
      }
    })();
  }, []);

  return (
    <div className="px-12 py-6">
      <h2>Classes Table</h2>
      <table border="1">
        <thead>
            <tr>
            <th>ID</th>
            <th>Class Name</th>
            <th>Description</th>
            <th>Capacity</th>
            <th>Instructor ID</th>
            <th>Room #</th>
            <th>Start Time</th>
            <th>End Time</th>
            </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.classID}>
              <td>{r.classID}</td>
              <td>{r.className}</td>
              <td>{r.classDescription}</td>
              <td>{r.classCapacity}</td>
              <td>{r.instructorID}</td>
              <td>{r.roomNum}</td>
              <td>{String(r.startTime).replace('T', ' ').slice(0, 16)}</td>
              <td>{String(r.endTime).replace('T', ' ').slice(0, 16)}</td>
            </tr>
          ))}
        </tbody>
        </table>


      <h3>Add New Class</h3>
      <form>
        <input name="className" placeholder="Class Name" onChange={handleChange} />
        <input name="classDescription" placeholder="Description" onChange={handleChange} />
        <input name="classCapacity" type="number" placeholder="Capacity" onChange={handleChange} />
        <label>
          Instructor:
          <select name="instructorID" defaultValue="" onChange={handleChange}>
            <option value="" disabled>Select an instructor</option>
            <option value="1">1 - Paolo Banchero</option>
            <option value="2">2 - Anthony Edwards</option>
            <option value="3">3 - VJ Edgecombe</option>
          </select>
        </label>
        <label>
          Room:
          <select name="roomNum" defaultValue="" onChange={handleChange}>
            <option value="" disabled>Select a room</option>
            <option value="1">1 - capacity 10</option>
            <option value="2">2 - capacity 50</option>
            <option value="3">3 - capacity 25</option>
          </select>
        </label>
        <input name="startTime" type="datetime-local" onChange={handleChange} />
        <input name="endTime" type="datetime-local" onChange={handleChange} />
        <button type="button">Submit</button>
      </form>

      <h3>Update Class</h3>
      <form>
        <label>
          Select Class to Update:
          <select name="classID" defaultValue="">
            <option value="" disabled>Select a class</option>
            <option value="1">1 - Yoga</option>
            <option value="2">2 - Cardio</option>
            <option value="3">3 - Strength Training</option>
          </select>
        </label>
        <input name="className" placeholder="New Class Name" />
        <button type="button">Update</button>
      </form>

      <h3>Delete Class</h3>
      <form>
        <label>
          Select Class to Delete:
          <select name="classID" defaultValue="">
            <option value="" disabled>Select a class</option>
            <option value="1">1 - Yoga</option>
            <option value="2">2 - Cardio</option>
            <option value="3">3 - Strength Training</option>
          </select>
        </label>
        <button type="button">Delete</button>
      </form>
    </div>
  );
}