<template>
  <div class="mb-8">
    <!-- Header -->
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
import { store } from "@/store";
export default {
  setup() {
    return { store };
  },
};
</script>