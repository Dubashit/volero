import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RedirectWithReload({ to }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to, { replace: true });
    window.location.reload();
  }, [navigate, to]);

  return null;
}

export default RedirectWithReload;
