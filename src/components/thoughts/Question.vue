<template>
  <section class="w-full z-50 space-y-4">
    <p class="tracking-wider uppercase text-sm text-gray-400 mb-4">
      Ask yourself this question:
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
      <div class="h-20 md:h-24 flex-col justify-between flex space-y-2">
        <transition-group name="fade" appear>
          <RadioGroupOption
            v-show="store.showStepnav"
            v-for="response in responses"
            :key="response.title"
            v-slot="{ active, checked }"
            :value="response.bool"
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
            >
              {{ response.title }}
            </button>
          </RadioGroupOption>
        </transition-group>
      </div>
    </RadioGroup>
  </section>
</template>
<script>
import { ref } from "vue";
import { store } from "@/store";
import { updateThought } from "@/supabase";

export default {
  setup() {
    const responses = [
      {
        title: store.prompt.yes ? store.prompt.yes : "Yes, I agree with that.",
        bool: true,
      },
      {
        title: store.prompt.no ? store.prompt.no : "No, I don't feel that way.",
        bool: false,
      },
    ];
    store.showStepnav = false;
    store.showContinue = true;

    const agreement_response = ref(store.todaysThought.agreement || null);

    function updateStep(step) {
      store.showStepnav = false;
      store.todaysThought.step = step;
      store.todaysThought.agreement = agreement_response.value;
      updateThought();
    }

    setInterval(() => {
      store.showStepnav = true;
    }, 3000);

    return {
      agreement_response,
      updateStep,

      store,
      responses,
    };
  },
};
</script>