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
}

export const DisclosureContext = createContext<DisclosureContextType | undefined>(undefined);

export const Disclosure: React.FC<DisclosureProps> = ({ children, as: Element = 'div', style }) => { 
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const contextValue = { isOpen, toggle };

  // Determine which render props to pass based on isOpen state
  const renderProps = isOpen ? { open: isOpen, close: !isOpen } : { open: isOpen, close: isOpen };
  console.log(`isOpen:${isOpen}`);
  return (
    <DisclosureContext.Provider value={contextValue}>
      <Element id="disclosure1" data-open={isOpen} style={style}>
        {typeof children === 'function' ? (children as (props: DisclosureRenderProps) => ReactNode)(renderProps) : children}
      </Element>
    </DisclosureContext.Provider>
  );
};