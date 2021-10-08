<template>
  <section class="w-full z-50 space-y-4">
    <h1 class="text-4xl font-serif">
      {{ greeting }}, {{ store.profile.first_name }}.
    </h1>
    <p class="text-gray-300">
      Take a moment to clear yourself of any distractions.
    </p>
  </section>
</template>
<script>
import { ref } from "vue";
import { store } from "@/store";
export default {
  setup() {
    store.showStepnav = false;
    store.showContinue = true;

    const currentHour = new Date().getHours();
    const greeting = ref("");

    if (currentHour < 12) greeting.value = "Good morning";
    else if (currentHour >= 12 && currentHour <= 17)
      greeting.value = "Good afternoon";
    else if (currentHour >= 17 && currentHour <= 24)
      greeting.value = "Good evening";
    else greeting.value = "Welcome";

    setInterval(() => {
      store.showStepnav = true;
    }, 3000);
    return {
      store,
      greeting,
    };
  },
};
</script>