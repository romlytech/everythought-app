<template>
  <section class="w-full z-50 space-y-4">
    <h1 class="text-3xl font-serif">
      Thanks for sharing, {{ store.profile.first_name }}.
    </h1>
    <transition name="slowfade" mode="out-in" appear>
      <p class="text-gray-300">
        Today, you learned about
        <span class="font-medium">{{ store.emotion.name }}</span
        >. Come back again whenever you're ready to discover other emotions.
      </p>
    </transition>
    <transition name="slowerfade" mode="out-in" appear>
      <router-link
        to="/dashboard"
        class="float-right mt-8 font-medium hover:text-white"
        style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0)"
      >
        Return to home <span class="animate-pulse">&rarr;</span>
      </router-link>
    </transition>
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