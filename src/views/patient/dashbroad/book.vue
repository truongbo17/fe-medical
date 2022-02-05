<template>
  <form @submit.prevent="sendBook">
    <section class="content-section">
      <div class="section-header-wrapper">
        <h1 class="section-header">Đặt lịch khám</h1>
        <a class="section-header-link"> Khám trực tiếp cùng bác sĩ </a>
      </div>
      <div class="files-table">
        <div class="form__input" v-if="currentForm == 1">
          <p>Chọn bác sĩ</p>
          <select v-model="data.doctor">
            <option value="0">---Vui lòng chọn---</option>
            <option
              v-for="doctor in doctors"
              :key="doctor.id"
              :value="doctor.id"
            >
              {{ doctor.name }}
            </option>
          </select>
          <div class="access-text" style="padding: 20px">
            <div v-if="data.doctor != 0">
              <p>Thông tin chung về bác sĩ</p>
              <p>Họ tên : {{ previewDoctor.name }}</p>
              <p>Nơi công tác : {{ previewDoctor.address }}</p>
              <p>Số điện thoại : {{ previewDoctor.phone }}</p>
              <div
                style="cursor: pointer"
                @click="currentForm++"
                class="button button--filled"
              >
                Next
              </div>
            </div>
            <div v-else>
              <p>Chọn bác sĩ để xem thông tin</p>
            </div>
            <div>
              <p>
                • Bác sĩ đa khoa: Nếu bạn muốn khám sức khỏe tổng quát để phòng
                bệnh hoặc tìm ra nguyên nhân của một vấn đề sức khỏe do triệu
                chứng chung chung thì bạn có thể khám bác sĩ đa khoa.
              </p>
              <p>
                • Bác sĩ nhi khoa: Bác sĩ nhi khoa sẽ thường chịu trách nhiệm
                chăm sóc sức khỏe cho trẻ em từ sơ sinh đến 16 tuổi.
              </p>
              <p>
                • Bác sĩ chuyên khoa: Nếu bạn có vấn đề sức khỏe cần khám và
                điều trị ngay thì có thể khám bác sĩ chuyên khoa như bác sĩ sản
                khoa, phụ khoa, tim mạch, xương khớp, ung bướu…
              </p>
            </div>
          </div>
        </div>
        <div class="form__input" v-if="currentForm == 2">
          <p>Chọn khoa bệnh , thời gian khám và ghi chú</p>
          <p>Loại bệnh</p>
          <select v-model="data.medical_department">
            <option value="0">---Vui lòng chọn---</option>
            <option
              v-for="medical in listMedical"
              :key="medical.id"
              :value="medical.id"
            >
              {{ medical.name }}
            </option>
          </select>
          <p>Ngày khám</p>
          <input type="date" v-model="data.date" />
          <p>Ghi chú</p>
          <input type="text" v-model="data.note" placeholder="Nhập ghi chú" />
          <div class="access-text" style="padding: 20px">
            <div>
              <p style="color: #e30e0e; text-align: center" v-if="error">
                {{ error }}
              </p>
              <p style="color: #27bf0c; text-align: center" v-if="success">
                {{ success }}
              </p>
              <div
                style="cursor: pointer"
                @click="currentForm--"
                class="button button--filled"
              >
                Back
              </div>
              <div style="cursor: pointer" class="button button--filled">
                Submit
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </form>
</template>

<script>
import { reactive, watch, ref } from "vue";
import { useListMedicalDepartMent } from "@/composables/patient/useListMedicalDepartment";
import { doctorList } from "@/composables/patient/useDoctorList";
import { useAddSchedule } from "@/composables/patient/useAddSchedule";

export default {
  setup() {
    const data = reactive({
      medical_department: 1,
      doctor: 0,
      date: "",
      note: "",
    });
    const previewDoctor = ref({});
    const currentForm = ref(1);
    const success = ref("");

    const { getAllMedical, listMedical } = useListMedicalDepartMent();
    getAllMedical();
    const { doctors, getDoctorList } = doctorList();
    getDoctorList();

    const { error, isPending, addSchedule } = useAddSchedule();

    watch(
      () => data.doctor,
      (newSelected) => {
        previewDoctor.value = doctors.value.find(
          (findDoctor) => findDoctor.id == newSelected
        );
      }
    );

    const output = new Date().toJSON().slice(0, 10);

    async function sendBook() {
      if (
        data.date == "" ||
        data.note == "" ||
        data.doctor < 1 ||
        data.medical_department < 1
      ) {
        error.value = "Vui lòng nhập đầy đủ thông tin";
      } else if (data.date < output) {
        error.value = "Vui lòng chọn ngày khám bắt đầu từ ngày mai";
      } else {
        const res = await addSchedule(data);
        if (!error.value) {
          success.value = `Đặt lịch khám ngày ${res.data.date} thành công !`;
          data.medical_department = 1;
          data.doctor = 0;
          data.date = "";
          data.note = "";
        }
      }
    }

    return {
      sendBook,
      success,
      error,
      previewDoctor,
      data,
      listMedical,
      doctors,
      currentForm,
      isPending,
    };
  },
};
</script>

<style lang="css" scoped>
.form__input > select,
input {
  width: 100%;
  outline: none;
  border-color: #1da1f2;
  border-style: solid;
  border-radius: 10px;
  padding: 0.5rem;
  font-size: var(--fs-md);
  font-family: var(--font-family);
  margin-top: 10px;
  transition: border-color 0.1s ease-in-out;
}

.form__input > select:focus {
  border-color: #1100ff;
}

.button {
  display: block;
  width: 100%;
  border: none;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  background-color: transparent;
  text-align: center;
  transition: box-shadow 0.3s ease, trasnform 0.2s ease-in;
}

button:hover {
  box-shadow: 0 20px 30px -11px #3275f7;
  transform: scale(1.01);
  cursor: pointer;
}

.button--filled {
  color: white;
  background-color: #3275f7;
}

.button--outlined {
  border-color: var(--clr-primary);
  border-style: solid;
  color: var(--clr-primary);
}

p {
  font-size: 14px;
  line-height: 16px;
  margin-left: 5px;
  margin-bottom: 5px;
}
</style>
