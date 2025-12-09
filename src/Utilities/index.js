import axios from "axios";
import { format } from "date-fns";

export const imageURL = async (photo) => {
  if (photo.length === 0) return;
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
  return format(new Date(date), "dd/MM/yyyy");
};
