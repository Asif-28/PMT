"use client";
import { createContext, useContext, ReactNode, useState } from "react";

// Interface for context values
interface CaptchaContextProps {
  captcha: string | null;
  setCaptcha: (captcha: string) => void;
}

// Create the CaptchaContext
const CaptchaContext = createContext<CaptchaContextProps | undefined>(
  undefined
);

// CaptchaProvider component to wrap components that need access to captcha state
export const CaptchaProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [captcha, setCaptcha] = useState<string | null>(null);

  return (
    <CaptchaContext.Provider value={{ captcha, setCaptcha }}>
      {children}
    </CaptchaContext.Provider>
  );
};

// Custom hook to access the CaptchaContext
export const useCaptcha = () => {
  const context = useContext(CaptchaContext);
  if (!context) {
    throw new Error("useCaptcha must be used within a CaptchaProvider");
  }
  return context;
};
