<template>
  <div
    class="bg-white sm:rounded-lg shadow space-y-8 py-8"
    :class="store.profile.first_name ? 'pb-0' : ''"
  >
    <div class="px-5 sm:px-8">
      <h1 class="text-3xl font-semibold text-gray-900 sm:text-4xl font-serif">
        {{
          store.profile.first_name
            ? "Welcome back, " + store.profile.first_name
            : "Welcome, friend."
        }}
      </h1>
      <p class="text-gray-500 text-xl leading-9">
        {{
          store.profile.first_name
            ? "Are you ready to discover your emotions today?"
            : "Before we get started, let's complete your profile."
        }}
      </p>
    </div>
    <div class="flex px-5 sm:px-8">
      <div class="inline-flex gap-4">
        <router-link
          :to="store.profile.first_name ? '/thoughts/new' : '/account'"
          class="
            inline-flex
            items-center
            justify-center
            px-5
            py-3
            text-base
            leading-6
            font-medium
            text-white
            transition
            duration-500
            ease-in-out
            border border-transparent
            rounded-md
            focus:outline-none
          "
          :class="
            store.profile.first_name
              ? 'bg-sky-600 hover:bg-sky-500'
              : 'bg-gray-600 hover:bg-gray-500'
          "
          >{{
            store.profile.first_name ? "Today's Thought" : "Edit Profile"
          }}
          &rarr;</router-link
        >
      </div>
    </div>
    <div
      v-if="store.profile.first_name"
      class="
        border-t border-gray-200
        rounded-b-md
        bg-gray-50
        grid grid-cols-2
        divide-x divide-gray-200
      "
    >
      <div class="px-5 py-3 text-sm text-gray-600 text-center">
        Total thoughts<br />
        <span class="text-gray-700 font-medium">{{ store.thoughtCount }}</span>
      </div>
      <div class="px-5 py-3 text-sm text-gray-600 text-center">
        User since<br />
        <span class="text-gray-700 font-medium">{{ user_since }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { store } from "../../../store";
export default {
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