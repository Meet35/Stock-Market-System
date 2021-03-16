import axios from 'axios';

const API = axios.create({ baseURL: 'https://stock-market-system.herokuapp.com' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const getWatchlist = () => API.get(`/watchlist`);
export const updateWatchlist = (symbol) => API.post(`/watchlist/update`, symbol);

export const getPrice = (symbol) => API.get(`price/${symbol}`);
export const getLiveprice = (symbol) => API.get(`liveprice/${symbol}`);
export const getFundamental = (symbol) => API.get(`fundamental/${symbol}`);

export const getStocksymbol = (symbol) => API.get(`stock/${symbol}`);