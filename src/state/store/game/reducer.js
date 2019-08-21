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
        rounds: [],
      };
    case actionTypes.ADD_ROUND_SCORE:
      draft.rounds.push({
        id: uuid(),
        scores: action.scores,
      });
      return draft;
    default:
      return draft;
  }
});
