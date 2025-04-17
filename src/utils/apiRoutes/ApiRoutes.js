const API_BASE = "http://192.168.1.234:7175/api/v1";
const API_IP = "http://192.168.1.234:7175";

export const API_ROUTES = {
    BASE_URL: API_BASE,
    API_IP: API_IP,
    AUTH: {
        LOGIN: `${API_BASE}/auth/authenticate`,
        REGISTER: `${API_BASE}/auth/register`
    },
    USERS: {
        GET_ALL: `${API_BASE}/users`,
        GET_ONE: (id) => `${API_BASE}/users/${id}`,
        CREATE: `${API_BASE}/users`,
        UPDATE: (id) => `${API_BASE}/users/${id}`,
        DELETE: (id) => `${API_BASE}/users/${id}`,
    },
    PRODUCTS: {
        GET_ALL: `${API_BASE}/products`,
        GET_ONE: id => `${API_BASE}/products/${id}`,
    },
};
