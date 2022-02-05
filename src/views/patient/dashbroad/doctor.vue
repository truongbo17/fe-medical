<template>
  <section class="content-section" v-if="doctors != ''">
    <div class="section-header-wrapper">
      <h1 class="section-header">Danh sách bác sĩ</h1>
      <a class="section-header-link"> Mới nhất xếp trước </a>
    </div>
    <div class="files-table">
      <div class="center" v-for="doctor in doctors" :key="doctor.id">
        <div class="card">
          <div class="additional">
            <div class="user-card">
              <div class="points center">5,312 Points</div>
              <img :src="doctor.avatar" />
            </div>
          </div>
          <div class="general">
            <h3>{{ doctor.name }}</h3>
            <p class="access-text">Công tác : {{ doctor.address }}</p>
            <p class="access-text">
              Khoa bệnh : {{ doctor.get_medical_department_name.name }}
            </p>
            <p class="access-text">Phone : {{ doctor.phone }}</p>
            <p class="access-text">Email : {{ doctor.email }}</p>
            <button class="more">
              <img src="https://img.icons8.com/color/48/000000/chat--v3.png" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="loading" v-else>Loading&#8230;</div>
</template>

<script>
import { doctorList } from "@/composables/patient/useDoctorList";
export default {
  setup() {
    const { doctors, getDoctorList } = doctorList();
    getDoctorList();

    return { doctors };
  },
};
</script>

<style lang="css" scoped>
button,
input[type="submit"],
input[type="reset"] {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}

.card {
  width: 90%;
  height: 300px;
  background: linear-gradient(#f8f8f8, #fff);
  box-shadow: 0 8px 16px -8px rgba(0, 0, 0, 0.4);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  margin: 1.5rem;
}

.card h1 {
  text-align: center;
}

.card .additional {
  width: 30%;
  height: 100%;
  background: linear-gradient(#de685e, #ee786e);
  overflow: hidden;
  z-index: 2;
}

.card .additional .user-card .points {
  top: 15%;
  color: #fff;
  text-transform: uppercase;
  font-size: 0.75em;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.15);
  padding: 0.125rem 0.75rem;
  border-radius: 100px;
  white-space: nowrap;
}

.card .additional .user-card .points {
  top: 85%;
}

.card .additional .user-card img {
  width: 100%;
  height: auto;
}

.card .general {
  width: 70%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  box-sizing: border-box;
  padding: 1rem;
  padding-top: 0;
}

.card .general .more {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 0.9em;
}
</style>
