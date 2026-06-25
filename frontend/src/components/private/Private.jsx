import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useColecao } from '../../context/ColecaoContext';
import { useItem } from '../../context/ItemContext';
import { useComentario } from '../../context/ComentarioContext';
import Loading from '../loading/Loading';

const Private = ({ children }) => {
  const { user, loadingAuth } = useAuth();

  if (loadingAuth) {
    return (
      <div className="w-screen flex justify-center">
        <Loading />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Private;
