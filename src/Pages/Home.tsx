import { useEffect } from 'react';
import styles from './Home.module.css'
import { getNews } from '../Redux/Actions/actions';
import { useDispatch } from 'react-redux';
import { Dispatch } from '../types';

function Home() {
  const dispatch: Dispatch = useDispatch()

  useEffect(() => {
    dispatch(getNews())
  }, [])


  return (
    <main className={styles.main}>
      <header className={styles.mainHeader}>
        <p>Mais recentes</p>
        <p>Atualizações</p>
        <p>Notícias</p>
        <p>Favoritas</p>
      </header>
      <section className={styles.mainNews}>

      </section>
    </main>
  )
}

export default Home;