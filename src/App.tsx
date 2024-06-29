import Header from "./Components/Header/Header"
import Featured from "./Components/Featured/Featured"
import Home from "./Pages/Home"
import styles from './App.module.css'

function App() {

  return (
    <div className={styles.appContainer}>
      <Header/>
      <Featured />
      <Home/>
    </div>
  )
}

export default App
