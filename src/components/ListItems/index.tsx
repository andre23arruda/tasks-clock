import { TaskType } from 'types/task'
import Item from './Item'
import styles from './ListItems.module.scss'

interface Props {
    tasks: TaskType[]
    selectTask: (selectedTask: TaskType) => void
}

function ListItems({ tasks, selectTask }: Props) {
    return (
        <aside className={ styles.tasksList }>
            <h2> Estudos do dia </h2>

			<ul>
                {tasks.map((item) => (
                    <Item
                        selectTask={ selectTask }
                        key={ item.id }
                        {...item}
                    />
                ))}
            </ul>
        </aside>
    )
}

export default ListItems
