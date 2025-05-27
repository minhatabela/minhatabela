import { NOME_CLUBES } from '../constants/nomeClubes'
import type { IClube } from '../types/clube'
import type { IPartida } from '../types/partida'
import { Clube } from './Clube'
import { Partida } from './Partida'

interface GerarPartidasOptions {
  clube?: string | undefined
  results: number[][] | undefined
}

interface ICampeonatoGenerator {
  nomeClubes?: string[]
}

const defaultCampeonatoGenerator = {
  nomeClubes: NOME_CLUBES
}

export class CampeonatoGenerator {
  clubes: IClube[] = []
  partidas: IPartida[] = []
  nomesClubes: string[] = NOME_CLUBES

  constructor({ nomeClubes }: ICampeonatoGenerator = defaultCampeonatoGenerator) {
    this.nomesClubes = nomeClubes || NOME_CLUBES
  }

  gererarClubes(): IClube[] {
    this.clubes = this.nomesClubes.map(
      nome => new Clube({ nome_popular: nome, id: crypto.randomUUID() })
    )
    return this.clubes
  }

  gerarPartidas(options: GerarPartidasOptions | undefined = undefined): IPartida[] {
    this.partidas = []

    if (!this.clubes.length) {
      this.gererarClubes()
    }

    // Gerar partidas de turno e returno
    for (let i = 0; i < this.clubes.length; i++) {
      for (let j = i + 1; j < this.clubes.length; j++) {
        const turno = new Partida({
          mandante: this.clubes[i],
          visitante: this.clubes[j],
          gols_mandante: Math.floor(Math.random() * 3),
          gols_visitante: Math.floor(Math.random() * 3)
        })
        const returno = new Partida({
          mandante: this.clubes[j],
          visitante: this.clubes[i],
          gols_mandante: Math.floor(Math.random() * 3),
          gols_visitante: Math.floor(Math.random() * 3)
        })

        // Turno
        this.partidas.push(turno)

        // Returno
        this.partidas.push(returno)
      }
    }

    if (options?.clube && !this.clubes.map(clube => clube.nome_popular).includes(options.clube)) {
      throw new Error('Clube não encontrado')
    }

    if (options?.results) {
      options.results.forEach(([mandante, visitante], index) => {
        if ((index + 1) % 2 === 0) {
          //casa
          this.partidas[index].gols_mandante = visitante
          this.partidas[index].gols_visitante = mandante
        } else {
          //fora
          this.partidas[index].gols_mandante = mandante
          this.partidas[index].gols_visitante = visitante
        }
      })
    }

    return this.partidas
  }
}
