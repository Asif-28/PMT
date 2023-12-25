import dbConnect from "@/config/dbConnect";
import ProjectDetails from "@/models/ProjectDetails";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  await dbConnect();
  console.log(req.body);
  try {
    // const formData = await req.json();
    const { formData, selectedOption, selectedCountry, selectedDiv } =
      await req.json();
    const {
      projectName,
      projectCode,
      projectManager,
      clientProjectManager,
      incidenceRate,
      loi,
      scope,
      targetDescription,
      onlineOffline,
      billingComments,
    } = formData;

    // console.log(formData.projectName);
    // console.log(formData.projectCode);
    // console.log(formData.projectManager);
    // console.log(formData.clientProjectManager);
    // console.log(formData.incidenceRate);
    // console.log(formData.loi);
    // console.log(formData.scope);
    // console.log(formData.targetDescription);
    // console.log(formData.onlineOffline);
    // console.log(formData.billingComments);

    const Saved = await ProjectDetails.create({
      projectName,
      projectCode,
      projectManager,
      clientProjectManager,
      incidenceRate,
      loi,
      scope,
      selectedOption,
      targetDescription,
      selectedCountry,
      onlineOffline,
      selectedDiv,
      billingComments,
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
