export const fetchNews = async (page = 1, qtd = 30, search = '') => {
  try {
    const response = await fetch(`https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=${qtd}&page=${page}&busca=${encodeURIComponent(search)}`)
    if (!response.ok) {
      throw new Error(`Erro na requisição ${response.status}`)
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erro: ${error}`)
  }
}
