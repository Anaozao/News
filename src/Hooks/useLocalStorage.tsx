function useLocalStorage() {
  const getItem = (key: string) => {
    return JSON.parse(localStorage.getItem(key) || '[]')
  }

  const setItem = (key: string, item: unknown) => {
    localStorage.setItem(key, JSON.stringify(item))
  }

  return {getItem, setItem}
}

export default useLocalStorage;