// src/context/FlashContext.tsx
import React, { createContext, useContext, useState } from 'react';

export type FlashType = 'success' | 'error' | 'warning' | 'info';

export interface FlashMessage {
  message: string;
  type: FlashType;
}

interface FlashContextProps {
  flashMessage: FlashMessage | null;
  setFlashMessage: React.Dispatch<React.SetStateAction<FlashMessage | null>>;
}

const FlashContext = createContext<FlashContextProps | undefined>(undefined);

export const FlashProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flashMessage, setFlashMessage] = useState<FlashMessage | null>(null);

  return (
    <FlashContext.Provider value={{ flashMessage, setFlashMessage }}>
      {children}
    </FlashContext.Provider>
  );
};

export const useFlash = () => {
  const context = useContext(FlashContext);
  if (!context) {
    throw new Error('useFlash must be used within a FlashProvider');
  }
  return context;
};
