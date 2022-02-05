import { ref } from "vue";
import axios from "axios";

const error = ref(null);
const isPending = ref(false);

async function addPostQuestion(data) {
  error.value = null;
  isPending.value = true;
  // console.log(data);
  try {
    const response = await axios({
      method: "POST",
      url: "https://medical.truongbo.tech/be/public/api/post/add",
      withCredentials: true,
      data: data,
    });

    return response;
  } catch (err) {
    error.value = "Đã xảy ra lỗi vui lòng thử lại";
  } finally {
    isPending.value = false;
  }
}

export function usePostQuestion() {
  return { error, isPending, addPostQuestion };
}
