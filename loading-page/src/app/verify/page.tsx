"use client";
import { CaptchaProvider, useCaptcha } from "@/context/CaptchaContext";
import { useState } from "react";

import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Verify = () => {
  const [captcha, setCaptcha] = useState<string | null>(null);
  // const { captcha, setCaptcha } = useCaptcha();
  console.log(captcha);
  return (
    <CaptchaProvider>
      <div className="flex items-center justify-center h-[80vh]">
        <ReCAPTCHA
          onChange={setCaptcha}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          className="mx-auto"
        />
      </div>
    </CaptchaProvider>
  );
};

export default Verify;
