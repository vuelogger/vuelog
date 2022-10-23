<template>
  <h1>
    <span>Welcome to my</span>
    <strong>{{ this.word }}</strong>
  </h1>
</template>

<script>
export default {
  data() {
    return {
      idx: 0,
      words: ["Blog", "Vue Blog", "VueLog"],
      word: "",
      timer: null,
      aniTime: 2000,
    };
  },
  methods: {
    startTyping() {
      // 한 글자씩 분리해놓는다
      const wList = this.words[this.idx].split("");

      // 타이핑, 지우는 시간 비율을 전체시간의 7:3 비율로 할당
      const typeTime = (this.aniTime * 9) / 10;
      const clearTime = (this.aniTime * 1) / 10;

      // 하나씩 타이핑한다.
      let wIdx = 0;
      let timer = setInterval(() => {
        this.word += wList[wIdx];

        // 타이핑을 다 칠 경우
        if (++wIdx >= wList.length) {
          clearInterval(timer);

          setTimeout(() => {
            timer = setInterval(() => {
              this.word = this.word.slice(0, -1);
              if (this.word.length == 0) {
                clearInterval(timer);

                // 다음 글자로 변경
                this.idx = (this.idx + 1) % this.words.length;

                this.startTyping();
              }
            }, clearTime / wList.length);
          }, 1500);

          // 지우기 시작
        }
      }, typeTime / wList.length);
    },
  },
  mounted() {
    this.startTyping();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss" scoped>
@keyframes cursor {
  0% {
    border-right: 2px solid black;
  }
  50% {
    border-right: 2px solid transparent;
  }
  100% {
    border-right: 2px solid black;
  }
}
h1 {
  span {
    display: block;
  }
  strong {
    display: inline-block;
    height: 0.8em;
    animation-name: cursor;
    animation-duration: 0.6s;
    animation-iteration-count: infinite;
  }
}
</style>
