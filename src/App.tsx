import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListsType = {
    id: string
    title: string
}

export type TasksStateType = {
    [key: string]: EntranceType
}

type EntranceType = {
    data: TaskType[]
    filter: FilterValuesType
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todolistID1, title: 'What to learn'},
        {id: todolistID2, title: 'What to buy' },
    ])

    // let [tasks, setTasks] = useState({
    //     [todolistID1]: [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'ReactJS', isDone: false},
    //     ],
    //     [todolistID2]: [
    //         {id: v1(), title: 'Rest API', isDone: true},
    //         {id: v1(), title: 'GraphQL', isDone: false},
    //     ]
    // })


    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]:  {
            data: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false},
            ],
            filter: 'all'
        },
        [todolistID2]:  {
            data: [
                {id: v1(), title: 'Rest API', isDone: true},
                {id: v1(), title: 'GraphQL', isDone: false},
            ],
            filter: 'all'
        }
    })

    function removeTask(todoListId: string, taskId: string) {
        // setTasks({...tasks, [todoListId]: tasks[todoListId].filter(task => task.id !== id)})
        // -----------------------------------------------------------------------------------//
        setTasks({...tasks, [todoListId]: {...tasks[todoListId], data:tasks[todoListId].data.filter(task => task.id !== taskId) }})
    }
    function addTask(todoListId: string, title: string) {
        // let task = {id: v1(), title: title, isDone: false};
        // setTasks({...tasks, [todoListId]: [task, ...tasks[todoListId]]})
        // --------------------------------------------------------------------//
        let task = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todoListId]: {...tasks[todoListId], data: [task, ...tasks[todoListId].data]}})
    }
    function changeStatus(todoListId: string, taskId: string, isDone: boolean) {
        // setTasks({
        //     ...tasks,
        //     [todoListId]: tasks[todoListId].map(task => task.id === taskId ? {...task, isDone: isDone} : task)
        // })
        // ------------------------------------------------------------------------------------------------------//
        setTasks({...tasks, [todoListId]: {...tasks[todoListId], data: tasks[todoListId].data.map(task => task.id === taskId ? {...task, isDone: isDone} : task )}})
    }
    function changeFilter(todoListId: string, value: FilterValuesType) {
        // setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: value} : tl))
        // ------------------------------------------------------------------------------------//
        setTasks({...tasks, [todoListId]: {...tasks[todoListId], filter: value}})
    }
    function removeTodoList(todoListId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }

    function addTodoList  (newTitle: string)  {
        const todolistId = v1()
        let newTodolist: TodoListsType = {id: todolistId, title: newTitle}
        setTodoLists([newTodolist,...todoLists])
        setTasks({...tasks, [todolistId]: {...tasks[todolistId], data: []}  })
    }

    return (
        <div className="App">
            <AddItemForm callback={addTodoList}  />
            {todoLists.map(tl => {
                let tasksForTodolist = tasks[tl.id].data;
                if (tasks[tl.id].filter === "active") {
                    tasksForTodolist = tasks[tl.id].data.filter(t => t.isDone === false);
                }
                if (tasks[tl.id].filter === "completed") {
                    tasksForTodolist = tasks[tl.id].data.filter(t => t.isDone === true);
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
                              filter={tasks[tl.id].filter}
                              removeTodoList={removeTodoList}
                    />
                )
            })}
        </div>
    );
}

export default App;





