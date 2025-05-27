import React, { useState } from 'react';
import { IonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './AuthPage.css';

  const translations = {
    es: {
      forgotPasswordTitle: 'Recuperar Contraseña',
      emailLabel: 'Correo Electrónico',
      submitButton: 'Enviar',
      toastSuccess: 'Correo enviado para recuperación de contraseña',
      toastEmptyEmail: 'Por favor, ingresa tu correo electrónico',
      backToLogin: 'Volver al inicio de sesión',
      selectLang: 'Idioma'
    },
    en: {
      forgotPasswordTitle: 'Password Recovery',
      emailLabel: 'Email',
      submitButton: 'Submit',
      toastSuccess: 'Password recovery email sent',
      toastEmptyEmail: 'Please enter your email',
      backToLogin: 'Back to Login',
      selectLang: 'Language'
    }
  };

const ForgotPasswordPage: React.FC = () => {
  const history = useHistory();
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const t = translations[language];

  const [email, setEmail] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<'success' | 'danger'>('success');

  const handleSubmit = () => {
    if (!email) {
      setToastMessage(t.toastEmptyEmail);
      setToastColor('danger');
      setShowToast(true);
      return;
    }
    // Here you would normally handle the password recovery request to backend
    setToastMessage(t.toastSuccess);
    setToastColor('success');
    setShowToast(true);
  };

  const goToLogin = () => {
    history.push('/signin');
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
          <h2 className="title">{t.forgotPasswordTitle}</h2>

          <label className="input-label">{t.emailLabel}</label>
          <div className="input-wrapper">
            <input
              type="email"
              className="neon-input email-input-icon"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="btn-neon" onClick={handleSubmit}>
            {t.submitButton}
          </button>

          <p
            style={{ marginTop: '1rem', cursor: 'pointer', color: '#0ff' }}
            onClick={goToLogin}
          >
            {t.backToLogin}
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

export default ForgotPasswordPage;
