import Pusher from 'pusher-js';

export function pusherInstance() {
  return new Pusher("c5f59b24bc12f9993c86", {
    cluster: 'eu'
  });
};