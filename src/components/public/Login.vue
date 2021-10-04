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
    <router-link to="/" class="text-xl text-sky-600 my-4 mx-auto">
      Every<span class="text-gray-700 font-serif font-bold">Thought</span
      ><span class="text-gray-600 text-sm">.app</span>
    </router-link>
    <Auth />
  </div>
</template>
<script>
import Auth from "./Auth.vue";

export default {
  components: {
    Auth,
  },
};
</script>