import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
// import {CacheOnly} from 'workbox-strategies';
// CacheOnly

registerRoute(
  ({ request }) => request.destination === 'script',
  new NetworkFirst(),
);

registerRoute(
  ({ request }) => request.destination === 'style',
  new NetworkFirst(),
);
