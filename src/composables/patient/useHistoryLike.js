import { ref } from "vue";
import axios from "axios";

const errorHistoryLike = ref(null);
const isPendingHistoryLike = ref(false);

async function getHistoryLike() {
  errorHistoryLike.value = null;
  isPendingHistoryLike.value = true;

  try {
    const response = await axios({
      method: "GET",
      url: "https://medical.truongbo.tech/be/public/api/likepost/historylike",
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    errorHistoryLike.value = "Đã xảy ra lỗi vui lòng thử lại";
  } finally {
    isPendingHistoryLike.value = false;
  }
}

export function useHistoryLike() {
  return { errorHistoryLike, isPendingHistoryLike, getHistoryLike };
}
