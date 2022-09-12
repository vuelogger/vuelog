<template>
  <div class="guestbook">
    <header class="guestbook__head">
      <img class="profile-img" src="~/assets/images/logo.png" />
      <div class="info">
        <strong class="info__name">VueLog</strong>
        <div class="info__count">
          <img class="ico" src="~/assets/images/ico/speech_bubble.png" />
          <div class="curr">{{ currMsgNum }}</div>
          <div class="div">/</div>
          <div class="total">{{ totalMsgNum }}</div>
        </div>
      </div>
      <div class="right">
        <input
          class="right__opacity"
          type="range"
          min="10"
          max="100"
          value="100"
        />
        <div class="right__sns">
          <a
            :href="val"
            v-for="(val, name) in snsItems"
            :key="name"
            class="sns-item"
            :class="name"
          >
            <img
              :src="require(`~/assets/images/sns/${name}.png`)"
              :alt="name"
            />
          </a>
        </div>
      </div>
    </header>
    <main class="guestbook__body" ref="body">
      <div class="notice">
        <img
          class="notice__img"
          src="~/assets/images/ico/notice.png"
          alt="notice"
        />
        <span class="notice__text">
          10분에 3번, 100자까지 쓸 수 있습니다.
        </span>
      </div>
      <div class="chats" v-if="messages.length > 0">
        <div
          class="chats__item"
          v-for="c of messages"
          :key="c.name + c.message + c.created"
          :class="{ me: c.name === username && !c.admin }"
        >
          <img class="profile" v-if="c.admin" src="~/assets/images/logo.png" />
          <img
            class="profile"
            v-else
            src="~/assets/images/apps/guestbook/anonymous.png"
          />
          <div class="text">
            <strong class="name">{{ c.name }}</strong>
            <div class="content">
              <p class="msg">{{ c.message }}</p>
              <strong class="date"> {{ $moment(c.created).fromNow() }}</strong>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="loader-wrapper">
        <div class="loader"></div>
      </div>
    </main>
    <footer class="guestbook__footer">
      <div class="info">
        <label for="name">Name : </label>
        <input
          class="info__name"
          maxlength="15"
          name="name"
          type="text"
          v-model="username"
        />
        <div class="info__count">
          <strong class="curr">{{ message.length }}</strong>
          <p class="div">/</p>
          <p class="total">{{ maxLength }}</p>
        </div>
      </div>
      <div class="message">
        <textarea
          :maxlength="maxLength"
          name="msg"
          class="message__text"
          v-model="message"
          @keydown.ctrl.enter="send"
          @keydown.meta.enter="send"
        ></textarea>
        <button
          @click="send"
          :class="{ active: message.length > 0 && reqAvailable }"
          class="message__send"
        >
          Send
        </button>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currMsgNum: 0, // 현재 쌓인 메시지 개수
      totalMsgNum: 0, // 현재 총 메시지 개수
      maxLength: 100,
      username: "",
      message: "",
      reqCount: 0,
      snsItems: {
        twitter: "https://twitter.com/BlogWealthy",
        // instagram: "#",
        // youtube: "#",
        github: "https://github.com/bwealthy72",
      },
    };
  },
  computed: {
    messages() {
      return this.$store.state.chat.messages;
    },
    reqAvailable() {
      return this.reqCount < 3;
    },
  },
  methods: {
    scrollToBottom() {
      if (this.$refs.body) {
        this.$refs.body.scrollTop =
          this.$refs.body.scrollHeight - this.$refs.body.clientHeight;
      }
    },
    async send() {
      if (this.username && this.message && this.reqAvailable) {
        this.reqCount += 1;
        setTimeout(() => {
          this.reqCount = 0;
        }, 10 * 60 * 1000);
        const param = {
          name: this.username,
          message: this.message,
          created: this.$moment(new Date()).format(),
        };
        this.message = "";
        await this.$store.dispatch("chat/sendMsg", param);
        await this.$store.dispatch("chat/getMsgs");
        this.scrollToBottom();
      }
    },
  },
  async beforeCreate() {
    this.$store.dispatch("chat/getMsgs").then(() => {
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    });
  },
};
</script>
