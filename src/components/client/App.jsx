import React, { useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import disableDoubleTapZoom from '$helpers/disableDoubleTapZoom';
import CreateGameForm from './CreateGameForm';
import Game from './Game';

import './App.scss';

disableDoubleTapZoom();

let deferredPrompt;

const App = () => {
  const game = useSelector((state) => state.game, shallowEqual);
  const [isInstallDialog, showInstallDialog] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (ev) => {
      // Prevent the mini-infobar from appearing on mobile
      ev.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = ev;
      // Update UI notify the user they can install the PWA
      showInstallDialog(true);
    });

    window.addEventListener('appinstalled', (ev) => {
      console.log('INSTALLED', ev);
    });
  }, []);

  function installApp() {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    });

    showInstallDialog(false);

    deferredPrompt = null;
  }

  return (
    <>
      {
        isInstallDialog
          ? (
            <div className="install-dialog">
              <div>Install App!</div>
              <div className="install-dialog__buttons">
                <button className="install-button" onClick={installApp}>Install</button>
                <button onClick={() => showInstallDialog(false)}>Close</button>
              </div>
            </div>
          )
          : null
      }
      <div className="app">
        {
          game
            ? <Game />
            : <CreateGameForm />
        }
      </div>
    </>
  );
};

App.defaultProps = {

};

App.propTypes = {

};

export default App;
