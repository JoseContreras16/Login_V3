import React, { useState, useEffect } from 'react';
import { IonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const translations = {
  es: {
    registerTitle: 'Registrarse',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    confirmPassword: 'Confirmar Contraseña',
    register: 'Crear Cuenta',
    toastRegisterSuccess: '¡Registro exitoso!',
    toastPasswordsNotMatch: 'Las contraseñas no coinciden',
    toastEmptyFields: 'Completa todos los campos',
    selectLang: 'Idioma',
    goToLogin: '¿Ya tienes cuenta? Inicia sesión'
  },
  en: {
    registerTitle: 'Sign Up',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    register: 'Register',
    toastRegisterSuccess: 'Registration successful!',
    toastPasswordsNotMatch: 'Passwords do not match',
    toastEmptyFields: 'Fill in all fields',
    selectLang: 'Language',
    goToLogin: 'Already have an account? Login'
  }
};

const SignUpPage: React.FC = () => {
  const history = useHistory();
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const t = translations[language];

  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<'success' | 'danger'>('success');

  useEffect(() => {
    const storedLang = localStorage.getItem('lang') as 'es' | 'en';
    if (storedLang) setLanguage(storedLang);
  }, []);

  useEffect(() => {
    localStorage.setItem('lang', language);
  }, [language]);

  const handleRegister = () => {
    if (!registerEmail || !registerPassword || !confirmPassword) {
      setToastMessage(t.toastEmptyFields);
      setToastColor('danger');
      setShowToast(true);
      return;
    }

    if (registerPassword !== confirmPassword) {
      setToastMessage(t.toastPasswordsNotMatch);
      setToastColor('danger');
      setShowToast(true);
      return;
    }

    // Save credentials (demo only; use backend in production)
    localStorage.setItem('email', registerEmail);
    localStorage.setItem('password', registerPassword);

    setToastMessage(t.toastRegisterSuccess);
    setToastColor('success');
    setShowToast(true);

    // Optionally redirect after delay
    setTimeout(() => {
      history.push('/login');
    }, 2000);
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
              type={showPassword ? 'text' : 'password'}
              className="neon-input"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <label className="input-label">{t.confirmPassword}</label>
          <div className="input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              className="neon-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <button className="btn-neon" onClick={handleRegister}>
            {t.register}
          </button>

          <p
            style={{ marginTop: '1rem', cursor: 'pointer', color: '#0ff' }}
            onClick={() => history.push('/signin')}
          >
            {t.goToLogin}
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

export default SignUpPage;
