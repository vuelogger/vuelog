<template>
  <button class="share-btn" @click="copyLink" :class="{ mobile: isMobile }">
    <img src="~/assets/images/ico/share.png" />
    <p class="share-btn__msg" v-show="isCopied">Link Copied</p>
  </button>
</template>

<script>
export default {
  props: {
    isMobile: {
      type: Boolean,
      default: true,
    },
    postFix: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isCopied: false,
    };
  },
  methods: {
    copyLink() {
      this.isCopied = true;
      // 임시로 input 태그를 body에 추가하고 tempTag에 저장한다.
      const tempTag = document.body.appendChild(
        document.createElement("input")
      );
      // input의 값에 현재 사이트 주소를 넣는다.
      tempTag.value = window.document.location.href + this.postFix;
      // input에 초점을 맞춘다.
      tempTag.select();
      // input 내용을 복사한다.
      document.execCommand("copy");
      // 만들었던 태그를 삭제한다.
      tempTag.parentNode.removeChild(tempTag);

      // copy란 글자가 잠시 나타나다 사라지게 하기
      const _this = this;
      setTimeout(() => {
        _this.isCopied = false;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes fade-out {
  from {
    opacity: 0;
  }
  to {
    opacity: 100;
  }
}

.share-btn {
  position: relative;
  filter: brightness(0.7);
  cursor: pointer;

  &__msg {
    position: absolute;
    top: calc(100% + 1rem);
    left: 50%;
    transform: translateX(-50%);
    color: white;
    white-space: nowrap;
    animation: fade-out 0.5s;
    z-index: 1000;
  }

  img {
    height: 100%;
  }
  &:hover {
    filter: none;
  }
  &.mobile {
    &:hover::after {
      content: none;
    }

    &:active {
      filter: brightness(1);
    }
  }
}
</style>
