import * as actions from './actionTypes';

export const createGame = (gameScore, players) => ({
  type: actions.CREATE_GAME,
  gameScore,
  players,
});

export const setEdit = edit => ({
  type: actions.SET_EDIT,
  edit,
});
