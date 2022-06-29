import Link from 'next/link'
import styles from '../styles/Card.module.css'
import Image from "next/image";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton} from '@mui/material';

export default function Card({title, coverPhoto, slug, addItem, part}) {
    return (
        <div className={styles.card}>
            <Link href={`/exercises/${slug}`}>
                <div className={styles.imgContainer}>
                    <img src={coverPhoto.url} alt=""/>
                </div>
            </Link>
            <div className={styles.text}>
                <h2>{title}</h2>
                <IconButton aria-label="add exercise" className={styles.listBtn} onClick={() => addItem({title: title, slug: slug})}>
                    <AddCircleIcon className={styles.listIcon} sx={{ fontSize: "3rem" }}/>
                </IconButton>
            </div>
        </div>
    )
}