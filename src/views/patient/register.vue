<template>
  <div class="container">
    <div class="image__wrapper">
      <img :src="require('@/assets/img/image1.svg')" alt="vector" />
    </div>
    <div class="form__wrapper">
      <form
        autocomplete="off"
        @submit.prevent="submitRegister"
        @keydown.enter.prevent
        novalidate
      >
        <!-- Step One -->
        <div class="form" :class="{ active: currentForm == 1 }">
          <h1 class="form__title">BoMedical - Đăng kí</h1>
          <p class="form__subtitle">Thông tin cơ bản</p>

          <div class="form__input" :class="{ 'form--error': error }">
            <input type="text" v-model="data.name" placeholder="Họ tên" />
          </div>
          <div class="form__input" :class="{ 'form--error': error }">
            <input
              type="text"
              v-model="data.phone"
              placeholder="Số điện thoại"
            />
          </div>
          <div class="form__input" :class="{ 'form--error': error }">
            <input type="text" v-model="data.address" placeholder="Địa chỉ" />
          </div>
          <p class="form__subtitle error" v-if="error">
            {{ error }}
          </p>
          <div class="button__wrapper">
            <button type="button" class="button button--filled" @click="next">
              Next
            </button>
          </div>
        </div>
        <!-- Step Two -->
        <div class="form" :class="{ active: currentForm == 2 }">
          <h1 class="form__title">BoMedical - Đăng kí</h1>
          <p class="form__subtitle">Thông tin đăng nhập</p>

          <div class="form__input" :class="{ 'form--error': error }">
            <input v-model="data.email" type="email" placeholder="Email" />
          </div>
          <div class="form__input" :class="{ 'form--error': error }">
            <input
              v-model="data.password"
              type="password"
              placeholder="Mật khẩu"
            />
          </div>
          <div class="form__input" :class="{ 'form--error': error }">
            <input
              v-model="data.confirm_password"
              type="password"
              placeholder="Nhập lại mật khẩu"
            />
          </div>
          <p class="form__subtitle error" v-if="error">
            {{ error }}
          </p>
          <div class="button__wrapper">
            <button type="button" class="button button--filled" @click="next">
              Next
            </button>
            <button type="button" class="button button--outlined" @click="back">
              Back
            </button>
          </div>
        </div>

        <!--Step Three-->

        <div class="form" :class="{ active: currentForm == 3 }">
          <h1 class="form__title">BoMedical - Đăng kí</h1>
          <p class="form__subtitle">Tình trạng sức khỏe</p>

          <div class="form__input" :class="{ 'form--error': error }">
            <label>Cân nặng</label>
            <input type="number" v-model="data.weight" placeholder="Cân nặng" />
          </div>
          <div class="form__input" :class="{ 'form--error': error }">
            <label>Chiều cao</label>
            <input
              type="number"
              v-model="data.height"
              placeholder="Chiều cao"
            />
          </div>
          <div class="form__input" :class="{ 'form--error': error }">
            <label>Bệnh liên quan</label>
            <select v-model="data.medical_department">
              <option value="" selected>Chọn bệnh</option>
              <option
                v-for="medical in listMedical"
                :key="medical.id"
                :value="medical.id"
              >
                {{ medical.name }}
              </option>
            </select>
          </div>
          <p class="form__subtitle error" v-if="error">
            {{ error }}
          </p>
          <div class="button__wrapper">
            <button type="submit" class="button button--filled">
              <i class="fa fa-spinner fa-spin" v-if="isPending"></i>
              <div v-if="!isPending">Submit</div>
            </button>
            <button type="button" class="button button--outlined" @click="back">
              Back
            </button>
          </div>
        </div>
      </form>
      <p>
        Đã có tài khoản ?
        <router-link :to="{ name: 'PatientLogin', params: {} }"
          >Đăng nhập ngay</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useRegister } from "../../composables/patient/useRegister";
import { useListMedicalDepartMent } from "@/composables/patient/useListMedicalDepartment";

export default {
  name: "PatientRegister",
  setup() {
    const store = useStore();

    /* Start : Xử lý authentication  */
    onMounted(() => {
      //Đăng nhập rồi thì sẽ không vào trang Login được
      const auth = computed(() => store.getters.getAuth);
      if (auth.value) {
        router.push({ name: "PatientDashbroad", params: {} });
      }
    });

    //Start : GET API ALL LIST Medical_department
    const { getAllMedical, listMedical } = useListMedicalDepartMent();
    getAllMedical();
    //End : GET API ALL LIST Medical_department

    const router = useRouter();
    const currentForm = ref(1);
    const data = reactive({
      name: "",
      phone: "",
      address: "",
      email: "",
      password: "",
      confirm_password: "",
      weight: 0,
      height: 0,
      medical_department: "",
    });
    const { error, isPending, register } = useRegister();

    /* Start : Xử lý Step Form */
    function next() {
      if (
        (currentForm.value == 1) &
        (data.name != "") &
        (data.phone != "") &
        (data.address != "")
      ) {
        //form 1 -> 2
        currentForm.value = currentForm.value + 1;
      } else if (
        (currentForm.value == 2) &
        (data.email != "") &
        (data.password != "") &
        (data.confirm_password != "") &
        (data.password == data.confirm_password) &
        /\S+@\S+\.\S+/.test(data.email)
      ) {
        //form 2 -> 3
        currentForm.value = currentForm.value + 1;
      } else {
        error.value = "Vui lòng nhập thông tin chính xác";
      }
    }
    function back() {
      currentForm.value = currentForm.value - 1;
    }
    /* End : Xử lý Step Form */

    // Xóa class form validate khi nhập giá trị mới
    const callback = () => {
      error.value = null;
      isPending.value = false;
    };
    watch(() => ({ ...data }), callback);

    /* Start : Xử lý đăng kí API */
    const submitRegister = async () => {
      if (
        (data.weight <= 0) |
        (data.height <= 0) |
        (data.medical_department <= 0)
      ) {
        error.value = "Nhập đầy đủ cân nặng,chiều cao và bệnh liên quan";
      } else {
        await register(data);
        // SET AUTH
        if (!error.value) {
          await router.push({
            name: "PatientLogin",
            params: { resgister: "success" },
          });
        }
      }
    };
    /* End : Xử lý đăng kí API */

    /* Return */
    return {
      data,
      currentForm,
      error,
      isPending,
      next,
      back,
      submitRegister,
      listMedical,
    };
  },
};
</script>

<style scoped>
@import "../../assets/style/form.css";
</style>
