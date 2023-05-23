import { Products } from './products/products';
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center bg-gray-900 px-8 md:px-20 lg:px-40 xl:px-60 2xl:px-80 w-full h-auto py-12 md:py-24 lg:py-32">
        <h1 className="text-left text-4xl lg:text-5xl xl:text-6xl font-bold font-serif text-white ml-4 md:ml-10 xl:ml-20 2xl:ml-52 mb-6 md:mb-10">Our values</h1>
        <h2 className="text-left mt-6 mx-4 md:mx-10 xl:mx-20 2xl:mx-52 text-lg lg:text-xl xl:text-2xl text-white leading-relaxed">
          We are a German food company dedicated to crafting and distributing high-quality food products. We take pride in creating delicious dishes using only the freshest ingredients, ensuring an authentic taste experience. Our flagship product is renowned for its exceptional quality and has gained popularity in stores worldwide. At Early, we have a specific focus on catering to men, offering them a culinary journey that embodies strength and vitality. We strive to provide a product that exudes a sense of power, while remaining affordable and accessible to all. Our mission is to deliver a satisfying and empowering dining experience to our customers, inspiring them to embrace the flavors of Germany with every bite.
        </h2>
        <Link to="/products" className="flex justify-center mt-6">
          <button className="bg-white text-blue-950 w-28 h-10 text-semibold text-lg font-semibold">Browse</button>
        </Link>
      </div>
      <div className="bg-gray-100 w-full min-h-screen flex flex-col justify-center items-center py-12 md:py-24 lg:py-32">
  <h3 className="text-center mt-6 text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-none tracking-tight text-gray-900">Our latest additions</h3>
  <div className="flex flex-col items-center">
    <Products />
  </div>
  </div>
    </div>
  );
};