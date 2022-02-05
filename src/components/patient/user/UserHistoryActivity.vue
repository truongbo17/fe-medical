<template>
  <section class="content-section" v-if="historyCart != ''">
    <div class="section-header-wrapper">
      <h1 class="section-header">Lịch sử hoạt động</h1>
      <a class="section-header-link"> ------ </a>
    </div>
    <div class="files-table">
      <div class="files-table-header">
        <div class="column-header table-cell">Hành động</div>
        <div class="column-header table-cell">Bài viết</div>
        <div class="column-header table-cell">Thời gian</div>
      </div>
      <div
        class="files-table-row"
        v-for="history in likeHistory"
        :key="history.id"
      >
        <div class="table-cell">Like</div>
        <div class="table-cell">
          {{ history.get_name_post.context }}
        </div>
        <div class="table-cell">{{ history.get_name_post.created_at }}</div>
      </div>
    </div>
  </section>
</template>

<script>
import { useHistoryCart } from "@/composables/patient/useHistoryCart";
import { useHistoryLike } from "@/composables/patient/useHistoryLike";
import { ref } from "vue";

export default {
  setup() {
    const likeHistory = ref([]);
    const { historyCart, getHistoryCart } = useHistoryCart();

    const { getHistoryLike } = useHistoryLike();

    async function getHistory() {
      likeHistory.value = await getHistoryLike();
    }

    getHistoryCart();
    getHistory();

    return { likeHistory, historyCart };
  },
};
</script>
