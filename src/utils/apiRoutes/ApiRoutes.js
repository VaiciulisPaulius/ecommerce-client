const API_BASE = "https://192.168.1.234:8443/api/v1";
const API_IP = "https://192.168.1.234:8443";

export const API_ROUTES = {
    BASE_URL: API_BASE,
    API_IP: API_IP,
    AUTH: {
        LOGIN: `${API_BASE}/auth/authenticate`,
        REGISTER: `${API_BASE}/auth/register`,
        CHECK: `${API_BASE}/auth/check-token`,
    },
    USERS: {
        BASE: `${API_BASE}/auth/users`,
        GET_ALL: `${API_BASE}/auth/users`,
        GET_ONE: (id) => `${API_BASE}/users/${id}`,
        CREATE: `${API_BASE}/auth/users`,
        UPDATE: (id) => `${API_BASE}/users/${id}`,
        DELETE: (id) => `${API_BASE}/users/${id}`,
    },
    CART: {
        BASE: `${API_BASE}/cart-items`,
        PRODUCTS: `${API_BASE}/cart-items/products`
    },
    PRODUCTS: {
        BASE: `${API_BASE}/products`,
        GET_ALL: `${API_BASE}/products`,
        GET_ONE: id => `${API_BASE}/products/${id}`,
    },
    ORDERS: {
        BASE: `${API_BASE}/orders`,
        FROM_CART: `${API_BASE}/orders/from-cart`
    }
};
