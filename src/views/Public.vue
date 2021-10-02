<template>
  <div>
    <!-- Show banner if user is signed in -->
    <SignedInBanner v-if="store.user" />
    <div>
      <!-- Main Content -->
      <main class="shadow-md">
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
import SignedInBanner from "../components/public/SignedInBanner.vue";
import PublicFooter from "../components/nav/PublicFooter.vue";

export default {
  components: {
    SignedInBanner,
    PublicFooter,
  },
  setup() {
    return {
      store,
    };
  },
};
</script>
