
import LoginForm from '../components/LoginForm';

interface LoginPageProps {
  onLogin: (email: string) => void;
}

function LoginPage({ onLogin }: LoginPageProps) {
  return <LoginForm onLogin={onLogin} />;
}

export default LoginPage;
