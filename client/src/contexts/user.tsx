import React, { createContext, useState, useContext, ReactNode } from "react";
import { Users } from "src/types/user";

interface UserContextType {
  user: Users | null;
  setUser: React.Dispatch<React.SetStateAction<Users | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useuser must be used within a userProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UsercartProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Users | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};