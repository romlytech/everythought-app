<template>
  <div class="max-w-6xl mx-auto pb-6 sm:px-6 lg:px-8">
    <div class="bg-white sm:rounded-lg shadow px-5 py-6">
      <OnboardingHero />
    </div>
  </div>
</template>
<script>
import { store } from "../../store";
import OnboardingHero from "./OnboardingHero.vue";

export default {
  components: {
    OnboardingHero,
  },
  setup() {
    return { store };
  },
};
</script>
