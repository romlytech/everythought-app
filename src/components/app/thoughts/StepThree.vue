<template>
  <section class="w-full max-w-md text-left z-50 space-y-2 px-0">
    <p class="tracking-wider uppercase text-sm text-gray-400">
      {{
        store.todaysThought.agreement
          ? "What you're feeling is "
          : "Let's get familiar with "
      }}
      <span class="font-medium text-gray-300">{{ store.emotion.name }}</span
      >.
    </p>

    <blockquote class="text-2xl pb-6 font-serif whitespace-pre-wrap">
      {{ store.emotion.description }}
    </blockquote>

    <transition name="slowerfade" appear>
      <div
        v-show="showMisconception && store.emotion.misconception"
        class="space-y-1 pb-6"
        :class="
          showTruth ? '-rotate-2 transition-all duration-500 ease-in' : ''
        "
      >
        <p class="tracking-wider uppercase text-sm text-red-400">
          Common misconception:
        </p>
        <p class="italic text-sm" :class="showTruth ? 'text-gray-400' : ''">
          {{ store.emotion.misconception }}
        </p>
      </div>
    </transition>
    <transition name="slowerfade" appear>
      <div v-show="showTruth && store.emotion.truth" class="pb-6 text-right">
        <p class="tracking-wider uppercase text-sm text-green-500">Truth:</p>
        <p class="whitespace-pre-wrap">
          {{ store.emotion.truth }}
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
    store.showContinue = true;

    const showMisconception = ref(false);
    const showTruth = ref(false);

    setInterval(() => {
      showMisconception.value = true;
    }, 3000);

    setInterval(() => {
      showTruth.value = true;
      store.showStepnav = true;
    }, 6000);

    return {
      showMisconception,
      showTruth,
      store,
    };
  },
};
</script>