<template>
  <section
    class="
      w-full
      min-h-full
      z-50
      space-y-11
      py-11
      flex flex-col
      justify-between
    "
  >
    <p class="tracking-wider uppercase text-sm text-gray-400 mx-auto">
      {{
        store.todaysThought.agreement
          ? "What you're feeling is "
          : "Let's get familiar with "
      }}
      <span class="font-medium text-gray-300">{{ store.emotion.name }}</span
      >.
    </p>
    <transition name="slowfade" mode="out-in" appear>
      <div
        v-show="store.emotion.misconception"
        class="space-y-1 pr-6"
        :class="[
          showAnimate ? '-rotate-1 transition-all duration-500 ease-in' : '',
        ]"
      >
        <p class="tracking-wider uppercase text-sm text-red-500">
          Common misconception:
        </p>
        <p
          class="italic tracking-tight"
          :class="showAnimate ? 'text-gray-300' : ''"
        >
          {{ store.emotion.misconception }}
        </p>
      </div>
    </transition>
    <transition name="slowerfade" appear>
      <div
        v-show="store.emotion.reality"
        class="text-right pl-6"
        :class="
          showAnimate ? 'rotate-1 transition-all duration-500 ease-in' : ''
        "
      >
        <p
          class="tracking-wider uppercase text-sm text-green-500"
          :class="showAnimate ? 'text-gray-300' : ''"
        >
          The truth about {{ store.emotion.name }}:
        </p>
        <p class="whitespace-pre-wrap">
          {{ store.emotion.reality }}
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
    const showAnimate = ref(false);

    setInterval(() => {
      showAnimate.value = true;
      store.showStepnav = true;
      store.showContinue = true;
    }, 3210);

    return {
      showAnimate,
      store,
    };
  },
};
</script>