<template>
  <div class="right-area">
    <button class="btn-close-right">
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
    <div class="right-area-header-wrapper">
      <p class="right-area-header">Hi ! {{ user.name }}</p>
      <div class="image-wrapper-avatar" @click="setUser">
        <img :src="user.avatar" />
      </div>
    </div>
    <div class="download-item-line">
      <div class="line-header">Thông tin chung</div>
      <div
        class="download-area"
        :style="{ background: statusBMI ? '#364eba' : '#d41515' }"
      >
        <div class="download-item-icon">
          <i class="fa fa-tasks" aria-hidden="true"></i>
        </div>
        <div class="download-item-texts">
          <p class="download-text-header">{{ user.weight }} Kilogam</p>
          <p class="download-text-info" style="color: white" v-if="statusBMI">
            Đạt chuẩn cân nặng
          </p>
          <p class="download-text-info" v-else style="color: white">
            Chưa đạt chuẩn cân nặng
          </p>
        </div>
        <div class="download-icon">
          <i
            class="fa"
            :class="statusBMI ? 'fa-check-circle' : 'fa-exclamation-triangle'"
            aria-hidden="true"
          ></i>
        </div>
      </div>
      <div
        class="download-area"
        :style="{ background: statusBMI ? '#aba00f' : '#d41515' }"
      >
        <div class="download-item-icon">
          <i class="fa fa-arrow-circle-o-up" aria-hidden="true"></i>
        </div>
        <div class="download-item-texts">
          <p class="download-text-header">{{ user.height }} cm</p>
          <p class="download-text-info" style="color: white" v-if="statusBMI">
            Đạt chuẩn chiều cao
          </p>
          <p class="download-text-info" v-else style="color: white">
            Chưa đạt chuẩn chiều cao
          </p>
        </div>
        <div class="download-icon">
          <i
            class="fa"
            :class="statusBMI ? 'fa-check-circle' : 'fa-exclamation-triangle'"
            aria-hidden="true"
          ></i>
        </div>
      </div>
      <div
        class="download-area"
        :style="{ background: statusBMI ? '#12ab0f' : '#d41515' }"
      >
        <div class="download-item-icon">
          <i class="fa fa-certificate" aria-hidden="true"></i>
        </div>
        <div class="download-item-texts">
          <p class="download-text-header">BMI : {{ bmiValue }}</p>
          <p class="download-text-info" style="color: white">
            {{ messageBMI }}
          </p>
        </div>
        <div class="download-icon">
          <i
            class="fa"
            :class="statusBMI ? 'fa-check-circle' : 'fa-exclamation-triangle'"
            aria-hidden="true"
          ></i>
        </div>
      </div>
    </div>
    <div class="download-item-line">
      <div class="line-header">Đề xuất cho bạn</div>
      <div class="download-area" style="background-color: #de6012">
        <div class="download-item-icon">
          <i class="fa fa-cutlery" aria-hidden="true"></i>
        </div>
        <div class="download-item-texts">
          <p class="download-text-header">Ăn uống</p>
          <p
            class="download-text-info"
            style="color: white"
            v-if="offerStatus == 1"
          >
            Ăn nhiều vào,chia thành nhiều bữa
          </p>
          <p
            class="download-text-info"
            style="color: white"
            v-else-if="offerStatus == 2"
          >
            Ăn uống điều độ,giữ cơ thể ổn định
          </p>
          <p
            class="download-text-info"
            style="color: white"
            v-else-if="offerStatus == 3"
          >
            Hạn chế đồ dầu mỡ,nước ngọt có gas
          </p>
          <p class="download-text-info" style="color: white" v-else>
            Không nên ăn nữa !
          </p>
        </div>
        <div class="download-icon">
          <i class="fa fa-hand-rock-o" aria-hidden="true"></i>
        </div>
      </div>
      <div class="download-area" style="background-color: #17888a">
        <div class="download-item-icon">
          <i class="fa fa-male" aria-hidden="true"></i>
        </div>
        <div class="download-item-texts">
          <p class="download-text-header">Thể dục</p>
          <p class="download-text-info" style="color: white">
            Tích cực vận động thể dục thể thao
          </p>
        </div>
        <div class="download-icon">
          <i class="fa fa-heartbeat" aria-hidden="true"></i>
        </div>
      </div>
      <div class="download-area" style="background-color: #b51818">
        <div class="download-item-icon">
          <i class="fa fa-eye" aria-hidden="true"></i>
        </div>
        <div class="download-item-texts">
          <p class="download-text-header">Tích cực</p>
          <p class="download-text-info" style="color: white">
            Nghĩ tích cực,tránh xa tệ nạn xã hội
          </p>
        </div>
        <div class="download-icon">
          <i class="fa fa-level-up" aria-hidden="true"></i>
        </div>
      </div>
    </div>
    <div class="right-area-header-wrapper">
      <p class="right-area-header">Lịch khám sắp tới</p>
    </div>
    <div
      class="received-item-line"
      v-for="schedulelist in scheduleList"
      :key="schedulelist.id"
    >
      <div class="progress-line">
        <span class="time start">07:30 - 11:30 13:30 - 17:00</span>
        <span class="time end">{{ schedulelist.date }}</span>
      </div>
      <div class="received-items-content">
        <div class="received-files-info">
          Lịch khám
          <span class="info-purple">{{
            schedulelist.medicaldepartment_name.name
          }}</span>
          ngày
          <span class="info-purple">{{ schedulelist.date }}</span>
          cùng bác sĩ
          <span class="info-purple">{{ schedulelist.user_name.name }}</span>
        </div>
      </div>
    </div>
    <div class="received-item-line" v-if="!scheduleList">
      <div class="progress-line">
        <span class="time start"></span>
        <span class="time end">07:30 - 11:30 13:30 - 17:00</span>
      </div>
      <div class="received-items-content">
        <div class="received-files-info">Chưa có lịch khám nào</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { scheduleListHome } from "@/composables/patient/useScheduleList";

export default {
  setup() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const { scheduleList, getScheduleList } = scheduleListHome();
    getScheduleList();

    const bmiValue = computed(() =>
      (user.weight / ((user.height / 100) * (user.height / 100))).toFixed(2)
    );
    let messageBMI = "";
    let statusBMI = false;
    let offerStatus = 0;

    if (bmiValue.value < 18.5) {
      messageBMI = "Thiếu cân";
      statusBMI = false;
      offerStatus = 1;
    } else if (bmiValue.value >= 18.5 && bmiValue.value <= 24.9) {
      messageBMI = "Khỏe mạnh";
      statusBMI = true;
      offerStatus = 2;
    } else if (bmiValue.value >= 25 && bmiValue.value <= 29) {
      messageBMI = "Thừa cân";
      statusBMI = true;
      offerStatus = 3;
    } else {
      messageBMI = "Béo phì";
      statusBMI = false;
      offerStatus = 4;
    }

    //Return
    return { scheduleList, user, bmiValue, messageBMI, statusBMI, offerStatus };
  },
};
</script>
