import { type IClube } from "~/types/clube"
import { type IPartida } from "~/types/partida"

const { data: partidas } = useAsyncData('partidas', () => $fetch<IPartida[]>('/api/partidas'), { default: () => [] })
const { data: clubes } = useAsyncData('clubes', () => $fetch<IClube[]>('/api/clubes'), { default: () => [] })




export const useApi = () => {
  return { partidas, clubes }
}
