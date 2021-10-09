<template>
  <div class="fixed top-0 w-full z-50">
    <div class="fixed top-1 left-0.5">
      <router-link
        to="/dashboard"
        class="
          ml-1
          flex
          items-center
          justify-center
          h-8
          w-8
          rounded-full
          focus:outline-none
          focus:ring-2 focus:ring-inset focus:ring-white
        "
      >
        <span class="sr-only">Close and go home</span>
        <XIcon
          class="h-5 w-5 text-gray-300 hover:text-white"
          aria-hidden="true"
        />
      </router-link>
    </div>
    <nav class="flex items-center justify-center p-4" aria-label="Progress">
      <ol role="list" class="flex items-center space-x-5">
        <li
          v-for="step in steps"
          :key="step.id"
          :class="[
            store.todaysThought.step >= step.id ? 'bg-gray-300' : 'bg-gray-500',
            'block w-3 h-1 rounded-full transition-colors ease-in-out duration-700',
          ]"
          @click="moveStep(step.id)"
        >
          <span class="sr-only">Step {{ step.id }}</span>
        </li>
      </ol>
    </nav>
  </div>
</template>
<script>
import { XIcon } from "@heroicons/vue/solid";
import { store } from "@/store";
import { updateStep } from "@/supabase";

const steps = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
];

export default {
  components: { XIcon },
  setup() {
    function moveStep(step) {
      if (store.todaysThought.step >= step) {
        updateStep(step);
      } else return;
    }
    return {
      moveStep,
      store,
      steps,
    };
  },
};
</script>