<template>
  <div
    class="
      fixed
      flex
      items-center
      justify-center
      text-gray-200
      bg-gradient-to-b
      from-gray-700
      to-gray-800
      w-full
      h-full
      max-h-screen max-w-screen
      p-3
      pt-11
      overflow-hidden
      overscroll-none
    "
  >
    <!-- Background Blurs -->
    <Blobs />
    <!-- Top nav -->
    <ThoughtNav />
    <main
      class="
        grid
        items-center
        w-screen
        max-w-md
        h-full
        overflow-y-auto overflow-x-hidden
      "
    >
      <transition name="slowfade" mode="out-in" appear>
        <Welcome v-if="store.todaysThought.step == 1 && !store.loading" />
        <Question v-else-if="store.todaysThought.step == 2 && !store.loading" />
        <MisconceptionTruth
          v-else-if="store.todaysThought.step == 3 && !store.loading"
        />
        <ImageStep
          v-else-if="store.todaysThought.step == 4 && !store.loading"
        />
        <EmotionDescription
          v-else-if="store.todaysThought.step == 5 && !store.loading"
        />
        <Response v-else-if="store.todaysThought.step == 6 && !store.loading" />
        <Closing v-else-if="store.todaysThought.step == 7 && !store.loading" />
      </transition>
    </main>
  </div>
</template>
<script>
import { store } from "@/store";
import { initThought } from "@/supabase";
export default {
  setup() {
    initThought();
    return { store };
  },
};
</script>