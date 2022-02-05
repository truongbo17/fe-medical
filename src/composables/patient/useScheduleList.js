import axios from "axios";
import { ref } from "vue";

const scheduleList = ref({});

async function getScheduleList() {
  const res = await axios.get(
    "https://medical.truongbo.tech/be/public/api/schedule/list",
    { withCredentials: true }
  );
  scheduleList.value = res.data;
}

export function scheduleListHome() {
  return { scheduleList, getScheduleList };
}
