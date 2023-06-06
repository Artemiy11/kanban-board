import "./App.css";
import { observer } from "mobx-react";
import Board from "./components/Board/Board";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ColumnType } from "./utils/enums";

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
