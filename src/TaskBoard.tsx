import { JSX } from "react";

export const TaskBoard = (): JSX.Element => {
  return (
    <>
      <div className="board-header">
        <div className="board-app-icon">📄</div>
        <div className="board-text">
          <div className="board-title">My Task Board
            <div className="board-edit-icon">✏️</div>
          </div>
          <div className="board-description">Tasks to keep organised</div>
        </div>
      </div>

      <div className="task-board">
        {/* ここにタスクボードの内容を追加します */}
        {/* <div>Enter a short description</div>
      <div>In Progress</div>
      <div>Completed</div>
      <div>Won’t do</div> */}
        <div className="task-card in-progress">
          <div className="task-header">
            <span className="task-icon">⏰️</span>
            <span className="task-name">Task in Progress</span>
            <span className="task-status progress">⏳️</span>
          </div>
          <div className="task-content">
          </div>
        </div>
        <div className="task-card completed">
          <div className="task-header">
            <span className="task-icon">🏋️‍♂️</span>
            <span className="task-name">Task Completed</span>
            <span className="task-status complete">✔</span>
          </div>
          <div className="task-content">
          </div>
        </div>
        <div className="task-card wont-do">
          <div className="task-header">
            <span className="task-icon">☕</span>
            <span className="task-name">Task Won’t Do</span>
            <span className="task-status cancel">❌️</span>
          </div>
          <div className="task-content">
          </div>
        </div>
        <div className="task-card to-do">
          <div className="task-header">
            <span className="task-icon">📚</span>
            <span className="task-name">Task To Do</span>
          </div>
          <div className="task-content">
            Work on a Challenge on devchallenges.io,<br /> to
            learn TypeScript.
          </div>
        </div>
        <div className="task-card add-task">
          <div className="task-header">
            <span className="task-icon">➕️</span>
            <span className="task-add">Add new task</span>
          </div>
        </div>

        {/* <div id="1">
          <div className="task-icon">⏰️</div>
          <button className="task-card" onClick={() => { alert("Click Task in Progress") }}>Task in Progress</button>
        </div>
        <div id="2">
          <div className="task-icon">🏋️‍♂️</div>
          <button className="task-card" onClick={() => { alert("Click Task Completed") }}>Task Completed</button>
        </div>
        <div id="3">
          <div className="task-icon">☕</div>
          <button className="task-card" onClick={() => { alert("Click Task Won’t Do") }}>Task Won’t Do</button>
        </div>
        <div id="4">
          <div className="task-icon">📚</div>
          <button className="task-card" onClick={() => { alert("Click Task To Do") }}>Task To Do</button>
        </div>
        <button className="task-add-new" onClick={() => { alert("Add new task") }}>Add new task</button> */}
      </div>
    </>
  );
};