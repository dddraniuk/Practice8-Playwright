
import { useState } from 'react';
import '../App.css';

interface LoginFormProps {
  onLogin: (email: string) => void;
}

function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');
    setEmailError('');
    setPasswordError('');

    let hasError = false;

    if (!email.trim()) {
      setEmailError('Введіть електронну пошту');
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Введіть коректну електронну пошту');
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError('Введіть пароль');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        await response.json();
        onLogin(email);
      } else {
        setError('Невірний email або пароль');
      }
    } catch {
      setError('Не вдалося виконати запит до сервера');
    }
  };

  return (
    <div className="container">
      <h1>Авторизація</h1>

      <form onSubmit={handleLogin} noValidate>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError('');
          }}
        />
        {emailError && <p className="error">{emailError}</p>}

        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError('');
          }}
        />
        {passwordError && <p className="error">{passwordError}</p>}

        <button type="submit">Увійти</button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default LoginForm;
