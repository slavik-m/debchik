export default function disableDoubleTapZoom(nodeId = 'dz') {
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    const hiddenElement = document.createElement('div');
    const style = document.createElement('style');
    hiddenElement.setAttribute('id', nodeId);
    hiddenElement.setAttribute('style', 'position: absolute;top: 0;left: 0;height: 0;width: 0;overflow: hidden;');
    style.innerHTML = '* { touch-action: manipulation; }';

    document.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(hiddenElement);
      document.body.appendChild(style);
    });

    document.addEventListener('touchstart', () => {
      document.getElementById(nodeId).innerText = 'd';
    });

    document.addEventListener('touchmove', (e) => {
      if (e.scale !== 0) {
        e.preventDefault();
      }
    }, { passive: false });
  }
}
