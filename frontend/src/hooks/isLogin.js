import axios from "axios";
const useIsLogin = () => {
  const checkAuth = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/check-auth`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  checkAuth();
};

export default useIsLogin;
