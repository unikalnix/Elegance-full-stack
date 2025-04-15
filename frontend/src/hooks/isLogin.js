import Cookies from 'js-cookie'

const useIsLogin = () =>{
    const token = Cookies.get("user_auth_token");
    if(token) return true
    else return false;
}

export default useIsLogin;