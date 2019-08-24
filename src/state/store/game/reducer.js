import produce from 'immer';
import uuid from 'uuid/v4';
import * as actionTypes from './actionTypes';

const initialState = null;

function getRoundWinnerIndex(scores) {
  const maxScore = Math.max(...scores);

  return scores.indexOf(maxScore);
}

export default (state = initialState, action = {}) => produce(state, (draft) => {
  switch (action.type) {
    case actionTypes.CREATE_GAME:
      return {
        id: uuid(),
        players: action.players,
        gameScore: action.gameScore,
        selectedRound: null,
        edit: false,
        rounds: [],
      };
    case actionTypes.SET_EDIT:
      draft.edit = action.edit;
      return draft;
    case actionTypes.CHANGE_ROUND:
      if (!action.roundId) {
        // TODO: duplicate
        const roundScore = 162 + (action.round.bella ? 20 : 0) + action.round.twenty * 20 + action.round.fifty * 50;
        const flattenPlayers = draft.players.flat();
        const gamePlayerIndex = flattenPlayers.indexOf(action.round.gamePlayer);
        const byte = (gamePlayerIndex < 2 && action.round.scores[0] === 0)
          || (gamePlayerIndex > 1 && action.round.scores[1] === 0);

        const eggs = action.round.scores[0] === action.round.scores[1] && action.round.scores[1];
        const scores = action.round.scores;

        const previousRound = draft.rounds[draft.rounds.length - 1];

        if (eggs) {
          scores[[0, 0, 1, 1][gamePlayerIndex]] = 0;
        }

        if (previousRound && previousRound.eggs) {
          scores[getRoundWinnerIndex(scores)] += previousRound.eggs;
        }

        draft.rounds.push({
          id: uuid(),
          gamePlayer: action.round.gamePlayer,
          bella: action.round.bella,
          twenty: action.round.twenty,
          fifty: action.round.fifty,
          scores,
          roundScore,
          byte,
          eggs,
        });
      }

      draft.edit = false;

      return draft;
    default:
      return draft;
  }
});
