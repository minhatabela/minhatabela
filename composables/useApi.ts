import { type Jogo } from "~/types/jogo"

const { data: partidas } = useAsyncData('partidas', () => $fetch<Jogo[]>('/api/partidas'), { default: () => [] })
const { data: clubes } = useAsyncData('clubes', () => $fetch('/api/clubes'), { default: () => [] })




export const useApi = () => {
  return { partidas, clubes }
}
