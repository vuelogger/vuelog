const axios = require("axios");
const routes = async () => {
  const res = await axios.get("https://vuelog.dev/api/categories");

  const result = [];

  for (const c of res.data) {
    // all은 없앤다.
    if (c.category) {
      const postRes = await axios.get("https://vuelog.dev/api/posts", {
        params: {
          category: c.category,
          pageSize: 2000,
          currPage: 0,
        },
      });

      result.push({
        url: "/post/" + c.category,
      });
      for (const p of postRes.data.data) {
        result.push({
          url: "/post/" + p.category + "/" + p.slug,
          lastmod: p.updatedAt,
        });
      }
    }
  }
  return result;
};

export default {
  server: {
    host: "0", // default: localhost
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Vue로 만드는 Blog 세상, VueLog",
    htmlAttrs: {
      lang: "ko",
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
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
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],

    script: [
      // Google Analytics Code
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-8H27EFJLW2",
        async: true,
      },
      { src: "/js/analytics.js" },
    ],
  },

  serverMiddleware: [
    { path: "/api", handler: __dirname + "/api/index.js" },
    {
      path: "/",
      handler(req, res, next) {
        if (req.url === "/") {
          res.writeHead(301, { Location: "https://vue-log.com/" });
          res.end();
        } else {
          next();
        }
      },
    },
    {
      path: "/post/*",
      async handler(req, res, next) {
        // const u = req.url.split("/");

        // const slug = u[u.length - 1];
        const slug = req.route.params.slug;
        console.log("SLUG", slug);

        const { data } = await axios.$get("https://vuelog.dev/api/post", {
          params: {
            slug,
          },
        });
        console.log("data", data);

        res.writeHead(301, { Location: "https://vue-log.com/" + data.id });
        res.end();
      },
    },
  ],

  router: {
    middleware: ["layout"],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/scss/index.scss"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  plugins: [
    "~/plugins/axios.js",
    "~/plugins/utils.js",
    "~/plugins/window.js",
    "~/plugins/hill_animation.js",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    "@nuxtjs/axios",
    "@nuxtjs/sitemap",
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/moment", "@nuxtjs/device"],

  sitemap: {
    //https://github.com/nuxt-community/sitemap-module/issues/106#issuecomment-603533758
    hostname: "https://vuelog.dev",
    routes,
  },
  env: {
    baseUrl: process.env.VERCEL_URL || "http://127.0.0.1:3000",
  },
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

  moment: {
    locales: ["ko"],
  },
};
