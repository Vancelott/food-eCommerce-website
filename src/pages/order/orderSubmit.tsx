import { useNavigate } from 'react-router-dom';

export const OrderSubmit = () => {

    const navigate = useNavigate();
    const handleOnClick = () => navigate('/');

    return (
        <div className="bg-gray-100 flex flex-col items-center justify-center h-screen">
          <h1 className="mx-8 mb-4 text-3xl font-extrabold leading-none tracking-tight text-center text-gray-900 md:text-3xl lg:text-4xl dark:text-gray-900">
            Thank you for ordering! We will get in touch soon with shipping information.
          </h1>
          <button
            onClick={handleOnClick}
            className="inline-flex items-center justify-center px-5 py-3 mt-4 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            Home
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      );      
};