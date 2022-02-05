import { ref } from "vue";
import axios from "axios";

const error = ref(null);
const isPending = ref(false);

async function addCart(data) {
  error.value = null;
  isPending.value = true;

  try {
    const response = await axios({
      method: "POST",
      url: "https://medical.truongbo.tech/be/public/api/order/add",
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

export function useAddCart() {
  return { error, isPending, addCart };
}
