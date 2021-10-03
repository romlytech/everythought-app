<template>
  <section class="max-w-md text-left z-50 space-y-4">
    <h1 class="text-4xl font-serif">Welcome, {{ store.profile.username }}.</h1>
    <transition name="fade" appear>
      <blockquote class="text-base border-l-2 border-gray-400 pl-2">
        Take a moment to relax. Allow yourself to get comfortable.
      </blockquote>
    </transition>
    <button @click="updateStep(2)" class="float-right mt-8">
      I'm ready <span class="animate-pulse">&rarr;</span>
    </button>
  </section>
</template>
<script>
import { store } from "../../../store";
export default {
  props: {
    name: String,
  },
  setup() {
    function updateStep(step) {
      store.current_step = step;
    }
    return {
      store,
      updateStep,
    };
  },
};
</script>