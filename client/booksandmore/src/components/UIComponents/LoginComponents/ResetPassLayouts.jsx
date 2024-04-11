import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PasswordResetForm = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    try {
      await axios.post(`http://localhost:3000/api/users/reset-password/${token}`, { newPassword });
      setSuccess(true);
      setIsLoading(false);
    } catch (error) {
      setError('Error al restablecer la contraseña');
      setIsLoading(false);
    }
  };

  if (success) {
    return <div>Contraseña restablecida exitosamente</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <form className="space-y-6 w-full max-w-sm" onSubmit={handleSubmit}>
        <h3 className="text-lg font-medium text-gray-900">Restablecer contraseña</h3>

        {error && <div className="text-red-500">{error}</div>}

        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
            Nueva contraseña
          </label>
          <div className="mt-1">
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              autoComplete="new-password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirmar contraseña
          </label>
          <div className="mt-1">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isLoading}
        >
          {isLoading ? 'Restableciendo contraseña...' : 'Restablecer contraseña'}
        </button>
      </form>
    </div>
  );
};

export default PasswordResetForm;
