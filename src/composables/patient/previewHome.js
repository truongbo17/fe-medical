import axios from "axios";
import { ref } from "vue";

const listPreview = ref({});

async function getAllPreview() {
  const res = await axios.get(
    "https://medical.truongbo.tech/be/public/api/preview/list",
    { withCredentials: true }
  );
  listPreview.value = res.data;
}

export function previewHome() {
  return { listPreview, getAllPreview };
}
