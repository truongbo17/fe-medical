<template>
  <section class="content-section" v-if="historyCart != ''">
    <div class="section-header-wrapper">
      <h1 class="section-header">Lịch sử mua hàng</h1>
      <a class="section-header-link"> ------ </a>
    </div>
    <div class="files-table">
      <div class="files-table-header">
        <div class="column-header table-cell">Tên</div>
        <div class="column-header table-cell">Giá</div>
        <div class="column-header table-cell size-cell">Số lượng</div>
        <div class="column-header table-cell size-cell">Tổng</div>
        <div class="column-header table-cell size-cell">Ngày</div>
        <div class="column-header table-cell size-cell">Status</div>
      </div>
      <div
        class="files-table-row"
        v-for="history in historyCart"
        :key="history.id"
      >
        <div class="table-cell">
          {{ history.get_name_medicines.title }}
        </div>
        <div class="table-cell">{{ history.price }} VNĐ</div>
        <div class="table-cell">{{ history.num }}</div>
        <div class="table-cell">{{ history.num * history.price }} VNĐ</div>
        <div class="table-cell">{{ history.created_at }}</div>
        <div class="table-cell" v-if="history.status == 0">Chờ</div>
        <div class="table-cell" v-if="history.status == 1">Xác nhận</div>
      </div>
    </div>
  </section>
</template>

<script>
import { useHistoryCart } from "@/composables/patient/useHistoryCart";

export default {
  setup() {
    const { historyCart, getHistoryCart } = useHistoryCart();

    getHistoryCart();

    return { historyCart };
  },
};
</script>
