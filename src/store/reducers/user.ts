import { createAction, createReducer, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import client from '../../axios';

interface UserState {
  isLogged: boolean;
  token: string;
  refreshToken: string;
  firstName: string;
  id: number;
}

const initialState: UserState = {
  isLogged: false,
  token: '',
  refreshToken: '',
  firstName: '',
  id: 0,
};

// Createaction permet de créer une action avec un payload (ici le user)
export const loginSuccess = createAction('user/loginSucess');
export const createNewUser = createAction('user/createNewUser');
export const setIsLogged = createAction<boolean>('user/setIsLogged');
export const logOut = createAction('user/logOut');

// Création d'un nouvel utilisateur
export async function registerUser(newUser: any) {
  const signUpQuery = `
    mutation Mutation {
      signUp(signUpInput: {
          email : "${newUser.email}",
          password: "${newUser.password}",
          confirmPassword: "${newUser.confirmPassword}",
          firstname: "${newUser.firstName}"
          lastname: "${newUser.lastName}"
      }) {
        user {
          firstname
        }
      }
    }
  `;

  const response = await client.axios.post('', {
    query: signUpQuery,
  });
  return response.data;
}
// Connexion d'un utilisateur avec le state
const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setIsLogged, (state, action) => {
      state.isLogged = action.payload;
    })

    .addCase(logOut, (state, _action) => {
      // Supprimer les cookies
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');

      // Vider le header de axios
      client.removeAuthorization();

      state.isLogged = false;
    })

    .addCase(loginSuccess, (state, action: any) => {
      // Récupération des tokens
      // Action.payload sert à récupérer les données envoyées par l'action
      const { accessToken, refreshToken, id } = action.payload;
      state.isLogged = true;
      state.id = id;
      client.setAutorization(accessToken);

      // Enregistrement des cookies
      Cookies.set('accessToken', accessToken);
      Cookies.set('refreshToken', refreshToken);
    });
});

// Connexion à l'API pour vérifier les identifiants
export const loginUser = (email: any, password: any) => async (dispatch: any) => {
  try {
    const response = await client.axios.post('', {
      query: `
      mutation SignInMutation {
        signIn(signInInput: {
          email: "${email}",
          password: "${password}"
        }) {
          token {
            accessToken
            refreshToken
          }
          user {
            id
          }
        }
      }
      `,
    });

    const { data } = response.data;
    if (data && data.signIn && data.signIn.token) {
      const { accessToken, refreshToken } = data.signIn.token;
      const { id } = data.signIn.user;

      // Dispatch de l'action loginSuccess pour mettre à jour le state de l'utilisateur
      dispatch(loginSuccess());
      // dispatch(loginSuccess({ accessToken, refreshToken, id }));
      return data;
    }
    alert('Identifiants incorrects');
  } catch (error) {
    console.log(error);
    alert('Erreur lors de la connexion');
  }
};

export default userReducer;
