import produce from 'immer';
import uuid from 'uuid/v4';
import * as actionTypes from './actionTypes';

const initialState = null;

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
        const gamePlayerIndex = flattenPlayers.indexOf(action.round.gamePlayer) > 1;
        const byte = (gamePlayerIndex < 2 && action.round.scores[0] === 0)
          || (gamePlayerIndex > 1 && action.round.scores[1] === 0);

        draft.rounds.push({
          id: uuid(),
          gamePlayer: action.round.gamePlayer,
          bella: action.round.bella,
          twenty: action.round.twenty,
          fifty: action.round.fifty,
          scores: action.round.scores,
          roundScore,
          byte,
        });
      }

      draft.edit = false;
      return draft;
    default:
      return draft;
  }
});
