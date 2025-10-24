import { JSX } from "react";

export const TaskBoard = (): JSX.Element => {
  return (
    <>
      <div className="task-board">
        <div className="task-board-name">My Task Board</div>
        <div className="task-board-description">Tasks to keep organised</div>
        {/* ここにタスクボードの内容を追加します */}
        {/* <div>Enter a short description</div>
      <div>In Progress</div>
      <div>Completed</div>
      <div>Won’t do</div> */}
        <div className="task-board-items task-in-progress">Task in Progress</div>
        <div className="task-board-items task-completed">Task Completed</div>
        <div className="task-board-items task-wont-do">Task Won’t Do</div>
        <div className="task-board-items task-todo">Task To Do</div>
        <div className="task-board-items task-add-new">Add new task</div>
      </div>
    </>
  );
};