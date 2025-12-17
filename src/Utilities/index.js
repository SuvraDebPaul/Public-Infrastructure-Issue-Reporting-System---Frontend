import axios from "axios";
import { format } from "date-fns";

export const imageURL = async (photo) => {
  const imageFile = photo[0];
  const formData = new FormData();
  formData.append("image", imageFile);
  try {
    const imageData = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_API}`,
      formData
    );
    const photoURL = imageData.data.data.url;
    return photoURL;
  } catch (err) {
    console.log(err);
  }
};

export const fotmateDate = (date) => {
  return format(new Date(date), "dd/MM/yyyy hh:mm a");
};

export const saveOrUpdateUser = async (userData) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/users`,
    userData
  );
  return data;
};

export function parseDate(dateString) {
  if (!dateString) return null;
  const d = new Date(dateString);
  return isNaN(d.getTime()) ? null : d;
}
