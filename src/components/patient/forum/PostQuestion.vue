<template>
  <div>
    <form @submit.prevent="onSubmit" @keydown.enter.prevent>
      <div class="head">
        <div class="name_profile">
          <img :src="user.avatar" class="avatar" />
          <div class="q">
            <h4>{{ user.name }}</h4>
          </div>
        </div>
        <div class="icon">
          <label for="fileimage"
            ><div class="icon">
              <img
                :src="require('@/assets/img/add-image.png')"
                class="svg"
              /></div
          ></label>
          <img
            v-if="data.previewImage"
            :src="data.previewImage"
            class="img-responsive"
            height="70"
            width="90"
            style="border: 1px solid #1da1f2"
          />
          <input
            v-on:change="onImageChange"
            id="fileimage"
            type="file"
            accept="image/png, image/gif, image/jpeg"
            hidden
          />
        </div>
      </div>
      <div class="body">
        <div class="btm_icon form__input">
          <select v-model="data.medical_department">
            <option
              v-for="medical in listMedical"
              :key="medical.id"
              :value="medical.id"
            >
              {{ medical.name }}
            </option>
          </select>
        </div>
        <div class="form">
          <div class="flex">
            <textarea
              v-model="data.context"
              class="in"
              rows="5"
              placeholder="Nhập câu hỏi của bạn"
              wrap="hard"
              maxlength="500"
            ></textarea>
          </div>
          <button>
            <img
              :src="require('@/assets/img/post/send.svg')"
              class="svg margin"
            />
          </button>
        </div>
      </div>
    </form>
    <p style="text-align: center; color: #a70000" v-if="error">
      {{ error }}
    </p>
    <p style="text-align: center; color: rgb(16 189 53)" v-if="success">
      {{ success }}
    </p>
  </div>
  <div class="loading" v-if="isPending">Loading&#8230;</div>
</template>

<script>
import { useListMedicalDepartMent } from "@/composables/patient/useListMedicalDepartment";
import { usePostQuestion } from "@/composables/patient/usePostQuestion";
import { reactive, ref } from "vue";

export default {
  setup() {
    const data = reactive({
      previewImage: "",
      context: "",
      medical_department: 1,
    });

    const { error, isPending, addPostQuestion } = usePostQuestion();
    const user = JSON.parse(sessionStorage.getItem("user"));
    const success = ref("");

    const { getAllMedical, listMedical } = useListMedicalDepartMent();
    getAllMedical();

    function onImageChange(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        data.previewImage = e.target.result;
      };
    }

    //send post question
    async function onSubmit() {
      if (data.context != "" && data.medical_department > 0) {
        await addPostQuestion(data);
        if (!error.value) {
          success.value =
            "Đăng câu hỏi thành công,vui lòng chờ đợi được xét duyệt";

          data.previewImage = "";
          data.context = "";
          data.medical_department = 1;
        }
      } else {
        error.value = "Vui lòng nhập đầy đủ thông tin câu hỏi";
      }
    }
    return {
      isPending,
      error,
      success,
      onSubmit,
      onImageChange,
      user,
      data,
      listMedical,
    };
  },
};
</script>

<style lang="css" scoped>
button,
input[type="submit"],
input[type="reset"] {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}
.form__input > select {
  width: 100%;
  outline: none;
  border-color: #1da1f2;
  border-style: solid;
  border-radius: 10px;
  padding: 0.5rem;
  font-size: var(--fs-md);
  font-family: var(--font-family);

  transition: border-color 0.1s ease-in-out;
}

.form__input > select:focus {
  border-color: var(--clr-primary-light);
}

.head {
  display: flex;
  border-radius: 10px;
  padding: 15px;
  padding-bottom: 0;
  background: white;
  align-items: center;
  justify-content: space-between;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50px;
}
.name_profile {
  display: flex;
  align-items: center;
}
.q {
  margin-left: 10px;
}

.q p {
  margin-top: 0;
  color: grey;
  font-size: 13px;
}
.svg {
  height: 23px;
  width: 23px;
}
.body {
  padding-left: 15px;
  padding-right: 15px;
}
.body p {
  padding-top: 10px;
  font-size: 14px;
}

.btm_icon {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.margin {
  cursor: pointer;
  margin-left: 15px;
}

.form {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ico {
  width: 40px;
  height: 40px;
  border-radius: 50px;
}
.in {
  background: transparent;
  border: none;
  outline: none;
  margin-left: 15px;
}
.flex {
  width: 90%;
  display: flex;
  align-items: center;
}

.flex textarea {
  width: 100%;
}

.form {
  background: #d3d3d347;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  margin-top: 20px;
}

/* Absolute Center Spinner */
.loading {
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: visible;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

/* :not(:required) hides these rules from IE9 and below */
.loading:not(:required) {
  /* hide "loading..." text */
  font: 0/0 a;
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}

.loading:not(:required):after {
  content: "";
  display: block;
  font-size: 10px;
  width: 1em;
  height: 1em;
  margin-top: -14.5em;
  -webkit-animation: spinner 1500ms infinite linear;
  -moz-animation: spinner 1500ms infinite linear;
  -ms-animation: spinner 1500ms infinite linear;
  -o-animation: spinner 1500ms infinite linear;
  animation: spinner 1500ms infinite linear;
  border-radius: 0.5em;
  -webkit-box-shadow: rgba(0, 0, 0, 0.75) 1.5em 0 0 0,
    rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) 0 1.5em 0 0,
    rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0, rgba(0, 0, 0, 0.5) -1.5em 0 0 0,
    rgba(0, 0, 0, 0.5) -1.1em -1.1em 0 0, rgba(0, 0, 0, 0.75) 0 -1.5em 0 0,
    rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;
  box-shadow: rgba(0, 0, 0, 0.75) 1.5em 0 0 0,
    rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) 0 1.5em 0 0,
    rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) -1.5em 0 0 0,
    rgba(0, 0, 0, 0.75) -1.1em -1.1em 0 0, rgba(0, 0, 0, 0.75) 0 -1.5em 0 0,
    rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;
}

/* Animation */

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-moz-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-o-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
