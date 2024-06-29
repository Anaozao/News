import { useSelector } from 'react-redux';
import styles from './LatestNews.module.css';
import { ReduxState } from '../../types';
import { useEffect, useState } from 'react';

function LatestNews() {
  const news  = useSelector((state: ReduxState) => state.news)
  const [image, setImage] = useState('')
  
  useEffect(() => {
    if (news.length > 0) {
      const image = JSON.parse(news[0].imagens)
      console.log(image);
      setImage(image.image_intro)
    }
    
  }, [news])


  return (
    <section className={styles.latestSection}>
      <img src={image} alt="" />
      <div>
        <p>Notícia mais recente</p>
        <h2>Título aqui</h2>
        <p>resumo aqui</p>
        <div>
          <p>tempo aqui</p>
          <button>Leia a notícia aqui</button>
        </div>
      </div>
    </section>
  )
}

export default LatestNews;