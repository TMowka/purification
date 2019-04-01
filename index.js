const Twitter = require('twitter');
const keys = require('./config/keys');

const userId = 'TimMowka';

const twitter = new Twitter({
  consumer_key: keys.twitter.consumerKey,
  consumer_secret: keys.twitter.consumerSecret,
  access_token_key: keys.twitter.accessTokenKey,
  access_token_secret: keys.twitter.accessTokenSecret,
});

twitter.get('statuses/user_timeline', {
  user_id: userId,
}, (error, tweets, response) => {
  if (error) {
    console.error(error);
  }

  console.log(tweets);
});
