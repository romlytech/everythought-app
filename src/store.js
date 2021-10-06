import { reactive } from "vue";

export const store = reactive({
  user: {},
  profile: {},
  avatar_src: "",
  loading: false,
  error: null,
  todaysThought: {},
  prompt: {},
  emotion: {},
  thoughts: [],
  thoughtCount: 0,
  oldThoughts: false,
  alert_msg: null,
});
