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
    <nav class="pt-4 justify-between w-full inline-flex z-50">
      <div class="flex-auto">
        <button
          @click="updateStep(store.todaysThought.step - 1)"
          class="
            text-left
            font-medium
            text-gray-300 text-sm
            hover:text-white
            bg-transparent
            border-transparent
            focus:border-transparent
            focus:ring-0
          "
          style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0)"
          tabindex="-1"
        >
          <span class="animate-pulse">&larr;</span> Go back
        </button>
      </div>
      <div class="flex-auto text-right">
        <transition name="slowfade" appear>
          <button
            v-show="showContinue"
            @click="updateStep(store.todaysThought.step + 1)"
            class="
              font-medium
              hover:text-white
              bg-transparent
              border-transparent
              focus:border-transparent
              focus:ring-0
            "
            style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0)"
          >
            {{
              store.todaysThought.step == 1
                ? "I'm ready"
                : store.todaysThought.step == 6
                ? "Complete"
                : "Continue"
            }}
            <span class="animate-pulse">&rarr;</span>
          </button>
        </transition>
      </div>
    </nav>
  </section>
</template>
<script>
import { ref, watch } from "vue";

import { store } from "@/store";
import { updateStep } from "@/supabase";

export default {
  setup() {
    store.showStepnav = false;
    store.showContinue = false;
    const showContinue = ref(false);

    const placeholder = `I feel ${
      store.emotion.action
        ? store.emotion.action
        : store.emotion.name || "this emotion"
    } in my life when `;
    const response = ref(store.todaysThought.response || placeholder);

    watch(response, () => {
      if (response.value.length > placeholder.length) {
        showContinue.value = true;
        store.todaysThought.response = response.value;
        store.todaysThought.complete = true;
      } else {
        store.showContinue = false;
      }
    });

    setInterval(() => {
      store.showStepnav = true;
    }, 1500);

    return {
      showContinue,
      placeholder,
      response,
      updateStep,

      store,
    };
  },
};
</script>