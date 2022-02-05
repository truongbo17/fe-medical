import { ref } from "vue";
import axios from "axios";

const error = ref(null);
const isPending = ref(false);

async function dashbroad() {
  error.value = null;
  isPending.value = true;

  try {
    const response = await axios({
      method: "GET",
      url: "https://medical.truongbo.tech/be/public/api/user",
      withCredentials: true,
    });

    return response;
  } catch (err) {
    error.value = "Đã xảy ra lỗi vui lòng thử lại";
  } finally {
    isPending.value = false;
  }
}

export function useDashbroad() {
  return { error, isPending, dashbroad };
}
