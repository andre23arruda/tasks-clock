import { useState } from 'react'
import Cronometer from '../components/Cronometer'
import Form from '../components/Form'
import ListItems from '../components/ListItems'
import { TaskType } from 'types/task'
import styles from './App.module.scss'

function App() {
    const [tasks, setTasks] = useState<TaskType[]>([])
    const [selected, setSelecionado] = useState<TaskType>()

    function selectTask(selectedTask: TaskType) {
        setSelecionado(selectedTask)
        setTasks((lastTasks) =>
            lastTasks.map((task) => ({
                ...task,
                selected: task.id === selectedTask.id ? true : false,
            }))
        )
    }

    function clearTask() {
        if (selected) {
            setSelecionado(undefined)
            setTasks((lastTasks) =>
                lastTasks.map((task) => {
                    if (task.id === selected.id) {
                        return {
                            ...task,
                            selected: false,
                            completed: true,
                        }
                    }
                    return task
                })
            )
        }
    }

    return (
        <div className={ styles.AppStyle }>
            <Form setTasks={ setTasks } />

			<ListItems tasks={ tasks } selectTask={ selectTask } />

			<Cronometer
                selected={ selected }
                clearTask={ clearTask }
            />
        </div>
    )
}

export default App
