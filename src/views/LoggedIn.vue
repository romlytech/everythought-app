<template>
  <div>
    <AppNav />
    <main class="md:mt-16">
      <!-- <div v-if="$route.meta.requiresProfile && !store.profile.username">
        <transition name="fade" mode="out-in">
          <OnboardingHero
            class="bg-white sm:rounded-lg mb-6 shadow max-w-5xl"
          />
        </transition>
      </div> -->
      <!-- Router Child -->
      <router-view class="h-full" v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <!-- Footer -->
    <footer>
      <div class="mx-auto px-4 mb-14">
        <div class="text-xs text-gray-500 font-light text-center">
          <span class="block sm:inline"
            >&copy; 2021
            <a
              href="https://romly.tech/"
              rel="noopener"
              target="_blank"
              aria-label="EveryThought"
              class="hover:text-primary-500"
              >EveryThought</a
            >.</span
          >
          <span class="block sm:inline pl-1">All rights reserved.</span>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import { store } from "../store";
import AppNav from "../components/nav/AppNav.vue";
import OnboardingHero from "@/components/app/OnboardingHero.vue";

export default {
  components: {
    OnboardingHero,
    AppNav,
  },
  setup() {
    return {
      store,
    };
  },
};
</script>