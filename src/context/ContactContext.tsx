"use client";

import React, { createContext, useState, ReactNode, useCallback } from "react";

type ContactContextType = {
  isContactOpen: boolean;
  toggleContact: () => void;
  closeContact: () => void;
  onAnimationComplete: () => void;
};

export const ContactContext = createContext<ContactContextType>({
  isContactOpen: false,
  toggleContact: () => {},
  closeContact: () => {},
  onAnimationComplete: () => {},
});

export const ContactProvider = ({ children }: { children: ReactNode }) => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  const toggleContact = useCallback(() => {
    setIsContactOpen(prev => !prev);
  }, []);
  
  const closeContact = useCallback(() => {
    setIsContactOpen(false);
  }, []);
  
  const onAnimationComplete = useCallback(() => {

  }, []);

  return (
    <ContactContext.Provider
      value={{
        isContactOpen,
        toggleContact,
        closeContact,
        onAnimationComplete,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
