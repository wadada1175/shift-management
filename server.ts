// server/index.ts
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import prisma from "./lib/prisma"; // Prismaのクライアントインスタンスをインポート

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/api/shifts", async (req, res) => {
  const shifts = await prisma.shift.findMany();
  res.json(shifts);
});

app.post("/api/shifts", async (req, res) => {
  const { employee, startTime, endTime } = req.body;
  const shift = await prisma.shift.create({
    data: {
      employee,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    },
  });
  res.status(201).json(shift);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
