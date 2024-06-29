import { useEffect, useState } from 'react';
import styles from './NewsCard.module.css';
import useLoacalStorage from '../../Hooks/useLocalStorage';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { NewsType, ReduxState } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { setFavorites } from '../../Redux/Actions/actions';

type NewsCardProps = {
  title: string;
  intro: string;
  time: string;
  link: string;
  id: number;
  item: NewsType
}

function NewsCard({title, intro, time, link, id, item}: NewsCardProps) {
  const [isFav, setIsFav] = useState(false)
  const { favorites } = useSelector((state: ReduxState) => state.newsReducer)
  const storage = useLoacalStorage()
  const [fav, setFav] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const is = storage.getItem('favorites').find((fav: NewsType) => fav.id === id)
    setFav(is);
  }, [isFav, favorites])

  const handleFavorite = () => {
    const { getItem, setItem } = storage

    const favorites: NewsType[] = getItem('favorites')
    const isFavorite = favorites.find((fav) => fav.id === id)
    
    if (isFavorite) {
      setIsFav(false)
      const filter = favorites.filter((fav) => fav.id !== id).map((item) => item)
      dispatch(setFavorites(filter))
      setItem('favorites', filter)
      return;
    }
    setIsFav(true)
    const noticia = item
    dispatch(setFavorites([...favorites, noticia]))
    setItem('favorites', [...favorites, noticia])
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
      <div className={styles.BtnDiv}>
        <button
          className={styles.favBtn}
          onClick={handleFavorite}
        >
          {fav ? <MdFavorite  className={styles.fullHeart}/> : (
            <MdFavoriteBorder className={styles.emptyHeart} />
          )}
        </button>
      </div>
    </article>
  )
}

export default NewsCard;