import { createContext, useContext, useState } from "react";

const CommitContext = createContext();

export const CommitProvider = ({ children }) => {
  const [commitData, setCommitData] = useState({});

  const updateCommitData = (owner, data) => {
    setCommitData((prevData) => ({
      ...prevData,
      [owner]: data,
    }));
  };

  return (
    <CommitContext.Provider value={{ commitData, updateCommitData }}>
      {children}
    </CommitContext.Provider>
  );
};

export const useCommitContext = () => {
  const context = useContext(CommitContext);
  if (!context) {
    throw new Error("useCommitContext must be used within a CommitProvider");
  }
  return context;
};
