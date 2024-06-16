import React, { useState } from 'react';
import './style.css'; // 스타일 파일 임포트

interface Tab {
  id: string;
  text: string;
}

export const TabMenu: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: '1', text: 'Tab 1' },
    { id: '2', text: 'Tab 2' },
    { id: '3', text: 'Tab 3' },
    // Add more tabs as needed
  ]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const tabContent = [
    { id: '1', content: 'Content for Tab 1' },
    { id: '2', content: 'Content for Tab 2' },
    { id: '3', content: 'Content for Tab 3' },
    // Add more tab contents as needed
  ];

  const handleDragStart = (index: number) => (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('index', index.toString());
  };

  const handleDragOver = (index: number) => (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (index: number) => (event: React.DragEvent<HTMLDivElement>) => {
    const dragIndex = Number(event.dataTransfer.getData('index'));
    if (dragIndex !== index) {
      const draggedTab = tabs[dragIndex];
      const newTabs = [...tabs];
      newTabs.splice(dragIndex, 1);
      newTabs.splice(index, 0, draggedTab);
      setTabs(newTabs);
      const newTabContent = [...tabContent]; // Copy current tabContent array
      // Reorder tabContent to match newTabs order
      newTabContent.splice(index, 0, newTabContent.splice(dragIndex, 1)[0]);
      setActiveIndex(index); // Set the dropped tab as active
    }
  };

  return (
    <div className="tab-menu">
      <div className="tabs">
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            className={`tab ${activeIndex === index ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
            draggable
            onDragStart={handleDragStart(index)}
            onDragOver={handleDragOver(index)}
            onDrop={handleDrop(index)}
          >
            {tab.text}
          </div>
        ))}
      </div>
      <div className="tab-content">
        <div className="tab-pane active">
          {tabContent[activeIndex].content}
        </div>
      </div>
    </div>
  );
};