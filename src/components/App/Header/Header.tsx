import { Fragment, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, useRouteLoaderData } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { logOut, setIsLogged } from '../../../store/reducers/user';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

function Header() {
  const dispatch = useAppDispatch();
  // Pour savoir si l'utilisateur est connecté ou non
  const isLogged = useAppSelector((state) => state.user.isLogged);

  let navigation = [{ name: 'Accueil', href: '/' }];
  if (isLogged) {
    navigation = [
      { name: 'Accueil', href: '/' },
      { name: 'Mes voyages', href: '/voyages' },
      { name: 'Mon compte', href: `/mon-compte` },
    ];
  } else {
    navigation = [
      { name: 'Accueil', href: '/' },
      { name: 'Inscription', href: '/inscription' },
      { name: 'Connexion', href: '/connexion' },
    ];
  }

  // Si l'utilisateur veut se déconnecter (clic sur le bouton "Déconnexion")
  const handleLogout = () => {
    dispatch(logOut());
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
                  <svg
                    className="block bg-darkest h-8 w-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    height="60"
                    viewBox="0 -960 960 960"
                    width="60"
                    fill="#f2d9d0"
                  >
                    <path d="M253-135q-97 0-166.5-67.816Q17-270.631 17-367.491 17-448 73.52-501.5q56.52-53.5 137.5-53.5 80.98 0 137.48 48.5Q405-458 405-380h71q-3-95-78-171t-204-76q36-87 117.5-143t169.103-56q117.06 0 198.729 84Q761-658 770-543v24q80 12 126.5 64.182Q943-402.635 943-327.235 943-247 887-191q-56 56-136 56H253Z" />
                  </svg>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-3">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          isActive
                            ? 'bg-lightest text-darkest rounded-md px-3 py-2 text-sm font-medium'
                            : 'text-lightest hover:bg-darkest-700 hover:text-lightest rounded-md px-3 py-2 text-sm font-medium'
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              {isLogged && (
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
                            <NavLink
                              to="/mon-compte"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Mon compte
                            </NavLink>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <NavLink
                              to="/connexion"
                              onClick={handleLogout}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Se déconnecter
                            </NavLink>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item: any) => (
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
