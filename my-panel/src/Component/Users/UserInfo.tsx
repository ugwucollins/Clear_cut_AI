import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { ApiUrl } from "../../Context/ApiUrl";
import { toast } from "react-toastify";
import Aos from "aos";

const UserInfo = ({ id }: { id: any }) => {
  const [user, setUser] = useState<any>({});

  async function getUserInfo() {
    try {
      const res = await ApiUrl.get("/users/get/" + id);
      const data = await res.data;
      console.log(data);

      if (data.success) {
        setUser(data.data);
      } else {
        toast.error(data.message);
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  }

  useEffect(() => {
    Aos.init({
      once: true,
      easing: "ease-in-out",
      delay: 10,
    });
    console.log(user);

    getUserInfo();
    console.log(user);
    console.log(user?.createdAt);
  }, []);

  return (
    <div>
      <div data-aos="zoom-in" data-aos-duration={1000}>
        <UserCard
          createdAt={user?.createdAt}
          number={user?.phoneNumber}
          status={user?.status}
          name={user?.name}
          email={user?.email}
          coin={user?.coins}
          plan={user?.plan}
          id={user?._id}
        />
      </div>
    </div>
  );
};

export default UserInfo;
