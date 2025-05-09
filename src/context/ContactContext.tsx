"use client";

import React, { createContext, useState, ReactNode } from "react";

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

  const toggleContact = () => {
    setIsContactOpen(prev => !prev);
  };
  
  const closeContact = () => {
    setIsContactOpen(false);
  };
  
  // This will be called when the exit animation completes
  const onAnimationComplete = () => {
    // Add any cleanup code needed here
  };

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
