import * as React from "react";
import { ITodo } from "../../interface";
import axios from "axios";

interface IState {
  todos: ITodo[];
  apiUrl?: string;
}

function Crud<T extends {}>(Component: React.ComponentType<T>) {
  class withCrud extends React.Component<{}> {
    state: IState = {
      todos: [],
      apiUrl: "http://localhost:5000/api"
    };

    componentDidMount() {
      this.get();
    }

    get = async (): Promise<void> => {
      const { data } = await axios.get(`${this.state.apiUrl}/todo/get`);
      if (data.status) {
        this.setState({ todos: data.message.todos });
      }
    };

    add = async (title: string): Promise<void> => {
      if (title !== "") {
        try {
          const { data } = await axios.post(
            `${this.state.apiUrl}/todo/create`,
            {
              title
            }
          );

          if (data) {
            this.setState({ todos: [...this.state.todos, data.message] });
          }
        } catch (error) {
          console.log(error)
        }
      }
    };

    complete = async (id: number): Promise<void> => {
      if (id) {
        try {
          await axios.post(`${this.state.apiUrl}/todo/complete`, { id });
          this.setState(
            (state: IState): Partial<IState> => {
              const todos = state.todos.map((t: ITodo) => {
                if (t.id === id) {
                  t.completed = !t.completed;
                }
                return t;
              });

              return {
                todos
              };
            }
          );
        } catch (error) {
          console.log(error)
        }
      }
    };

    render() {
      const { ...props } = this.props;

      return (
        <Component
          complete={this.complete}
          add={this.add}
          todos={this.state.todos}
          {...(props as T)}
        />
      );
    }
  }

  return withCrud;
}

export default Crud;
