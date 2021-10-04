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
      p-4
      overflow-hidden
      overscroll-none
    "
  >
    <!-- Background Blurs -->
    <Blobs />
    <!-- Top nav -->
    <ThoughtNav />
    <!-- WIP: show errors -->
    <pre v-if="store.error" class="z-10 m-2 w-full overflow-scroll">{{
      store.error
    }}</pre>
    <transition name="slowfade" mode="out-in" appear>
      <StepOne v-if="store.todaysThought.step == 1" />
      <div class="z-50" v-else-if="store.todaysThought.step == 2">
        <transition name="slowfade" mode="out-in" appear>
          <Suspense>
            <StepTwo />
          </Suspense>
        </transition>
      </div>
      <div class="z-50" v-else-if="store.todaysThought.step == 3">
        <transition name="slowfade" mode="out-in" appear>
          <Suspense>
            <StepThree />
          </Suspense>
        </transition>
      </div>
      <StepFour v-else-if="store.todaysThought.step == 4" />
    </transition>
  </div>
</template>
<script>
import Blobs from "./Blobs.vue";
import ThoughtNav from "./ThoughtNav.vue";
import StepOne from "./StepOne.vue";
import StepTwo from "./StepTwo.vue";
import StepThree from "./StepThree.vue";
import StepFour from "./StepFour.vue";

import { store } from "../../../store";

import { initThought } from "../../../supabase";

export default {
  components: {
    Blobs,
    ThoughtNav,
    StepOne,
    StepTwo,
    StepThree,
    StepFour,
  },
  setup() {
    initThought();

    return {
      store,
    };
  },
};
</script>