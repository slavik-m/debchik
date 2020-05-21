import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

registerRoute(
  ({ request }) => request.destination === 'script',
  new NetworkFirst(),
);
