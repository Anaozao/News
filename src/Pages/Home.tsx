import { useEffect, useState } from 'react';
import styles from './Home.module.css'
import { getNews } from '../Redux/Actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, ReduxState } from '../types';
import NewsCard from '../Components/NewsCard/NewsCard';

function Home() {
  const dispatch: Dispatch = useDispatch()
  const { news } = useSelector((state: ReduxState) => state)
  const [newsCount, setNewsCount] = useState(9)

  useEffect(() => {
    dispatch(getNews(1, 30, '', ''))
  }, [])

  const showMore = () => {
    setNewsCount(newsCount + 9)
  }

  const handleCategory = (section: string) => {
    // setNewsCount(9)
    console.log(section)
    switch (section) {
      case 'latest':
        dispatch(getNews(1, 30, '', ''))
      break
      case 'Releases':
        dispatch(getNews(1, 30, '', 'Release'))
      break
      case 'Notícias':
        dispatch(getNews(1, 30, '', 'Noticia'))
      break
      default:
        dispatch(getNews(1, 30, '', ''))
    }
  }

  return (
    <main className={styles.main}>
      <header className={styles.mainHeader}>
        <button
          // onClick={() => dispatch(getNews(1, 30, '', ''))}
          onClick={() => handleCategory('latest')}
        >
          Mais recentes
        </button>
        <button
          // onClick={() => dispatch(getNews(1, 30, '', 'Release'))}
          onClick={() => handleCategory('Releases')}
        >
          Atualizações
        </button>
        <button
          // onClick={() => dispatch(getNews(1, 30, '', 'Notícia'))}
          onClick={() => handleCategory('Notícias')}
        >
          Notícias
        </button>
        <button
          onClick={() => handleCategory('favorites')}
        >
          Favoritas
        </button>
      </header>
      <section className={styles.mainNews}>
        {news.length > 0 && (
          news.map((item, index) => (index <= newsCount && index > 0) && (
            <NewsCard 
              key={item.id}
              intro={item.introducao}
              id={item.id}
              time={'x'}
              link={item.link}
              title={item.titulo}
            />
          ))
        )}
      </section>
      <div className={styles.showMoreBtnDiv}>
        <button
          className={styles.showMore}
          onClick={showMore}>Mostrar mais
        </button>
      </div>
    </main>
  )
}

export default Home;