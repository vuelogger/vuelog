const axios = require("axios");
export default {
  server: {
    host: "0", // default: localhost
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "My VueLog",
    htmlAttrs: {
      lang: "ko",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "format-detection", content: "telephone=no" },

      { hid: "og:title", property: "og:title", content: "My VueLog" },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: "My VueLog",
      },
      { hid: "og:type", property: "og:type", content: "website" },
      {
        hid: "og:image",
        property: "og:image",
        content: "/logo.png",
      },
      {
        hid: "og:locale",
        property: "og:locale",
        content: "ko_KR",
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: "/logo.png",
      },
      {
        hid: "og:url",
        property: "og:url",
        content: process.env.VERCEL_URL,
      },
      {
        hid: "description",
        name: "description",
        content: "Welcome to my VueLog!!",
      },
      {
        hid: "og:description",
        property: "og:description",
        content: "Welcome to my VueLog!!",
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: "Welcome to my VueLog!!",
      },
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "google-site-verification",
        content: "cY-rrjGxRoSE5FAkvmVQTJEzozBaBGRb8S2Rer6qtOQ",
      },
      {
        name: "naver-site-verification",
        content: "c23bf3d59533e7c2df171550b8d69c4a80838ff8",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/vs2015.min.css",
      },
    ],
  },

  serverMiddleware: [{ path: "/api", handler: __dirname + "/api/index.js" }],

  router: {
    middleware: ["layout"],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/scss/index.scss"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    "@nuxtjs/moment",
    "@nuxtjs/device",
    "@nuxtjs/google-analytics",
  ],

  plugins: ["~/plugins/axios.js", "~/plugins/utils.js"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    "nuxt-ssr-cache",
    "@nuxtjs/axios",
    "@nuxtjs/sitemap",
  ],
  sitemap: {
    defaults: {
      changefreq: "daily",
      priority: 1,
      lastmod: new Date(),
    },
    //https://github.com/nuxt-community/sitemap-module/issues/106#issuecomment-603533758
    routes: async () => {
      const res = await axios.get("https://vuelog.dev/api/categories");

      const route = [];

      for (const c of res.data) {
        // all은 없앤다.
        if (c.category) {
          const result = await axios.get("https://vuelog.dev/api/posts", {
            params: {
              category: c.category,
              pageSize: 10000,
              currPage: 0,
            },
          });
          const category = c.category === "" ? "all" : c.category;

          route.push("/post/" + category);
          for (const p of result.data.data) {
            route.push("/post/" + category + "/" + p.id);
          }
        }
      }
      return route;
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  // env: {
  //   baseUrl: process.env.VERCEL_URL || "http://127.0.0.1:3000",
  // },
  axios: {
    proxy: true,
    retry: {
      retries: 1, // 최대 재전송 횟수 4회
      shouldResetTimeout: true, // 재전송 간 타임아웃을 리셋하기
      retryDelay: (retry) => {
        return retry * 10000; // 재전송 횟수 * 0.1초만큼 재전송 시작 시간을 지연시키기
      },
      retryCondition: (error) => error.response.status === 429, // 서버 혼잡이 일어났을 경우에만 재전송하기
    },
    progress: false,
  },

  // proxy: {
  //   "/api": process.env.VERCEL_URL,
  // },

  // nuxt-ssr-cache

  cache: {
    useHostPrefix: false,
    pages: ["/"],
    store: {
      type: "memory",
      // maximum number of pages to store in memory
      // if limit is reached, least recently used page
      // is removed.
      max: 100,

      // number of seconds to store this page in cache
      ttl: 60,
    },
  },
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID, // Use as fallback if no runtime config is provided
  },

  moment: {
    locales: ["ko"],
  },
};
