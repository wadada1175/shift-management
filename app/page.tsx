"use client";

import { useEffect, useState } from "react";

type Shift = {
  id: number;
  employee: string;
  startTime: string;
  endTime: string;
};

const Home = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);

  useEffect(() => {
    const fetchShifts = async () => {
      const res = await fetch("/api/shifts");
      const data = await res.json();
      setShifts(data);
    };

    fetchShifts();
  }, []);

  const deleteShift = async (id: any) => {
    const res = await fetch("/api/shifts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setShifts(shifts.filter((shift) => shift.id !== id));
    } else {
      alert("シフトの削除に失敗しました");
    }
  };

  return (
    <div>
      <h1>シフト管理</h1>
      <ul>
        {shifts.map((shift) => (
          <li key={shift.id}>
            {shift.employee}: {new Date(shift.startTime).toLocaleString()} -{" "}
            {new Date(shift.endTime).toLocaleString()}
            <button onClick={() => deleteShift(shift.id)}>削除</button>
          </li>
        ))}
      </ul>
      <div>
        <a href="/new-shift">新しいシフトを作成</a>
      </div>
    </div>
  );
};

export default Home;
