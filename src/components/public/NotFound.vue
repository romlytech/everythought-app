<template>
  <div class="relative py-16 bg-white overflow-hidden">
    <Dots />
    <div class="relative px-4 sm:px-6 lg:px-8">
      <div class="text-lg max-w-prose mx-auto">
        <LegalHeader />
        <h1>
          <span
            class="
              block
              text-sm text-center text-sky-600
              font-semibold
              tracking-wide
              uppercase
            "
            >404</span
          >
          <span
            class="
              mt-2
              block
              text-3xl text-center
              leading-8
              font-extrabold
              tracking-tight
              text-gray-900
              sm:text-4xl
            "
            >Page not found</span
          >
        </h1>
        <p class="mt-8 text-xl text-gray-500 leading-8 text-center">
          Sorry, we're lost.
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import Dots from "./Dots.vue";
import LegalHeader from "../nav/LegalHeader.vue";

export default {
  components: {
    Dots,
    LegalHeader,
  },
};
</script>