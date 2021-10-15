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
    <router-link to="/" class="text-2xl text-sky-600 my-4 mx-auto">
      Every<span class="text-gray-700 dark:text-gray-300 font-serif font-bold"
        >Thought</span
      >
    </router-link>
    <Auth />
  </div>
</template>