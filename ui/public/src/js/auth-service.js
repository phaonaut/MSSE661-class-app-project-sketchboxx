const AUTH_API = `${BASE_API_URL}/auth`;
const USER_API = `${BASE_API_URL}/users`;

const register = async (formData) => await _post(`${AUTH_API}/register`, formData);

const login = async (formData) => {
   const loginData = await _post(`${AUTH_API}/login`, formData);
   setStorage('isAuth', true);
   setStorage('access_token', loginData.access_token);
   setStorage('refresh_token', loginData.refresh_token);
   return loginData
}
const logout = () => {
    _post(`${AUTH_API}/logout`, { token: getStorage('access_token')});
    clearStorage('isAuth');
    clearStorage('access_token');
    clearStorage('refresh_token');
}
const loadAccount = () => _post(`${USER_API}/me`);