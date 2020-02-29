import * as functions from 'firebase-functions';

export const hello = functions.https.onRequest((_, res) => {
  res.send('hello').end();
});
