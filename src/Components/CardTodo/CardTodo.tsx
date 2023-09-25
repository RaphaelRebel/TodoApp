import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import "./CardTodo.css";
import TodoData from "../../Data/TodoData";
import { EntryType } from "perf_hooks";
import { AnimatePresence, motion } from "framer-motion";
import TodoItem from "../TodoItem/TodoItem";

export interface TodoDataProps {
  name: string;
  id: number;
  removeFromList?: (id: number) => void;
}

const CardTodo = ({ removeCard, id }: any) => {
  const [todos, setTodos] = useState<TodoDataProps[]>(TodoData);
  const [inputValue, setInputValue] = useState<string>("");
  const [inputTitle, setInputTitle] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [titleValue, setTitleValue] = useState<string>("");

  const removeFromList = (todoId: number) => {
    const idCheck = todoId;
    const updatedTodos = todos.filter((todos) => todos.id !== idCheck);
    setTodos(updatedTodos);
  };

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const inputChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
  };

  const keyDown = (event: any) => {
    if (event.keyCode == 13 && inputValue !== "") {
      // const latestId = todos.length - 1
      // newTodoId = todos[latestId].id + 1
      const newTodoId = (todos[todos.length - 1]?.id ?? 0) + 1;

      const newInputValue = {
        name: inputValue,
        id: newTodoId,
      };

      setTodos(todos.concat(newInputValue));
      setInputValue("");
    }
  };

  const TodoDataToBeRendered = todos.map((todo: TodoDataProps) => {
    return <TodoItem key={todo.id} removeFromList={removeFromList} {...todo} />;
  });

  const onkeydownTitle: any = (event: any) => {
    if (event.keyCode == 13) {
      setTitle(titleValue);
      setInputTitle(false);
    }
  };

  const titleInput: () => void = () => {
    setInputTitle(true);
  };

  let titleInputToBeRendered: any = title ? (
    <h2 onClick={titleInput}>{title} </h2>
  ) : (
    <h2 onClick={titleInput}>Things to do</h2>
  );

  let nameThisBetter: React.ReactNode = inputTitle ? (
    <motion.input
      value={titleValue}
      onChange={inputChangeTitle}
      onKeyDown={onkeydownTitle}
      type="text"
      className="title_input input"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
    />
  ) : (
    titleInputToBeRendered
  );

  return (
    <motion.article
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className="cardTodo"
      layout="position"
    >
      <header>
        {nameThisBetter}

        <p onClick={titleInput} className="cardTodo_edit">
          Edit
        </p>
        <p
          onClick={() => {
            removeCard(id);
          }}
        >
          X
        </p>
      </header>

      <ul>
        <AnimatePresence>{TodoDataToBeRendered}</AnimatePresence>
      </ul>
      <input
        className="cardTodo_input input"
        placeholder="Add a todo"
        value={inputValue}
        onKeyDown={keyDown}
        onChange={inputChange}
        type="text"
      />
    </motion.article>
  );
};

export default CardTodo;
