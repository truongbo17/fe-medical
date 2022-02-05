import axios from "axios";
import { ref } from "vue";

const doctors = ref([]);

async function getDoctorList() {
  const res = await axios.get(
    "https://medical.truongbo.tech/be/public/api/doctor/list",
    { withCredentials: true }
  );
  doctors.value = res.data;
}

export function doctorList() {
  return { doctors, getDoctorList };
}
