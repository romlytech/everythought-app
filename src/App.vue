<template>
  <div>
    <!-- Router View -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <!-- Toaster Notifications -->
    <notificationGroup group="toast" position="bottom">
      <div
        class="
          fixed
          inset-x-0
          bottom-0
          flex
          px-4
          py-6
          pointer-events-none
          p-6
          md:mr-4
          items-start
          justify-center
          md:justify-end
        "
      >
        <div class="max-w-sm w-full">
          <notification v-slot="{ notifications }">
            <div
              class="
                flex
                max-w-sm
                w-full
                mx-auto
                bg-white
                dark:bg-gray-800
                shadow-md
                rounded-lg
                overflow-hidden
                mt-4
              "
              v-for="notification in notifications"
              :key="notification.id"
            >
              <div
                :class="[
                  notification.type == 'success'
                    ? 'bg-green-600'
                    : 'bg-red-600',
                  'flex justify-center items-center w-12',
                ]"
              >
                <svg
                  v-if="notification.type == 'success'"
                  class="h-6 w-6 fill-current text-green-50"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  v-if="notification.type == 'error'"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 fill-current text-red-100"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>

              <div class="-mx-3 py-2 px-4">
                <div class="mx-3">
                  <span
                    :class="[
                      notification.type == 'success'
                        ? 'text-green-600 dark:text-green-300'
                        : 'text-red-600 dark:text-red-300',
                      'text-sm font-bold',
                    ]"
                    >{{ notification.title }}</span
                  >
                  <p class="text-gray-600 dark:text-gray-200 text-sm">
                    {{ notification.text }}
                  </p>
                </div>
              </div>
            </div>
          </notification>
        </div>
      </div>
    </notificationGroup>
  </div>
</template>
<script>
export default {
  methods: {
    setViewHeight: function () {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    },
  },
  mounted: function () {
    this.setViewHeight();
    window.addEventListener("resize", () => {
      this.setViewHeight();
    });
  },
};
</script>