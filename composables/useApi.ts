import { type Clube } from "~/types/clube"

const { data: partidas } = useAsyncData('partidas', () => $fetch<Clube[]>('/api/partidas'), { default: () => [] })
const { data: clubes } = useAsyncData('clubes', () => $fetch('/api/clubes'), { default: () => [] })




export const useApi = () => {
  return { partidas, clubes }
}
