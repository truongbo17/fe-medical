import { ref } from "vue";
import axios from "axios";

const error = ref(null);
const isPending = ref(false);

async function register(data) {
  error.value = null;
  isPending.value = true;
  // console.log(data);
  try {
    const response = await axios({
      method: "POST",
      url: "https://medical.truongbo.tech/be/public/api/register",
      withCredentials: true,
      data: data,
    });

    return response;
  } catch (err) {
    error.value = "Vui lòng nhập đầy đủ và chính xác thông tin đăng kí !";
  } finally {
    isPending.value = false;
  }
}

export function useRegister() {
  return { error, isPending, register };
}
