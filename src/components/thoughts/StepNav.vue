<template>
  <nav class="pt-4 justify-between w-full inline-flex z-50">
    <div class="flex-auto">
      <button
        v-if="showBack"
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
          v-if="showContinue"
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
          {{ continueText ? continueText : "Continue" }}
          <span class="animate-pulse">&rarr;</span>
        </button>
      </transition>
    </div>
  </nav>
</template>
<script>
import { updateStep } from "@/supabase";
import { store } from "@/store";
export default {
  props: {
    showBack: Boolean,
    showContinue: Boolean,
    continueText: String,
  },
  setup() {
    return { updateStep, store };
  },
};
</script>