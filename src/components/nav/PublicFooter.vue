<template>
  <div class="mx-auto py-12 px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
    <nav class="justify-center pb-12" aria-label="Footer">
      <div class="text-center">
        <div>
          <router-link
            to="/"
            class="text-xl md:text-4xl font-bold text-sky-600"
          >
            Every<span class="text-gray-700">Thought</span
            ><span class="text-gray-600 text-sm md:text-xl">.app</span>
          </router-link>
        </div>
        <ul class="mt-4 space-x-4 inline-flex">
          <li v-for="item in footerNavigation.legal" :key="item.name">
            <a
              v-if="item.href"
              :href="item.to"
              rel="noopener noreferrer"
              class="text-base text-gray-600 hover:text-gray-800"
            >
              {{ item.name }}
            </a>
            <router-link
              v-if="item.to"
              :to="item.to"
              class="text-base text-gray-600 hover:text-gray-800"
            >
              {{ item.name }}
            </router-link>
          </li>
        </ul>
        <div>
          <p class="pt-4 text-xs text-gray-600">
            &copy; 2021
            <a
              href="https://romly.tech/"
              rel="noopener"
              target="_blank"
              aria-label="EveryThought"
              class="hover:text-primary-500"
              >EveryThought</a
            >. All rights reserved.
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