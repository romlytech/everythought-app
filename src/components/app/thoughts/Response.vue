<template>
  <section class="w-full z-50 space-y-4">
    <div>
      <label
        for="response"
        class="tracking-wider text-sm md:text-base uppercase text-gray-400"
        >Describe a moment when you have felt
        <span class="font-medium text-gray-300">{{ store.emotion.name }}</span
        >:</label
      >
      <textarea
        id="response"
        v-model="response"
        type="textarea"
        class="
          py-3
          px-4
          mt-1
          block
          w-full
          shadow-sm
          border border-transparent
          focus:border-sky-600
          focus:outline-none
          focus:ring-sky-500
          bg-gray-700
          text-gray-200
          rounded-xl
        "
        rows="6"
        maxlength="320"
      ></textarea>
    </div>
    <p
      v-if="response && response.length >= 260"
      class="text-xs mt-1"
      :class="response.length >= 320 ? 'text-rose-400' : 'text-amber-400'"
    >
      Try to keep your response brief. {{ 320 - response.length }}/320
      characters remaining.
    </p>
  </section>
</template>
<script>
import { ref, watch } from "vue";

import { store } from "@/store";
import { updateStep } from "@/supabase";

export default {
  setup() {
    store.showStepnav = true;
    store.showContinue = false;

    const placeholder = `I feel ${
      store.emotion.action
        ? store.emotion.action
        : store.emotion.name || "this emotion"
    } in my life when `;
    const response = ref(store.todaysThought.response || placeholder);

    watch(response, () => {
      if (response.value != placeholder) {
        store.showContinue = true;
        store.showStepnav = true;
        store.todaysThought.response = response.value;
        store.todaysThought.complete = true;
      }
    });

    setInterval(() => {
      store.showStepnav = true;
    }, 1500);

    return {
      placeholder,
      response,
      updateStep,

      store,
    };
  },
};
</script>