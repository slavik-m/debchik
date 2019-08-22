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
  const end = useSelector(state => state.game.end, shallowEqual);
  // TODO: bug
  const flattenPlayers = players.flat();
  const rounds = useSelector(state => state.game.rounds);
  const selectedRound = useSelector(state => state.game.selectedRound);

  const dealer = flattenPlayers[[0, 2, 1, 3][rounds.length % flattenPlayers.length]];

  function getTotalRoundScore(i, si) {
    return rounds.slice(0, i + 1).reduce((acc, cur) => acc + cur.scores[si], 0);
  }

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
        {
          rounds.map((round, i) => (
            <tr
              key={i}
              className={classNames(
                'game-table__row',
                { 'game-table__row--active': selectedRound === round.id },
              )}
            >
              <td className="game-table__cell">
                {flattenPlayers[[0, 2, 1, 3][i % flattenPlayers.length]]}
              </td>
              {
                round.scores.map((score, si) => {
                  // TODO: eggs
                  let scoreString = '';

                  if (round.byte && score === 0) {
                    scoreString = 'B';
                  }

                  if (!round.byte && score === 0) {
                    scoreString = '-';
                  }

                  if (score > 0) {
                    scoreString = getTotalRoundScore(i, si);
                  }

                  return (
                    <td key={si} className="game-table__cell">{scoreString}</td>
                  );
                })
              }
              <td>
                {
                  selectedRound === round.id
                    ? (
                      <Button className="button--edit" onClick={() => dispatch(setEdit(true))}>
                        <EditIcon />
                      </Button>
                    )
                    : null
                }
              </td>
            </tr>
          ))
        }
        { !end ? (
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
        ) : null }
      </tbody>
    </table>
  );
};

GameTable.defaultProps = {

};

GameTable.propTypes = {

};

export default GameTable;