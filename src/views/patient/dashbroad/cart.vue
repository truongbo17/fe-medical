<template>
  <section class="content-section">
    <div class="section-header-wrapper">
      <h1 class="section-header">Danh sách đơn hàng</h1>
      <a class="section-header-link"> Mua càng nhiều giá vẫn vậy </a>
    </div>
    <div v-if="listCart != ''">
      <div class="files-table" v-if="currentForm == 1">
        <div class="files-table-header">
          <div class="column-header table-cell">Tên</div>
          <div class="column-header table-cell">Giá</div>
          <div class="column-header table-cell size-cell">Số lượng</div>
          <div class="column-header table-cell size-cell">Tổng</div>
          <div class="column-header table-cell">Xóa</div>
        </div>
        <div
          class="files-table-row"
          v-for="product in listCart"
          :key="product.id"
        >
          <div class="table-cell">
            {{ product.name }}
          </div>
          <div class="table-cell">{{ product.price }} VNĐ</div>
          <div class="table-cell">{{ product.num }}</div>
          <div class="table-cell">{{ product.num * product.price }} VNĐ</div>
          <div class="table-cell action-cell">
            <img
              @click="removeCart(product.productId)"
              style="width: 60%; cursor: pointer"
              src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/000000/external-remove-interface-dreamstale-lineal-dreamstale.png"
            />
          </div>
        </div>
      </div>
      <div v-if="currentForm == 2">
        <div class="files-table" style="text-align: center">
          <i class="fa fa-check" style="color: green"></i>
          <span class="access-text"
            >Đặt hàng thành công,vui lòng chờ xác nhận. Đơn hàng sẽ được gửi đến
            địa chỉ của bạn cung cấp sớm nhất</span
          >
        </div>
      </div>
      <div>
        <div
          style="cursor: pointer"
          @click="submitCart"
          v-if="currentForm == 1"
          class="button button--filled"
        >
          Xác nhận
        </div>
        <div v-if="currentForm == 2" class="button button--filled">
          <router-link
            style="text-decoration: none; color: inherit"
            :to="{ name: 'PatientShop', params: {} }"
            >Tiếp tục mua sắm</router-link
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { useAddCart } from "@/composables/patient/useAddCart";

export default {
  setup() {
    const listCart = ref([]);
    const currentForm = ref(1);
    const { error, addCart } = useAddCart();

    listCart.value = JSON.parse(localStorage.getItem("products"));

    function removeCart(product_id) {
      var index = listCart.value.findIndex(function (o) {
        return o.productId === product_id;
      });
      if (index !== -1) listCart.value.splice(index, 1);

      localStorage.setItem("products", JSON.stringify(listCart.value));
    }

    async function submitCart() {
      if (listCart.value.length > 0) {
        for (let index = 0; index < listCart.value.length; index++) {
          await addCart(listCart.value[index]);
          if (!error.value) {
            currentForm.value++;
            localStorage.removeItem("products");
          }
        }
      }
    }

    return { listCart, removeCart, submitCart, currentForm, error };
  },
};
</script>

<style lang="css">
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
</style>
