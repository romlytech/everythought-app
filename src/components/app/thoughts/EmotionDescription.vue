<template>
  <section
    class="w-full min-h-full z-50 space-y-4 flex flex-col justify-between"
  >
    <p class="tracking-wider uppercase text-sm text-gray-400">
      {{
        store.todaysThought.agreement
          ? "What you're feeling is "
          : "Let's get familiar with "
      }}
      <span class="font-medium text-gray-300">{{ store.emotion.name }}</span
      >.
    </p>

    <blockquote class="text-xl sm:text-2xl pb-8 font-serif whitespace-pre-wrap">
      {{ store.emotion.description }}
    </blockquote>
    <div class="flex-grow h-48 flex flex-col justify-between">
      <transition name="slowerfade" appear>
        <div
          v-show="showMisconception && store.emotion.misconception"
          class="space-y-1 pb-6"
          :class="
            showReality ? '-rotate-2 transition-all duration-500 ease-in' : ''
          "
        >
          <p class="tracking-wider uppercase text-sm text-red-400">
            Common misconception:
          </p>
          <p class="italic text-sm" :class="showReality ? 'text-gray-400' : ''">
            {{ store.emotion.misconception }}
          </p>
        </div>
      </transition>
      <transition name="slowerfade" appear>
        <div
          v-show="showReality && store.emotion.reality"
          class="pb-6 text-right"
        >
          <p class="tracking-wider uppercase text-sm text-green-500">Truth:</p>
          <p class="whitespace-pre-wrap">
            {{ store.emotion.reality }}
          </p>
        </div>
      </transition>
    </div>
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