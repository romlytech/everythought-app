<template>
  <div class="rounded-md bg-yellow-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <ExclamationIcon
          class="animate-pulse h-5 w-5 text-yellow-400"
          aria-hidden="true"
        />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-bold text-yellow-800">
          {{ title }}
        </h3>
        <div class="mt-2 text-sm text-yellow-700">
          <p>
            {{ msg }}
          </p>
        </div>
        <router-link
          v-if="linkto"
          :to="linkto"
          class="
            mt-2
            inline-flex
            justify-center
            w-full
            rounded-md
            border border-transparent
            shadow-sm
            px-4
            py-2
            bg-green-600
            text-base
            font-medium
            text-white
            hover:bg-green-700
            focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-green-500
            sm:text-sm
          "
        >
          {{ linktitle }} &rarr;
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ExclamationIcon } from "@heroicons/vue/solid";

export default {
  props: {
    title: String,
    msg: String,
    linktitle: String,
    linkto: String,
  },
  components: {
    ExclamationIcon,
  },
};
</script>