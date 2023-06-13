import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, useNavigate } from 'react-router-dom';

// Pour gérer les cookies
import Cookies from 'js-cookie';
import axios from 'axios';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Header() {
  // Pour savoir si l'utilisateur est connecté ou non
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Pour utiliser le hook useHNavigate (garder en mémoire l'historique de navigation) >> Savoir s'il est connecté ou non
  const navigate = useNavigate();

  const navigation = [
    { name: 'Accueil', href: '/', current: true },
    { name: 'Mes voyages', href: '/voyages', current: false },
    isLoggedIn
      ? { name: 'Mon compte', href: '/moncompte', current: false }
      : { name: 'Connexion', href: '/connexion', current: false },
  ];

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');

    // a modifier
    const checkToken = async () => {
      if (accessToken) {
        try {
          // Vérifier si l'accessToken est expiré -- A VOIR AVEC AHMED
          const response = await axios.post(
            'https://qwikle-server.eddi.cloud/',
            {
              query: `
              mutation VerifyTokenMutation {
                verifyToken(accessToken: "${accessToken}") {
                  isValid
                }
              }
            `,
            }
          );

          const { data } = response.data;
          const { isValid } = data.verifyToken;

          if (isValid) {
            // L'utilisateur est connecté, on le redirige vers la page /monvoyage
            setIsLoggedIn(true);
            navigate('/monvoyage');
          } else if (refreshToken) {
            try {
              // Utiliser le refreshToken pour récupérer un nouveau token
              const refreshResponse = await axios.post(
                'https://qwikle-server.eddi.cloud/',
                {
                  query: `
                  mutation RefreshTokenMutation {
                    refreshToken(refreshToken: "${refreshToken}") {
                      accessToken
                    }
                  }
                `,
                }
              );

              const { accessToken: newAccessToken } =
                refreshResponse.data.data.refreshToken;

              // Mettre à jour le cookie d'accessToken avec le nouveau token
              Cookies.set('accessToken', newAccessToken);
              // Met à jour l'état de isLoggedIn
              setIsLoggedIn(true);

              // Rediriger vers la page /monvoyage
              navigate('/monvoyage');
            } catch (error) {
              console.error(error);
              // Une erreur s'est produite lors de la récupération du nouveau token
              // Faites les actions appropriées (par exemple, afficher un message d'erreur)
            }
          }
        } catch (error) {
          console.error(error);
          // Une erreur s'est produite lors de la vérification du token
          // Faites les actions appropriées (par exemple, afficher un message d'erreur)
        }
      }
    };

    checkToken();
  }, []);

  // Si l'utilisateur veut se déconnecter (clic sur le bouton "Déconnexion")
  const handleLogout = () => {
    // Supprimer les cookies
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');

    // Rediriger vers la page de connexion
    navigate('/connexion');
  };

  return (
    <Disclosure as="nav" className="bg-darkest">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-lightest hover:bg-gray-700 hover:text-lightest focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lightest">
                  <span className="sr-only">Ouvrir le menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="src\assets\logo-cloud.png"
                    alt="O'Voyage"
                  />
                  <img
                    className="hidden h-10 w-auto lg:block"
                    src="src\assets\logo-cloud.png"
                    alt="O'Voyage"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-3">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-lightest text-darkest'
                            : 'text-lightest hover:bg-darkest-700 hover:text-lightest',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-darkest text-sm focus:outline-none focus:ring-2 focus:ring-lightest focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Ouvrir le menu</span>
                      <img
                        className="h-8 w-8 rounded-2xl"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-lightest py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Mon compte
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Paramètres
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/"
                            onClick={handleLogout}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Se déconnecter
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-lightest'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-lightest',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Header;
