"use client";

import { useEffect, useState } from "react";

const Home = () => {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    const fetchShifts = async () => {
      const res = await fetch("/api/shifts");
      const data = await res.json();
      setShifts(data);
    };

    fetchShifts();
  }, []);

  return (
    <div>
      <h1>シフト管理</h1>
      <ul>
        {shifts.map((shift) => (
          <li key={shift.id}>
            {shift.employee}: {new Date(shift.startTime).toLocaleString()} -{" "}
            {new Date(shift.endTime).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
