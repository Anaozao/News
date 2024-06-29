import { useEffect, useState } from 'react';
import { NewsType } from '../../types';
import styles from './NewsCard.module.css';
import useLoacalStorage from '../../Hooks/useLocalStorage';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

type NewsCardProps = {
  title: string;
  intro: string;
  time: string;
  link: string;
  id: number;
}

function NewsCard({title, intro, time, link, id}: NewsCardProps) {
  const [isFav, setIsFav] = useState(false)
  const storage = useLoacalStorage()
  const [fav, setFav] = useState(false)

  useEffect(() => {
    const is = storage.getItem('favorites').includes((id))
    setFav(is);
  }, [isFav])

  const handleFavorite = () => {
    const { getItem, setItem } = storage

    const favorites: number[] = getItem('favorites')
    const isFavorite = favorites.find((fav) => fav === id)
    
    if (isFavorite) {
      setIsFav(false)
      const filter = favorites.filter((fav) => fav !== id).map((item) => item)
      setItem('favorites', filter)
      return;
    }
    setIsFav(true)
    const item = id;
    setItem('favorites', [...favorites, item])
  }

  return (
    <article className={styles.newsCard}>
      <div className={styles.infoDiv}>
        <h3>{title}</h3>
        <p>{intro}</p>
      </div>
        <div className={styles.timeAndBtn}>
          <p>{time} dias atrás</p>
          <button
                className={styles.readFullBtn}
              >
                <a
                  className={styles.link}
                  href={ link }
                  target="_blank"rel="noopener noreferrer"
                >
                  Leia a notícia aqui
                </a>
              </button>
        </div>
        <button
          className={styles.favBtn}
          onClick={handleFavorite}
        >{fav ? <MdFavorite  className={styles.fullHeart}/> : <MdFavoriteBorder className={styles.emptyHeart} />
}</button>
    </article>
  )
}

export default NewsCard;