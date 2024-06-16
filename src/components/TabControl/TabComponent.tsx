import React, { useState } from 'react';

interface Tab {
  id: string;
  text: string;
}

interface TabProps {
  tab: Tab;
  index: number;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  moveTab: (dragIndex: number, hoverIndex: number) => void;
}

export const TabComponent: React.FC<TabProps> = ({
  tab,
  index,
  activeIndex,
  setActiveIndex,
  moveTab,
}) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dragIndex = Number(e.dataTransfer.getData('text/plain'));
    moveTab(dragIndex, index);
  };

  const handleClick = () => {
    setActiveIndex(index);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`tab ${activeIndex === index ? 'active' : ''}`}
    >
      {tab.text}
    </div>
  );
};
