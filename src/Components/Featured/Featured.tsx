import styles from './Featured.module.css';
import { useEffect, useState } from 'react';
import { fetchNews } from '../../Utils/API';
import { NewsType } from '../../types';
import { timeAgo } from '../../Utils/Functions';

function Featured() {
  const [image, setImage] = useState('')
  const [news, setNews] = useState<NewsType[]>([])
  const [time, setTime] = useState('')


  
  useEffect(() => {
    const getLatest = async () => {
      const response = await fetchNews(1, 1, '', '')
      setNews(response.items)

    }
    getLatest()
  }, [])
  useEffect(() => {
    timeAgo(news, setTime)
    if (news.length > 0) {
      const image = JSON.parse(news[0].imagens)
      setImage(`http://agenciadenoticias.ibge.gov.br/${image.image_intro}`)
    }
  }, [news])

  return (
    <section className={styles.latestSection}>
      {news.length > 0 && (
        <>
          <img
            className={styles.featuredImg}
            src={image} alt="" />
          <div className={styles.infodiv}>
            <p className={styles.latest}>Notícia mais recente</p>
            <h2>{news[0].titulo}</h2>
            <p>{news[0].introducao}</p>
            <div className={styles.timeAndBtn}>
              <p>{time}</p>
              <button
                className={styles.Btn}
              >
                <a
                  className={styles.link}
                  href={news[0].link} target="_blank" rel="noopener noreferrer"
                >
                  Leia a notícia aqui
                </a>
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default Featured;