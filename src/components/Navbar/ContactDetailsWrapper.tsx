"use client";

import { useContext } from "react";
import { ContactContext } from "@/context/ContactContext";
import ContactDetails from "./ContactDetails";
import { AnimatePresence } from "framer-motion";

export default function ContactDetailsWrapper() {
  const { 
    isContactOpen,
    closeContact, 
    onAnimationComplete 
  } = useContext(ContactContext);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isContactOpen && (
        <ContactDetails 
          key="contact-details"
          closeContact={closeContact} 
          onAnimationComplete={onAnimationComplete}
        />
      )}
    </AnimatePresence>
  );
} 