import "./App.css";
import { observer } from "mobx-react";
import Board from "./components/Board/Board";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import { useEffect } from "react";

enum ColumnType {
  TO_DO = "Todo",
  IN_PROGRESS = "In Progress",
  BLOCKED = "Blocked",
  COMPLETED = "Completed",
}

interface DataItem {
  id: number;
  name: string;
}

const App = observer(() => {

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container">
        <Board columnType={ColumnType.TO_DO} />
        <Board columnType={ColumnType.IN_PROGRESS} />
        <Board columnType={ColumnType.BLOCKED} />
        <Board columnType={ColumnType.COMPLETED} />
      </div>
    </DndProvider>
  );
});

export default App;
