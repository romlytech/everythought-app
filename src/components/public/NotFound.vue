<template>
  <div
    class="
      sm:mx-auto
      md:px-4
      sm:max-w-4xl
      min-h-screen
      flex flex-col
      justify-center
      overflow-auto
    "
  >
    <PublicHeader subtitle="404" :showTitle="true" />
    <router-link
      to="/"
      class="
        mx-auto
        px-4
        py-2
        mt-8
        text-sm
        leading-6
        text-white
        transition
        duration-150
        ease-in-out
        bg-gray-600
        border border-transparent
        rounded-xl
        hover:bg-gray-500
        focus:outline-none
      "
      >&olarr; Return to home</router-link
    >
  </div>
</template>
<script>
import PublicHeader from "../nav/PublicHeader.vue";

export default {
  components: {
    PublicHeader,
  },
};
</script>