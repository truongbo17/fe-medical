<template>
  <section class="content-section">
    <div class="section-header-wrapper">
      <h1 class="section-header">Hỏi đáp</h1>
      <a class="section-header-link"> Mới nhất xếp trước </a>
    </div>
    <div class="files-table">
      <post-question />
    </div>
    <br />
    <div class="files-table">
      <post-forum />
    </div>
  </section>
</template>

<script>
import PostQuestion from "@/components/patient/forum/PostQuestion.vue";
import PostForum from "@/components/patient/forum/PostForum.vue";

export default {
  components: {
    PostQuestion,
    PostForum,
  },
};
</script>
