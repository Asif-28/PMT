import dbConnect from "@/config/dbConnect";
import ProjectDetails from "@/models/ProjectDetails";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  await dbConnect();
  try {
    const { user } = await req.json();
    const Saved = await ProjectDetails.create({
      user,
    });
    return NextResponse.json(
      {
        message: "form submit successfully",
        data: Saved,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
  }
};
