import React from 'react';
import classNames from 'classnames';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { setEdit } from '$store/game/actions';
import Button from '$components/lib/Button';
import EditIcon from '$components/lib/svg/EditIcon';

import './GameTable.scss';

const GameTable = () => {
  const dispatch = useDispatch();
  const players = useSelector(state => state.game.players, shallowEqual);
  const flattenPlayers = players.flat();
  const rounds = useSelector(state => state.game.rounds);
  const selectedRound = useSelector(state => state.game.selectedRound);

  const dealer = flattenPlayers[rounds.length % flattenPlayers.length];

  return (
    <table className="game-table">
      <thead>
        <tr>
          <td className="game-table__cell">
              D
          </td>
          {
            players.map((player, i) => (
              <td key={i} className="game-table__cell">
                { Array.isArray(player) ? `${player[0][0]} + ${player[1][0]}` : player[0]}
              </td>
            ))
          }
          <td />
        </tr>
      </thead>
      <tbody>
        <tr className={classNames(
          'game-table__row',
          { 'game-table__row--active': !selectedRound },
        )}
        >
          <td className="game-table__cell">
            {dealer}
          </td>
          {
            players.map((_, i) => (
              <td key={i} className="game-table__cell" />
            ))
          }
          <td>
            {
              !selectedRound
                ? (
                  <Button className="button--edit" onClick={() => dispatch(setEdit(true))}>
                    <EditIcon />
                  </Button>
                )
                : null
            }
          </td>
        </tr>
      </tbody>
    </table>
  );
};

GameTable.defaultProps = {

};

GameTable.propTypes = {

};

export default GameTable;
