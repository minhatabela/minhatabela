import { describe, expect, test } from 'vitest'
import { CampeonatoGenerator } from '~/models/CampeonatoGenerator'
import { ClubeStats } from '~/utils/clubeStats'

describe('ClubeStats', () => {

  function setup() {

    const results = [
      [2, 1],
      [1, 0],
      [0, 0],
      [3, 2],
      [1, 1],
      [0, 2],
      [2, 0],
      [1, 3],
      [0, 0],
      [2, 2],

      [1, 0],
      [0, 1],
      [3, 1],
      [2, 3],
      [1, 1],
      [0, 0],
      [2, 1],
      [1, 2],
      [0, 3],
      [3, 0],
      [1, 1],
      [2, 0],
      [0, 1],
      [3, 2],
      [1, 3],
      [0, 0],
      [2, 2],
      [1, 0],
      [0, 2],
      [3, 1],

      [1, 1],
      [2, 3],
      [0, 0],
      [1, 2],
      [3, 0],
      [2, 1],
      [0, 1],
      [1, 0]
    ]

    const campeonatoGenerator = new CampeonatoGenerator()
    const clubesCampeonato = campeonatoGenerator.gererarClubes()
    const partidasCampeonato = campeonatoGenerator.gerarPartidas({ clube: 'Corinthians', results })
    const clube = clubesCampeonato[0]

    const clubeStats = new ClubeStats(clube, partidasCampeonato)
    return { clube, clubeStats }
  }


  test('should filter partidas by clube', () => {
    const { clubeStats } = setup()
    expect(clubeStats.partidas.length).toBe(38)
  })

  test('should count victories', () => {
    const { clubeStats } = setup()
    expect(clubeStats.vitorias().length).toBe(15)
  })

  test('should count defeats', () => {
    const { clubeStats } = setup()
    expect(clubeStats.derrotas().length).toBe(12)
  })

  test('should count draws', () => {
    const { clubeStats } = setup()
    expect(clubeStats.empates().length).toBe(11)
  })

  test('should count points', () => {
    const { clubeStats } = setup()
    expect(clubeStats.pontos()).toBe(56)
  })

  test('should count goals pro', () => {
    const { clubeStats } = setup()
    expect(clubeStats.golsPro()).toBe(48)
  })

  test('should count goals against', () => {
    const { clubeStats } = setup()
    expect(clubeStats.golsContra()).toBe(43)
  })

  test('should filter home games', () => {
    const { clubeStats } = setup()
    expect(clubeStats.partidasMandante().length).toBe(19)
  })

  test('should filter away games', () => {
    const { clubeStats } = setup()
    expect(clubeStats.partidasVisitante().length).toBe(19)
  })

  test('should count goals difference', () => {
    const { clubeStats } = setup()
    expect(clubeStats.golsDif()).toBe(5)
  })

  test('should count matches with results', () => {
    const { clubeStats } = setup()
    expect(clubeStats.partidasComResultado().length).toBe(38)
  })

  test('should return stats object', () => {
    const { clubeStats, clube } = setup()
    expect(clubeStats.stats()).toEqual({
      gols_pro: 48,
      gols_contra: 43,
      vitorias: 15,
      empates: 11,
      derrotas: 12,
      pontos: 56,
      golsDif: 5,
      clube: clube?.nome_popular || '',
      partidas: 38,
      escudo: clube?.escudo || ''
    })
  })

})