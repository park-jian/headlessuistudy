import React, { useState, useContext, ElementType, CSSProperties } from 'react';
import { TabContainerContext } from './TabContainer';
import './style.css'; // 스타일 파일 임포트
import { Tab, TabContent, TabContainerContextType } from './commonTypes';

export const TabMenu: React.FC = () => {
  const context = useContext(TabContainerContext);
  if (!context) {
    throw new Error('TabMenu must be used within a TabContainerProvider');
  }
  const { dataList } = context as TabContainerContextType;

  const initialTabs: Tab[] = [
    { id: 'tab1', text: 'Tab 1' },
    { id: 'tab2', text: 'Tab 2' },
    { id: 'tab3', text: 'Tab 3' },
    // Add more tabs as needed
  ];

  const initialTabContents: TabContent[] = [
    { id: 'tab1', content: 'Content for Tab 1' },
    { id: 'tab2', content: 'Content for Tab 2' },
    { id: 'tab3', content: 'Content for Tab 3' },
    // Add more tabs as needed
  ];

  const [tabs, setTabs] = useState<Tab[]>(initialTabs);
  const [tabContent, setTabContent] = useState<TabContent[]>(initialTabContents);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [previousMouseX, setPreviousMouseX] = useState<number | null>(null);

  const handleDragStart = (index: number) => (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('index', index.toString());
  };

  const handleDragOver = (index: number) => (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (dropIndex: number) => (event: React.DragEvent<HTMLDivElement>) => {
    const dragIndex = Number(event.dataTransfer.getData('index'));
    if (dragIndex !== dropIndex) {//dragIndex: 드래그 시작 index, dropIndex: ㄷ래그 끝 index
      const draggedTab = tabs[dragIndex];//드래그 시작 탭
      const newTabs = [...tabs];
      newTabs.splice(dragIndex, 1);
      newTabs.splice(dropIndex, 0, draggedTab);
      setTabs(newTabs);//드래그에 맞춰 탭 이동

      const newTabContent = [...tabContent];
      newTabContent.splice(dropIndex, 0, newTabContent.splice(dragIndex, 1)[0]);
      setTabContent(newTabContent); // content 이동
      setActiveIndex(dropIndex); // activeIndex 변경
    }
  };
  const handleMouseDown = (index: number) => (event: React.MouseEvent<HTMLDivElement>) => {
    setPreviousMouseX(event.clientX);
  };
  const handleMouseMove = (index: number) => (event: React.MouseEvent<HTMLDivElement>) => {
    if (previousMouseX !== null) {
      const currentMouseX = event.clientX;
      const tabElement = document.getElementById(`${tabs[index].id}`);
      if (tabElement) {
        if (currentMouseX > previousMouseX) {//3은 보정값
          // 오른쪽으로 이동
          tabElement.classList.add('border-right-highlight');
          tabElement.classList.remove('border-left-highlight');
        } else if (currentMouseX < previousMouseX) {
          // 왼쪽으로 이동
          tabElement.classList.add('border-left-highlight');
          tabElement.classList.remove('border-right-highlight');
        }
      }
    }
    setPreviousMouseX(event.clientX);
  };

  const handleMouseLeave = (index: number) => () => {
    const tabElement = document.getElementById(`${tabs[index].id}`);
    if (tabElement) {
      tabElement.classList.remove('border-right-highlight', 'border-left-highlight');
    }
    setPreviousMouseX(null);
  };
  return (
    <div className="tab-menu">
      <div className="tabs">
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            id={tab.id}
            className={`tab ${activeIndex === index ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
            draggable
            onDragStart={handleDragStart(index)}
            onDragOver={handleDragOver(index)}
            onDrop={handleDrop(index)}
            onMouseDown={handleMouseDown(index)}
            onMouseMove={handleMouseMove(index)}
            onMouseLeave={handleMouseLeave(index)}
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