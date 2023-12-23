"use client";

import { createContext, useContext, ReactNode, useState } from "react";

interface MenuContextProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export const MenuProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MenuContext.Provider value={{ isOpen, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
