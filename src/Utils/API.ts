import { NewsType } from "../types"

export const fetchNews = async (page: number, qtd: number, search: string, tipo: string) => {
  let url = `https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=${qtd}&page=${page}&busca=${encodeURIComponent(search)}`

  if (tipo) {
    url += `&tipo=${encodeURIComponent(tipo)}`
  }

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Erro na requisição ${response.status}`)
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erro: ${error}`)
  }
}

