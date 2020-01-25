import React from "react";

interface IState {
  add: (title: string) => void;
}

const TodoForm: React.FC<IState> = ({ add }) => {
  let text: HTMLInputElement | null;

  function __handlePress(
    e: React.KeyboardEvent<HTMLInputElement | null>
  ): void {
    if (e.key === "Enter") {
      add(text!.value);
      text!.value = "";
    }
  }

  return (
    <div className="input-field mt-50">
      <input
        ref={node => (text = node)}
        type="text"
        id="title"
        placeholder="пишем тут"
        onKeyPress={__handlePress}
        autoFocus
      />
      <label htmlFor="title" className="active">
        Название
      </label>
    </div>
  );
};

export default TodoForm;
