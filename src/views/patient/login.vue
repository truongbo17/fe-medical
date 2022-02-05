<template>
  <div class="container">
    <div class="image__wrapper">
      <img :src="require('@/assets/img/image1.svg')" alt="vector" />
    </div>

    <div class="form__wrapper">
      <form autocomplete="off" @submit.prevent="submitLogin">
        <div class="form active">
          <h1 class="form__title">BoMedical - Đăng nhập</h1>
          <p class="form__subtitle" v-if="$route.params.resgister">
            Đăng kí thành công,vui lòng đăng nhập
          </p>
          <p class="form__subtitle" v-else>Đăng nhập bệnh nhân</p>

          <div class="form__input" :class="{ 'form--error': error }">
            <input v-model="email" type="text" placeholder="Email" />
          </div>
          <div class="form__input" :class="{ 'form--error': error }">
            <input v-model="password" type="password" placeholder="Mật khẩu" />
          </div>
          <p class="form__subtitle error" v-if="error">
            {{ error }}
          </p>
          <div class="button__wrapper">
            <button type="submit" class="button button--filled">
              <i class="fa fa-spinner fa-spin" v-if="isPending"></i>
              <div v-if="!isPending">Submit</div>
            </button>
            <p>
              Chưa có tài khoản ?
              <router-link :to="{ name: 'PatientRegister', params: {} }"
                >Đăng kí ngay</router-link
              >
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useLogin } from "../../composables/patient/useLogin";

export default {
  setup() {
    const store = useStore();
    const email = ref("");
    const password = ref("");
    const { error, isPending, login } = useLogin();
    const router = useRouter();

    /* Start : Xử lý authentication  */
    onMounted(() => {
      //Đăng nhập rồi thì sẽ không vào trang Login được
      const auth = computed(() => store.getters.getAuth);
      if (auth.value) {
        router.push({ name: "PatientDashbroad", params: {} });
      }
    });
    /* End : Xử lý authentication  */

    // Xóa class form validate khi nhập giá trị mới
    watch([email, password], () => {
      error.value = null;
      isPending.value = false;
    });

    //Call API Login
    async function submitLogin() {
      if (email.value === "" || password.value == "") {
        error.value = "Vui lòng nhập tài khoản và mật khẩu";
      } else {
        const response = await login(email.value, password.value);

        // SET AUTH
        if (!error.value && response.data.user.permission == 2) {
          //set auth
          await sessionStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
          );
          await store.dispatch("setAuth", true);
          await store.dispatch("setUserInfo", response.data.user);

          await router.push({ name: "PatientDashbroad", params: {} });
        }
      }
    }

    //Return
    return {
      email,
      password,
      error,
      isPending,
      useLogin,
      submitLogin,
    };
  },
};
</script>

<style scoped>
@import "../../assets/style/form.css";
</style>
