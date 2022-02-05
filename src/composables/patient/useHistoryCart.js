import axios from "axios";
import { ref } from "vue";

const historyCart = ref({});

async function getHistoryCart() {
  const res = await axios.get(
    "http://localhost/bomedical/be/public/api/order/history",
    { withCredentials: true }
  );
  historyCart.value = res.data;
}

export function useHistoryCart() {
  return { historyCart, getHistoryCart };
}
