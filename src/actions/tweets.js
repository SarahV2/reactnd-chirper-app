export const RECIEVE_TWEETS = 'RECIEVE_TWEETS';

// Action Creator
export function recieveTweets(tweets) {
    return {
        type: RECIEVE_TWEETS,
        tweets
    }
}