/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { registerUser } from '../../../store/reducers/user';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [messageContent, setMessageContent] = useState('');

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };
  
  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };
  
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  
  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  }
  
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
      // Check if password and confirm password are the same
      if (password === confirmPassword) {
        const newUser = {
          "email": email,
          "firstName": firstName,
          "lastName": lastName,
          "password": password,
          "confirmPassword": confirmPassword,
        }
        
        try {
          const response = await registerUser(newUser);
          if (response.errors) {
            // If error : display an error message
            setMessageContent(response.errors[0].message);
          } else {
            // If account created : display a success message
            setMessageContent(`${response.data.signUp.user.firstname}, votre compte à bien été créé !`);

            // Form cleaning
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
          }
        }
        catch(error: any){
          setMessageContent(error.response.data.errors[0].message);
        };
      }

    // If password and confirm password are differents
    else {
      // Display an error message
      setMessageContent('Les mots de passe doivent être identiques');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-6 pb-6 text-center text-2xl font-bold leading-9 tracking-tight text-darkest">
          Se créer un compte{' '}
        </h1>
        <p className="pb-6 text-warm">{messageContent}</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <label
              className="block text-darkest-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Prénom
            </label>
            <input
              id="name"
              type="text"
              placeholder="Prénom"
              autoComplete="name"
              required
              value={firstName}
              onChange={handleFirstNameChange}
              className="shadow appearance-none border rounded-md w-full py-2 px-3 text-darkest-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-darkest-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Nom
            </label>
            <input
              className="shadow appearance-none border rounded-md w-full py-2 px-3 text-darkest-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastName"
              type="text"
              placeholder="Nom"
              autoComplete="lastName"
              required
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-darkest-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded-md w-full py-2 px-3 text-darkest-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              required
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-darkest-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Mot de passe
            </label>
            <input
              className="shadow appearance-none border rounded-md w-full py-2 px-3 text-darkest-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-darkest-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirmation mot de passe
            </label>
            <input
              className="shadow appearance-none border rounded-md w-full py-2 px-3 text-darkest-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="Confirmation mot de passe"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {password !== confirmPassword && (
              <p className="text-warm text-xs italic">
                Mots de passe différents !
              </p>
            )}
          </div>
          <div className="flex flex-col items-center justify-between">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-darkest px-3 py-1.5 text-sm font-semibold leading-6 text-lightest shadow-sm"
            >
              Créer un compte
            </button>
            <div className="flex justify-center items-center py-3 text-sm font-semibold leading-6 text-darkest">
              <p className="px-3">Déjà un compte ?</p>
              <NavLink 
                to="/connexion" 
                className="flex justify-center rounded-md border-2 border-warm px-3 py-1.5 text-sm font-semibold text-darkest shadow-md hover:bg-lightest-300"
              >
                Se connecter
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
