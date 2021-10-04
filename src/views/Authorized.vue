<template>
  <div>
    <AppNav />
    <main class="sm:mt-16">
      <!-- Router Child -->
      <router-view class="h-full" v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <!-- Footer -->
    <AppFooter />
  </div>
</template>
<script>
import { store } from "../store";
import AppNav from "../components/nav/AppNav.vue";
import AppFooter from "@/components/nav/AppFooter.vue";

export default {
  components: {
    AppNav,
    AppFooter,
  },
  setup() {
    return {
      store,
    };
  },
};
</script>