<template>
  <div class="mx-auto py-12 px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
    <nav class="justify-center pb-12" aria-label="Footer">
      <div class="text-center">
        <div>
          <router-link
            to="/"
            class="text-xl md:text-4xl text-sky-600 dark:text-sky-500"
          >
            Every<span
              class="text-gray-700 dark:text-gray-300 font-serif font-semibold"
              >Thought</span
            >
          </router-link>
        </div>
        <ul class="mt-4 space-x-4 inline-flex">
          <li v-for="item in footerNavigation.legal" :key="item.name">
            <a
              v-if="item.href"
              :href="item.to"
              rel="noopener noreferrer"
              class="
                text-base text-gray-600
                dark:text-gray-300
                hover:text-gray-800
                dark:hover:text-white
                transition
                ease-in-out
                duration-500
              "
            >
              {{ item.name }}
            </a>
            <router-link
              v-if="item.to"
              :to="item.to"
              class="
                text-base text-gray-600
                dark:text-gray-300
                hover:text-gray-800
                dark:hover:text-white
                transition
                ease-in-out
                duration-500
              "
            >
              {{ item.name }}
            </router-link>
          </li>
        </ul>
        <div>
          <p class="pt-4 text-xs text-gray-600 dark:text-gray-400">
            &copy; 2021 EveryThought. All rights reserved.
          </p>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
const footerNavigation = {
  legal: [
    { name: "Terms of Use", to: "/terms-of-use" },
    { name: "Privacy Policy", to: "/privacy-policy" },
    { name: "Contact", to: "/contact" },
  ],
};

export default {
  setup() {
    return {
      footerNavigation,
    };
  },
};
</script>