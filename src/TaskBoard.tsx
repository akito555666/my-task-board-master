import { JSX } from "react";
import { useState } from "react";
import Logo from "../resources/Logo.svg";
import EditIcon from "../resources/Edit_duotone.svg";
import TaskStatusInProgressIcon from "../resources/Time_atack_duotone.svg";
import TaskStatusCompletedIcon from "../resources/Done_round_duotone.svg";
import TaskStatusWontDoIcon from "../resources/close_ring_duotone.svg";

export const TaskBoard = (): JSX.Element => {
  const [boardTitle, setBoardTitle] = useState<string>('My Task Board');
  const [boardTitleDisabled, setBoardTitleDisabled] = useState<boolean>(true);
  const [boardDescription, setBoardDescription] = useState<string>('Tasks to keep organised');
  const [todoText, setTodoText] = useState<string>('');
  const [incompleteTodos, setIncompleteTodos] = useState<string[]>([]);
  const [completeTodos, setCompleteTodos] = useState<string[]>([]);

  const onClickBoardTitleEdit = () => setBoardTitleDisabled(!boardTitleDisabled);
  // const onChangeTodoText = (event) => setTodoText(event.target.value);

  // const onClickAdd = () => {
  //   if (todoText === '') return;
  //   const newTodos = [...incompleteTodos, todoText];
  //   setIncompleteTodos(newTodos);
  //   setTodoText(''); // input reset
  // };

  // const onClickDelete = (index) => {
  //   const newTodos = [...incompleteTodos];
  //   newTodos.splice(index, 1);
  //   setIncompleteTodos(newTodos);
  // };

  // const onClickComplete = (index) => {
  //   // 削除する要素の取得
  //   const newIncompleteTodos = [...incompleteTodos];
  //   newIncompleteTodos.splice(index, 1);

  //   // 完了する要素の取得
  //   const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
  //   setIncompleteTodos(newIncompleteTodos); // delete
  //   setCompleteTodos(newCompleteTodos); // complete
  // };

  // const onClickBack = (index) => {
  //   // 削除する要素の取得
  //   const newCompleteTodos = [...completeTodos];
  //   newCompleteTodos.splice(index, 1);
  //   // 完了する要素の取得
  //   const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
  //   setIncompleteTodos(newIncompleteTodos);
  //   setCompleteTodos(newCompleteTodos);
  // };

  const isMaxLimitIncompleteTodos = incompleteTodos.length >= 5;

  return (
    <>
      <div className="board-header">
        <div className="board-logo">
          <img src={Logo} alt="Logo" className="board-logo-img" />
        </div>
        <div className="board-text">
          <div className="board-title">
            <input
              type="text"
              disabled={boardTitleDisabled}
              placeholder="Your Board Title"
              value={boardTitle}
              className="board-title-input"
              size={boardTitle.length}
            />
            <div className="board-edit-icon" onClick={() => {
              onClickBoardTitleEdit();
            }}>
              <img src={EditIcon} alt="Edit-Icon" className="board-edit-icon-img" />
            </div>
          </div>
          <div className="board-description">
            <textarea
              disabled={boardTitleDisabled}
              placeholder="Your Board Description"
              value={boardDescription}
              className="board-description-text"
            />
          </div>
        </div>
      </div >

      <div className="task-board">
        <div className="task-card in-progress" onClick={() => { alert("Click Task in Progress") }}>
          <div className="task-header">
            <span className="task-icon">⏰️</span>
            <span className="task-name">Task in Progress</span>
            <img src={TaskStatusInProgressIcon} alt="Task-Status-In-Progress-Icon" className="task-status status-in-progress" />
          </div>
          <div className="task-content">
          </div>
        </div>
        <div className="task-card completed" onClick={() => { alert("Click Task Completed") }}>
          <div className="task-header">
            <span className="task-icon">🏋️‍♂️</span>
            <span className="task-name">Task Completed</span>
            <img src={TaskStatusCompletedIcon} alt="Task-Status-Completed-Icon" className="task-status status-completed" />
          </div>
          <div className="task-content">
          </div>
        </div>
        <div className="task-card wont-do" onClick={() => { alert("Click Task Won’t Do") }}>
          <div className="task-header">
            <span className="task-icon">☕</span>
            <span className="task-name">Task Won’t Do</span>
            <img src={TaskStatusWontDoIcon} alt="Task-Status-Won't-Do-Icon" className="task-status status-wont-do" />
          </div>
          <div className="task-content">
          </div>
        </div>
        <div className="task-card to-do" onClick={() => { alert("Click Task ToDo") }}>
          <div className="task-header">
            <span className="task-icon">📚</span>
            <span className="task-name">Task To Do
              <div className="task-content">
                Work on a Challenge on devchallenges.io,<br /> to
                learn TypeScript.
              </div>
            </span>
          </div>

        </div>
        <div className="task-card add-task" onClick={() => { alert("Click Add new task") }}>
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