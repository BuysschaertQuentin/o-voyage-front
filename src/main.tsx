import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import Account from './components/App/Account/Account';
import App from './components/App/App';
import FAQ from './components/App/FAQ/FAQ';
import Cgu from './components/App/Cgu/Cgu';
import Connection from './components/App/Connection/connection';
import ContactForm from './components/App/Contact/ContactForm';
import DayByDay from './components/App/DayByDay/DayByDay';
import GeneralTravel from './components/App/GeneralTravel/GeneralTravel';
import Home from './components/App/Home/Home';
import NotFound from './components/App/NotFound/NotFound';
import Register from './components/App/Register/register';
import PasswordResetForm from './components/App/ForgottenPassword/ForgottenPassword';
import TravelsHistory from './components/App/TravelsHistory/TravelsHistory';

// Redux
import store from './store';

import './styles/main.css';
// Importation de la fonction getToken (auth) pour les routes protégées
import tokenLoader, { authLoader } from './components/App/Loaders/Auth';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<App />}
      errorElement={<NotFound />}
      id="root"
      loader={tokenLoader}
    >
      <Route errorElement={<NotFound />}>
        <Route index element={<Home />} />
        {/* <Route path="voyages" element={<TravelsHistory />} /> */}
        <Route
          path="voyages"
          element={<TravelsHistory />}
          loader={authLoader}
        />
        <Route path="voyages/:voyage" element={<GeneralTravel />} />
        <Route
          path="voyages/:voyage/jour/:jour"
          element={<DayByDay />}
          loader={authLoader}
        />
        <Route path="faq" element={<FAQ />} />
        <Route path="cgu" element={<Cgu />} />
        <Route path="infos" element={<h1>Infos</h1>} />
        <Route path="contact" element={<ContactForm />} />
        <Route path="connexion" element={<Connection />} />
        <Route path="inscription" element={<Register />} />
        <Route path="mot-de-passe-oublie" element={<PasswordResetForm />} />
        <Route path="mon-compte" element={<Account email='' lastName='' firstName='' password='' />} loader={authLoader} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
