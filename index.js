const twitter = require('./libs/twitter');

const deleteTweets = async () => {
  /* eslint-disable no-await-in-loop */
  while (true) { // eslint-disable-line no-constant-condition
    const tweetList = await twitter.getTweetList();

    if (tweetList.length === 0) {
      console.log('done.'); // eslint-disable-line no-console

      break;
    }

    const deleteTweetPromises = [];

    tweetList.forEach((tw) => {
      deleteTweetPromises.push((async () => {
        try {
          await twitter.deleteTweet(tw.id);

          console.log(`Tweet ${tw.id} was deleted`); // eslint-disable-line no-console
        } catch (error) {
          console.error(error); // eslint-disable-line no-console
        }
      })());
    });

    await Promise.all(deleteTweetPromises);
  }
  /* eslint-enable no-await-in-loop */
};

const unlikeTweets = async () => {
  /* eslint-disable no-await-in-loop */
  while (true) { // eslint-disable-line no-constant-condition
    const tweetList = await twitter.getLikedList();

    if (tweetList.length === 0) {
      console.log('done.'); // eslint-disable-line no-console

      break;
    }

    const unlikeTweetPromises = [];

    tweetList.forEach((tw) => {
      unlikeTweetPromises.push((async () => {
        try {
          await twitter.unlikeTweet(tw.id);

          console.log(`Tweet ${tw.id} was unliked`); // eslint-disable-line no-console
        } catch (error) {
          console.error(error); // eslint-disable-line no-console
        }
      })());
    });

    await Promise.all(unlikeTweetPromises);
  }
  /* eslint-enable no-await-in-loop */
};
