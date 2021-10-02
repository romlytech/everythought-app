<template>
  <div
    class="
      fixed
      flex
      items-center
      justify-center
      text-gray-200
      bg-gray-700
      h-screen
      w-screen
      p-4
      overflow-hidden
    "
  >
    <div
      class="
        fixed
        left-4
        w-72
        h-72
        bg-blue-400
        opacity-50
        rounded-full
        mix-blend-multiply
        filter
        blur-xl
        animate-blob
        animation-delay-2000
      "
    ></div>
    <div
      class="
        fixed
        right-4
        w-72
        h-72
        bg-yellow-400
        opacity-50
        rounded-full
        mix-blend-multiply
        filter
        blur-xl
        animate-blob
        animation-delay-4000
      "
    ></div>
    <div
      class="
        fixed
        bottom-0
        left-50
        w-72
        h-72
        bg-rose-400
        opacity-50
        rounded-full
        mix-blend-multiply
        filter
        blur-xl
        animate-blob
      "
    ></div>
    <div class="fixed top-0 w-full z-50">
      <div class="fixed top-1 left-0.5">
        <router-link
          to="/home"
          class="
            ml-1
            flex
            items-center
            justify-center
            h-8
            w-8
            rounded-full
            focus:outline-none
            focus:ring-2 focus:ring-inset focus:ring-white
          "
        >
          <span class="sr-only">Close and go home</span>
          <XIcon
            class="h-5 w-5 text-gray-300 hover:text-white"
            aria-hidden="true"
          />
        </router-link>
      </div>
      <nav class="flex items-center justify-center p-4" aria-label="Progress">
        <ol role="list" class="flex items-center space-x-5">
          <li
            v-for="step in steps"
            :key="step.id"
            :class="[
              current_step >= step.id ? 'bg-gray-300' : 'bg-gray-500',
              'block w-2.5 h-1.5 rounded-full',
            ]"
          >
            <span class="sr-only">Step {{ step.id }}. {{ step.title }}.</span>
          </li>
        </ol>
      </nav>
    </div>

    <!-- Step 1 -->
    <section class="max-w-md text-left z-50" v-if="current_step == 1">
      <h1
        class="
          tracking-wide
          uppercase
          text-sm
          font-light
          text-gray-400
          leading-loose
        "
      >
        Welcome{{
          store.profile.username ? ", " + store.profile.username : ""
        }}...
      </h1>
      <RadioGroup v-model="selected_emotion" class="space-y-2">
        <RadioGroupLabel class="text-3xl"
          >How are you feeling today?
        </RadioGroupLabel>
        <RadioGroupOption
          v-for="emotion in emotions"
          :key="emotion.name"
          v-slot="{ active, checked }"
          :value="emotion.name"
        >
          <button
            type="button"
            :class="[
              `
            inline-flex
            justify-center
            w-full
            rounded-md
            border border-transparent
            px-4
            py-2
            text-white
            font-bold
            capitalize
            bg-${emotion.color}-600
            hover:bg-${emotion.color}-700
          `,

              active || checked ? 'ring-2 ring-white' : '',
            ]"
          >
            {{ emotion.name }} {{ emotion.emoji }}
          </button>
        </RadioGroupOption>
      </RadioGroup>
    </section>
  </div>
</template>
<script>
import { watch, ref } from "vue";
import { XIcon } from "@heroicons/vue/solid";
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";

import { store } from "../../../store";

const steps = [
  { id: 1, title: "Welcome" },
  { id: 2, title: "Reading prompt" },
  { id: 3, title: "Prayer request" },
  { id: 4, title: "Pray for another person" },
  { id: 5, title: "Conclusion" },
];

const emotions = [
  { name: "happy", color: "sky", emoji: "😀" },
  { name: "sad", color: "rose", emoji: "😢" },
  { name: "lonely", color: "amber", emoji: "😕" },
];

export default {
  components: {
    XIcon,
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
  },
  setup() {
    const current_step = ref(1);
    const selected_emotion = ref("");

    watch(selected_emotion, () => {
      updateStep(2);
    });

    const updateStep = (step) => {
      current_step.value = step;
    };

    return {
      current_step,
      selected_emotion,
      updateStep,

      store,
      steps,
      emotions,
    };
  },
};
</script>