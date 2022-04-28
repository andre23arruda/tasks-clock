import React, { useState } from 'react'
import { TaskType } from 'types/task'
import Button from '../Button'
import styles from './Form.module.scss'
import { v4 as uuidv4 } from 'uuid'

import InputMask from 'react-input-mask'
import { timeToSeconds } from '../../common/utils/time'


interface Props {
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>
}


function Form({ setTasks }: Props) {
    const [task, setTask] = useState('')
    const [time, setTime] = useState('0:00:00')

    const mask = [
        /[0-1]/, ':',
        /[0-5]/, /[0-9]/, ':',
        /[0-5]/, /[0-9]/
    ]

    function handleInput(value: string) {
        setTime(value)
    }

    function addTask(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (validateTime(time)) {
            setTasks((lastTasks) => [
                ...lastTasks,
                {
                    task,
                    time,
                    selected: false,
                    completed: false,
                    id: uuidv4(),
                },
            ])
            setTask('')
            setTime('0:00:00')
            return
        }
        alert('Tempo inválido!!')

    }

    function validateTime(value: string) {
        const pattern = '[0-1]:[0-5][0-9]:[0-5][0-9]'
        const match = value.match(pattern)
        const seconds = timeToSeconds(value)
        return (match && seconds) ? value : false
    }

    return (
        <form
            className={ styles.newTask }
            onSubmit={ addTask }
        >
            <div className={ styles.inputContainer }>
                <label htmlFor="task">Adicione um novo estudo</label>
                <input
                    type="text"
                    name="task"
                    id="task"
                    value={ task }
                    onChange={(event) => setTask(event.target.value)}
                    placeholder="O que você quer estudar"
                    required
                />
            </div>

            <div className={ styles.inputContainer }>
                <label htmlFor="time">Tempo</label>
                <InputMask
                    id="time"
                    mask={ mask }
                    onChange={ e => handleInput(e.target.value)}
                    value={ time }
                />
            </div>

            <Button type="submit">
				Adicionar
			</Button>
        </form>
    )
}

export default Form
