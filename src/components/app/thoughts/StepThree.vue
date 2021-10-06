<template>
  <section class="w-full max-w-md text-left z-50 space-y-4 px-0">
    <p class="tracking-wider uppercase text-sm text-gray-400">
      {{
        store.todaysThought.agreement
          ? "What you're feeling is "
          : "Let's get familiar with "
      }}
      <span class="font-medium text-gray-300">{{ store.emotion.name }}</span
      >.
    </p>

    <blockquote class="text-2xl pb-8 font-serif whitespace-pre-wrap">
      {{ store.emotion.description }}
    </blockquote>

    <transition name="fade" appear>
      <div
        v-show="showMisconception && store.emotion.misconception"
        class="space-y-2"
        :class="crossout ? '-rotate-2 transition-all duration-500 ease-in' : ''"
      >
        <p class="tracking-wider uppercase text-sm text-red-500">
          Common misconception:
        </p>
        <p class="italic text-sm" :class="crossout ? 'text-gray-400' : ''">
          {{ store.emotion.misconception }}
        </p>
      </div>
    </transition>
    <transition name="fade" appear>
      <nav class="pt-4 justify-between w-full inline-flex" v-show="crossout">
        <button
          @click="updateStep(2)"
          class="font-medium text-gray-300 text-sm hover:text-white"
        >
          <span class="animate-pulse">&larr;</span> Go back
        </button>
        <button @click="updateStep(4)" class="font-medium hover:text-white">
          Continue <span class="animate-pulse">&rarr;</span>
        </button>
      </nav>
    </transition>
  </section>
</template>
<script>
import { ref } from "vue";

import { store } from "../../../store";
import { updateThought } from "../../../supabase";

export default {
  setup() {
    const showMisconception = ref(false);
    const crossout = ref(false);

    function updateStep(step) {
      store.todaysThought.step = step;
      updateThought();
    }

    setInterval(() => {
      showMisconception.value = true;
    }, 4321);

    setInterval(() => {
      crossout.value = true;
    }, 7777);

    return {
      showMisconception,
      crossout,
      updateStep,

      store,
    };
  },
};
</script>