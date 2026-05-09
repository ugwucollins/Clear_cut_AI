import { ApiUrl } from "./ApiUrl";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { toast } from "react-toastify";
import { CreateUserContext } from "./UserContext";

export const authPath = "/api/auth";
export const allowedRoles = {
  Yes: import.meta.env.VITE_ROLE,
};
export const BackendLogicContext = createContext({});

const BackendContext = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState([]);
  const [images, setImages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [findUsers, setFindUsers] = useState([]);
  const [search, setSearch] = useState<string>("");

  const [activeUsers, setActiveUsers] = useState([]);
  const [subscription, setSubscription] = useState([]);
  const { isLoggedIn }: any = useContext(CreateUserContext);

  //   const router = useNavigate();

  const handleAllImages = async () => {
    try {
      const res = await ApiUrl.get("/image");

      const data = await res.data;

      if (data.success) {
        setImages(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  const handleAllUsers = async () => {
    try {
      const res = await ApiUrl.get("/users");

      const data = await res.data;

      if (data.success) {
        setUsers(data?.data);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  const handleAllActiveUsers = async () => {
    try {
      const res = await ApiUrl.get("/Analytics");

      const data = await res.data;

      if (data.success) {
        setActiveUsers(data?.data);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  const handleAllSubscription = async () => {
    try {
      const res = await ApiUrl.get("/transaction");

      const data = await res.data;

      if (data.success) {
        setSubscription(data?.data);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };
  const handleAllContact = async () => {
    try {
      const res = await ApiUrl.get("/contact");

      const data = await res.data;
      console.log(data);
      if (data.success) {
        setContacts(data?.data);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  //  async function getRemovedImages() {
  //   try {
  //     const res = await ApiUrl.get("/images/get");
  //     const data = await res.data;
  //     console.log(data);

  //     if (data.success) {
  //       setResult(data.data);
  //     } else {
  //       toast.error(data.message);
  //     }
  //     console.log(image);
  //   } catch (error: any) {
  //     console.log(error);
  //     toast.error(error.message);
  //   }
  // }

  useEffect(() => {
    if (isLoggedIn) {
      handleAllSubscription();
      handleAllUsers();
      handleAllImages();
      handleAllActiveUsers();
      handleAllContact();
    }
  }, []);

  const values = {
    search,
    setSearch,
    users,
    setUsers,
    images,
    setImages,
    subscription,
    handleAllActiveUsers,
    setSubscription,
    handleAllUsers,
    activeUsers,
    setActiveUsers,
    findUsers,
    setFindUsers,
    contacts,
    setContacts,
  };

  return (
    <BackendLogicContext.Provider value={values}>
      {children}
    </BackendLogicContext.Provider>
  );
};

export default BackendContext;

export const BackendAuth = () => {
  return useContext(BackendLogicContext);
};
