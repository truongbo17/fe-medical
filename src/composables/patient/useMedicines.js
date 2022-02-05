import axios from "axios";
import { ref } from "vue";

const listMedicines = ref({});

async function getListMedicines() {
  const res = await axios.get(
    "https://medical.truongbo.tech/be/public/api/medicines/list",
    { withCredentials: true }
  );
  listMedicines.value = res.data;
}

export function listMedicinesHome() {
  return { listMedicines, getListMedicines };
}
