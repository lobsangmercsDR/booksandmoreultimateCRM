import { useState } from 'react';
import axios from 'axios';

const PasswordResetRequestForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage('');

    const api = axios.create({
      baseURL: 'http://localhost:3000',
    });

    try {
      // Envía la solicitud de restablecimiento de contraseña al backend
      await api.post('/api/users/reset-password', { email });
      setMessage('Se ha enviado un correo electrónico con instrucciones para restablecer su contraseña.');
      setIsLoading(false);
    } catch (error) {
      if (error.response) {
        setError('Error al solicitar el restablecimiento de contraseña: ' + error.response.data.error);
      } else {
        setError('Ocurrió un error al intentar solicitar el restablecimiento de contraseña. Por favor, inténtalo de nuevo más tarde.');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <form className="space-y-6 w-full max-w-sm" onSubmit={handleSubmit}>
        <h3 className="text-lg font-medium text-gray-900">Solicitud de Restablecimiento de Contraseña</h3>

        {message && <div className="text-green-500">{message}</div>}
        {error && <div className="text-red-500">{error}</div>}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isLoading}
        >
          {isLoading ? 'Enviando solicitud...' : 'Enviar Solicitud'}
        </button>
      </form>
    </div>
  );
};

export default PasswordResetRequestForm;
