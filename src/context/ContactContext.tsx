// 'use client';

// import React, { createContext, useContext, useState, ReactNode } from 'react';

// type ContactContextType = {
//   isContactOpen: boolean;
//   isAnimating: boolean;
//   openContact: () => void;
//   closeContact: () => void;
//   toggleContact: () => void;
// };

// const ContactContext = createContext<ContactContextType | undefined>(undefined);

// export function ContactProvider({ children }: { children: ReactNode }) {
//   const [isContactOpen, setIsContactOpen] = useState(false);
//   const [isAnimating, setIsAnimating] = useState(false);

//   const openContact = () => setIsContactOpen(true);
  
//   const closeContact = () => {
//     // Set animating flag
//     setIsAnimating(true);
    
//     // Delay state update to allow exit animation to complete
//     setTimeout(() => {
//       setIsContactOpen(false);
//       setIsAnimating(false);
//     }, 350); // Reduced from 600ms to match faster animations
//   };
  
//   const toggleContact = () => setIsContactOpen(prev => !prev);

//   return (
//     <ContactContext.Provider value={{ 
//       isContactOpen, 
//       isAnimating,
//       openContact, 
//       closeContact, 
//       toggleContact
//     }}>
//       {children}
//     </ContactContext.Provider>
//   );
// }

// export function useContact() {
//   const context = useContext(ContactContext);
//   if (context === undefined) {
//     throw new Error('useContact must be used within a ContactProvider');
//   }
//   return context;
// }
