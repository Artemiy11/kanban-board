import { ColumnType } from "./enums";

export interface taskProps {
  id: string;
  status: ColumnType;
  title: string;
  description: string;
  color: string;
}

export interface BoardProps {
  columnType: ColumnType;
}

export interface DragItem {
  index: number;
  id: taskProps['id'];
  from: ColumnType;
}

export interface DropItem {
  index: number;
  id: taskProps['id'];
  to: ColumnType;
}