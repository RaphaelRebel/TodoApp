import { FunctionComponent, ReactNode, useEffect, useState } from "react"
import "./CardTodo.css"
import TodoData from "../../Data/TodoData"
import { EntryType } from "perf_hooks"



// type ArticleProps = {
//     className: string,
//     children?: ReactNode
// }

// const Article = ({className, children}: ArticleProps) => <article className={className}>{children}</article>



interface TodoDataProps {
    name: string,
    id: number,
    done: boolean
}

interface removeFromList {
    removeFromList: (id: number) => void
}

const TodoItem = ({ name, id, removeFromList }: TodoDataProps & removeFromList) => {


    const [isDone, setIsDone] = useState<boolean>(false)


    const removeTodo = () => {
        setIsDone(!isDone);
        removeFromList(id)
    };




    return <li className={isDone ? "cardTodo--done" : ""} onClick={removeTodo} key={id}>{name}</li>
}

const CardTodo = () => {
    const [todos, setTodos] = useState<TodoDataProps[]>(TodoData)
    const [inputValue, setInputValue] = useState<string>("")

    const removeFromList = (todoId: number) => {
        const idCheck = todoId
        const updatedTodos = todos.filter(todos => todos.id !== idCheck)
        setTodos(updatedTodos)
    }

    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const keyDown = (event: any) => {
        if (event.keyCode == 13) {

            let newTodoId = 0
            if (todos.length !== 0) {
                const latestId = todos.length - 1
                newTodoId = todos[latestId].id + 1
            } else {
                newTodoId = 1
            }




            const newInputValue = {
                name: inputValue,
                done: false,
                id: newTodoId
            }

            setTodos(todos.concat(newInputValue))
            setInputValue("")

        }
    }



    const TodoDataToBeRendered = todos.map((todo: TodoDataProps) => {
        if (!todo.done) {
            return <TodoItem removeFromList={removeFromList} done={todo.done} name={todo.name} id={todo.id} key={todo.id} />
        }

    })

    return (
        <article className="cardTodo">
            <header>
                <h2>Things to do</h2>
            </header>
            <ul>
                {TodoDataToBeRendered}
            </ul>
            <input value={inputValue} onKeyDown={keyDown} onChange={inputChange} type="text" />
        </article>)
}

export default CardTodo