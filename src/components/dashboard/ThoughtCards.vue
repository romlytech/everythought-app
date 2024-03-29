<template>
  <section class="px-3 sm:px-0 pb-8">
    <h2 class="text-lg leading-6 font-medium mb-2">Recent thoughts</h2>
    <transition name="fade" mode="out-in" appear>
      <div
        class="
          bg-white
          dark:bg-gray-700
          shadow-sm
          space-y-3
          p-4
          flex-auto
          rounded-xl
          transition
          duration-500
          ease-in-out
          hover:bg-sky-50
          dark:hover:bg-gray-600
          h-24
          animate-pulse
        "
        v-if="store.loading"
      >
        <div class="flex-grow space-y-2">
          <div class="h-4 bg-gray-200 dark:bg-gray-600 w-full rounded-xl"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-600 w-3/4 rounded-xl"></div>
        </div>
        <div
          class="
            leading-6
            inline-flex
            items-center
            justify-between
            space-x-2
            w-full
          "
        >
          <div class="h-3 w-1/6 rounded-lg bg-gray-200 dark:bg-gray-600"></div>
          <div
            class="
              inline-flex
              items-center
              px-2.5
              py-0.5
              rounded-xl
              text-xs
              font-medium
              uppercase
              bg-gray-200
              dark:bg-gray-600
              w-3/12
              h-4
            "
          ></div>
        </div>
      </div>
      <div v-else-if="store.thoughts.length" class="flex flex-wrap gap-4">
        <div
          v-for="thought of store.thoughts"
          :key="thought.id"
          class="
            bg-white
            dark:bg-gray-700
            shadow-sm
            space-y-3
            p-4
            flex-auto
            rounded-xl
            transition
            duration-500
            ease-in-out
            hover:bg-sky-50
            dark:hover:bg-gray-600
          "
        >
          <p
            class="
              font-medium
              tracking-wide
              text-gray-700
              dark:text-gray-300
              font-serif
              whitespace-pre-wrap
            "
          >
            {{ thought.response }}
          </p>
          <p
            class="
              text-xs text-gray-500
              dark:text-gray-400
              tracking-wider
              leading-6
              inline-flex
              items-center
              justify-between
              space-x-2
              w-full
            "
          >
            <time class="hidden md:inline-flex" :datetime="thought.date">{{
              longDate(thought.date)
            }}</time>
            <time
              style="margin-left: 0"
              class="md:hidden"
              :datetime="thought.date"
              >{{ shortDate(thought.date) }}</time
            >
            <span
              class="
                inline-flex
                items-center
                px-2.5
                py-0.5
                rounded-xl
                text-xs
                font-medium
                uppercase
              "
              :class="
                thought.agreement
                  ? 'bg-sky-100  text-sky-800 dark:bg-sky-200 dark:text-sky-900'
                  : 'bg-rose-100 text-rose-800 dark:bg-rose-200 dark:text-rose-900'
              "
            >
              {{ thought.prompts.emotion.name }}
            </span>
          </p>
        </div>
      </div>
      <p v-else class="text-gray-600 dark:text-gray-400 font-serif">
        You haven't journaled any of your thoughts yet.
      </p>
    </transition>
    <p
      v-if="store.thoughts && store.oldThoughts"
      class="
        text-gray-500
        dark:text-gray-400
        font-serif
        pt-4
        flex-grow
        text-center text-xs
      "
    >
      Currently, you can only view Thoughts from the past thirty days.
    </p>
  </section>
</template>
<script>
import { store } from "@/store";
import { fetchThoughts } from "@/supabase";

export default {
  setup() {
    fetchThoughts();

    function shortDate(date) {
      const options = { year: "2-digit", month: "2-digit", day: "2-digit" };
      return new Date(date).toLocaleDateString("en", options);
    }

    function longDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("en", options);
    }
    return { store, shortDate, longDate };
  },
};
</script>