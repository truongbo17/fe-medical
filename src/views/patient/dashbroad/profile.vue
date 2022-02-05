<template>
  <user-info> </user-info>
  <user-history-activity></user-history-activity>
  <user-history-cart></user-history-cart>
</template>

<script>
import UserInfo from "@/components/patient/user/UserInfo.vue";
import UserHistoryActivity from "@/components/patient/user/UserHistoryActivity.vue";
import UserHistoryCart from "@/components/patient/user/UserHistoryCart.vue";

export default {
  components: {
    UserInfo,
    UserHistoryActivity,
    UserHistoryCart,
  },
};
</script>
