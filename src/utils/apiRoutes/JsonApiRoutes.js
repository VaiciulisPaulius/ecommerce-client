const API_BASE = "http://localhost:3001";

export const JSON_API_ROUTES = {
    BASE_URL: API_BASE,
    AUTH: {
        LOGIN: `${API_BASE}/auth/login`,
        REGISTER: `${API_BASE}/auth/register`,
        LOGOUT: `${API_BASE}/auth/logout`,
    },
    USERS: {
        GET_ALL: `${API_BASE}/users`,
        GET_ONE: (id) => `${API_BASE}/users/${id}`,
        CREATE: `${API_BASE}/users`,
        UPDATE: (id) => `${API_BASE}/users/${id}`,
        DELETE: (id) => `${API_BASE}/users/${id}`,
    },
    POSTS: {
        GET_ALL: `${API_BASE}/posts`,
        GET_ONE: (id) => `${API_BASE}/posts/${id}`,
    },
};
