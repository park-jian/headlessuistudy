import React, { useState, useContext, useRef, ElementType, CSSProperties } from 'react';
import { TabContainerContext } from './TabContainer';
import './style.css';
import { Tab, TabContent, TabDataList } from './commonTypes';
import { createDragImage } from './Ghost';

export const TabMenu: React.FC = () => {
    const context = useContext(TabContainerContext);
    if (!context) {
        throw new Error('TabMenu must be used within a TabContainerProvider');
    }
    let dataList = context.dataList as TabDataList;
    const [tabs, setTabs] = useState<Tab[]>(dataList.tab);
    const [tabContent, setTabContent] = useState<TabContent[]>(dataList.tabContent);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [previousMouseX, setPreviousMouseX] = useState<number | null>(null);
    const [moveDirection, setMoveDirection] = useState<string>("");
    const [dragState, setDragState] = useState<string>("");
    // 각 탭을 참조하기 위한 refs 배열
    const tabRefs = useRef<{ [key: string]: HTMLDivElement }>({});
    const handleDragStart = (index: number) => (event: React.DragEvent<HTMLDivElement>) => {
      event.dataTransfer.setData('index', index.toString());
      const originalElement = event.currentTarget;
      const ghostElement = createDragImage(tabs[index], tabContent[index], originalElement);
      event.dataTransfer.setDragImage(ghostElement, 0, 0);
      const cleanup = () => {
          document.body.removeChild(ghostElement);
          window.removeEventListener('dragend', cleanup);
      };
      window.addEventListener('dragend', cleanup);
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
        setDragState("dragging");
    };
    const handleMouseMove = (index: number) => (event: React.MouseEvent<HTMLDivElement>) => {
        if (previousMouseX !== null) {
            const currentMouseX = event.clientX;
            //const tabElement = document.getElementById(`${tabs[index].id}`);
            const tabElement = tabRefs.current[tabs[index].id];
            if (tabElement && dragState === "dragging") {
                if (currentMouseX > previousMouseX) {
                    // 오른쪽으로 이동
                    setMoveDirection("right");
                    tabElement.classList.add('border-right-highlight');
                    tabElement.classList.remove('border-left-highlight');
                    } else if (currentMouseX < previousMouseX) {
                    // 왼쪽으로 이동
                    setMoveDirection("left");
                    tabElement.classList.add('border-left-highlight');
                    tabElement.classList.remove('border-right-highlight');
                }
            }
            setPreviousMouseX(event.clientX);
        }
    };
    const handleMouseUp = (index: number) => (event: React.MouseEvent<HTMLDivElement>) => {
        setPreviousMouseX(null);
        setMoveDirection("");
        setDragState("");
    };
    const handleMouseLeave = (index: number) => () => {
        const tabElement = tabRefs.current[tabs[index].id];
        if (tabElement) {
            tabElement.classList.remove('border-right-highlight', 'border-left-highlight');
        }
        setDragState("");
    };
  return (
    <div className="tab-menu">
      <div className="tabs">
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            id={tab.id}
            ref={el => tabRefs.current[tab.id] = el as HTMLDivElement}
            className={`tab ${activeIndex === index ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
            draggable
            onDragStart={handleDragStart(index)}
            onDragOver={handleDragOver(index)}
            onDrop={handleDrop(index)}
            onMouseDown={handleMouseDown(index)}
            onMouseMove={handleMouseMove(index)}
            onMouseUp={handleMouseUp(index)}
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