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