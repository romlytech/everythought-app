<template>
  <div class="max-w-screen-xl px-4 py-12 mx-auto">
    <h2
      class="
        text-3xl
        font-extrabold
        leading-9
        tracking-tight
        text-gray-900
        sm:text-4xl
        sm:leading-10
        font-serif
      "
    >
      Finish setting your profile.
      <br />
      <span class="text-gray-500 text-xl font-sans"> You're almost ready!</span>
    </h2>
    <div class="flex mt-8">
      <div class="inline-flex gap-4">
        <router-link
          to="/profile"
          class="
            inline-flex
            items-center
            justify-center
            px-5
            py-3
            text-base
            font-bold
            leading-6
            text-white
            transition
            duration-150
            ease-in-out
            bg-gray-600
            border border-transparent
            rounded-md
            hover:bg-gray-500
            focus:outline-none
          "
          >Edit Profile</router-link
        >
        <router-link
          to="/thoughts"
          class="
            inline-flex
            items-center
            justify-center
            px-5
            py-3
            text-base
            font-bold
            leading-6
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