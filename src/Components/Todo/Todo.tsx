import "./Todo.css";
import CardTodo, { TodoDataProps } from "../CardTodo/CardTodo";
import { useState } from "react";
import TodoCards, { TodoCardsProps } from "../../Data/TodoCards";
import { AnimatePresence, motion } from "framer-motion";

const Todo = () => {
  const [cards, setCards] = useState([{}]);
  const [cardsStillAllowed, setCardsStillAllowed] =
    useState<TodoCardsProps[]>(TodoCards);

  const addTodoCard = () => {
    const newTodoId =
      (cardsStillAllowed[cardsStillAllowed.length - 1]?.id ?? 0) + 1;

    const newInputValue = {
      id: newTodoId,
    };

    setCardsStillAllowed(cardsStillAllowed.concat(newInputValue));
  };

  const removeCard: (id: number) => void = (id) => {
    const updatedTodos = cardsStillAllowed.filter(
      (cardsStillAllowed) => cardsStillAllowed.id !== id
    );
    setCardsStillAllowed(updatedTodos);
  };

  const todoCardsToBeRendered = cardsStillAllowed.map((card) => {
    return <CardTodo removeCard={removeCard} key={card.id} id={card.id} />;
  });

  return (
    <section className="todo">
      <div onClick={addTodoCard} className="addTodo">
        <p>+</p>
      </div>

      <div className="todoCards">
        <AnimatePresence>{todoCardsToBeRendered}</AnimatePresence>
      </div>
    </section>
  );
};

export default Todo;

// Elke card een id geven (via een array bijhouden) - check
//Elke card moet een object zijn - check
//Cards moeten toegevoegd kunnen worden - check
//Card verwijderen via id
//Return alleen als de show op true is
