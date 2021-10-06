<template>
  <section class="w-full max-w-md text-left z-50 space-y-4 px-0">
    <p class="tracking-wider uppercase text-sm text-gray-400 mb-4">
      Today, we're talking about
      <span class="font-medium text-gray-300">{{
        store.prompt.category ? store.prompt.category : "your emotions"
      }}</span
      >.
    </p>
    <RadioGroup
      v-model="agreement_response"
      class="space-y-2"
      @click="updateStep(3)"
    >
      <RadioGroupLabel class="text-3xl md:text-4xl font-serif"
        >{{ store.prompt.question }}
      </RadioGroupLabel>
      <div class="pt-4"></div>
      <transition-group name="fade" appear>
        <RadioGroupOption
          v-show="showAgreement"
          v-for="response in responses"
          :key="response.title"
          v-slot="{ active, checked }"
          :value="response.bool"
        >
          <button
            type="button"
            :class="[
              'inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 font-medium text-sm md:text-base',
              response.bool
                ? 'text-sky-900 bg-sky-200 hover:bg-sky-300'
                : 'text-rose-900 bg-rose-200 hover:bg-rose-300',
              active || checked ? 'ring-4 ring-white' : '',
            ]"
          >
            {{ response.title }}
          </button>
        </RadioGroupOption>
      </transition-group>
    </RadioGroup>
    <transition name="slowerfade" appear>
      <button
        v-show="showAgreement"
        @click="updateStep(1)"
        class="mt-8 font-medium text-gray-300 text-sm hover:text-white"
      >
        <span class="animate-pulse">&larr;</span> Go back
      </button>
    </transition>
  </section>
</template>
<script>
import { ref } from "vue";

import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";

import { store } from "../../../store";
import { updateThought } from "../../../supabase";

const responses = [
  { title: "Yeah, I agree with that.", bool: true },
  { title: "No, I don't feel that way.", bool: false },
];

export default {
  components: {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
  },
  setup() {
    const agreement_response = ref(store.todaysThought.agreement || null);
    const showAgreement = ref(false);

    function updateStep(step) {
      store.todaysThought.step = step;
      store.todaysThought.agreement = agreement_response.value;
      updateThought();
    }

    setInterval(() => {
      showAgreement.value = true;
    }, 3210);

    return {
      agreement_response,
      showAgreement,
      updateStep,

      store,
      responses,
    };
  },
};
</script>