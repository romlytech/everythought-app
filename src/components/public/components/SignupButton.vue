<template>
  <router-link
    to="/register"
    class="
      inline-flex
      items-center
      px-4
      py-2
      border border-transparent
      text-base
      font-medium
      rounded-xl
      shadow-sm
      focus:outline-none
      focus:ring-2 focus:ring-offset-2 focus:ring-sky-500
      transition-colors
      ease-in-out
      duration-500
    "
    :class="
      secondary
        ? 'text-sky-700 bg-sky-100 hover:bg-sky-200'
        : 'text-white bg-sky-600 hover:bg-sky-700 '
    "
  >
    Get started &rarr;
  </router-link>
</template>
<script>
export default {
  props: {
    secondary: Boolean,
  },
};
</script>