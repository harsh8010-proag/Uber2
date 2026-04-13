import { createContext, useState, useContext } from "react";

export const CaptainDataContext = createContext();



const CaptanContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

 
 
  const value = {
    captain,
    setCaptain
  };

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  )
}

export default CaptanContext;