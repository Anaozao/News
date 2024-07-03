import React, { useEffect, useState } from 'react';
import styles from './Home.module.css'
import { getNews } from '../Redux/Actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, NewsType, ReduxState } from '../types';
import NewsCard from '../Components/NewsCard/NewsCard';
import useLocalStorage from '../Hooks/useLocalStorage';
import { IoSearch } from 'react-icons/io5';
import ReactLoading from 'react-loading';

function Home() {
  const dispatch: Dispatch = useDispatch()
  const storage = useLocalStorage()
  const { news, favorites} = useSelector((state: ReduxState) => state.newsReducer)
  const [newsCount, setNewsCount] = useState(10)
  const [page, setPage] = useState(1)
  const [renderFavs, setRenderFavs] = useState(false)
  const [category, setCategory] = useState('latest')
  const [favs, setFavs] = useState<NewsType[]>([])
  const [search, setSearch] = useState('')
  const [isSearch, setIsSearch] = useState(0)

  useEffect(() => {
    if (isSearch > 0) {
      dispatch(getNews(page, 30, search, ''))
      return;
    }
    dispatch(getNews(page, 30, '', category))
  }, [page, isSearch])

  useEffect(() => {
    setFavs(storage.getItem('favorites'))
  }, [renderFavs, favorites])

  useEffect(() => {
    setPage(1)
    setNewsCount(10)
  }, [isSearch])

  const backToStart = () => {
    setSearch('')
    dispatch(getNews(1, 30, '', ''))
    setPage(1)
    setNewsCount(9)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const showMore = () => {
    setNewsCount(newsCount + 9)
  }

  const nextPage = () => {
    setNewsCount(10)
    setPage(page + 1)
    window.scrollTo(0, window.innerHeight / 2);
  }

  const handleCategory = (section: string) => {
    setNewsCount(10)
    switch (section) {
      case 'latest':
        setRenderFavs(false)
        setPage(1)
        setIsSearch(0)
        setCategory('latest')
        dispatch(getNews(1, 30, '', ''))
      break
      case 'Releases':
        setRenderFavs(false)
        setPage(1)
        setIsSearch(0)
        setCategory('Release')
        dispatch(getNews(1, 30, '', 'Release'))
      break
      case 'Notícias':
        setRenderFavs(false)
        setPage(1)
        setIsSearch(0)
        setCategory('Noticia')
        dispatch(getNews(1, 30, '', 'Noticia'))
      break
      default:
        setPage(1)
        setIsSearch(0)
        setCategory('favorites')
        setRenderFavs(true)
    }
  }

  const handleSearch = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPage(1)
    setRenderFavs(false)
    setCategory('latest')
    setIsSearch(isSearch + 1)
  } 
  return (
    <main className={styles.main}>
      <header
        data-testid='filters-header'
        className={styles.mainHeader}>
        <div className={styles.headerBtnsDiv}>
          <button
            data-testid='latest-btn'
            className={`${styles.headerBtns} ${category === 'latest' && styles.selected}`}
            onClick={() => handleCategory('latest')}
          >
            Mais recentes
          </button>
          <button
            data-testid='release-btn'
            className={`${styles.headerBtns} ${category === 'Release' && styles.selected}`}
            onClick={() => handleCategory('Releases')}
          >
            Atualizações
          </button>
          <button
            data-testid='news-btn'
            className={`${styles.headerBtns} ${category === 'Noticia' && styles.selected}`}
            onClick={() => handleCategory('Notícias')}
          >
            Notícias
          </button>
          <button
            data-testid='favorites-btn'
            className={`${styles.headerBtns} ${category === 'favorites' && styles.selected}`}
            onClick={() => handleCategory('favorites')}
          >
            Favoritas
          </button>
        </div>
        <form className={styles.form}>
          <label>
            <input
              data-testid='search-input'
              className={styles.searchInput}
              type="text"
              name='search'
              value={search}
              onChange={handleChange}
            />
          </label>
          <button
            data-testid='search-btn'
            className={styles.searchBtn}
            onClick={handleSearch}
          >
            <IoSearch className={styles.searchIcon}/>
          </button>
        </form>
      </header>
      {news.length > 0 ? (
        <section className={styles.mainNews}>
          {(!renderFavs && news.length > 0) && (
            news.map((item, index) => (index < newsCount && index > 0) && (
              <NewsCard
                testId={'news-card'}
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
                  testId={'fav-news-card'}
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
                  Próxima página
                </button>
              )}
            </div>
          )}
        </section>
      ) : (
        <div className={styles.emptyNews}>
          <h1>Sem mais notícias</h1>
          <button
            className={styles.showMore}
            onClick={backToStart}
          >
            Voltar ao início
          </button>
        </div>
      )}
    </main>
  )
}

export default Home;