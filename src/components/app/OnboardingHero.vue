<template>
  <div class="max-w-screen-xl px-4 py-12 mx-auto">
    <h2
      class="
        text-3xl
        leading-9
        font-semibold
        text-gray-900
        sm:text-4xl
        sm:leading-10
        font-serif
      "
    >
      {{
        store.profile.first_name
          ? "Welcome back, " + store.profile.first_name
          : "Welcome, friend."
      }}
      <br />
      <span class="text-gray-500 text-xl font-sans font-normal">
        {{
          store.profile.first_name
            ? "Are you ready to dive into your thoughts today?"
            : "Before we get started, let's complete your profile."
        }}</span
      >
    </h2>
    <div class="flex mt-8">
      <div class="inline-flex gap-4">
        <router-link
          :to="store.profile.first_name ? '/thoughts' : '/profile'"
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
            bg-sky-600
            border border-transparent
            rounded-md
            hover:bg-sky-500
            focus:outline-none
          "
          >{{
            store.profile.first_name ? "Today's Thought" : "Edit Profile"
          }}
          &rarr;</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import { store } from "../../store";
export default {
  setup() {
    return { store };
  },
};
</script>