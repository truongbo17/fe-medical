<template>
  <div class="app-container">
    <left-dashbroad></left-dashbroad>
    <main-dashbroad>
      <slot></slot>
    </main-dashbroad>
    <right-dashbroad></right-dashbroad>
  </div>
  <loading-dashbroad v-if="isPending" />
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import LeftDashbroad from "@/components/patient/LeftDashbroad.vue";
import RightDashbroad from "@/components/patient/RightDashbroad.vue";
import MainDashbroad from "@/components/patient/MainDashbroad.vue";
import LoadingDashbroad from "@/components/patient/LoadingDashbroad.vue";

import configDashbroad from "@/configs/patient/dashbroad";
import fixButtonRight from "@/configs/patient/fixButtonRight";

import { useDashbroad } from "@/composables/patient/useDashbroad";

export default {
  components: {
    LeftDashbroad,
    RightDashbroad,
    MainDashbroad,
    LoadingDashbroad,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const { error, isPending, dashbroad } = useDashbroad();

    async function getAuthInfo() {
      //check auth login
      const auth = computed(() => store.getters.getAuth);
      if (!auth.value) {
        //Not login
        router.push({ name: "PatientLogin", params: {} });
      } else {
        //Call API GET USER
        const response = await dashbroad();

        if (!error.value && response.data.permission == 2) {
          //SET VALUE INFO USER
          await store.dispatch("setAuth", true);
          sessionStorage.setItem("user", JSON.stringify(response.data));
          //xử lý ở đây =>
          /* Start : Xử lý click icon,search fixed,button left right show menu */
          fixButtonRight();
          configDashbroad();
          /* End : Xử lý click icon,search fixed,button left right show menu */
        } else {
          await store.dispatch("setAuth", false);
        }
      }
    }
    getAuthInfo();

    return { error, isPending };
  },
};
</script>
