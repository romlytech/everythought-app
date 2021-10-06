<template>
  <section class="px-5 sm:px-0 pb-8">
    <h2 class="text-lg leading-6 font-medium text-gray-900 mb-2">
      Recent thoughts
    </h2>
    <div v-if="store.thoughts.length" class="flex flex-wrap gap-4">
      <div
        v-for="thought of store.thoughts"
        :key="thought.id"
        class="
          bg-white
          shadow
          space-y-3
          p-4
          flex-auto
          rounded-md
          transition
          duration-500
          ease-in-out
          hover:bg-gray-100
        "
      >
        <p class="font-medium text-gray-700 font-serif whitespace-pre-wrap">
          {{ thought.response }}
        </p>
        <p
          class="
            text-xs text-gray-500
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
              rounded-md
              text-xs
              font-medium
              uppercase
            "
            :class="
              thought.agreement
                ? 'bg-sky-100 text-sky-800'
                : 'bg-rose-100 text-rose-800'
            "
          >
            {{ thought.prompts.emotion.name }}
          </span>
        </p>
      </div>
    </div>
    <p v-else class="text-gray-600 font-serif">
      You haven't journaled any of your thoughts yet.
    </p>
    <p
      v-if="store.thoughts && store.oldThoughts"
      class="text-gray-500 font-serif pt-4 flex-grow text-center text-xs"
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