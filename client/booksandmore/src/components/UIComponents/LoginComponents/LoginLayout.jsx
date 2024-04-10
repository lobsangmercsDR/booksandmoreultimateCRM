import { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Login from './LoginForm';
import CreateAccount from './CreateAccount';
import Cover from './BookCover';
import './LoginLayout.css';

const LoginLayout = () => {
  const [page, setPage] = useState(0);
  const flipBookRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      goToPage(1);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const goToPage = (pageNumber) => {
    requestAnimationFrame(() => {
      flipBookRef.current.pageFlip().flip(pageNumber);
     });

  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Bienvenido
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-lg">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-12">
          <HTMLFlipBook
            width={800} // Ajusta este valor según tus necesidades
            height={500}
            onFlip={handlePageChange}
            ref={flipBookRef}
            useMouseEvents={false}
            style={{
              overflow: 'hidden',
              width: '100%',
              maxWidth: '1200px', // Aumenta este valor para hacer el contenedor más ancho
              margin: '0 auto',
            }}
            size="fixed"
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            className="demo-book"

          >
            <div className="page">
              <Cover />
            </div>
            <div className="page">
              <Login />
            </div>
            <div className="page">
              <CreateAccount />
            </div>
            <div className='page'>
              Hola

            </div>
          </HTMLFlipBook>
          <div className="mt-4 flex justify-between">
            <button
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => goToPage(1)}
            >
              Iniciar sesión
            </button>
            <button
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => goToPage(2)}
            >
              Crear cuenta
            </button>
            <button
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => goToPage(3)}
            >
              Recuperar contraseña
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
