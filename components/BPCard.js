import Link from 'next/link'
import styles from '../styles/Card.module.css'

export default function BPCard({title, coverPhoto, slug}) {
    return (
        <div className={styles.card}>
            <Link href={`/${slug}`}>
                <div className={styles.imgContainer}>
                    <img src={coverPhoto.url} alt=""/>
                </div>
            </Link>
            <div className={styles.text}>
                <h2>{title}</h2>
            </div>
        </div>
    )
}