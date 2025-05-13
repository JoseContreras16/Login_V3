import React, { useState, useEffect } from 'react';
import { IonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './AuthPage.css';

const translations = {
  es: {
    loginTitle: 'Iniciar Sesión_V3',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    login: 'Ingresar',
    toastLogin: '¡Inicio de sesión exitoso!',
    toastWrongPassword: 'Contraseña incorrecta',
    toastEmptyFields: 'Completa todos los campos',
    selectLang: 'Idioma',
    goToRegister: '¿No tienes cuenta? Regístrate'
  },
  en: {
    loginTitle: 'Login_v3',
    email: 'Email',
    password: 'Password',
    login: 'Login',
    toastLogin: 'Login successful!',
    toastWrongPassword: 'Wrong password',
    toastEmptyFields: 'Fill in all fields',
    selectLang: 'Language',
    goToRegister: "Don't have an account? Sign Up"
  }
};

const SignInPage: React.FC = () => {
  const history = useHistory();
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const t = translations[language];

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [savedEmail, setSavedEmail] = useState('');
  const [savedPassword, setSavedPassword] = useState('');

  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<'success' | 'danger'>('success');

  useEffect(() => {
    const storedEmail = localStorage.getItem('email') || '';
    const storedPassword = localStorage.getItem('password') || '';
    setSavedEmail(storedEmail);
    setSavedPassword(storedPassword);
  }, []);

  const handleLogin = () => {
    if (!loginEmail || !loginPassword) {
      setToastMessage(t.toastEmptyFields);
      setToastColor('danger');
      setShowToast(true);
      return;
    }

    if (
      loginEmail === savedEmail &&
      loginPassword === savedPassword
    ) {
      setToastMessage(t.toastLogin);
      setToastColor('success');
    } else {
      setToastMessage(t.toastWrongPassword);
      setToastColor('danger');
    }

    setShowToast(true);
  };

  const goToSignUp = () => {
    history.push('/signup');
  };

  return (
    <>
      <div className="section-container">
        <div style={{ position: 'absolute', top: 20, right: 20 }}>
          <label>{t.selectLang}: </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'es' | 'en')}
          >
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>

        <div className="form-box">
          <h2 className="title">{t.loginTitle}</h2>

          <label className="input-label">{t.email}</label>
          <div className="input-wrapper">
            <input
              type="email"
              className="neon-input"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>

          <label className="input-label">{t.password}</label>
          <div className="input-wrapper">
            <input
              type={showPasswordLogin ? 'text' : 'password'}
              className="neon-input"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPasswordLogin(!showPasswordLogin)}
            >
              {showPasswordLogin ? '🙈' : '👁️'}
            </span>
          </div>

          <button className="btn-neon" onClick={handleLogin}>
            {t.login}
          </button>

          <p
            style={{ marginTop: '1rem', cursor: 'pointer', color: '#0ff' }}
            onClick={goToSignUp}
          >
            {t.goToRegister}
          </p>
        </div>
      </div>

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={2000}
        color={toastColor}
        position="top"
      />
    </>
  );
};

export default SignInPage;