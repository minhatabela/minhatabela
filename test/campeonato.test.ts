import { describe, expect, test } from 'vitest'
import { CampeonatoGenerator } from '~/models/CampeonatoGenerator'
import { Campeonato } from '~/utils/campeonato'

describe('Campeonato', () => {

  function setup() {

    const results = [
      [8, 4],
      [5, 3],
      [4, 1], //Resultados Real Elite
    ]

    const campeonatoGenerator = new CampeonatoGenerator({ nomeClubes: ['Real Elite', 'G3X FC', 'Capim FC', 'Dendele'] });
    const partidas = campeonatoGenerator.gerarPartidas({ results });

    const campeonato = new Campeonato(partidas, campeonatoGenerator.clubes)
    return { campeonato }
  }

  test('getClassificacao', () => {
    const { campeonato } = setup()

    const lider = campeonato.getClassificacao().find(stat => stat.clube === 'Real Elite')
    expect(campeonato.getClassificacao()[0]).toEqual(lider)
  })
})