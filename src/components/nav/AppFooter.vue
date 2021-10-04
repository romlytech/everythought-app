<template>
  <footer
    class="
      max-w-2xl
      mx-auto
      px-4
      md:px-6
      lg:px-8
      flex
      justify-between
      text-xs text-gray-500
    "
  >
    <p>&copy; 2021 EveryThought</p>
    <nav class="space-x-2 font-medium inline-flex">
      <router-link
        to="/privacy-policy"
        class="text-gray-600 hover:text-gray-800"
      >
        Privacy
      </router-link>
      <router-link to="/terms-of-use" class="text-gray-600 hover:text-gray-800">
        Terms
      </router-link>
    </nav>
  </footer>
</template>