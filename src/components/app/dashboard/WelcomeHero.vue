<template>
  <div
    class="
      bg-white
      dark:bg-gray-800
      sm:rounded-xl
      shadow-sm
      dark:shadow-none
      space-y-8
      py-8
    "
    :class="store.profile.first_name ? 'pb-0' : ''"
  >
    <div class="px-5 sm:px-8 sm:dark:px-0">
      <h1 class="text-3xl font-semibold sm:text-4xl font-serif">
        {{
          store.profile.first_name
            ? "Welcome back, " + store.profile.first_name
            : "Welcome, friend"
        }}.
      </h1>
      <p class="text-gray-500 dark:text-gray-200 text-lg sm:text-xl mt-2">
        {{
          store.profile.first_name
            ? "Are you ready to discover your emotions today?"
            : "Before we get started, let's complete your profile."
        }}
      </p>
    </div>
    <div class="flex px-5 sm:px-8 sm:dark:px-0">
      <div class="inline-flex gap-4 w-full">
        <router-link
          :to="store.profile.first_name ? '/thoughts/new' : '/account'"
          class="
            inline-flex
            space-x-2
            items-center
            justify-center
            px-5
            py-3
            w-full
            sm:w-auto
            font-medium
            text-white
            transition
            duration-500
            ease-in-out
            border border-transparent
            rounded-xl
            focus:outline-none
          "
          :class="
            store.profile.first_name
              ? 'bg-sky-600 dark:bg-sky-800 hover:bg-sky-500 dark:hover:bg-sky-700'
              : 'bg-gray-600 dark:bg-gray-800 hover:bg-gray-500 dark:hover:bg-gray-700'
          "
          ><span>{{
            store.profile.first_name ? "Start a new Thought" : "Edit Profile"
          }}</span>
          <AnnotationIcon v-if="store.profile.first_name" class="w-5 h-5" />
          <AnnotationIcon v-else class="w-5 h-5"
        /></router-link>
      </div>
    </div>
    <div
      v-if="store.profile.first_name"
      class="
        border-t-2 border-gray-100
        dark:border-none
        sm:rounded-b-xl
        sm:dark:rounded-xl
        bg-gray-50
        dark:bg-gray-800
        grid grid-cols-2
        divide-x-2 divide-gray-100
        dark:divide-none
      "
    >
      <div
        class="px-5 py-3 text-sm text-gray-600 dark:text-gray-300 text-center"
      >
        Total thoughts<br />
        <span class="text-gray-700 dark:text-gray-300 font-medium">{{
          store.thoughtCount
        }}</span>
      </div>
      <div
        class="px-5 py-3 text-sm text-gray-600 dark:text-gray-300 text-center"
      >
        User since<br />
        <span class="text-gray-700 dark:text-gray-300 font-medium">{{
          user_since
        }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { AnnotationIcon, PencilAltIcon } from "@heroicons/vue/solid";
import { store } from "../../../store";
export default {
  components: { AnnotationIcon, PencilAltIcon },
  setup() {
    const options = { year: "2-digit", month: "2-digit", day: "2-digit" };
    const user_since = new Date(store.user.created_at).toLocaleDateString(
      "en",
      options
    );
    return { store, user_since };
  },
};
</script>