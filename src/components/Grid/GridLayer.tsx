import React, { useContext, ElementType, CSSProperties } from 'react';
import './gridStyle.css';
import { GridContext } from './Grid';
import { GridContextType, GridData } from './commonTypes';

interface GridLayerProps {
  as?: ElementType;
  style?: CSSProperties;
}

export const GridLayer: React.FC<GridLayerProps> = ({ as: Element = 'div', style }) => {
  const context = useContext<GridContextType | undefined>(GridContext);
  if (!context) {
    throw new Error('GridLayer must be used within a Grid');
  }

  const { dataList } = context.dataList as GridContextType;
  console.log(dataList);
  return (
    <Element style={style} className="gridLayer">
      <div className="grid-header">
        {/* 타입이 object인 datalist는 속성중에 headerColumn이 반드시 온다는 보장이 없기때문에 
        {dataList.headerColumn.map((header: string, index: number) => (
          <div key={index}>{header}</div>
        ))} 이런식으로 타입 지정 하면 headerColumn이 없다고 에러가 발생한다. */}
        {(dataList as GridData).headerColumn.map((header: string, index: number) => (
          <div key={index}>{header}</div>
        ))}
      </div>
      <div className="grid-content">
        {(dataList as GridData).content.map((item, rowIndex) => {
          return (
            <div key={rowIndex} className="grid-row">
              {(dataList as GridData).headerColumn.map((header, cellIndex) => {
                const normalizedHeader = header.toLowerCase().replace(/\s+/g, '');
                const normalizedKey = Object.keys(item).find(key => 
                  key.toLowerCase().replace(/\s+/g, '') === normalizedHeader
                );
                const value = normalizedKey ? item[normalizedKey as keyof typeof item] : undefined;
                return (
                  <div key={cellIndex} className="grid-cell">
                    {value !== undefined ? 
                      (typeof value === 'number' ? 
                        value.toLocaleString() : 
                        value
                      ) : 
                      ''}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </Element>
  );
};