import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import disableDoubleTapZoom from '$helpers/disableDoubleTapZoom';
import CreateGameForm from './CreateGameForm';
import Game from './Game';

import './App.scss';

disableDoubleTapZoom();

const App = () => {
  const game = useSelector((state) => state.game, shallowEqual);

  return (
    <div className="app">
      {
        game
          ? <Game />
          : <CreateGameForm />
      }
    </div>
  );
};

App.defaultProps = {

};

App.propTypes = {

};

export default App;
