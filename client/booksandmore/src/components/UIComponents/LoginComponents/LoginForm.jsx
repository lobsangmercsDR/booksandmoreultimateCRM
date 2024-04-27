import { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null); // Estado para manejar errores
  const [isLoading, setIsLoading] = useState(false); // Estado para indicar que se está cargando

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Indicar que la solicitud está en proceso
    setError(null); // Limpiar errores anteriores

    const api = axios.create({
      baseURL: 'http://localhost:3000', // Asegúrate de reemplazar con la URL de tu backend
    });

    try {
      // Intenta iniciar sesión con los datos del formulario
      const response = await api.post('/api/users/login', formData);

      // Maneja la respuesta del servidor adecuadamente
      if (response.data.token) {
        const { token, role } = response.data;
        // Establece una cookie segura con el token
        document.cookie = `token=${token}; Secure; HttpOnly; SameSite=Strict; Path=/;`;

        // Establece una cookie segura con el rol
        document.cookie = `role=${role}; Secure; HttpOnly; SameSite=Strict; Path=/;`;



        if (role === 'admin') {
          // Redirige al panel de administrador
          window.location.href = '/dashboard';
        } else {
          console.log('Usuario autenticado');
        }

        setIsLoading(false); // Indica que la solicitud ha finalizado
      }
    } catch (error) {
      if (error.response) {
        // Aquí puedes manejar errores específicos del servidor, como credenciales inválidas
        setError('Error al iniciar sesión: ' + error.response.data.message);
      } else {
        setError('Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
      }
      setIsLoading(false); // Indica que la solicitud ha finalizado
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <form className="space-y-6 w-full max-w-sm" onSubmit={handleSubmit}>
        <h3 className="text-lg font-medium text-gray-900">Iniciar sesión</h3>

        {/* Muestra mensajes de error si los hay */}
        {error && <div className="text-red-500">{error}</div>}

        {/* Campos del formulario */}
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
              value={formData.email}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
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
          {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
