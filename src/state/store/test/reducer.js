import * as actionTypes from './actionTypes';

const initialState = {};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.TEST:
      return state;
    default:
      return state;
  }
};
