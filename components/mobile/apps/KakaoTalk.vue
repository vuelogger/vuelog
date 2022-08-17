<template>
  <div class="kakaotalk">
    <header class="kakaotalk__head">
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
          <a href="#" v-for="s of snsItems" :key="s" class="sns-item">
            <img :src="require(`~/assets/images/sns/${s}.png`)" :alt="s" />
          </a>
        </div>
      </div>
    </header>
    <main class="kakaotalk__body"></main>
    <footer class="kakaotalk__footer">
      <div class="notice">
        <img src="~/assets/images/ico/notice.png" alt="notice" />
        <span>10분에 한 번, 100자까지만 쓸 수 있습니다!</span>
      </div>
      <div class="message">
        <textarea name="msg" class="message__text" v-model="message"></textarea>
        <button :class="{ active: message.length > 0 }" class="message__send">
          Send
        </button>
        <div class="count">
          <span class="count__curr"></span>
        </div>
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
      message: "",
      snsItems: ["twitter", "instagram", "youtube", "github"],
    };
  },
};
</script>

<style></style>
