import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import AuthPage from './pages/AuthPage';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/auth" component={AuthPage} exact />
        <Redirect exact from="/" to="/auth" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
