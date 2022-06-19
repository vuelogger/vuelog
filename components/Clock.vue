<template>
  <p>{{ datetime }}</p>
</template>

<script>
export default {
  props: {
    format: {
      type: String,
    },
  },
  data() {
    return {
      datetime: null,
    };
  },
  methods: {
    getTime() {
      return this.$moment(new Date()).format(this.format);
    },
  },
  created() {
    this.datetime = this.getTime();
    setInterval(() => {
      this.datetime = this.getTime();
    }, 60 * 1000);
  },
};
</script>
