const Twitter = require('twitter');
const config = require('config');

const twitter = new Twitter({
  consumer_key: config.twitter.consumerKey,
  consumer_secret: config.twitter.consumerSecret,
  access_token_key: config.twitter.accessTokenKey,
  access_token_secret: config.twitter.accessTokenSecret,
});

module.exports.getTweetList = () => new Promise((resolve, reject) => {
  twitter.get(
    'statuses/user_timeline',
    { user_id: config.userId },
    (err, tweetList) => {
      if (err) {
        reject(err);
      }

      const mappedList = tweetList.map(tw => ({
        id: tw.id_str,
        text: tw.text,
        createdAt: tw.created_at,
      }));

      resolve(mappedList);
    },
  );
});

module.exports.deleteTweet = id => new Promise((resolve, reject) => {
  twitter.post(
    `statuses/destroy/${id}`,
    (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    },
  );
});

module.exports.getLikedList = () => new Promise((resolve, reject) => {
  twitter.get(
    'favorites/list',
    (err, tweetList) => {
      if (err) {
        reject(err);
      }

      const mappedList = tweetList.map(tw => ({
        id: tw.id_str,
        text: tw.text,
        createdAt: tw.created_at,
      }));

      resolve(mappedList);
    },
  );
});

module.exports.unlikeTweet = id => new Promise((resolve, reject) => {
  twitter.post(
    'favorites/destroy',
    { id },
    (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    },
  );
});
