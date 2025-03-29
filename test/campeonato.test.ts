import { describe, expect, test } from 'vitest'
import type { Clube } from '~/types/clube'
import type { Partida } from '~/types/partida'
import { Campeonato } from '~/utils/campeonato'
import clubes from './mocks/clubes.json'
import partidas from './mocks/partidas.json'

describe('Campeonato', () => {

  function setup() {
    const clubesCampeonato = clubes as Clube[]
    const partidasCampeonato = partidas as Partida[]
    const campeonato = new Campeonato(partidasCampeonato, clubesCampeonato)
    return { campeonato, clubesCampeonato }
  }

  test('getClassificacao', () => {
    const { campeonato } = setup()

    const lider = campeonato.getClassificacao().find(stat => stat.clube === 'Internacional')
    expect(campeonato.getClassificacao()[0]).toEqual(lider)
  })
})