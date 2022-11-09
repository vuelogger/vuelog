<template>
  <div class="music-player">
    <template v-if="music">
      <img class="bg" :src="music.image" />

      <!-- <div class="volume">
        <Slider />
      </div> -->

      <div class="image">
        <div class="inner">
          <img :src="music.image" />
        </div>
      </div>

      <h2 class="title">{{ music.title }}</h2>
      <h3 class="artist">{{ music.artist }}</h3>

      <!-- Track -->
      <div class="track">
        <Slider />
      </div>

      <div class="controller">
        <!-- <button class="random">
          <img src="@/assets/images/audio/random.svg" />
        </button> -->
        <button class="prev">
          <img src="@/assets/images/audio/prev.svg" />
        </button>
        <button class="play">
          <img v-if="isPlaying" src="@/assets/images/audio/pause.png" />
          <img else src="@/assets/images/audio/play.png" />
        </button>
        <button class="next">
          <img src="@/assets/images/audio/next.svg" />
        </button>
        <!-- <button class="repeat">
          <img src="@/assets/images/audio/repeat.svg" />
        </button> -->
      </div>
    </template>
    <div class="loading" v-else></div>

    <!-- <div class="music-player__info">
      <div class="image" :class="{ playing: isPlaying }">
        <img :src="musics[mIdx].image" />
      </div>
      <h2 class="title">
        <div class="title__texts" :class="{ playing: isPlaying && isTextLong }">
          <span>{{ musics[mIdx].title }}</span>
          <span v-show="isTextLong">{{ musics[mIdx].title }}</span>
        </div>
      </h2>
      <p class="artist">{{ musics[mIdx].artist }}</p>
    </div>

    <Slider
      class="music-player__track"
      @input="trackChange"
      v-model="track"
      :max="99"
    />

    <div class="music-player__time">
      <p class="curr-time">{{ currTime }}</p>
      <p class="total-time">{{ totalTime }}</p>
    </div>

    <div class="music-player__controller">
      <button class="btn prev" @click="prev">
        <img src="~/assets/images/audio/prev.svg" />
      </button>
      <button class="btn play" @click="play">
        <img src="~/assets/images/audio/play.png" v-show="!isPlaying" />
        <img
          class="pause-img"
          src="~/assets/images/audio/pause.png"
          v-show="isPlaying"
        />
      </button>
      <button class="btn next" @click="next">
        <img src="~/assets/images/audio/next.svg" />
      </button>
    </div>

    <Slider class="music-player__volume" v-model="volume" :size="3">
      <img src="~/assets/images/audio/mute.svg" alt="mute" slot="preImg" />
      <img
        src="~/assets/images/audio/fullsound.svg"
        alt="full sound"
        slot="suImg"
      />
    </Slider> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      isPlaying: false,
      idx: 2,
      audio: null,
      volume: 30,
    };
  },
  computed: {
    ...mapState("music", ["musics"]),
    music() {
      return this.musics[this.idx];
    },
  },
  methods: {
    prev() {
      this.idx = this.idx - 1 < 0 ? this.musics.length - 1 : this.mIdx - 1;
    },
    next() {
      this.idx = (this.idx + 1) % this.musics.length;
    },
    play() {},
    // updateTime() {
    //   this.currTime = this.toStringFrom(this.audio.currentTime);
    //   this.totalTime = this.toStringFrom(this.audio.duration);
    //   this.track = (100 / this.audio.duration) * this.audio.currentTime;
    // },
    // trackChange() {
    //   this.audio.currentTime = (this.audio.duration * this.track) / 100;
    // },
  },
  async fetch() {
    await this.$store.dispatch("music/getMusics");
    this.audio = new Audio(this.currMusic.src);
    this.audio.ontimeupdate = this.updateTime;
    this.audio.onloadedmetadata = this.updateTime;
    this.audio.onended = this.next;
    this.audio.volume = this.volume / 100;
  },

  // data() {
  //   return {
  //     track: 0,
  //     volume: 30,
  //     mIdx: 0,
  //     audio: null,
  //     currTime: "00:00",
  //     totalTime: "00:00",
  //     isPlaying: false,
  //     isFirstTime: true,
  //   };
  // },
  // computed: {
  //   ...mapState("notion", ["musics"]),
  //   ...mapState("header", ["activatedItem"]),
  //   isTextLong() {
  //     return this.musics[this.mIdx].src.length > 16;
  //   },
  // },
  // watch: {
  //   async activatedItem(name) {
  //     if (name == "musicPlayer" && this.isFirstTime) {
  //       await this.$store.dispatch("notion/getMusics");
  //       this.audio = new Audio(this.musics[this.mIdx].src);
  //       this.audio.ontimeupdate = this.updateTime;
  //       this.audio.onloadedmetadata = this.updateTime;
  //       this.audio.onended = this.next;
  //       this.audio.volume = this.volume / 100;
  //       this.isFirstTime = false;
  //     }
  //   },
  //   src(v) {
  //     this.audio.load();
  //     this.audio.play();
  //   },
  //   volume(v) {
  //     this.audio.volume = v / 100;
  //   },
  //   mIdx(v) {
  //     this.audio.src = this.musics[v].src;
  //     this.audio.load();
  //     this.audio.play();
  //     this.isPlaying = true;
  //   },
  // },
  // methods: {
  //   toStringFrom(time) {
  //     let min = Math.floor(time / 60);
  //     let sec = Math.floor(time - min * 60);
  //     if (min < 10) {
  //       min = "0" + min;
  //     }
  //     if (sec < 10) {
  //       sec = "0" + sec;
  //     }
  //     return `${min}:${sec}`;
  //   },
  //   prev() {
  //     this.mIdx = this.mIdx - 1 < 0 ? this.musics.length - 1 : this.mIdx - 1;
  //   },
  //   next() {
  //     this.mIdx = (this.mIdx + 1) % this.musics.length;
  //   },
  //   play() {
  //     if (this.isPlaying) {
  //       this.audio.pause();
  //     } else {
  //       this.audio.play();
  //     }
  //     this.isPlaying = !this.isPlaying;
  //   },
  //   updateTime() {
  //     this.currTime = this.toStringFrom(this.audio.currentTime);
  //     this.totalTime = this.toStringFrom(this.audio.duration);
  //     this.track = (100 / this.audio.duration) * this.audio.currentTime;
  //   },
  //   trackChange() {
  //     this.audio.currentTime = (this.audio.duration * this.track) / 100;
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.music-player {
  position: relative;
  overflow: hidden !important;
  display: flex;
  flex-direction: column;
  padding: 1rem 3rem 6rem 3rem;
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
        width: 110%;
        height: 110%;
        background-color: lightgray;
        border-radius: 50%;
        z-index: -1;
      }
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 108%;
        height: 108%;
        background-color: #1e1e1e;
        border-radius: 50%;
      }

      img {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        z-index: 1;
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
    width: 100%;
    margin: 2rem auto;
  }

  .controller {
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      width: 30px;
      height: 30px;
      object-fit: contain;
      margin: 0 1.5rem;

      &.play {
        transform: translateY(1px);
      }
    }
  }

  .loading {
    width: 100%;
    height: 100%;
  }
}
</style>
