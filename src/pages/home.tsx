import { Products } from './products/products';
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center mb-20">
      <div className="flex flex-col justify-center bg-gray-900 px-80 w-screen h-4/5 py-32">
        <h1 className="text-left text-3xl font-bold font-serif text-white ml-20 px-52">Our values</h1>
        <h2 className="text-left mt-12 text-lg text-white m-20 px-52">
          We are a German food company dedicated to crafting and distributing high-quality food products. We take pride in creating delicious dishes using only the freshest ingredients, ensuring an authentic taste experience. Our flagship product is renowned for its exceptional quality and has gained popularity in stores worldwide. At early, we have a specific focus on catering to men, offering them a culinary journey that embodies strength and vitality. We strive to provide a product that exudes a sense of power, while remaining affordable and accessible to all. Our mission is to deliver a satisfying and empowering dining experience to our customers, inspiring them to embrace the flavors of Germany with every bite.
        </h2>
        <Link to="/products">
        <div className="justify-center">
        <button className="bg-white text-blue-950 w-28 h-10 text-semibold justify-center text-lg font-semibold">Browse</button>
        </div>
        </Link>
      </div>
      <div className="bg-orange-50 w-screen h-4/5 pb-56">
        <Products />
      </div>
    </div>
  );
};