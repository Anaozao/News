import { renderWithRedux } from "./helpers/renderWithRedux"
import App from "../App"
import { screen } from "@testing-library/react"
describe('Verifica o componente Featured', () => {
  test('Verifica se tem a imagem da notícia', async () => {
    const { user } = renderWithRedux(<App />)
  })
})