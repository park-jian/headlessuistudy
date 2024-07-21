import React, { useEffect, useRef } from 'react';
import { Tab, TabContent } from './commonTypes';
import './style.css'; // 스타일 파일 임포트
import ReactDOM from 'react-dom';

interface GhostProps {
    tab: Tab;
    tabContent: TabContent;
    originalElement: HTMLElement;
}

const Ghost: React.FC<GhostProps> = ({ tab, tabContent, originalElement }) => {
    const ghostRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ghostRef.current && originalElement) {
            const originalStyles = window.getComputedStyle(originalElement);
            const ghostElement = ghostRef.current;
            const importantStyles = [
                'width', 'height', 'padding', 'margin', 'background-color', 
                'color', 'font-family', 'font-size', 'font-weight', 'border',
                'box-shadow', 'border-radius'
            ];
            importantStyles.forEach(style => {
                ghostElement.style[style as any] = originalStyles.getPropertyValue(style);
            });

            // 자식 요소들의 스타일도 복사
            const originalChildren = originalElement.children;
            const ghostChildren = ghostElement.children;
            for (let i = 0; i < originalChildren.length; i++) {
                const originalChild = originalChildren[i] as HTMLElement;
                const ghostChild = ghostChildren[i] as HTMLElement;
                if (ghostChild) {
                    const childStyles = window.getComputedStyle(originalChild);
                    importantStyles.forEach(style => {
                        ghostChild.style[style as any] = childStyles.getPropertyValue(style);
                    });
                }
            }
        }
    }, [originalElement]);

    return (
        <div ref={ghostRef} className="custom-drag-image">
            <div className="tab">{tab.text}</div>
            <div className="tab-pane active">{tabContent.content}</div>
        </div>
    );
};

export const createDragImage = (tab: Tab, tabContent: TabContent, originalElement: HTMLElement) => {
    const dragImage = document.createElement('div');
    dragImage.classList.add('custom-drag-image');
    dragImage.style.position = 'fixed';
    dragImage.style.top = '-9999px';
    dragImage.style.left = '-9999px';
    dragImage.style.pointerEvents = 'none';
    dragImage.style.opacity = '0.7';

    const ghostRoot = document.createElement('div');
    dragImage.appendChild(ghostRoot);
    document.body.appendChild(dragImage);

    ReactDOM.render(
        <Ghost tab={tab} tabContent={tabContent} originalElement={originalElement} />, 
        ghostRoot
    );

    // 원본 요소의 스타일을 복사
    const originalStyles = window.getComputedStyle(originalElement);
    const ghostElement = ghostRoot.firstChild as HTMLElement;
    
    if (ghostElement) {
        // 중요한 스타일 속성들을 복사
        const importantStyles = [
            'width', 'height', 'padding', 'margin', 'background-color', 
            'color', 'font-family', 'font-size', 'font-weight', 'border',
            'box-shadow', 'border-radius'
        ];

        importantStyles.forEach(style => {
            ghostElement.style[style as any] = originalStyles.getPropertyValue(style);
        });

        // 자식 요소들의 스타일도 복사
        const originalChildren = originalElement.children;
        const ghostChildren = ghostElement.children;
        for (let i = 0; i < originalChildren.length; i++) {
            const originalChild = originalChildren[i] as HTMLElement;
            const ghostChild = ghostChildren[i] as HTMLElement;
            if (ghostChild) {
                const childStyles = window.getComputedStyle(originalChild);
                importantStyles.forEach(style => {
                    ghostChild.style[style as any] = childStyles.getPropertyValue(style);
                });
            }
        }
    }

    return dragImage;
};