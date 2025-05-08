import React, { useState } from 'react';
import './AuthPage.css';
import { IonToast } from '@ionic/react';

const translations = {
  es: {
    loginTitle: 'Iniciar Sesión',
    registerTitle: 'Registrarse',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    confirmPassword: 'Confirmar Contraseña',
    login: 'Ingresar',
    register: 'Registrarse',
    toastLogin: '¡Inicio de sesión exitoso!',
    toastRegister: '¡Registro exitoso!',
    toastWrongPassword: 'Contraseña incorrecta',
    selectLang: 'Idioma'
  },
  en: {
    loginTitle: 'Login',
    registerTitle: 'Register',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    login: 'Login',
    register: 'Register',
    toastLogin: 'Login successful!',
    toastRegister: 'Registration successful!',
    toastWrongPassword: 'Wrong password',
    selectLang: 'Language'
  }
};

const AuthPage: React.FC = () => {
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const t = translations[language];

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  const [savedEmail, setSavedEmail] = useState('');
  const [savedPassword, setSavedPassword] = useState('');

  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [showPasswordRegister, setShowPasswordRegister] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleLogin = () => {
    if (
      loginEmail === savedEmail &&
      loginPassword === savedPassword
    ) {
      setToastMessage(t.toastLogin);
    } else {
      setToastMessage(t.toastWrongPassword);
    }
    setShowToast(true);
  };

  const handleRegister = () => {
    if (registerPassword !== registerConfirmPassword) {
      setToastMessage(language === 'es' ? 'Las contraseñas no coinciden' : 'Passwords do not match');
    } else {
      setSavedEmail(registerEmail);
      setSavedPassword(registerPassword);
      setToastMessage(t.toastRegister);
    }
    setShowToast(true);
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

        {/* Login */}
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
        </div>

        {/* Registro */}
        <div className="form-box">
          <h2 className="title">{t.registerTitle}</h2>

          <label className="input-label">{t.email}</label>
          <div className="input-wrapper">
            <input
              type="email"
              className="neon-input"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
          </div>

          <label className="input-label">{t.password}</label>
          <div className="input-wrapper">
            <input
              type={showPasswordRegister ? 'text' : 'password'}
              className="neon-input"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPasswordRegister(!showPasswordRegister)}
            >
              {showPasswordRegister ? '🙈' : '👁️'}
            </span>
          </div>

          <label className="input-label">{t.confirmPassword}</label>
          <div className="input-wrapper">
            <input
              type="password"
              className="neon-input"
              value={registerConfirmPassword}
              onChange={(e) => setRegisterConfirmPassword(e.target.value)}
            />
          </div>

          <button className="btn-neon" onClick={handleRegister}>
            {t.register}
          </button>
        </div>
      </div>

      {/* Toast fuera del contenedor */}
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={2000}
        color="success"
        position="top"
      />
    </>
  );
};

export default AuthPage;
