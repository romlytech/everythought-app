<template>
  <header class="text-lg max-w-prose mx-auto">
    <div class="text-center w-full mx-auto mb-6">
      <router-link to="/" class="text-2xl text-sky-600">
        Every<span class="text-gray-700 font-serif font-bold">Thought</span>
      </router-link>
    </div>
    <h1 v-if="showTitle" class="mt-12">
      <span
        v-if="subtitle"
        class="block text-sm text-center text-sky-600 tracking-wide uppercase"
        >{{ subtitle }}</span
      >
      <span
        class="
          mt-2
          block
          text-3xl text-center
          leading-8
          font-semibold
          text-gray-900
          sm:text-4xl
          font-serif
        "
        >{{ $route.meta.title }}</span
      >
    </h1>
  </header>
</template>
<script>
export default {
  props: {
    subtitle: String,
    showTitle: Boolean,
  },
};
</script>