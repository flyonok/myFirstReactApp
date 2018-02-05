import { SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT, REQUEST_POSTS, RECEIVE_POSTS } from './action';
import {combineReducers} from 'redux';

function selectedsubreddit (state = 'reactjs', action) {
    switch (action.type) {
        case SELECT_SUBREDDIT:
            return action.subreddit;
        default:
            return state;
    }
}

function posts (state = {
    isFetching: false,
    didInvalidate: false,
    items: [],
}, action) {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
            return Object.assign({}, state, {
                didInvalidate: true,
            });
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receiveAt,
            });
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            });
        default:
            return state;
    }

}

function postBySubreddit (state = {}, action) {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
        case REQUEST_POSTS:
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                [action.subreddit]: posts(state[action.subreddit], action),
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    postBySubreddit,
    selectedsubreddit,
});

export default rootReducer;
