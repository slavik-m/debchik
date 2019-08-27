import { createSelector } from 'reselect';

export function getSelectedRoundId(state) {
  return state.game.selectedRound;
}

export function getRounds(state) {
  return state.game.rounds;
}

export const getSelectedRound = createSelector(
  getSelectedRoundId,
  getRounds,
  (selectedRoundId, rounds) => {
    if (selectedRoundId) {
      for (let i = 0; i < rounds.length; i++) {
        if (rounds[i].id === selectedRoundId) {
          return rounds[i];
        }
      }
    }

    return null;
  },
);

export const getSelectedRoundIndex = createSelector(
  getSelectedRoundId,
  getRounds,
  (selectedRoundId, rounds) => {
    if (selectedRoundId) {
      for (let i = 0; i < rounds.length; i++) {
        if (rounds[i].id === selectedRoundId) {
          return i;
        }
      }
    }

    return -1;
  },
);
