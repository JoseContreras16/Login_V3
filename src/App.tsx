import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import AuthPage from './pages/AuthPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Home from './pages/Home';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/signin" component={SignInPage} exact />
        <Route path="/signup" component={SignUpPage} exact />
        <Route path="/auth" component={AuthPage} exact />
        <Route path="/home" component={Home} exact />
        <Route path="/forgot-password" component={ForgotPasswordPage} exact />
        <Redirect exact from="/" to="/signin" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
