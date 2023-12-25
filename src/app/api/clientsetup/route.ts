import dbConnect from "@/config/dbConnect";
import Client from "@/models/Client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  await dbConnect();
  console.log(req.body);
  try {
    // const formData = await req.json();
    const { formData, selectedCountry } = await req.json();
    const { projectCode, inputField, countryCode, scope, testLink, liveLink } =
      formData;

    const Saved = await Client.create({
      projectCode,
      inputField,
      selectedCountry,
      countryCode,
      scope,
      testLink,
      liveLink,
    });

    return NextResponse.json(
      {
        message: "success",
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
