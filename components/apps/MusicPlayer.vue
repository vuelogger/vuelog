<template>
  <div class="music-player">
    <template v-if="music">
      <img class="bg" :src="music.image" />

      <div class="image">
        <div class="inner">
          <img :src="music.image" :class="{ active: isPlaying }" />
        </div>
      </div>

      <h2 class="title">{{ music.title }}</h2>
      <h3 class="artist">{{ music.artist }}</h3>

      <div class="track">
        <p class="curr">{{ currTime }}</p>
        <Slider
          class="track"
          v-model="track"
          :size="3"
          :max="99"
          @input="trackChange"
        >
        </Slider>
        <p class="total">{{ totalTime }}</p>
      </div>

      <div class="controller">
        <button class="prev" @click="prev">
          <img src="@/assets/images/audio/prev.png" />
        </button>
        <button @click="backward">
          <img src="@/assets/images/audio/backward.png" />
        </button>
        <button class="play" @click="play">
          <img v-show="isPlaying" src="@/assets/images/audio/pause.png" />
          <img v-show="!isPlaying" src="@/assets/images/audio/play.png" />
        </button>
        <button @click="forward">
          <img src="@/assets/images/audio/forward.png" />
        </button>
        <button class="next" @click="next">
          <img src="@/assets/images/audio/next.png" />
        </button>
      </div>

      <div class="volume">
        <Slider v-model="volume" :size="3">
          <img
            class="mute"
            src="~/assets/images/audio/mute.png"
            slot="preImg"
          />
          <img
            class="max"
            src="~/assets/images/audio/volumemax.png"
            slot="suImg"
          />
        </Slider>
      </div>

      <div class="play-conf">
        <!-- <button class="random">
          <img src="@/assets/images/audio/random.svg" />
        </button> -->
        <!-- <button class="repeat">
          <img src="@/assets/images/audio/repeat.svg" />
        </button> -->
      </div>
    </template>
    <div class="loading" v-else></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      isPlaying: false,
      idx: 0,
      audio: null,
      volume: 30,
      track: 0,
      currTime: "00:00",
      totalTime: "00:00",
    };
  },
  computed: {
    ...mapState("music", ["musics"]),
    music() {
      return this.musics[this.idx];
    },
  },
  watch: {
    volume(v) {
      this.audio.volume = v / 100;
    },
    idx(v) {
      this.audio.src = this.musics[v].src;
      this.audio.load();
      this.audio.play();
      this.isPlaying = true;
    },
  },
  methods: {
    backward() {
      this.track = this.track - 5;
      if (this.track <= 0) {
        this.track = 0;
      }
      this.trackChange();
    },
    forward() {
      this.track = this.track + 5;
      if (this.track > this.totalTime) {
        this.track = this.totalTime - 1;
      }
      this.trackChange();
    },
    prev() {
      this.idx = this.idx - 1 < 0 ? this.musics.length - 1 : this.idx - 1;
    },
    next() {
      this.idx = (this.idx + 1) % this.musics.length;
    },
    play() {
      if (this.isPlaying) {
        this.audio.pause();
      } else {
        this.audio.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    toStringFrom(time) {
      let min = Math.floor(time / 60);
      let sec = Math.floor(time - min * 60);
      if (min < 10) {
        min = "0" + min;
      }
      if (sec < 10) {
        sec = "0" + sec;
      }
      return `${min}:${sec}`;
    },
    updateTime() {
      this.currTime = this.toStringFrom(this.audio.currentTime);
      this.totalTime = this.toStringFrom(this.audio.duration);
      this.track = (100 / this.audio.duration) * this.audio.currentTime;
    },
    trackChange() {
      this.audio.currentTime = (this.audio.duration * this.track) / 100;
    },
  },
  async fetch() {
    await this.$store.dispatch("music/getMusics");
    console.log(this.musics[this.idx].src);
    this.audio = new Audio(this.musics[this.idx].src);
    this.audio.ontimeupdate = this.updateTime;
    this.audio.onloadedmetadata = this.updateTime;
    this.audio.onended = this.next;
    this.audio.volume = this.volume / 100;
  },
  beforeDestroy() {
    if (this.isPlaying) {
      this.audio.pause();
    }
  },
};
</script>

<style lang="scss" scoped>
.music-player {
  position: relative;
  overflow: hidden !important;
  display: flex;
  flex-direction: column;
  padding: 1rem 4rem 4rem 4rem;
  box-sizing: border-box;

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(8px) brightness(0.3);
    transform: scale(1.2);
    z-index: -1;
    background-color: #1e1e1e;
  }

  .image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    .inner {
      max-width: 80%;
      max-height: 80%;
      aspect-ratio: 1;
      position: relative;
      filter: drop-shadow(0px 0px 10px rgb(31, 90, 198));

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 103%;
        height: 103%;
        background-color: lightgray;
        border-radius: 50%;
        z-index: -1;
      }

      img {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        z-index: 1;

        &.active {
          animation: rotate linear 15s infinite;
        }
      }
    }
  }

  .title {
    font-size: 2rem;
    color: white;
    text-align: center;
    line-height: 1.3;
    text-shadow: 2px 2px 2px grey;
  }

  .artist {
    font-size: 1.5rem;
    color: #bababa;
    text-align: center;
    margin-top: 1rem;
  }

  .track {
    position: relative;
    width: 100%;
    margin: 1rem auto;
    color: #eee;

    p {
      position: absolute;
      font-size: 1rem;
      top: 100%;
      &.curr {
        left: 0;
      }
      &.total {
        right: 0;
      }
    }
  }

  .controller {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      width: 30px;
      height: 30px;
      object-fit: contain;
      margin: 0 1rem;

      &.play {
        transform: translateY(1px) scale(0.8);
      }

      &.prev,
      &.next {
        width: 22px;
        height: 22px;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }

  .volume {
    width: 70%;
    margin: 2rem auto 0 auto;

    .mute {
      transform: scale(0.85);
    }
  }

  .loading {
    width: 100%;
    height: 100%;
  }
}
</style>
