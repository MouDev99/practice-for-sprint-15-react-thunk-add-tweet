// constant to avoid debugging typos
const GET_ALL_TWEETS = 'tweet/getAllTweets';
const ADD_NEW_TWEET = 'tweet/addNewTweet';

//regular action creator
const loadTweets = (tweets) => {
  return {
    type: GET_ALL_TWEETS,
    tweets
  };
};

const addNewTweet = (tweet) => {
  return {
    type: ADD_NEW_TWEET,
    tweet
  };
};

// thunk action creator
export const getAllTweets = () => async (dispatch) => {
  const response = await fetch('/api/tweets');

  if (response.ok) {
    const data = await response.json();

    dispatch(loadTweets(data));
    return data;
  }
};

export const postNewTweet = (tweet) => async (dispatch) => {
  try {
    const res = await fetch('/api/tweets', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({tweet})
    });
    const { createdTweet } = await res.json();
    dispatch(addNewTweet(createdTweet));
    return;
  } catch(err) {
    console.error(err);
  }
};

// state object
const initialState = {};

// reducer
const tweetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TWEETS: {
      const newState = {};
      action.tweets.forEach((tweet) => (newState[tweet.id] = tweet));
      return newState;
    }
    case ADD_NEW_TWEET: {
      const tweet = action.tweet;
      return { ...state, [tweet.id]: tweet }
    }
    default:
      return state;
  }
};

export default tweetsReducer;
