export interface Tab {
  id: string;
  text: string;
}
export interface TabContent {
  id: string;
  content: string;
}
export interface TabContainerContextType {
  dataList: Object;
}
export interface TabContainerProps {
  children: ReactNode;
  as?: ElementType;
  style?: CSSProperties;
  dataList?: Object;
}