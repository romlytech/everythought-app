<template>
  <nav class="pt-4 justify-between w-full inline-flex z-50">
    <div class="flex-auto">
      <button
        v-if="store.todaysThought.step > 1"
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
      >
        <span class="animate-pulse">&larr;</span> Go back
      </button>
    </div>
    <div class="flex-auto text-right">
      <transition name="slowfade" appear>
        <button
          v-show="store.todaysThought.step != 2 && store.showContinue"
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
              : store.todaysThought.step == 5
              ? "Complete"
              : "Continue"
          }}
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
  setup() {
    return { updateStep, store };
  },
};
</script>