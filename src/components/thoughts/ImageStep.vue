<template>
  <section class="w-full z-50 space-y-4">
    <transition name="fade" mode="out-in" appear>
      <RadioGroup
        v-model="image_category"
        class="space-y-4"
        v-if="store.prompt_images.length && !image_category"
      >
        <RadioGroupLabel>
          <p
            class="
              tracking-wider
              uppercase
              text-center text-sm
              mx-auto
              text-gray-400
            "
          >
            Choose an image you associate<br />
            <span class="font-medium text-gray-300">{{
              store.emotion.name
            }}</span>
            with the most:
          </p>
        </RadioGroupLabel>
        <div class="flex flex-wrap justify-center gap-6">
          <RadioGroupOption
            v-for="(img, index) of store.prompt_images"
            :key="img.name"
            v-slot="{ active, checked }"
            :value="img.category"
            :class="[
              'flex-auto max-h-48 sm:max-h-54 md:max-h-64 w-32 ',
              Boolean(index % 2) ? 'rotate-2' : '-rotate-2',
            ]"
          >
            <button
              type="button"
              :class="[
                'w-full h-full rounded-xl border border-transparent hover:scale-105 transition-transform ease-in-out duration-500',
                active || checked ? 'ring-4 ring-white' : '',
              ]"
              style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0)"
            >
              <img
                class="h-full w-full object-cover rounded-xl"
                :src="img.url"
                alt=""
              />
            </button>
          </RadioGroupOption>
          <div class="flex-grow w-full">
            <button
              @click="showMore"
              class="
                text-left
                font-medium
                inline-flex
                items-center
                text-gray-300 text-xs
                hover:text-white
                bg-transparent
                border-transparent
                focus:border-transparent
                focus:ring-0
                mx-auto
              "
              style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0)"
              tabindex="-1"
            >
              Show more <RefreshIcon class="w-4 h-4 ml-1.5" />
            </button>
          </div>
        </div>
      </RadioGroup>
      <RadioGroup
        v-else-if="image_category"
        class="space-y-2"
        v-model="image_agree"
      >
        <RadioGroupLabel class="text-lg md:text-xl font-serif mx-auto"
          >It looks like you might find
          <span class="font-bold text-gray-300">{{ store.emotion.name }}</span>
          {{ setAction(image_category) }}
          <span class="font-bold text-gray-300">{{ image_category }}</span
          >. Does this seem right to you?
        </RadioGroupLabel>
        <div class="pt-4"></div>
        <div class="flex-col justify-between flex space-y-2">
          <RadioGroupOption
            v-for="response in responses"
            :key="response.title"
            v-slot="{ active, checked }"
            :value="response.bool"
            @click="respondTo()"
          >
            <button
              type="button"
              :class="[
                'inline-flex justify-center w-full rounded-xl border border-transparent px-4 py-2 font-medium text-sm md:text-base',
                response.bool
                  ? 'text-sky-900 bg-sky-200 hover:bg-sky-300'
                  : 'text-rose-900 bg-rose-200 hover:bg-rose-300',
                active || checked ? 'ring-4 ring-white' : '',
              ]"
              style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0)"
            >
              {{ response.title }}
            </button>
          </RadioGroupOption>
        </div>
      </RadioGroup>
    </transition>
  </section>
</template>
<script>
import { ref } from "vue";
import { store } from "@/store";
import { getImages, updateThought } from "@/supabase";

import { RefreshIcon } from "@heroicons/vue/solid";

export default {
  components: { RefreshIcon },
  setup() {
    const responses = [
      {
        title: "Yes, it does.",
        bool: true,
      },
      {
        title: "No, let me pick another one.",
        bool: false,
      },
    ];
    store.showStepnav = false;
    store.showContinue = false;
    const image_category = ref(store.todaysThought.image_category || "");
    const image_agree = ref(store.todaysThought.image_agree || null);

    function updateStep(step) {
      store.showStepnav = false;
      store.showContinue = false;
      store.todaysThought.step = step;
      store.todaysThought.image_category = image_category.value;
      store.todaysThought.image_agree = image_agree.value;
      updateThought();
    }

    async function showMore() {
      store.prompt_images = [];
      image_category.value = "";
      getImages();
    }

    async function respondTo() {
      if (image_agree.value) {
        store.showStepnav = false;
        store.todaysThought.image_agree = image_agree.value;
        updateStep(5);
      } else {
        image_agree.value = "";
        image_category.value = "";
        getImages();
      }
    }

    return {
      responses,
      respondTo,
      image_agree,
      image_category,
      showMore,

      store,
    };
  },
  methods: {
    setAction: function (category) {
      if (category == "nature") {
        return "in";
      } else if (category == "activities") {
        return "when doing";
      } else {
        return "in your";
      }
    },
  },
};
</script>