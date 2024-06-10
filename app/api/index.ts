import { Router, Request, Response } from "express";
import db from "../../models";

const router = Router();

router.get("/shifts", async (req: Request, res: Response) => {
  try {
    const shifts = await db.shifts.findAll();
    res.json(shifts);
  } catch (error) {
    const message = (error as Error).message;
    res.status(500).json({ error: message });
  }
});

router.post("/shifts", async (req: Request, res: Response) => {
  try {
    const { date, startTime, endTime } = req.body;
    const newShift = await db.shifts.create({ date, startTime, endTime });
    res.status(201).json(newShift);
  } catch (error) {
    const message = (error as Error).message;
    res.status(500).json({ error: message });
  }
});

router.delete("/shifts/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await db.shifts.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    const message = (error as Error).message;
    res.status(500).json({ error: message });
  }
});

export default router;
