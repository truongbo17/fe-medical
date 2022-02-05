import axios from "axios";
import { ref } from "vue";

const doctorPreview = ref({});

async function getDoctorPreview() {
  const res = await axios.get(
    "https://medical.truongbo.tech/be/public/api/doctor/involve",
    { withCredentials: true }
  );
  doctorPreview.value = res.data;
}

export function doctorPreviewHome() {
  return { doctorPreview, getDoctorPreview };
}
