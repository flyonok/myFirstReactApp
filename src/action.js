/* jshint undef:true, unused:true , esversion:6
*/
import fetch from 'isomorphic-fetch';

/*
* Action type
*/

export const ADD_TODO = 'ADD_TODO';
export const COMPLETED_TODO = 'COMPLETED_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
// Asyc action
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

/*
* Other const variables
*/

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE',
};

/*
* Action creator functions
*/

export function addTodo (text) {
    return { type: ADD_TODO, text};
}

export function completedTodo (index) {
    return { type: COMPLETED_TODO, index };
}

export function setVisibilityFilter (filter) {
    return { type: SET_VISIBILITY_FILTER, filter};
}

// Async action
export function selectSubreddit (subreddit) {
    return {type: SELECT_SUBREDDIT, subreddit};
}

export function invalidateSubreddit (subreddit) {
    return {type: INVALIDATE_SUBREDDIT, subreddit};
}

export function requestPosts (subreddit /* , json */) {
    return {type: REQUEST_POSTS,
        subreddit,

        /*
        posts: json.data.children.map((child) => child.data),
        receiveAt: Date.now(),
        */
    };
}

/* export*/ function receivePosts (subreddit, json) {
    return {type: RECEIVE_POSTS,
        subreddit,
        posts: json.data.children.map((child) => child.data),
        receiveAt: Date.now(),
    };
}

// 来看一下我们写的第一个 thunk action creator！
// 虽然内部操作不同，你可以像其它 action creator 一样使用它：
// store.dispatch(fetchPosts('reactjs'))
/* export*/ function fetchPosts (subreddit) {
    // Thunk middleware 知道如何处理函数。
    // 这里把 dispatch 方法通过参数的形式传给函数，
    // 以此来让它自己也能 dispatch action。
    return function (dispatch) {
        // 首次 dispatch：更新应用的 state 来通知
        // API 请求发起了。
        dispatch(requestPosts(subreddit));
        // thunk middleware 调用的函数可以有返回值，
        // 它会被当作 dispatch 方法的返回值传递。

        // 这个案例中，我们返回一个等待处理的 promise。
        // 这并不是 redux middleware 所必须的，但这对于我们而言很方便。
        return fetch(`http://www.subreddit.com/r/${subreddit}.json`)
            .then((response) => response.json())
            .then((json) => {
            // 可以多次 dispatch！
            // 这里，使用 API 请求结果来更新应用的 state。
                // console.log(json);
                dispatch(receivePosts(subreddit, json));
            }
            );
        // 在实际应用中，还需要
        // 捕获网络请求的异常。
    };
}

function shouldFetchPosts (state, subreddit) {
    const posts = state.postsBySubreddit && state.postsBySubreddit[subreddit];
    if (!posts) {
        return true;
    } else if (posts.isFetching) {
        return false;
    } else {
        return posts.didInvalidate;
    }
}

export function fetchPostsIfNeeded (subreddit) {

    // 注意这个函数也接收了 getState() 方法
    // 它让你选择接下来 dispatch 什么。

    // 当缓存的值是可用时，
    // 减少网络请求很有用。

    return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), subreddit)) {
        // 在 thunk 里 dispatch 另一个 thunk！
            return dispatch(fetchPosts(subreddit));
        } else {
        // 告诉调用代码不需要再等待。
            return Promise.resolve();
        }
    };
}

