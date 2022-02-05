<template>
  <div class="left-area">
    <button class="btn-close-left">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        class="feather feather-x-circle"
        viewBox="0 0 24 24"
      >
        <defs />
        <circle cx="12" cy="12" r="10" />
        <path d="M15 9l-6 6M9 9l6 6" />
      </svg>
    </button>
    <div class="app-name">BoMedical</div>
    <a
      v-for="leftBar in LeftDashbroad"
      :key="leftBar.name"
      href="#"
      class="item-link"
      id="pageLink"
      :class="{ active: leftBar.name == 'PatientDashbroad' }"
    >
      <router-link
        :to="leftBar.route"
        style="text-decoration: none; color: inherit"
      >
        <div v-html="leftBar.icon"></div>
      </router-link>
    </a>

    <button class="btn-logout" @click="submitLogout">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        class="feather feather-log-out"
        viewBox="0 0 24 24"
      >
        <defs />
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
      </svg>
    </button>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useLogout } from "@/composables/patient/useLogout";
import { ICON_LEFT_RIGHT_DASHBROAD } from "@/configs/iconLeftDashbroad";

export default {
  name: "LeftDashbroad",
  setup() {
    const store = useStore();
    const router = useRouter();
    const LeftDashbroad = reactive(ICON_LEFT_RIGHT_DASHBROAD);

    const { errorLogout, logout } = useLogout();

    //LOGOUT
    const submitLogout = async () => {
      await logout();
      // SET AUTH
      if (!errorLogout.value) {
        await sessionStorage.clear();
        await store.dispatch("setAuth", false);
        await store.dispatch("setUserInfo", {});
        await router.push({ name: "PatientLogin", params: {} });
      }
    };

    return { errorLogout, submitLogout, LeftDashbroad };
  },
};
</script>
