<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <nav class="flex" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-2 font-medium">
        <li>
          <div>
            <router-link to="/home" class="text-gray-300 hover:text-white">
              <HomeIcon class="flex-shrink-0 h-5 w-5" aria-hidden="true" />
              <span class="sr-only">Home</span>
            </router-link>
          </div>
        </li>
        <li v-if="$route.meta.parentTitle">
          <h1 class="flex items-center">
            <ChevronRightIcon
              class="flex-shrink-0 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <router-link
              :to="$route.meta.parentPath"
              class="ml-2 text-gray-300 hover:text-white"
              >{{ $route.meta.parentTitle }}</router-link
            >
          </h1>
        </li>
        <li v-if="$route.path">
          <div class="flex items-center">
            <ChevronRightIcon
              class="flex-shrink-0 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <router-link
              v-if="$route.params.id"
              :to="'/app/local-chats/' + $route.params.id"
              class="ml-2 text-gray-300 hover:text-white"
              >#{{ $route.params.id }}</router-link
            >
            <router-link
              v-else
              :to="$route.path"
              class="ml-2 text-gray-300 hover:text-white"
              >{{ $route.meta.title }}</router-link
            >
          </div>
        </li>
      </ol>
    </nav>
  </div>
</template>
<script>
import { ChevronRightIcon, HomeIcon } from "@heroicons/vue/solid";

export default {
  components: {
    ChevronRightIcon,
    HomeIcon,
  },
};
</script>