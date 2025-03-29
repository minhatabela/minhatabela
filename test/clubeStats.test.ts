import { describe, expect, test } from 'vitest'
import type { Clube } from '~/types/clube'
import type { Partida } from '~/types/partida'
import { ClubeStats } from '~/utils/clubeStats'
import clubes from './mocks/clubes.json'
import partidas from './mocks/partidas.json'

describe('ClubeStats', () => {

  function setup() {
    const clube = clubes.find(clube => clube.sigla === 'COR') as Clube
    const partidasCampeonato = partidas as Partida[]
    const clubeStats = new ClubeStats(clube, partidasCampeonato)
    return { clube, clubeStats }
  }


  test('should filter partidas by clube', () => {
    const { clubeStats } = setup()
    expect(clubeStats.partidas.length).toBe(5)
  })

  test('should count victories', () => {
    const { clubeStats } = setup()
    expect(clubeStats.vitorias().length).toBe(2)
  })

  test('should count defeats', () => {
    const { clubeStats } = setup()
    expect(clubeStats.derrotas().length).toBe(2)
  })

  test('should count draws', () => {
    const { clubeStats } = setup()
    expect(clubeStats.empates().length).toBe(1)
  })

  test('should count points', () => {
    const { clubeStats } = setup()
    expect(clubeStats.pontos()).toBe(7)
  })

  test('should count goals pro', () => {
    const { clubeStats } = setup()
    expect(clubeStats.golsPro()).toBe(4)
  })

  test('should count goals against', () => {
    const { clubeStats } = setup()
    expect(clubeStats.golsContra()).toBe(4)
  })

  test('should filter home games', () => {
    const { clubeStats } = setup()
    expect(clubeStats.partidasMandante().length).toBe(3)
  })

  test('should filter away games', () => {
    const { clubeStats } = setup()
    expect(clubeStats.partidasVisitante().length).toBe(2)
  })

  test('should count goals difference', () => {
    const { clubeStats } = setup()
    expect(clubeStats.golsDif()).toBe(0)
  })

  test('should count matches with results', () => {
    const { clubeStats } = setup()
    expect(clubeStats.partidasComResultado().length).toBe(5)
  })

  test('should return stats object', () => {
    const { clubeStats, clube } = setup()
    expect(clubeStats.stats()).toEqual({
      gols_pro: 4,
      gols_contra: 4,
      vitorias: 2,
      empates: 1,
      derrotas: 2,
      pontos: 7,
      golsDif: 0,
      clube: clube?.nome_popular || '',
      partidas: 5,
      escudo: clube?.escudo || ''
    })
  })

})