// src/commonTypes.ts

// Tab 타입 정의
export interface Tab {
  id: string;
  text: string;
}

// TabContent 타입 정의
export interface TabContent {
  id: string;
  content: string;
}

// TabDataList 타입 정의
export interface TabDataList {
  tab: Tab[];
  tabContent: TabContent[];
}

// TabContainerContextType 타입 정의
export interface TabContainerContextType {
  dataList: TabDataList;
}

// TabContainerProps 타입 정의
export interface TabContainerProps {
  children: React.ReactNode;
  as?: ElementType;
  style?: CSSProperties;
  dataList: TabDataList;
}
