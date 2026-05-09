import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthPath, UserAuth } from "./UserContext";
import { ApiUrl } from "./ApiUrl";
import { UserAuthInfo } from "../App";
import { ImageBlob } from "./ImageBlob";

const createImageContext = createContext({});

const ImageContext = ({ children }: { children: ReactNode }) => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState<null | string>(null);
  const [img, setImg] = useState<null | string>(null);
  const [result, setResult] = useState(null);
  const [time, setTime] = useState<number | null | any>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const { user }: any = UserAuthInfo();
  const { setCredit, credit }: any = UserAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingData, setLoadingData] = useState<boolean>(false);

  const [history, setHistory] = useState<null | []>(null);

  const router = useNavigate();

  async function bgRemover(img: any) {
    try {
      // setLoading(true);

      if (!user) {
        toast.error("Please Login First");
        router(AuthPath + "signin");
      }

      const file = URL.createObjectURL(img);
      setImage(file);
      setFile(img);

      if (img) {
        setTimeout(() => {
          router("/workspace", { replace: true });
          // setLoading(false);
        }, 1000);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const handleReset = () => {
    setFile(null);
    setImage(null);
  };

  const BG_API_KEY_R = import.meta.env.VITE_BG_API_KEY_R2;
  const online = window.navigator.onLine;

  async function handleRemove() {
    if (credit === 0 || credit < 2) {
      toast.error("Insufficent fund Please buy more Coins");
      router("/price", { replace: true });
    } else {
      if (online) {
        setLoading(true);
        setTime(Date.now());

        try {
          setLoading(true);
          const files: any = file;

          const formData = new FormData();
          formData.append("size", "auto");
          formData.append("image_file", files);

          const response = await fetch("https://api.remove.bg/v1.0/removebg", {
            method: "POST",
            headers: { "X-Api-Key": BG_API_KEY_R },
            body: formData,
          });

          if (response.ok) {
            const blob = await response.blob();

            const result = URL.createObjectURL(blob);
            const bgImage = await ImageBlob(result, "new");

            console.log("result", result);
            console.log("bgImage", bgImage);
            const old = URL.createObjectURL(files);
            const oldImage = await ImageBlob(old, "old");
            console.log("oldImage", oldImage);

            if (blob) {
              setImg(result);
              const endTime = Date.now();
              const timeSpent = (endTime - time) / 1000;
              console.log("Users image time" + timeSpent);

              const imageInfo = {
                img: bgImage.url || bgImage.data.url,
                imgImage: oldImage.url || oldImage.data.url,
                time: timeSpent,
                // status: "completed",
              };
              const res = await ApiUrl.post("/image/create", imageInfo);
              // const res = await ApiUrl.post("/image/create", imageInfo, {
              //   headers: { "Content-Type": "multipart/form-data" },
              // });

              const data = await res.data;
              console.log(data);

              if (data.success) {
                setResult(data.data);
                console.log(data.data);

                setCredit(data?.data?.credit);
                console.log(result || data.data?.result);
                setResultImage(result);
                toast.success(data.message);
                setImg(result);
                setLoading(false);
              } else {
                toast.error(data.message);
                throw new Error(res.statusText);
              }
            } else {
              throw new Error(`${response.status}: ${response.statusText}`);
            }
          } else {
            throw new Error(`${response.status}: ${response.statusText}`);
          }

          // const formData = new FormData();
          // formData.append("image", files || file);
          // const res = await ApiUrl.post("/image/create", formData, {
          //   headers: { "Content-Type": "multipart/form-data" },
          // });

          // const data = res.data;
          // console.log(data);

          // if (data.success) {
          //   console.log(data?.result);
          //   const url = URL.createObjectURL(data?.result);
          //   setResult(data);
          //   console.log(data.data);

          //   setCredit(data?.data?.credit);
          //   console.log(data?.result);
          //   setResultImage(url);
          //   toast.success(data.message);
          //   setImg(url);
          // } else {
          //   toast.error(data.message);
          //   throw new Error(res.statusText);
          // }
        } catch (error: any) {
          console.log(error);
          toast.error(error?.response?.data?.message || error.message);
          if (error?.response?.data?.url) {
            setTimeout(() => {
              router(error?.response?.data?.url, { replace: true });
            }, 1000);
          }
        } finally {
          setLoading(false);
        }
      } else {
        console.log("You are OffLine");
        toast.error("Please Check your Network and Try again");
      }
    }
  }

  async function getRemovedImages() {
    setLoadingData(true);
    try {
      setLoadingData(true);
      const res = await ApiUrl.get("/image/get");
      const data = await res.data;

      if (data.success) {
        console.log(data);
        setHistory(data.data);
        setResult(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoadingData(false);
    }
  }

  async function PublicImages(image: any) {
    setLoadingData(true);
    const types = "public";
    try {
      if (image) {
        setLoadingData(true);
        const res = await ApiUrl.put("/image/update/type/" + image._id, {
          type: types,
        });
        const data = await res.data;

        if (data.success) {
          console.log(data);
          toast.success(data.message);
          setTimeout(() => {
            getRemovedImages();
          }, 2000);
        } else {
          toast.error(data.message);
        }
      } else {
        toast.error("Please Provide an Image");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoadingData(false);
    }
  }

  useEffect(() => {
    getRemovedImages();
  }, []);

  const values = {
    result,
    image,
    setImage,
    getRemovedImages,
    setResult,
    handleRemove,
    history,
    setHistory,
    file,
    setFile,
    bgRemover,
    loading,
    loadingData,
    handleReset,
    resultImage,
    setResultImage,
    img,
    setImg,
    PublicImages,
  };

  return (
    <createImageContext.Provider value={values}>
      {children}
    </createImageContext.Provider>
  );
};

export default ImageContext;

export const ImageAuth = () => {
  return useContext(createImageContext);
};
