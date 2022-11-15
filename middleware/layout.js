export default ({ route, $device, store }) => {
  let layout = "default";

  if (route.params && route.params.code) {
    layout = "errorLayout"; // error 는 reserved되어 있어서 그런지 먹히지 않음(자동으로 default로 바뀜)
    // ssr에서는 error.vue가 먹히지 않음
  } else if ($device.isMobileOrTablet) {
    layout = "mobile";
  }

  if (route.matched[0]) {
    route.matched[0].components.default.options.layout = layout;
  }
};
