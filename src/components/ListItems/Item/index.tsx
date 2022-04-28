import { TaskType } from 'types/task'
import styles from './Item.module.scss'

interface Props extends TaskType {
    selectTask: (selectedTask: TaskType) => void
}

export default function Item({
    task,
    time,
    selected,
    completed,
    id,
    selectTask,
}: Props) {
    return (
        <li className={`
            ${ styles.item}
            ${ selected ? styles.itemSelected : '' }
            ${ completed ? styles.itemCompleted : ''}`
        }
            onClick={() =>
                !completed &&
                selectTask({
                    task,
                    time,
                    selected,
                    completed,
                    id,
                })
            }
        >
            <h3>{ task }</h3>

            <span>{ time }</span>

            {completed && (
                <span className={ styles.done } aria-label="tarefa completada" />
            )}
        </li>
    )
}
