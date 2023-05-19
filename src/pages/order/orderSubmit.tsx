import { useNavigate } from 'react-router-dom';

export const OrderSubmit = () => {

    const navigate = useNavigate();
    const handleOnClick = () => navigate('/');

    return (
        <div>
            <h1> Thank you for ordering! We will get in touch soon with shipping information. </h1>
            <button onClick={handleOnClick}>Home</button>
        </div>
    );
};