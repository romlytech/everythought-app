<template>
  <section class="w-full z-50 space-y-4">
    <h1 class="text-3xl font-serif">
      Thanks for sharing, {{ store.profile.first_name }}.
    </h1>
    <p class="text-gray-300">
      You learned about
      <span class="lowercase">{{ store.emotion.name }}</span> today. Come back
      here again to discover more about your emotions.
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
import { store } from "@/store";

export default {
  props: {
    name: String,
  },
  setup() {
    store.showStepnav = false;
    store.showContinue = true;
    return {
      store,
    };
  },
};
</script>