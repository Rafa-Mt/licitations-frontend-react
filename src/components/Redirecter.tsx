import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';

interface RedirecterProps {
  to: string;
  shouldRedirect: boolean;
}

const Redirecter: React.FC<RedirecterProps> = ({ to, shouldRedirect }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (shouldRedirect) {
      navigate({ to });
    }
  }, [shouldRedirect, navigate, to]);

  return null;
};

export default Redirecter;