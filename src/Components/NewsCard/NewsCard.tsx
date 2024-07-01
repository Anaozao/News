import { useEffect, useState } from 'react';
import styles from './NewsCard.module.css';
import useLoacalStorage from '../../Hooks/useLocalStorage';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { NewsType, ReduxState } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { setFavorites } from '../../Redux/Actions/actions';
import { timeAgoCard } from '../../Utils/Functions';

type NewsCardProps = {
  title: string;
  intro: string;
  link: string;
  id: number;
  item: NewsType
  testId: string
}

function NewsCard({title, intro, link, id, item, testId}: NewsCardProps) {
  const [isFav, setIsFav] = useState(false)
  const { favorites } = useSelector((state: ReduxState) => state.newsReducer)
  const [time, setTime] = useState('')
  const storage = useLoacalStorage()
  const [fav, setFav] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    timeAgoCard(item, setTime)
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
    <article
      data-testid={testId}
      className={styles.newsCard}>
      <div className={styles.infoDiv}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.intro}>{intro}</p>
      </div>
      <div className={styles.timeAndBtn}>
        <p>{time} atrás</p>
        <button
              data-testid = 'card-button'
              className={styles.readFullBtn}
            >
              <a
                data-testid = 'card-link'
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
          data-testid='fav-btn'
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