import type { IClube } from "~/types/clube";
import type { IPartida } from "~/types/partida";
import { Clube } from "./Clube";
import { Partida } from "./Partida";

interface CampeonatoGeneratorOptions {
  clube: string
  results: number[][]
}

const nomeClubes = [
  'Corinthians',
  'Mirassol',
  'Santos',
  'São Paulo',
  'Palmeiras',
  'Red Bull Bragantino',
  'Atlético Mineiro',
  'Cruzeiro',
  'Bahia',
  'Ceará',
  'Sport',
  'Fortaleza',
  'Vitória',
  'Botafogo',
  'Flamengo',
  'Fluminense',
  'Vasco',
  'Grêmio',
  'Internacional',
  'Juventude'
];

export class CampeonatoGenerator {
  clubes: IClube[] = [];
  partidas: IPartida[] = [];

  gererarClubes(): IClube[] {
    this.clubes = nomeClubes.map((nome) => new Clube({ nome_popular: nome, id: crypto.randomUUID() }))
    return this.clubes
  }

  gerarPartidas(options: CampeonatoGeneratorOptions | undefined = undefined): IPartida[] {
    this.partidas = []

    if (!this.clubes.length) {
      this.gererarClubes()
    }

    // Gerar partidas de turno e returno
    for (let i = 0; i < this.clubes.length; i++) {
      for (let j = i + 1; j < this.clubes.length; j++) {

        const turno = new Partida({ mandante: this.clubes[i], visitante: this.clubes[j], gols_mandante: Math.floor(Math.random() * 3), gols_visitante: Math.floor(Math.random() * 3) })
        const returno = new Partida({ mandante: this.clubes[j], visitante: this.clubes[i], gols_mandante: Math.floor(Math.random() * 3), gols_visitante: Math.floor(Math.random() * 3) })

        // Turno
        this.partidas.push(turno);

        // Returno
        this.partidas.push(returno);
      }
    }

    if (options && !nomeClubes.includes(options.clube)) {
      throw new Error('Clube não encontrado')
    }

    if (options && options.results.length !== (this.partidas.length / 10)) {
      throw new Error('Quantidade de resultados inválida')
    }

    if (options) {
      this.partidas.forEach((partida, index) => {
        if (partida.mandante.nome_popular === options.clube) {
          partida.gols_mandante = options.results[index][0]
          partida.gols_visitante = options.results[index][1]
        }

        if (partida.visitante.nome_popular === options.clube) {
          partida.gols_mandante = options.results[index][1]
          partida.gols_visitante = options.results[index][0]
        }
      })
    }

    return this.partidas;
  }
}