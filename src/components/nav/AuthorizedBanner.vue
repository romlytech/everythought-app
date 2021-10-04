<template>
  <nav class="fixed w-full top-0 bg-gray-800 z-50 shadow text-center p-2">
    <p class="text-white text-sm md:text-base">
      You are logged in.
      <span class="ml-2 inline-block">
        <router-link
          to="/dashboard"
          class="text-white font-medium hover:text-gray-200"
        >
          Go to App
          <span aria-hidden="true">&rarr;</span></router-link
        >
      </span>
    </p>
  </nav>
</template>