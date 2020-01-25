import * as React from "react";
import Navbar from "./components/Navbar";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import withCrud from "./components/hoc/withCrud";
import { ITodo } from "./interface";

interface ICrudProps {
  todos: ITodo[];
  add: (t: string) => void;
  complete: (id: number) => void;
}

const App: React.FC<ICrudProps> = ({ todos, add, complete }) => {
  console.log("todos", todos);
  return (
    <>
      <Navbar />
      <div className="container">
        <TodoForm add={add} />
        <TodoList todos={todos} complete={complete} />
      </div>
    </>
  );
};

export default withCrud(App);
