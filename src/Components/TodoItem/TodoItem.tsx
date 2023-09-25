import { useState } from "react";
import { TodoDataProps } from "../CardTodo/CardTodo";
import { motion } from "framer-motion";

const TodoItem = ({ name, id, removeFromList }: TodoDataProps) => {
  const [isDone, setIsDone] = useState<boolean>(false);

  const removeTodo = () => {
    setIsDone(!isDone);
    removeFromList?.(id);
  };

  const li = {
    initial: {
      y: 40,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
    removed: {
      opacity: 0,
    },
  };

  return (
    <motion.li
      variants={li}
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 40, opacity: 0 }}
      transition={{ delay: 0.1}}
      className={isDone ? "cardTodo--done" : ""}
      onClick={removeTodo}
      key={id}
      exit={{ opacity: 0, y: -40 }}
    >
      {name}
    </motion.li>
  );
};

export default TodoItem;
