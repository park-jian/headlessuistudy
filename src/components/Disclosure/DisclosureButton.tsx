import React, { useContext, ElementType, CSSProperties } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { DisclosureContext } from './Disclosure';

interface DisclosureRenderProps {
  open: boolean;
  close: boolean;
}

interface DisclosureButtonProps {
  children: React.ReactNode;
  as?: ElementType;
  style?: CSSProperties;
}

export const DisclosureButton: React.FC<DisclosureButtonProps> = ({ children, as: Element = 'button', style }) => {
  const context = useContext(DisclosureContext);
  if (!context) {
    throw new Error('DisclosureButton must be used within a Disclosure');
  }

  const { toggle } = context;
  const { isOpen } = context;

  return (
    <Element onClick={toggle} style={style}>
      {children}
      {/* {isOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />} */}
      
      
    </Element>
  );
};