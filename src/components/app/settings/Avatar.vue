<template>
  <div>
    <transition name="fade" mode="out-in" appear>
      <img
        v-if="store.avatar_src"
        :src="store.avatar_src"
        class="h-full w-full object-cover rounded-full"
        alt=""
      />
      <span
        v-else
        class="inline-block rounded-full overflow-hidden bg-gray-100"
        :class="store.loading ? 'animate-pulse' : ''"
      >
        <svg
          class="h-full w-full text-gray-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </span>
    </transition>
  </div>
</template>
<script>
import { store } from "@/store";

export default {
  setup() {
    return {
      store,
    };
  },
};
</script>