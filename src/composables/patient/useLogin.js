import { ref } from "vue";
import axios from "axios";

const error = ref(null);
const isPending = ref(false);

async function login(email, password) {
  error.value = null;
  isPending.value = true;

  try {
    const response = await axios({
      method: "POST",
      url: "https://medical.truongbo.tech/be/public/api/login",
      withCredentials: true,
      data: { email, password },
    });

    return response;
  } catch (err) {
    if (err.response.status == 401) {
      error.value = "Sai tên tài khoản hoặc mật khẩu";
    } else {
      error.value = "Đã xảy ra lỗi vui lòng thử lại";
    }
  } finally {
    isPending.value = false;
  }
}

export function useLogin() {
  return { error, isPending, login };
}
