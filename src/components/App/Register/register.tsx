function Register() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="src\assets\logo-cloud.png"
          alt="O'Voyage"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-darkest">
          Se connecter
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-darkest"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-darkest shadow-sm ring-1 ring-inset ring-darkest-300 placeholder:text-darkest-400 focus:ring-2 focus:ring-inset focus:ring-lightest sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-darkest"
              >
                Mot de passe
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-lightest hover:text-darkest-500"
                >
                  Mot de passe oublié ?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-darkest shadow-sm ring-1 ring-inset ring-darkest-300 placeholder:text-darkest-400 focus:ring-2 focus:ring-inset focus:ring-lightest sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-lightest px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-darkest-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lightest"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-darkest-500">
          Envie de s'inscrire ?{' '}
          <a
            href="#"
            className="font-semibold leading-6 text-lightest hover:text-darkest-500"
          >
            Inscris-toi gratuitement !
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;