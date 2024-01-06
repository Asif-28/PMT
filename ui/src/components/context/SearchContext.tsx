"use client";
import { createContext, useContext, ReactNode, useState } from "react";

interface SearchContextProps {
  searchResult: number | undefined; // Nullable for initial state
  setSearchResult: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchResult, setSearchResult] = useState<number | undefined>();

  return (
    <SearchContext.Provider value={{ searchResult, setSearchResult }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
