<template>
  <section class="w-full max-w-md text-left h-64 z-50 space-y-4 px-0">
    <p class="tracking-wider uppercase text-sm text-gray-400">
      {{
        store.todaysThought.agreement
          ? "What you're feeling is "
          : "Let's get familiar with "
      }}
      <span class="font-medium text-gray-300">{{ store.emotion.name }}</span
      >.
    </p>

    <blockquote class="text-2xl font-serif">
      {{ store.emotion.description }}
    </blockquote>

    <transition name="fade" appear>
      <div
        v-show="showMisconception && store.emotion.misconception"
        class="space-y-2"
        :class="crossout ? '-rotate-2 transition-all duration-500 ease-in' : ''"
      >
        <p class="tracking-wider italic text-sm text-rose-400">
          Common misconception:
        </p>
        <p class="italic text-sm" :class="crossout ? 'line-through' : ''">
          {{ store.emotion.misconception }}
        </p>
      </div>
    </transition>
    <transition name="fade" appear>
      <div v-show="crossout" class="pt-11">
        <label
          for="response"
          class="tracking-wider uppercase text-sm text-gray-400"
          >Where do you feel {{ store.emotion.name }} in your
          {{ store.prompt.category }}?</label
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
      </div>
    </transition>
    <transition name="fade" appear>
      <button
        v-show="crossout && response"
        @click="updateStep(4)"
        class="float-right -mt-4 font-medium hover:text-white"
      >
        Continue <span class="animate-pulse">&rarr;</span>
      </button>
    </transition>
    <transition name="fade" appear>
      <button
        v-show="crossout"
        @click="updateStep(2)"
        class="mt-8 font-medium hover:text-white"
      >
        <span class="animate-pulse">&larr;</span> Go back
      </button>
    </transition>
  </section>
</template>
<script>
import { ref } from "vue";

import { store } from "../../../store";
import { supabase, updateThought } from "../../../supabase";

export default {
  async setup() {
    const showMisconception = ref(false);
    const crossout = ref(false);
    const response = ref(store.todaysThought.response);

    function updateStep(step) {
      store.todaysThought.step = step;
      store.todaysThought.response = response.value;
      updateThought();
    }

    try {
      let { data: prompt, error } = await supabase
        .from("prompts")
        .select(`*,emotions(*)`)
        .eq("id", store.todaysThought.prompt_id)
        .single();

      if (error) throw error;

      if (prompt.id) {
        store.prompt = prompt;
      }

      if (prompt.emotions.name) {
        store.emotion = prompt.emotions;
      }
    } catch (error) {
      store.error = error;
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
      response,
      updateStep,

      store,
    };
  },
};
</script>