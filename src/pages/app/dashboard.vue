<template>
  <div class="max-w-2xl mx-auto pb-6 sm:px-6 lg:px-8 space-y-11">
    <WelcomeHero />
    <ThoughtCards v-if="store.profile.first_name" />
  </div>
</template>
<script>
import { store } from "@/store";
export default {
  setup() {
    return { store };
  },
};
</script>
