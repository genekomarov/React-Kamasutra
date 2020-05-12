import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helper";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET-USERS';
const SET_CURRENT_PAGE = 'users/SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET-TOTAL-USERS-COUNT';
const TOGGLE_FETCHING = 'users/TOGGLE-FETCHING';
const TOGGLE_FOLLOWING = 'users/TOGGLE_FOLLOWING';

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    isFollowing: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            };
        case SET_USERS:
            return { ...state, users: action.users };
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage};
        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalUsersCount: action.totalUsersCount};
        case TOGGLE_FETCHING:
            return { ...state, isFetching: action.isFetching};
        case TOGGLE_FOLLOWING:
            return{
                ...state,
                isFollowing: action.isFollowing
                    ? [...state.isFollowing , action.userId]
                    : state.isFollowing.filter( (item) => item !== action.userId )
            };
        default: return state;
    }
};

export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});
export const toggleFetching = (isFetching) => ({type: TOGGLE_FETCHING, isFetching});
export const toggleFollowing = (isFollowing, userId) => ({type: TOGGLE_FOLLOWING, isFollowing, userId});

export const requestUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(toggleFetching(true));

    let data = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
    dispatch(toggleFetching(false));
};

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowing(true, userId));

    let data = await apiMethod(userId);

    if (data.resultCode === 0) dispatch(actionCreator(userId));
    dispatch(toggleFollowing(false, userId));
};

export const follow = (userId) => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
};

export const unfollow = (userId) => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
};

export default usersReducer;