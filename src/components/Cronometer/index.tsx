import Button from '../Button'
import Clock from './Clock'
import styles from './Cronometer.module.scss'
import { timeToSeconds } from '../../common/utils/time'
import { TaskType } from 'types/task'
import { useEffect, useState } from 'react'


interface Props {
    selected: TaskType | undefined
    clearTask: () => void
}

export default function Cronometer({ selected, clearTask }: Props) {
    const [time, setTime] = useState<number>(0)
    const [run, setRun] = useState(false)
    const [done, setDone] = useState(false)

    function playCompleteSong() {
        const audio = new Audio(require('assets/sounds/complete.mp3'))
        audio.play()
    }

    useEffect(() => {
        if (selected?.time) {
            setTime(timeToSeconds(selected.time))
        }
    }, [selected])

    useEffect(() => {
        const reduceTime = setTimeout(() => {
            if (done) {
                clearTimeout(reduceTime)
                setTime(0)
                clearTask()
                setDone(false)
                setRun(false)
            }
            else if (time > 0 && run) {
                setTime(time - 1)
            } else if (time <=0 && run) {
                playCompleteSong()
                clearTimeout(reduceTime)
                clearTask()
                setRun(false)
            }
        }, 1000)
    }, [run, time, clearTask, done])

    const buttons = [
        { onClick: () => setRun(true),
            label: 'Começar'
        },
        { onClick:() => setRun(false),
            label: 'Pausar'
        },
        { onClick: () => setDone(true),
            label: 'Finalizar'
        },
    ]

    return (
        <div className={ styles.cronometer }>
            <p className={ styles.title }>
                Escolha um card e inicie o Cronômetro
            </p>

            <div className={ styles.clockWrapper }>
                <Clock time={ time } />
            </div>

            <div className={ styles.buttonsGroup }>
                { buttons.map(button => (
                    <Button onClick={ button.onClick }>
                        { button.label }
                    </Button>
                ))}
            </div>
        </div>
    )
}
