<template>
  <div
    class="
      max-w-screen-xl
      px-4
      py-12
      mx-auto
      sm:px-6
      lg:py-16
      lg:px-8
      lg:flex
      lg:items-center
      lg:justify-between
    "
  >
    <h2
      class="
        text-3xl
        font-extrabold
        leading-9
        tracking-tight
        text-gray-900
        sm:text-4xl
        sm:leading-10
      "
    >
      Finish setting your profile.
      <br />
      <span class="text-gray-500 text-xl"> You're almost ready!</span>
    </h2>
    <div class="flex mt-8 lg:flex-shrink-0 lg:mt-0">
      <div class="inline-flex rounded-md shadow">
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
            bg-sky-600
            border border-transparent
            rounded-md
            hover:bg-sky-500
            focus:outline-none
          "
          >Edit Profile &rarr;</router-link
        >
      </div>
    </div>
  </div>
</template>