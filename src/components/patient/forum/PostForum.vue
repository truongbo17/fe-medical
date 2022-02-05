<template>
  <div v-if="!isPending">
    <div
      class="post"
      v-for="postforumlist in postForum"
      :key="postforumlist.id"
    >
      <div class="head">
        <div class="name_profile">
          <img :src="postforumlist.user_name.avatar" class="avatar" />
          <div class="q">
            <h4>{{ postforumlist.user_name.name }}</h4>
            <p>{{ postforumlist.created_at }}</p>
          </div>
        </div>
        <div class="icon">
          <img :src="require('@/assets/img/post/ore.svg')" class="svg" />
        </div>
      </div>
      <div class="body">
        <p>
          {{ postforumlist.context }}
        </p>
        <img
          class="post_image"
          :src="postforumlist.images"
          v-if="postforumlist.images"
        />
        <div class="btm_icon">
          <div class="left_icon">
            <div v-for="liked in likeHistory" :key="liked.post_id">
              <div
                @click="sendLike(postforumlist.id)"
                v-if="liked.post_id === postforumlist.id"
              >
                <img
                  @click="toggle"
                  class="svg margin heart"
                  :class="
                    liked.post_id === postforumlist.id ? 'hearted' : 'heart'
                  "
                />
              </div>
            </div>
            {{ postforumlist.total_like_count }}
            <img
              :src="require('@/assets/img/post/comment.svg')"
              class="svg margin"
            />
            {{ postforumlist.comments_count }}
            <img
              :src="require('@/assets/img/post/share.svg')"
              class="svg margin"
            />
          </div>
          <div class="right_icon">
            {{ postforumlist.medicaldepartment_name.name }}
          </div>
        </div>
        <form>
          <div class="flex">
            <img :src="avatarCurrentUser" class="ico" />
            <input type="text" placeholder="Enter Text..." class="in" />
          </div>
          <img
            :src="require('@/assets/img/post/send.svg')"
            class="svg margin"
          />
        </form>
      </div>
    </div>
  </div>
  <div class="loading" v-if="isPending">Loading&#8230;</div>
</template>

<script>
import { useHistoryLike } from "@/composables/patient/useHistoryLike";
import { usePostForum } from "@/composables/patient/usePostForum";
import { ref, onMounted } from "vue";
import { useSendLike } from "@/composables/patient/likePost";

export default {
  setup() {
    const likeHistory = ref([]);
    const postForum = ref([]);

    const { error, isPending, postListForum } = usePostForum();
    const { errorHistoryLike, isPendingHistoryLike, getHistoryLike } =
      useHistoryLike();
    const { errorsendLike, sendLikePost } = useSendLike();

    const user = JSON.parse(sessionStorage.getItem("user"));
    const avatarCurrentUser = user.avatar;

    onMounted(async () => {
      if (errorHistoryLike != "" && error != "") {
        likeHistory.value = await getHistoryLike();
        postForum.value = await postListForum();
      }
    });

    function toggle(event) {
      event.target.classList.toggle("hearted");
    }

    async function sendLike(post_id) {
      const findPost = postForum.value.find((x) => x.id === post_id);

      //send api like
      const totallike = await sendLikePost(post_id);
      if (!errorsendLike.value) {
        findPost.total_like_count = totallike[0].total_like_count;
      }
    }

    return {
      sendLike,
      error,
      toggle,
      isPending,
      postForum,
      avatarCurrentUser,
      isPendingHistoryLike,
      likeHistory,
    };
  },
};
</script>

<style lang="css" scoped>
.heart {
  content: url("../../../assets/img/post/heart.svg");
}

.hearted {
  content: url("../../../assets/img/post/hearted.svg");
}

.post {
  border-radius: 10px;
  background: white;
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
.q h4 {
  margin-bottom: 8px;
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
.post_image {
  margin: auto;
  height: auto;
  width: 100%;
  margin-top: 10px;
  border-radius: 10px;
}
.btm_icon {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.left_icon {
  margin-left: 10px;
  margin-top: 15px;
  display: flex;
}
.margin {
  cursor: pointer;
  margin-left: 15px;
}
.right_icon {
  margin-top: 15px;
}
form {
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

.flex input {
  width: 100%;
}

form {
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
  margin-top: -0.5em;
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
