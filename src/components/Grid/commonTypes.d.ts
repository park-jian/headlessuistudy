export interface GridContextType {
  dataList: object;
}

export interface GridProps {
  children: ReactNode;
  as?: ElementType;
  style?: CSSProperties;
  dataList: GridContextType['dataList'];
}

export interface GridDataItem {
  id: string;
  employee: string;
  department: string;
  employmentType: string;
  location: string;
  joinDate: string;
  salary: number;
  contact: string;
}

export interface GridData {
  headerColumn: string[];
  content: GridDataItem[];
}
