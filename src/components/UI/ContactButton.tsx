"use client";

import React from "react";
import StarBorder from "./StarBorder";

interface ContactButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function ContactButton({
  className,
  children = "Let's Talk",
}: ContactButtonProps) {
  return (
    <StarBorder
      as="button"
      btnClassName={`hover:opacity-90 transition-colors duration-600 text-white ${
        className || ""
      }`}
      speed="5s"
    >
      {children}
    </StarBorder>
  );
}
