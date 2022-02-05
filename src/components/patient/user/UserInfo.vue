<template>
  <section class="content-section" v-if="dashbroad != ''">
    <div class="section-header-wrapper">
      <h1 class="section-header">Thông tin cá nhân</h1>
      <a class="section-header-link"> ------ </a>
    </div>
    <div class="files-table">
      <div class="center">
        <div class="card">
          <div class="additional">
            <div class="user-card">
              <div class="points center">5,312 Points</div>
              <img :src="user.avatar" />
            </div>
          </div>
          <div class="general">
            <h3>{{ user.name }}</h3>
            <p class="access-text">Địa chỉ : {{ user.address }}</p>
            <p class="access-text">Phone : {{ user.phone }}</p>
            <p class="access-text">Email : {{ user.email }}</p>
            <p class="access-text">Tham gia : {{ user.created_at }}</p>
            <p class="access-text">Weight : {{ user.weight }} KG</p>
            <p class="access-text">Height : {{ user.height }} CM</p>
            <button class="more">
              <img src="https://img.icons8.com/dusk/64/000000/edit--v2.png" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { useDashbroad } from "@/composables/patient/useDashbroad";

export default {
  setup() {
    const { dashbroad } = useDashbroad();
    const user = ref({});

    async function getAuthInfo() {
      const response = await dashbroad();
      user.value = response.data;
    }
    getAuthInfo();

    return { user, dashbroad };
  },
};
</script>

<style scoped>
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
