import React, { useState, createContext, ReactNode, ElementType, CSSProperties } from 'react';

interface DisclosureContextType {
  isOpen: boolean;
  toggle: () => void;
}
interface DisclosureRenderProps {
  open: boolean;
  close: boolean;
}
interface DisclosureProps {
  children: ReactNode | ((props: DisclosureRenderProps) => ReactNode);
  as?: ElementType;
  style?: CSSProperties;
  isOpen?: boolean;
}

export const DisclosureContext = createContext<DisclosureContextType | undefined>(undefined);

export const Disclosure: React.FC<DisclosureProps> = ({ children, as: Element = 'div', style, isOpen: initialIsOpen = false }) => { 
  const [isOpen, setIsOpen] = useState(Boolean(initialIsOpen));

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const contextValue = { isOpen, toggle };

  // Determine which render props to pass based on isOpen state
  const renderProps = isOpen ? { open: isOpen, close: !isOpen } : { open: isOpen, close: isOpen };
  console.log(`isOpen:${initialIsOpen}`);
  return (
    <DisclosureContext.Provider value={contextValue}>
      <Element id="disclosure1" data-open={isOpen} style={style}>
        {typeof children === 'function' ? (children as (props: DisclosureRenderProps) => ReactNode)(renderProps) : children}
      </Element>
    </DisclosureContext.Provider>
  );
};