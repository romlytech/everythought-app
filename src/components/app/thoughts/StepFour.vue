<template>
  <section class="w-full max-w-md text-left h-64 z-50 space-y-4 px-0">
    <label for="response" class="tracking-wider uppercase text-gray-400"
      >Where do you feel
      <span class="font-medium text-gray-300">{{ store.emotion.name }}</span> in
      your life?</label
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
        rounded-md
      "
      rows="4"
      maxlength="320"
    />
    <p
      v-if="response && response.length >= 260"
      class="text-xs mt-1"
      :class="response.length >= 320 ? 'text-rose-400' : 'text-amber-400'"
    >
      Try to keep your response brief.
    </p>

    <transition name="fade" appear>
      <button
        v-show="response"
        @click="updateStep(5)"
        class="float-right -mt-4 font-medium hover:text-white"
      >
        Continue <span class="animate-pulse">&rarr;</span>
      </button>
    </transition>
    <transition name="fade" appear>
      <button
        v-show="back"
        @click="updateStep(3)"
        class="mt-8 font-medium text-sm hover:text-white"
      >
        <span class="animate-pulse">&larr;</span> Go back
      </button>
    </transition>
  </section>
</template>
<script>
import { ref } from "vue";

import { store } from "../../../store";
import { updateThought } from "../../../supabase";

export default {
  setup() {
    const back = ref(false);
    const response = ref(store.todaysThought.response);

    function updateStep(step) {
      store.todaysThought.step = step;
      store.todaysThought.response = response.value;
      updateThought();
    }

    setInterval(() => {
      back.value = true;
    }, 3210);

    return {
      back,
      response,
      updateStep,

      store,
    };
  },
};
</script>