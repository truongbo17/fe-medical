import { ref } from "vue";
import axios from "axios";

const error = ref(null);
const isPending = ref(false);

async function addSchedule(data) {
  error.value = null;
  isPending.value = true;

  try {
    const response = await axios({
      method: "POST",
      url: "https://medical.truongbo.tech/be/public/api/schedule/add",
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

export function useAddSchedule() {
  return { error, isPending, addSchedule };
}
