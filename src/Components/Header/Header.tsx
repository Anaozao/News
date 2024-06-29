import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <img 
        className={styles.logoImg}
        src="src/Images/Trybe.png"
        alt="Logo da Trybe"
      />
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Trybe News</h1>
      </div>
    </header>
  )
}

export default Header;