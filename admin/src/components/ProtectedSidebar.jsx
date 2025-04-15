import { useAuth } from '../context/AuthContext';

const ProtectedSidebar = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : null;
};

export default ProtectedSidebar;