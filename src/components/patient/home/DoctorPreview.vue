<template>
  <div>
    <div class="section-header-wrapper">
      <h1 class="section-header">Bác sĩ đề xuất</h1>
      <router-link
        :to="{ name: 'PatientDoctor', params: {} }"
        class="section-header-link"
      >
        Xem tất cả
      </router-link>
    </div>
    <div class="files-table">
      <div class="files-table-header">
        <div class="column-header table-cell">Tên</div>
        <div class="column-header table-cell size-cell">Ảnh</div>
        <div class="column-header table-cell">Nơi công tác</div>
        <div class="column-header table-cell size-cell">Khoa</div>
        <div class="column-header table-cell">Chat</div>
      </div>
      <div
        class="files-table-row"
        v-for="doctor in doctorPreview"
        :key="doctor.id"
      >
        <div class="table-cell">
          {{ doctor.name }}
        </div>
        <div class="table-cell">
          <img
            :src="doctor.avatar"
            style="width: 30%; height: auto; border-radius: 50%"
          />
        </div>
        <div class="table-cell">{{ doctor.address }}</div>
        <div class="table-cell">
          {{ doctor.md_name }}
        </div>
        <div class="table-cell action-cell">
          <button class="more-action"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { doctorPreviewHome } from "@/composables/patient/useDoctorPreview";

export default {
  setup() {
    const { doctorPreview, getDoctorPreview } = doctorPreviewHome();
    getDoctorPreview();

    return { doctorPreview };
  },
};
</script>
