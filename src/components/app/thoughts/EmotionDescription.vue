<template>
  <section
    class="w-full min-h-full z-50 space-y-4 py-11 flex flex-col justify-between"
  >
    <p class="tracking-wider uppercase text-sm text-gray-400">
      So what does it really mean?
    </p>

    <blockquote class="text-xl sm:text-2xl pb-8 font-serif whitespace-pre-wrap">
      {{ store.emotion.description }}
    </blockquote>
  </section>
</template>
<script>
import { ref } from "vue";
import { store } from "@/store";

export default {
  setup() {
    store.showStepnav = false;
    store.showContinue = false;

    const showMisconception = ref(false);
    const showReality = ref(false);

    setInterval(() => {
      showMisconception.value = true;
    }, 3000);

    setInterval(() => {
      showReality.value = true;
      store.showStepnav = true;
      store.showContinue = true;
    }, 6000);

    return {
      showMisconception,
      showReality,
      store,
    };
  },
};
</script>