import React, { useContext } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { DisclosureContext } from './Disclosure';

interface DisclosureButtonProps {
  children: React.ReactNode;
}

export const DisclosureButton: React.FC<DisclosureButtonProps> = ({ children }) => {
  const context = useContext(DisclosureContext);
  if (!context) {
    throw new Error('DisclosureButton must be used within a Disclosure');
  }

  const { toggle } = context;
  const { isOpen } = context;
  console.log(`토글:${isOpen}`);
  return (
    <button onClick={toggle}>
      {children}
      {isOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
      
      
    </button>
  );
};