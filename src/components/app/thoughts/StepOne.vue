<template>
  <section class="w-full max-w-md text-left h-36 z-50 space-y-4 px-0">
    <h1 class="text-4xl font-serif">
      Welcome, {{ store.profile.first_name }}.
    </h1>
    <p class="text-gray-300">
      Take a moment to relax. Allow yourself to get comfortable.
    </p>
    <transition name="slowerfade" appear>
      <button
        v-show="showButton"
        @click="updateStep(2)"
        class="float-right mt-8 font-medium hover:text-white"
      >
        I'm ready <span class="animate-pulse">&rarr;</span>
      </button>
    </transition>
  </section>
</template>
<script>
import { ref } from "vue";
import { store } from "../../../store";
import { updateThought } from "../../../supabase";

export default {
  props: {
    name: String,
  },
  setup() {
    const showButton = ref(false);

    function updateStep(step) {
      store.todaysThought.step = step;
      updateThought();
    }

    setInterval(() => {
      showButton.value = true;
    }, 4321);

    return {
      showButton,

      updateStep,
      store,
    };
  },
};
</script>