import React, { useState, createContext, ReactNode, ElementType } from 'react';

interface DisclosureContextType {
  isOpen: boolean;
  toggle: () => void;
}

interface DisclosureProps {
  children: ReactNode;
  as?: ElementType; // 추가: 요소의 타입을 지정하는 prop 추가
}

export const DisclosureContext = createContext<DisclosureContextType | undefined>(undefined);

export const Disclosure: React.FC<DisclosureProps> = ({ children, as: Element = 'div' }) => { // 수정: as prop의 기본값으로 'div'를 설정
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DisclosureContext.Provider value={{ isOpen, toggle }}>
      <Element id="disclosure1" data-open={isOpen}>
        {children}
      </Element>
    </DisclosureContext.Provider>
  );
};