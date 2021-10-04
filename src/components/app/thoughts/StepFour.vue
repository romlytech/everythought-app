<template>
  <section class="w-full max-w-md text-left z-50 space-y-4 px-0">
    <h1 class="text-3xl font-serif">
      Thanks for sharing, {{ store.profile.first_name }}.
    </h1>
    <p class="text-gray-300">
      You learned about
      <span class="lowercase">{{ store.emotion.name }}</span> today. Come back
      tomorrow to discover more about your emotions.
    </p>
    <router-link
      to="/dashboard"
      class="float-right mt-8 font-medium hover:text-white"
    >
      Return to home <span class="animate-pulse">&rarr;</span>
    </router-link>
  </section>
</template>
<script>
import { ref } from "vue";
import { store } from "../../../store";

export default {
  props: {
    name: String,
  },
  setup() {
    const showButton = ref(false);

    return {
      showButton,

      store,
    };
  },
};
</script>