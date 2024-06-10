import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const shifts = await prisma.shift.findMany();
    return NextResponse.json(shifts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch shifts" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { employee, startTime, endTime } = await req.json();
    const shift = await prisma.shift.create({
      data: {
        employee,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
    });
    return NextResponse.json(shift, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create shift" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.shift.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "Shift deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete shift" },
      { status: 500 }
    );
  }
}
