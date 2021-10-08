<template>
  <section class="w-full z-50 space-y-4" v-if="store.prompt_images.length">
    <RadioGroup
      v-model="image_category"
      class="space-y-4"
      @click="updateStep(5)"
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
          Choose an image you associate
          <span class="font-medium text-gray-300">{{
            store.emotion.name
          }}</span>
          with the most:
        </p>
      </RadioGroupLabel>
      <div class="flex flex-wrap justify-center gap-3">
        <RadioGroupOption
          v-for="(img, index) of store.prompt_images"
          :key="img.name"
          v-slot="{ active, checked }"
          :value="img.category"
          :class="[
            'flex-auto max-h-28 sm:max-h-32 md:max-h-40 w-48 p-2',
            Boolean(index % 2) ? 'rotate-2' : '-rotate-2',
          ]"
        >
          <button
            type="button"
            :class="[
              'w-full h-full rounded-xl border border-transparent',
              active || checked ? 'ring-4 ring-white' : '',
            ]"
          >
            <img
              class="h-full w-full object-cover rounded-xl"
              :src="img.url"
              alt=""
            />
          </button>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </section>
</template>
<script>
import { ref } from "vue";

import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";

import { store } from "@/store";
import { getImages, updateThought } from "@/supabase";

export default {
  components: {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
  },
  setup() {
    getImages();

    store.showStepnav = false;
    store.showContinue = false;
    const image_category = ref("");

    function updateStep(step) {
      store.showStepnav = false;
      store.todaysThought.step = step;
      store.todaysThought.image_category = image_category.value;
      updateThought();
    }

    setInterval(() => {
      store.showStepnav = true;
    }, 3000);

    return {
      image_category,
      updateStep,

      store,
    };
  },
};
</script>