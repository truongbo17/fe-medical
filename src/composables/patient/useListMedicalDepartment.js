import axios from "axios";
import { ref } from "vue";

const listMedical = ref({});

async function getAllMedical() {
  const res = await axios.get(
    "https://medical.truongbo.tech/be/public/api/medicaldepartment/list",
    { withCredentials: true }
  );
  listMedical.value = res.data;
}

export function useListMedicalDepartMent() {
  return { listMedical, getAllMedical };
}
