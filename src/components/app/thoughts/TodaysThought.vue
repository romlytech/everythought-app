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
      <pre v-if="store.error" class="z-10 m-2 w-full overflow-scroll">{{
        store.error
      }}</pre>
      <transition name="slowfade" mode="out-in" appear>
        <StepOne v-if="store.todaysThought.step == 1 && !store.loading" />
        <div
          class="z-50"
          v-else-if="store.todaysThought.step == 2 && !store.loading"
        >
          <transition name="slowfade" mode="out-in" appear>
            <Suspense>
              <StepTwo />
            </Suspense>
          </transition>
        </div>
        <div
          class="z-50"
          v-else-if="store.todaysThought.step == 3 && !store.loading"
        >
          <transition name="slowfade" mode="out-in" appear>
            <Suspense>
              <StepThree />
            </Suspense>
          </transition>
        </div>
        <StepFour v-else-if="store.todaysThought.step == 4 && !store.loading" />
        <StepFive v-else-if="store.todaysThought.step == 5 && !store.loading" />
      </transition>
      <div class="h-12 z-50 w-full max-w-md">
        <transition name="slowfade" mode="out-in" appear>
          <StepNav
            v-if="
              store.showStepnav &&
              store.todaysThought.step != 5 &&
              !store.loading
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
import StepOne from "./StepOne.vue";
import StepTwo from "./StepTwo.vue";
import StepThree from "./StepThree.vue";
import StepFour from "./StepFour.vue";
import StepFive from "./StepFive.vue";

import { store } from "@/store";
import { initThought } from "@/supabase";

export default {
  components: {
    Blobs,
    StepNav,
    ThoughtNav,
    StepOne,
    StepTwo,
    StepThree,
    StepFour,
    StepFive,
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