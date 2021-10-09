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
    <!-- WIP: show errors -->
    <main class="grid items-center w-screen max-w-md">
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
      <div class="h-12 z-50 w-full max-w-md">
        <transition name="slowfade" mode="out-in" appear>
          <StepNav
            v-if="
              store.showStepnav &&
              !store.loading &&
              store.todaysThought.step != 7 &&
              store.todaysThought.step != 4 &&
              store.todaysThought.step != 6
            "
          />
        </transition>
      </div>
    </main>
  </div>
</template>
<script>
import Blobs from "./Blobs.vue";
import ThoughtNav from "./ThoughtNav.vue";
import StepNav from "./StepNav.vue";
import Welcome from "./Welcome.vue";
import Question from "./Question.vue";
import MisconceptionTruth from "./MisconceptionTruth.vue";
import EmotionDescription from "./EmotionDescription.vue";
import Response from "./Response.vue";
import Closing from "./Closing.vue";

import { store } from "@/store";
import { initThought } from "@/supabase";
import ImageStep from "./ImageStep.vue";

export default {
  components: {
    Blobs,
    StepNav,
    ThoughtNav,
    Welcome,
    Question,
    EmotionDescription,
    MisconceptionTruth,
    Response,
    Closing,
    ImageStep,
  },
  setup() {
    initThought();
    store.showContinue = true;
    store.showStepnav = false;

    return {
      store,
    };
  },
};
</script>