import styles from './Clock.module.scss'

interface Props {
    time: number | undefined
}

export default function Clock({ time = 0 }: Props) {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    const [minuteDozen, minuteUnity] = String(minutes).padStart(2, '0')
    const [secondDozen, secondUnity] = String(seconds).padStart(2, '0')

	return (
        <>
            <span className={styles.clockNumber}>{ minuteDozen }</span>
            <span className={styles.clockNumber}>{ minuteUnity }</span>

            <span className={styles.clockDivision}>:</span>

            <span className={styles.clockNumber}>{ secondDozen }</span>
            <span className={styles.clockNumber}>{ secondUnity }</span>
        </>
    )
}
