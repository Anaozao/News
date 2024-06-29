import React, { useEffect, useState } from 'react';
import styles from './Home.module.css'
import { getNews } from '../Redux/Actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, NewsType, ReduxState } from '../types';
import NewsCard from '../Components/NewsCard/NewsCard';
import useLocalStorage from '../Hooks/useLocalStorage';
import { IoSearch } from 'react-icons/io5';

function Home() {
  const dispatch: Dispatch = useDispatch()
  const storage = useLocalStorage()
  const { news, favorites} = useSelector((state: ReduxState) => state.newsReducer)
  const [newsCount, setNewsCount] = useState(9)
  const [page, setPage] = useState(1)
  const [renderFavs, setRenderFavs] = useState(false)
  const [category, setCategory] = useState('latest')
  const [favs, setFavs] = useState<NewsType[]>([])
  const [search, setSearch] = useState('')
  const [isSearch, setIsSearch] = useState(false)

  useEffect(() => {
    setFavs(storage.getItem('favorites'))
    if (isSearch) {
      dispatch(getNews(page, 30, search, ''))
      return;
    }
    dispatch(getNews(page, 30, '', category))
  }, [page, renderFavs, favorites, isSearch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const showMore = () => {
    setNewsCount(newsCount + 9)
  }

  const nextPage = () => {
    setNewsCount(9)
    setPage(page + 1)
    window.scrollTo(0, 0);
  }

  const handleCategory = (section: string) => {
    setNewsCount(9)
    switch (section) {
      case 'latest':
        setRenderFavs(false)
        if(category !== "") {
          setPage(1)
        }
        setCategory('latest')
        dispatch(getNews(page, 30, '', ''))
      break
      case 'Releases':
        setRenderFavs(false)
        if(category !== "Release") {
          setPage(1)
        }
        setCategory('Release')
        dispatch(getNews(page, 30, '', 'Release'))
      break
      case 'Notícias':
        setRenderFavs(false)
        if(category !== "Noticia") {
          setPage(1)
        }
        setCategory('Noticia')
        dispatch(getNews(page, 30, '', 'Noticia'))
      break
      default:
        setCategory('favorites')
        setRenderFavs(true)
    }
  }

  const handleSearch = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSearch(true)
    dispatch(getNews(page, 30, search, ''))
  }

  return (
    <main className={styles.main}>
      <header className={styles.mainHeader}>
        <div className={styles.headerBtnsDiv}>
          <button
            className={`${styles.headerBtns} ${category === 'latest' && styles.selected}`}
            onClick={() => handleCategory('latest')}
          >
            Mais recentes
          </button>
          <button
            className={`${styles.headerBtns} ${category === 'Release' && styles.selected}`}
            onClick={() => handleCategory('Releases')}
          >
            Atualizações
          </button>
          <button
            className={`${styles.headerBtns} ${category === 'Noticia' && styles.selected}`}
            onClick={() => handleCategory('Notícias')}
          >
            Notícias
          </button>
          <button
            className={`${styles.headerBtns} ${category === 'favorites' && styles.selected}`}
            onClick={() => handleCategory('favorites')}
          >
            Favoritas
          </button>
        </div>
        <form className={styles.form}>
          <label>
            <input
              className={styles.searchInput}
              type="text"
              name='search'
              value={search}
              onChange={handleChange}
            />
          </label>
          <button
            className={styles.searchBtn}
            onClick={handleSearch}
          >
            <IoSearch className={styles.searchIcon}/>
          </button>
        </form>
      </header>
      <section className={styles.mainNews}>
        {(!renderFavs && news.length > 0) && (
          news.map((item, index) => (index < newsCount) && (
            <NewsCard 
              key={item.id}
              intro={item.introducao}
              id={item.id}
              link={item.link}
              title={item.titulo}
              item={item}
            />
          ))
        )}
        {renderFavs && (
          favs.length > 0 ? (
            favs.map((item) => 
              <NewsCard 
                key={item.id}
                intro={item.introducao}
                id={item.id}
                link={item.link}
                title={item.titulo}
                item={item}
              />
            )
          ) : (
            <>
              <p></p>
              <h1 className={styles.noFavMsg}>Nenhuma notícia favoritada!</h1>
              <p></p>
            </>
          )
        )}
        <div></div>
        {!renderFavs && (
          <div className={styles.showMoreBtnDiv}
          >
            {newsCount <= 30 ? (
              <button
                className={styles.showMore}
                onClick={showMore}
              >
                Mostrar mais
              </button>
            ) : (
              <button
                className={styles.showMore}
                onClick={nextPage}
              >
                Pŕoxima página
              </button>
            )}
          </div>
        )}
      </section>
    </main>
  )
}

export default Home;