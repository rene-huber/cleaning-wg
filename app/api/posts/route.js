
import prisma from "@/utils/prismaConnect";
import { NextResponse } from "next/server";







export const GET = async (req) => {
  try {
    const tasks = await prisma.post.findMany();

    return new NextResponse(JSON.stringify({ tasks }, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};




export const POST = async (req) => {


  try {
    const body = await req.json();
    const task = await prisma.task.create({
      data: {
        name: body.task, // Asumiendo que 'body.task' es el nombre de la tarea.
        assignedTo: body.name, // Aquí parece haber confusión; probablemente querías que 'body.assignedTo' fuese el destinatario.
      },
    });

    return new NextResponse(JSON.stringify(task, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

