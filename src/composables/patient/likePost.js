import { ref } from "vue";
import axios from "axios";

const errorsendLike = ref(null);

async function sendLikePost(post_id) {
  errorsendLike.value = null;

  try {
    const response = await axios({
      method: "POST",
      url: `https://medical.truongbo.tech/be/public/api/likepost/sendlike/${post_id}`,
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    errorsendLike.value = "Đã xảy ra lỗi vui lòng thử lại";
  }
}

export function useSendLike() {
  return { errorsendLike, sendLikePost };
}
