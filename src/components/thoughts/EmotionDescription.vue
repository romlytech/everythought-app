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

    <transition name="slowfade" mode="out-in" appear>
      <div v-if="store.emotion.root">
        <p class="mb-1 tracking-wider uppercase text-sm text-gray-400">
          Digging deeper:
        </p>
        <p class="font-serif text-lg italic tracking-wide">
          The root of
          <span class="font-bold">{{ store.emotion.name }}</span> is
          <span class="font-bold">{{ store.emotion.root }}</span
          >.
        </p>
      </div>
    </transition>
  </section>
</template>
<script>
import { ref } from "vue";
import { store } from "@/store";

export default {
  setup() {
    store.showStepnav = false;
    store.showContinue = false;
    const showRoot = ref(false);

    setInterval(() => {
      showRoot.value = true;
    }, 2100);

    setInterval(() => {
      store.showStepnav = true;
      store.showContinue = true;
    }, 3210);

    return { showRoot, store };
  },
};
</script>