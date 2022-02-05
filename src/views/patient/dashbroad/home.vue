<template>
  <section class="content-section">
    <div class="section-header-wrapper">
      <h1 class="section-header">Tổng quan</h1>
      <router-link
        :to="{ name: 'PatientBook', params: {} }"
        class="section-header-link"
      >
        Đặt lịch ngay
      </router-link>
    </div>
    <div class="content-section-line">
      <div
        class="section-part left"
        v-for="preview in listPreview"
        :key="preview.id"
        style="margin-right: 10px"
      >
        <a class="image-wrapper">
          <div class="image-overlay">
            <div class="video-info">
              <div class="video-info-text">
                <p class="video-name medium">{{ preview.title }}</p>
                <p class="video-subtext medium">{{ preview.context }}</p>
              </div>
            </div>
          </div>
          <img :src="preview.image" />
          <span class="video-time">{{ preview.note }}</span>
        </a>
      </div>
    </div>
  </section>
  <section class="content-section">
    <doctor-preview />
  </section>
  <section class="content-section">
    <div class="section-header-wrapper">
      <h1 class="section-header">Bài viết nổi bật</h1>
      <router-link
        :to="{ name: 'PatientForum', params: {} }"
        class="section-header-link"
      >
        Tất cả bài viết
      </router-link>
    </div>
    <div class="files-table">
      <post-home />
    </div>
  </section>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { previewHome } from "@/composables/patient/previewHome";
import PostHome from "@/components/patient/home/PostHome.vue";
import DoctorPreview from "@/components/patient/home/DoctorPreview.vue";
export default {
  components: {
    PostHome,
    DoctorPreview,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    async function getAuthInfo() {
      //check auth login
      const auth = computed(() => store.getters.getAuth);
      if (!auth.value) {
        //auth
        router.push({ name: "PatientLogin", params: {} });
      }
    }
    getAuthInfo();
    const { listPreview, getAllPreview } = previewHome();
    getAllPreview();

    return { listPreview };
  },
};
</script>
