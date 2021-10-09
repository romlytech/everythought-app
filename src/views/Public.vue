<template>
  <div>
    <!-- Show banner if user is signed in -->
    <AuthorizedBanner v-if="store.user" />
    <div>
      <!-- Main Content -->
      <main class="shadow-md bg-white dark:bg-gray-900">
        <!-- Router Child -->
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
      <!-- Footer -->
      <footer>
        <PublicFooter />
      </footer>
    </div>
  </div>
</template>

<script>
import { store } from "../store";
import AuthorizedBanner from "../components/nav/AuthorizedBanner.vue";
import PublicFooter from "../components/nav/PublicFooter.vue";

export default {
  components: {
    AuthorizedBanner,
    PublicFooter,
  },
  setup() {
    return {
      store,
    };
  },
};
</script>
