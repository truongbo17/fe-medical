<template>
  <section class="content-section" v-if="listMedicines != ''">
    <div class="section-header-wrapper">
      <h1 class="section-header">Danh sách thuốc,thực phẩm chức năng</h1>
      <a class="section-header-link"> Không bán theo đơn </a>
    </div>
    <div class="files-table">
      <div
        class="card-list"
        v-for="listMedicine in listMedicines"
        :key="listMedicine.id"
      >
        <article class="card">
          <figure class="card-image">
            <img
              :src="listMedicine.image"
              alt="An orange painted blue, cut in half laying on a blue background"
            />
          </figure>
          <div class="card-header">
            <a href="#">{{ listMedicine.title }}</a>
            <button
              class="icon-button"
              @click="
                addCart(listMedicine.id, listMedicine.title, listMedicine.price)
              "
            >
              <img
                src="https://img.icons8.com/external-icongeek26-flat-icongeek26/64/000000/external-cart-essentials-icongeek26-flat-icongeek26.png"
              />
            </button>
          </div>
          <p class="access-text">{{ listMedicine.description }}</p>
          <div class="card-footer">
            <div class="card-meta card-meta--views">
              <img
                src="https://img.icons8.com/office/16/000000/money--v1.png"
              />
              {{ listMedicine.price }} VNĐ
            </div>
            <div class="card-meta card-meta--date">
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
                display="block"
                id="Calendar"
              >
                <rect x="2" y="4" width="20" height="18" rx="4" />
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <path d="M2 10h20" />
              </svg>
              {{ listMedicine.created_at }}
            </div>
          </div>
        </article>
        <hr />
      </div>
      <router-link
        :to="{ name: 'PatientCart', params: {} }"
        class="fixedButton"
      >
        <a>{{ totalCart }}</a>
        <div class="roundedFixedBtn">
          <img
            src="https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/000000/external-cart-ecommerce-icongeek26-linear-colour-icongeek26.png"
          />
        </div>
      </router-link>
    </div>
  </section>
  <div class="loading" v-else>Loading&#8230;</div>
</template>

<script>
import { listMedicinesHome } from "@/composables/patient/useMedicines";
import { ref } from "vue";

export default {
  setup() {
    const { listMedicines, getListMedicines } = listMedicinesHome();
    getListMedicines();

    const totalCart = ref(0);

    var products = [];
    if (localStorage.getItem("products")) {
      products = JSON.parse(localStorage.getItem("products"));
    }

    if (totalCart.value == 0) {
      totalCart.value = products.length;
    }

    function addCart(post_id, name, price) {
      const isFind = ref(false);

      for (let index = 0; index < products.length; index++) {
        if (products[index]["productId"] == post_id) {
          products[index]["num"]++;
          localStorage.setItem("products", JSON.stringify(products));
          isFind.value = true;
          break;
        }
      }

      if (!isFind.value) {
        products.push({ productId: post_id, name: name, price: price, num: 1 });
        localStorage.setItem("products", JSON.stringify(products));
      }

      totalCart.value++;
    }

    return { addCart, listMedicines, totalCart };
  },
};
</script>

<style lang="css" scoped>
.fixedButton {
  position: fixed;
  bottom: 0px;
  right: 0px;
  padding: 20px;
}

.roundedFixedBtn {
  height: 80px;
  line-height: 80px;
  width: 80px;
  font-size: 2em;
  border-radius: 50%;
  background-color: #4caf50;
  color: white;
  text-align: center;
  cursor: pointer;
}

.roundedFixedBtn img {
  width: 90%;
  padding-top: 10px;
  padding-left: 10px;
}
.fixedButton a {
  margin-left: 60px;
  font-weight: bold;
  color: #ffffff;
  font-size: 20px;
  background-color: #ec4646;
}

img {
  max-width: 100%;
  display: block;
}

.card-list {
  width: 70%;
  margin: 0 auto;
}

.card {
  background-color: #fff;
  box-shadow: 0 0 0 1px rgba(#000, 0.05), 0 20px 50px 0 rgba(#000, 0.1);
  border-radius: 15px;
  overflow: hidden;
  padding: 1.25rem;
  position: relative;
  transition: 0.15s ease-in;
}
.card:hover,
.card:focus-within {
  box-shadow: 0 0 0 2px #16c79a, 0 10px 60px 0 rgba(#000, 0.1);
  transform: translatey(-5px);
}

.card-image {
  border-radius: 10px;
  overflow: hidden;
}

.card-header {
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-header a {
  font-weight: 600;
  font-size: 14px;
  line-height: 1.25;
  padding-right: 1rem;
  text-decoration: none;
  color: inherit;
  will-change: transform;
}
.card-header a::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

.icon-button {
  border: 0;
  background-color: #fff;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  font-size: 1.25rem;
  transition: 0.25s ease;
  box-shadow: 0 0 0 1px rgba(#000, 0.05), 0 3px 8px 0 rgba(#000, 0.15);
  z-index: 1;
  cursor: pointer;
  color: #565656;
}
.icon-button svg {
  width: 1em;
  height: 1em;
}
.icon-button:hover,
.icon-button:focus {
  background-color: #ec4646;
  color: #fff;
}

.card-footer {
  margin-top: 1.25rem;
  border-top: 1px solid #ddd;
  padding-top: 1.25rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.card-meta {
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #787878;
}
.card-meta:first-child::after {
  display: block;
  content: "";
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: currentcolor;
  margin-left: 0.75rem;
  margin-right: 0.75rem;
}
.card-meta svg {
  flex-shrink: 0;
  width: 1em;
  height: 1em;
  margin-right: 0.25em;
}
</style>
