<template>
  <section class="w-full z-50 space-y-4">
    <h1 class="text-3xl font-serif">
      Thanks for sharing, {{ store.profile.first_name }}.
    </h1>
    <p class="text-gray-300">
      Everytime you take moments to identify your emotions, you learn more about
      yourself.
    </p>
    <p class="text-gray-300">
      Today, you learned about
      <span class="font-medium">{{ store.emotion.name }}</span
      >. Come back again whenever you're ready to discover more.
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