import React, { useContext } from 'react';
import { DisclosureContext } from './Disclosure';

interface DisclosurePanelProps {
  children: React.ReactNode;
}

export const DisclosurePanel: React.FC<DisclosurePanelProps> = ({ children }) => {
  const context = useContext(DisclosureContext);
  //console.log(`panecontext:${children}`);
  if (!context) {
    throw new Error('DisclosurePanel must be used within a Disclosure');
  }

  const { isOpen } = context;
  //console.log(`isOpen:${isOpen}`);
  return (
    isOpen ? <div>{children}</div> : null
  );
};