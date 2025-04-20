import { type IClube } from "~/types/clube"
import { type IPartida } from "~/types/partida"
import type { ISede } from "~/types/sede"

const { data: partidas } = useAsyncData('partidas', () => $fetch<IPartida[]>('/api/partidas'), { default: () => [] })
const { data: clubes } = useAsyncData('clubes', () => $fetch<IClube[]>('/api/clubes'), { default: () => [] })
const { data: sedes } = useAsyncData('sedes', () => $fetch<ISede[]>('/api/sedes'), { default: () => [] })




export const useApi = () => {
  return { partidas, clubes, sedes }
}
