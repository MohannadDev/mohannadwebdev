'use client';

import React from 'react';
import StarBorder from './StarBorder';
// import { useContact } from '@/context/ContactContext';

interface ContactButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function ContactButton({ className, children = "Let's Talk" }: ContactButtonProps) {
  // const { openContact } = useContact();
  
  return (
    <StarBorder
      as="button"
      btnClassName={`hover:opacity-90 transition-colors duration-600 text-white ${className || ''}`}
      speed="5s"
      // onClick={openContact}
    >
      {children}
    </StarBorder>
  );
}
