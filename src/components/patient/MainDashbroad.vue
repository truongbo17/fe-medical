<template>
  <div class="main-area">
    <button class="btn-show-right-area">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-chevron-left"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>
    <button class="btn-show-left-area">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>
    <div class="main-area-header">
      <div class="search-wrapper" id="searchLine">
        <input
          class="search-input"
          type="text"
          placeholder="Tìm kiếm vấn đề bạn đang gặp"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="feather feather-search"
          viewBox="0 0 24 24"
        >
          <defs />
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </div>
    </div>
    <section class="content-section">
      <h1 class="section-header">Dịch vụ</h1>
      <div class="access-links">
        <div
          class="access-link-wrapper"
          v-for="iconMain in iconDashbroadMain"
          :key="iconMain.name"
        >
          <router-link
            :to="iconMain.route"
            style="text-decoration: none; color: inherit"
          >
            <div class="access-icon" v-html="iconMain.icon"></div
          ></router-link>
          <span class="access-text">{{ iconMain.name }}</span>
        </div>
      </div>
    </section>
    <div>
      <slot />
    </div>
    <footer style="padding-top: 20px">
      <div class="files-table">
        <p class="access-text">
          Tất cả nội dung và hình ảnh trên App đều là giả định,bất cứ đơn hàng
          nào cũng không được giao , lịch khám cũng không thực hiện nhằm mục
          đích thử nghiệm website
        </p>
        <p class="access-text">
          Nếu có khiếu nại gì về thông tin và hình ảnh vui lòng liên hệ để gỡ bỏ
        </p>
        <p class="access-text">
          Copyright 2021 - TruongBo | BoMedical SPA WEBAPP
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import { reactive } from "vue";
import { ICON_DASHBROAD_MAIN } from "@/configs/iconLeftDashbroad";
export default {
  setup() {
    const iconDashbroadMain = reactive(ICON_DASHBROAD_MAIN);

    return { iconDashbroadMain };
  },
};
</script>
