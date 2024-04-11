import { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    names: '',
    lastnames: '',
    email: '',
    phone_number: '',
    delivery_address: '',
    password: '',
    role: 'customer',
  });
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      setError('Por favor, verifica que no eres un robot.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

      const api = axios.create({
        baseURL: 'http://localhost:3000',
      });

      const response = await api.post('/api/users/register', formData, { headers });
      if (response.data.token) {
        setToken(response.data.token);
        setRecaptchaToken(null);
        console.log('Usuario registrado correctamente');
        // Aquí puedes redirigir al usuario a otra página o mostrar un mensaje de éxito
      } else {
        console.error('Error al registrar usuario:', response.data.error);
      }

      setFormData({
        names: '',
        lastnames: '',
        email: '',
        phone_number: '',
        delivery_address: '',
        password: '',
      });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          if (error.response.data.error === 'Token expired') {
            setError('El token ha expirado. Por favor, inicia sesión nuevamente.');
          } else if (error.response.data.error === 'Invalid token') {
            setError('Token inválido. Por favor, verifica tus credenciales.');
          } else {
            setError('Error de autenticación. Por favor, inténtalo de nuevo más tarde.');
          }
        } else if (error.response.status === 401) {
          setError('Acceso denegado. Por favor, verifica tus credenciales.');
        } else if (error.response.status === 409) {
          setError('El correo electrónico ya está en uso. Por favor, utiliza un correo electrónico diferente.');
        }
      } else {
        console.error('Error al registrar usuario:', error);
        setError('Ocurrió un error al registrar el usuario. Por favor, inténtalo de nuevo más tarde.');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <form className="space-y-6 w-full max-w-xl" onSubmit={handleSubmit}>
        <h3 className="text-lg font-medium text-gray-900">Registro de Usuario</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="names" className="block text-sm font-medium text-gray-700">
              Nombres
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="names"
                name="names"
                value={formData.names}
                onChange={handleChange}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="lastnames" className="block text-sm font-medium text-gray-700">
              Apellidos
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="lastnames"
                name="lastnames"
                value={formData.lastnames}
                onChange={handleChange}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
              Número de Teléfono
            </label>
            <div className="mt-1">
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="delivery_address" className="block text-sm font-medium text-gray-700">
            Dirección de Entrega
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="delivery_address"
              name="delivery_address"
              value={formData.delivery_address}
              onChange={handleChange}
              required
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
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <ReCAPTCHA

          sitekey="6LcBH7YpAAAAAOEKcSINavekiJuIECDlbYeQ-aAX" // Reemplaza con tu clave de sitio de reCAPTCHA
          onChange={setRecaptchaToken}
        />


        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
