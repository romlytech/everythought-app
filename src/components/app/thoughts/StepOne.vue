<template>
  <section class="w-full max-w-md text-left z-50 space-y-4 px-0">
    <h1 class="text-4xl font-serif">
      Welcome, {{ store.profile.first_name }}.
    </h1>
    <p class="text-gray-300">
      Take a moment to relax. Allow yourself to get comfortable.
    </p>
  </section>
</template>
<script>
import { store } from "@/store";
export default {
  setup() {
    store.showStepnav = false;
    store.showContinue = true;

    setInterval(() => {
      store.showStepnav = true;
    }, 3000);
    return {
      store,
    };
  },
};
</script>