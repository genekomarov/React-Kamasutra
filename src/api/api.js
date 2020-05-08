import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "ceb52ebb-a06f-4a17-ad05-58be43d51565"
    }
});

export const usersAPI = {
    getUsers: (currentPage = 1, pageSize = 5) =>
        instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data),

    follow: (userId) =>
        instance.post(`follow/${userId}`)
            .then(response => response.data),

    unfollow: (userId) =>
        instance.delete(`follow/${userId}`)
            .then(response => response.data),

    getUserProfile: (userId) => {
        console.warn('Obsolete method. Please use profileAPI.getProfile');
        return profileAPI.getProfile(userId);
        /*instance.get(`profile/` + userId)
            .then(response => response.data)*/
    }

};

export const profileAPI = {
    getProfile: (userId) =>
        instance.get(`profile/` + userId)
            .then(response => response.data),

    getStatus: (userId) =>
        instance.get(`profile/status/` + userId)
            .then(response => response.data),

    updateStatus: (status) =>
        instance.put(`profile/status/`, {status})
            .then(response => response.data),
};

export const authAPI = {

    authCheck: () => instance.get(`auth/me/`)
        .then(response => response.data),

    login: (email, password, rememberMe = false/*, captcha*/) => instance.post('auth/login/', {email, password, rememberMe/*, captcha*/})
        .then(response => response.data ),

    logout: () => instance.delete('auth/login/')
        .then(response => response.data ),
};