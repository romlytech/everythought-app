<template>
  <div class="sticky top-0 bg-gray-800 z-50 shadow">
    <div class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
      <div class="text-center sm:px-16">
        <p class="text-white text-sm md:text-base">
          You are logged in.
          <span class="block sm:ml-2 sm:inline-block">
            <router-link
              to="/home"
              class="text-white font-bold hover:text-gray-200"
            >
              Go to App
              <span aria-hidden="true">&rarr;</span></router-link
            >
          </span>
        </p>
      </div>
    </div>
  </div>
</template>