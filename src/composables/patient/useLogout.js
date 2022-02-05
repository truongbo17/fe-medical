import { ref } from "vue";
import axios from "axios";

const errorLogout = ref(null);

async function logout() {
  errorLogout.value = null;

  try {
    const response = await axios({
      method: "POST",
      url: "https://medical.truongbo.tech/be/public/api/logout",
      withCredentials: true,
    });

    return response;
  } catch (err) {
    errorLogout.value = "Đã xảy ra lỗi vui lòng thử lại";
  }
}

export function useLogout() {
  return { errorLogout, logout };
}
