<template>
  <nav class="pt-4 justify-between w-full flex z-50">
    <button
      v-if="store.todaysThought.step > 1"
      @click="updateStep(store.todaysThought.step - 1)"
      class="
        text-left
        font-medium
        flex-auto
        text-gray-300 text-sm
        hover:text-white
      "
    >
      <span class="animate-pulse">&larr;</span> Go back
    </button>
    <button
      v-if="store.todaysThought.step != 2 && store.showContinue"
      @click="updateStep(store.todaysThought.step + 1)"
      class="text-right flex-auto font-medium hover:text-white"
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