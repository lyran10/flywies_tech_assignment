import React, { createContext, useContext, useState } from 'react';

type CounterContextType = {
  search: string;
  handleChange : (e: React.ChangeEvent<HTMLInputElement>) => void
  msg : {status : string, content : string, bg : string}
  setMsg : React.Dispatch<React.SetStateAction<{
    status: string;
    content: string;
    bg: string;
}>>
};

const Context = createContext<CounterContextType | undefined>(undefined);

export const ContextProvider = ({ children }: any) => {
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState<{status : string, content : string, bg : string}>({status : "", content : "", bg : ""})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <Context.Provider value={{ search, handleChange, msg, setMsg  }}>
      {children}
    </Context.Provider>
  );
};

export const useContextApi = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
};