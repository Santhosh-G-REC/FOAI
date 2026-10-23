import { Injectable } from '@angular/core';

export interface CSPOptions<V, T> {
  variables: V[];
  domains: { [key: string]: T[] };
  isConsistent: (varName: V, value: T, assignment: { [key: string]: T }) => boolean;
  onAssign?: (varName: V, value: T) => void;
  onUnassign?: (varName: V, value: T) => void;
}

export interface CSPResult<T> {
  assignment: { [key: string]: T } | null;
  nodesExpanded: number;
  backtracks: number;
  solveTimeMs: number;
}

@Injectable({
  providedIn: 'root'
})
export class CspSolverService {

  solve<V extends string, T>(options: CSPOptions<V, T>): CSPResult<T> {
    const startTime = performance.now();
    let nodesExpanded = 0;
    let backtracks = 0;

    const assignment: { [key: string]: T } = {};
    const workingDomains: { [key: string]: T[] } = {};
    for (const v of options.variables) {
      workingDomains[v] = [...options.domains[v]];
    }

    const selectUnassignedVariable = (
      currentAssignment: { [key: string]: T },
      domains: { [key: string]: T[] }
    ): V => {
      // MRV heuristic: pick unassigned variable with smallest remaining domain
      const unassigned = options.variables.filter(v => !(v in currentAssignment));
      return unassigned.reduce((minVar, curVar) => {
        return domains[curVar].length < domains[minVar].length ? curVar : minVar;
      }, unassigned[0]);
    };

    const forwardCheck = (
      assignedVar: V,
      assignedVal: T,
      currentAssignment: { [key: string]: T },
      domains: { [key: string]: T[] }
    ): { [key: string]: T[] } | null => {
      const pruned: { [key: string]: T[] } = {};
      for (const v of options.variables) {
        pruned[v] = [...domains[v]];
      }

      for (const other of options.variables) {
        if (other in currentAssignment) continue;
        const legalVals = pruned[other].filter(val =>
          options.isConsistent(other, val, currentAssignment)
        );
        pruned[other] = legalVals;
        if (legalVals.length === 0) {
          return null; // Dead end -> trigger backtrack
        }
      }
      return pruned;
    };

    const backtrack = (
      currentAssignment: { [key: string]: T },
      domains: { [key: string]: T[] }
    ): { [key: string]: T } | null => {
      if (Object.keys(currentAssignment).length === options.variables.length) {
        return { ...currentAssignment };
      }

      const selectedVar = selectUnassignedVariable(currentAssignment, domains);

      for (const value of domains[selectedVar]) {
        nodesExpanded++;

        if (options.isConsistent(selectedVar, value, currentAssignment)) {
          currentAssignment[selectedVar] = value;
          if (options.onAssign) options.onAssign(selectedVar, value);

          const prunedDomains = forwardCheck(selectedVar, value, currentAssignment, domains);

          if (prunedDomains !== null) {
            const result = backtrack(currentAssignment, prunedDomains);
            if (result !== null) return result;
          }

          // Undo assignment
          delete currentAssignment[selectedVar];
          if (options.onUnassign) options.onUnassign(selectedVar, value);
          backtracks++;
        }
      }

      return null;
    };

    const resultAssignment = backtrack(assignment, workingDomains);
    const solveTimeMs = Math.round(performance.now() - startTime);

    return {
      assignment: resultAssignment,
      nodesExpanded,
      backtracks,
      solveTimeMs
    };
  }
}
