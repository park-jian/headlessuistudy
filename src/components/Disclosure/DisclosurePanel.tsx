import React, { useContext, ElementType, CSSProperties, ReactNode } from 'react';
import { DisclosureContext } from './Disclosure';
interface DisclosureRenderProps {
  open: boolean;
  close: boolean;
}
interface DisclosurePanelProps {
  children: ReactNode | ((props: DisclosureRenderProps) => ReactNode);
  as?: ElementType;
  style?: CSSProperties;
}

export const DisclosurePanel: React.FC<DisclosurePanelProps> = ({ children, as: Element = 'div', style }) => {
  const context = useContext(DisclosureContext);

  if (!context) {
    throw new Error('DisclosurePanel must be used within a Disclosure');
  }
  const { isOpen } = context;
  const renderProps = isOpen ? { open: isOpen, close: !isOpen } : { open: isOpen, close: isOpen };
  return (
    isOpen ? <Element style={style}>
      {typeof children === 'function' ? (children as (props: DisclosureRenderProps) => ReactNode)(renderProps) : children}
      </Element> : null
  );
};