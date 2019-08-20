import * as actions from './actionTypes';

export const createGame = players => ({
  type: actions.CREATE_GAME,
  players,
});
