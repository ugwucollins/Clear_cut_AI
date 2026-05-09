import { ApiUrl } from "./ApiUrl";
import { toast } from "react-toastify";

export async function ImageBlob(blobUrl: any, type: string) {
  try {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const formData = new FormData();
    // formData.append("image", file, "clear_cut_ai.png");
    formData.append("image", blob, `clear_cut_ai_${type}.png`);

    const res = await ApiUrl.post("/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data = await res.data;
    console.log(data);
    if (data.success) return data;
    return data;
  } catch (error: any) {
    toast.error(error.response.data.message || error.message);
  }
}
