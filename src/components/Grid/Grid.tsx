import React, { createContext, ReactNode, ElementType, CSSProperties } from 'react';
import { GridContextType, GridProps } from './commonTypes';

export const GridContext = createContext<GridContextType | undefined>(undefined);


export const Grid: React.FC<GridProps> = ({ children, as: Element = 'div', style, dataList }) => {
  const contextValue: GridContextType = { dataList };
  
  return (
    <GridContext.Provider value={{dataList}}>
      <Element id="grid1" style={style}>
        {children}
      </Element>
    </GridContext.Provider>
  );
};