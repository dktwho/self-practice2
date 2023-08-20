import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    function removeTask(todoListId: string, id: string) {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(task => task.id !== id)})
    }

    function addTask(todoListId: string, title: string) {
        let task = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todoListId]: [task, ...tasks[todoListId]]})
    }

    function changeStatus(todoListId: string, taskId: string, isDone: boolean) {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(task => task.id === taskId ? {...task, isDone: isDone} : task)
        })
    }

    function changeFilter(todoListId: string, value: FilterValuesType) {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: value} : tl))
    }

    function removeTodoList(todoListId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }

    return (
        <div className="App">
            {todoLists.map(tl => {
                let tasksForTodolist = tasks[tl.id];
                if (tl.filter === "active") {
                    tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
                }

                return (
                    <Todolist key={tl.id}
                              todoListId={tl.id}
                              title={tl.title}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              filter={tl.filter}
                              removeTodoList={removeTodoList}
                    />
                )
            })}
        </div>
    );
}

export default App;





