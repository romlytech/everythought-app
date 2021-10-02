<template>
  <header class="text-lg max-w-prose mx-auto">
    <div class="text-center w-full mx-auto mb-6">
      <router-link to="/" class="text-2xl font-bold text-sky-600">
        Every<span class="text-gray-700">Thought</span
        ><span class="text-gray-600 text-sm">.app</span>
      </router-link>
    </div>
    <h1 v-if="subtitle" class="mt-12">
      <span
        class="
          block
          text-sm text-center text-sky-600
          font-semibold
          tracking-wide
          uppercase
        "
        >{{ subtitle }}</span
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
        >{{ $route.meta.title }}</span
      >
    </h1>
  </header>
</template>
<script>
export default {
  props: {
    subtitle: String,
  },
};
</script>