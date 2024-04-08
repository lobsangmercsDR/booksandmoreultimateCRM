import{ useState } from 'react';

const LoginLayout = () => {
  const [showLogin, setShowLogin] = useState(true);

  const handleToggle = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {showLogin ? 'Sign in to your account' : 'Create an account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {showLogin ? (
            <div>
              {/* Aquí irá el componente de inicio de sesión */}
              <button
                onClick={handleToggle}
                className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Create an account
              </button>
            </div>
          ) : (
            <div>
              {/* Aquí irá el componente de creación de cuenta */}
              <button
                onClick={handleToggle}
                className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Sign in instead
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
