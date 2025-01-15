import { useParams, useLocation } from 'react-router-dom';

const DeliveryAgentHomeScreen = () => {
  const { userId } = useParams(); // Extract the userId from the URL
  const location = useLocation(); // Access additional data passed via state
  const user = location.state?.user;

  return (
    <div>
      <h1>Welcome DeliveryAgent {user?.name || "User"}!</h1>
      <p>Your ID: {userId}</p>
    </div>
  );
};

export default DeliveryAgentHomeScreen;