import { saveLikeToggle, saveTweet } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import authedUser from '../reducers/authedUser'
export const RECIEVE_TWEETS = 'RECIEVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'
export const ADD_TWEET = 'ADD_TWEET'
// Action Creator
export function recieveTweets(tweets) {
    return {
        type: RECIEVE_TWEETS,
        tweets
    }
}

function toggleTweet({ id, authedUser, hasLiked }) {
    return {
        type: TOGGLE_TWEET,
        id,
        authedUser,
        hasLiked
    }
}

function addTweet(tweet) {
    return {
        type: ADD_TWEET,
        tweet
    }
}

export function handleToggleTweet(tweetInfo) {
    return (dispatch) => {
        dispatch(toggleTweet(tweetInfo))
        return saveLikeToggle(tweetInfo)
            .catch((e) => {
                console.warn('Error occured while handling tweet toggle', e)
                dispatch(toggleTweet(tweetInfo))
                alert('There was an error adding a like to the tweet. Try again')
            })
    }

}

export function handleAddTweet(text, replyingTo) {
    return async (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())
        try {
            const tweet = await saveTweet({
                text,
                author: authedUser,
                replyingTo
            })
            dispatch(addTweet(tweet))
            dispatch(hideLoading())
        }
        catch (e) {
            alert('an error occured')
        }
    }
}