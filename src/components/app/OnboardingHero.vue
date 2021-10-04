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
          : "Welcome, friend. Let's complete your profile"
      }}.
      <br />
      <span class="text-gray-500 text-xl font-sans font-light">
        Are you ready to dive into your thoughts today?</span
      >
    </h2>
    <div class="flex mt-8">
      <div class="inline-flex gap-4">
        <!-- <router-link
          to="/profile"
          class="
            inline-flex
            items-center
            justify-center
            px-5
            py-3
            text-base
            leading-6
            text-gray-700
            transition
            duration-150
            ease-in-out
            bg-gray-200
            border border-transparent
            rounded-md
            hover:bg-gray-300
            focus:outline-none
          "
          >Edit Profile</router-link
        > -->
        <router-link
          to="/thoughts"
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
          >Today's Thought &rarr;</router-link
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