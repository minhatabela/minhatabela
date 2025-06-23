import type { UpdatePredictedMatchUseCase } from '../../application/usecases/UpdatePredictedMatchUseCase'
import type { PredictedMatch } from '../entities/PredictedMatch'
import type { IPredictedMatchObserver } from '../ports/IPreditedMatchObserver.interface'

export class UpdateRemotePredictedMatchObserver implements IPredictedMatchObserver {
  constructor(private readonly updatePredictedMatchUseCase: UpdatePredictedMatchUseCase) {}

  execute(match: PredictedMatch): void {
    this.updatePredictedMatchUseCase.execute(match)
    console.log('remote match update executed')
  }
}
