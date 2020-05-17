import * as actions from './actionTypes';

export const createGame = (gameScore, players) => ({
  type: actions.CREATE_GAME,
  gameScore,
  players,
});

export const newGame = () => ({
  type: actions.NEW_GAME,
});

export const setEdit = (edit) => ({
  type: actions.SET_EDIT,
  edit,
});

export const selectRound = (roundId) => ({
  type: actions.SELECT_ROUND,
  roundId,
});

export const changeRound = (round, roundId = null) => ({
  type: actions.CHANGE_ROUND,
  round,
  roundId,
});
