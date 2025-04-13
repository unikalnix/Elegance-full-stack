import Cookies from 'js-cookie'

const useIsLogin = () =>{
    const token = Cookies.get("token");
    if(token) return true
    else return false;
}

export default useIsLogin;