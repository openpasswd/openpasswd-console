import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { auth_token } from '../../atoms';

interface IState {
  email: string;
  password: string;
  remember: boolean;
}

interface LocationProps {
  state: {
    from: Location;
  };
}

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation() as LocationProps;

  let from = location.state?.from?.pathname || '/';

  const [state, setState] = useState<IState>({
    email: '',
    password: '',
    remember: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useRecoilState(auth_token);

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
    setState({ ...state, email: event.target.value });
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setState({ ...state, password: event.target.value });
  const onChangeRemember = (event: React.ChangeEvent<HTMLInputElement>) =>
    setState({ ...state, remember: event.target.checked });

  const authTokenRequest = async () => {
    setIsLoading(true);
    const url = '//localhost:7777/api/auth/token';
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state),
    };

    try {
      let response = await fetch(url, options);
      let data = await response.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }

    //   setToken(Date().toString());
    //   navigate(from, { replace: true });
  };

  return (
    <main className="flex-grow flex justify-center">
      <div className="py-12 px-5 container md:w-1/2">
        <h2 className="text-2xl font-bold">Login</h2>
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="text-gray-700">Email</span>
              <input
                type="email"
                className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                placeholder="john@example.com"
                value={state.email}
                onChange={onChangeEmail}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Password</span>
              <input
                type="password"
                className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                placeholder="********"
                value={state.password}
                onChange={onChangePassword}
              />
            </label>
            <div className="block">
              <div className="mt-2">
                <div className="flex justify-between">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={state.remember}
                      onChange={onChangeRemember}
                    />
                    <span className="ml-2">Remember-me</span>
                  </label>
                  <Link
                    className="text-blue-600 hover:underline"
                    to="/register"
                  >
                    Register new account
                  </Link>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="
                  inline-block
                  px-7 py-3
                  disabled:bg-slate-600
                  bg-blue-600
                  text-white
                  font-medium text-sm leading-snug uppercase
                  rounded
                  shadow-md
                  hover:bg-blue-700 hover:shadow-lg
                  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                  active:bg-blue-800 active:shadow-lg
                  transition duration-150 ease-in-out
                  w-full
                "
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              disabled={isLoading}
              onClick={authTokenRequest}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;