import { Injectable } from '@angular/core';

export interface SAOptions<S> {
  initialSolution: S;
  costFn: (sol: S) => number;
  neighborFn: (sol: S) => S | null;
  initialTemp?: number;
  coolingRate?: number;
  minTemp?: number;
  iterationsPerTemp?: number;
}

export interface SAResult<S> {
  bestSolution: S;
  initialCost: number;
  bestCost: number;
  history: number[];
  iterations: number;
}

@Injectable({
  providedIn: 'root'
})
export class SaOptimizerService {

  optimize<S>(options: SAOptions<S>): SAResult<S> {
    const initialTemp = options.initialTemp ?? 40.0;
    const coolingRate = options.coolingRate ?? 0.92;
    const minTemp = options.minTemp ?? 0.5;
    const iterationsPerTemp = options.iterationsPerTemp ?? 25;

    let current: S = JSON.parse(JSON.stringify(options.initialSolution));
    let currentCost = options.costFn(current);

    let best: S = JSON.parse(JSON.stringify(current));
    let bestCost = currentCost;

    let temp = initialTemp;
    const history: number[] = [currentCost];
    let totalIterations = 0;

    while (temp > minTemp) {
      for (let i = 0; i < iterationsPerTemp; i++) {
        totalIterations++;
        const candidate = options.neighborFn(current);
        if (!candidate) continue;

        const candidateCost = options.costFn(candidate);
        const delta = candidateCost - currentCost;

        if (delta < 0) {
          // Downhill move -> always accept
          current = candidate;
          currentCost = candidateCost;
        } else {
          // Uphill move -> accept with Boltzmann probability
          const acceptanceProb = Math.exp(-delta / temp);
          if (Math.random() < acceptanceProb) {
            current = candidate;
            currentCost = candidateCost;
          }
        }

        if (currentCost < bestCost) {
          best = JSON.parse(JSON.stringify(current));
          bestCost = currentCost;
        }
      }

      history.push(bestCost);
      temp *= coolingRate;
    }

    return {
      bestSolution: best,
      initialCost: history[0],
      bestCost,
      history,
      iterations: totalIterations
    };
  }
}
