import React from "react";

import { ITodo } from "../interface";

interface IState {
  todos: ITodo[];
  complete: (id: number) => void;
}

const TodoList: React.FC<IState> = ({ todos, complete }) => {
  function __handleChecked(t: ITodo) {
    complete(t.id);
  }

  return (
    <>
      <ul>
        {todos.length > 0
          ? todos.map((t: ITodo) => (
              <li key={t.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => __handleChecked(t)}
                  />
                  <span>{t.title}</span>
                </label>
              </li>
            ))
          : "Нет задач!"}
      </ul>
    </>
  );
};

export default TodoList;
