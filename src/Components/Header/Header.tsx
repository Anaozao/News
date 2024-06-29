import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <img src="../../Images/Trybe.png" alt="Logo da Trybe" />
      <h1>Trybe News</h1>
    </header>
  )
}

export default Header;