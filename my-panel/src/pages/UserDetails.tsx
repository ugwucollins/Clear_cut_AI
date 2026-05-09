import UserInfo from "../Component/Users/UserInfo";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  return (
    <div>
      <UserInfo id={id} />
    </div>
  );
};

export default UserDetails;
