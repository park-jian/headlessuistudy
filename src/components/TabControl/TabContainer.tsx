import React, { useState, createContext, ReactNode, ElementType, CSSProperties } from 'react';
import { TabContainerContextType, TabContainerProps } from './commonTypes';

export const TabContainerContext = createContext<TabContainerContextType | undefined>(undefined);

export const TabContainer: React.FC<TabContainerProps> = ({ children, as: Element = 'div', style, dataList }) => { 
  const contextValue: TabContainerContextType = { dataList: dataList };
  return (
    <TabContainerContext.Provider value={contextValue}>
      <Element id="TabContainer1" style={style}>
        {children}
      </Element>
    </TabContainerContext.Provider>
  );
};