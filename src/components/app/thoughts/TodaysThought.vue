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
      overscroll-none
    "
  >
    <Blobs />
    <!-- Close Button -->
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
              store.current_step >= step.id ? 'bg-gray-300' : 'bg-gray-500',
              'block w-2.5 h-1.5 rounded-full',
            ]"
          >
            <span class="sr-only">Step {{ step.id }}. {{ step.title }}.</span>
          </li>
        </ol>
      </nav>
    </div>
    <transition name="fade" mode="out-in" appear>
      <StepOne :name="store.profile.username" v-if="store.current_step == 1" />

      <section
        class="max-w-md text-left z-50 space-y-4"
        v-else-if="store.current_step == 2"
      >
        <p
          class="tracking-wide uppercase text-sm font-light text-gray-400 mb-4"
        >
          Today we're talking about
          <span class="font-bold text-gray-300">{{ prompt.category }}</span
          >.
        </p>

        <RadioGroup
          v-model="selected_emotion"
          class="space-y-2"
          @click="updateStep(3)"
        >
          <RadioGroupLabel class="text-4xl font-serif"
            >{{ prompt.question }}
          </RadioGroupLabel>
          <div class="pt-4"></div>
          <RadioGroupOption
            v-for="response in agreements"
            :key="response.title"
            v-slot="{ active, checked }"
            :value="response.bool"
          >
            <button
              type="button"
              :class="[
                'inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 font-bold',
                response.bool
                  ? 'text-sky-900 bg-sky-200 hover:bg-sky-300'
                  : 'text-rose-900 bg-rose-200 hover:bg-rose-300',
                active || checked ? 'ring-2 ring-white' : '',
              ]"
            >
              {{ response.title }}
            </button>
          </RadioGroupOption>
        </RadioGroup>
      </section>

      <!-- Step 2 -->
      <section
        class="max-w-md text-left z-50"
        v-else-if="store.current_step == 3"
      >
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
          <RadioGroupLabel class="text-3xl font-serif"
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
                `inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 text-white font-bold capitalize bg-${emotion.color}-600 hover:bg-${emotion.color}-700`,
                active || checked ? 'ring-2 ring-white' : '',
              ]"
            >
              {{ emotion.name }} {{ emotion.emoji }}
            </button>
          </RadioGroupOption>
        </RadioGroup>
      </section>
    </transition>
  </div>
</template>
<script>
import { watch, ref, onMounted } from "vue";
import { XIcon } from "@heroicons/vue/solid";
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";
import Blobs from "./Blobs.vue";
import StepOne from "./StepOne.vue";

import { store } from "../../../store";
import { supabase } from "../../../supabase";

const steps = [
  { id: 1, title: "Welcome" },
  { id: 2, title: "Reading prompt" },
  { id: 3, title: "Prayer request" },
  { id: 4, title: "Pray for another person" },
  { id: 5, title: "Conclusion" },
];

const agreements = [
  { title: "Yeah, I agree with that.", bool: true },
  { title: "No, I don't feel that way.", bool: false },
];

export default {
  components: {
    XIcon,
    Blobs,
    StepOne,
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
  },
  setup() {
    store.current_step = 1;
    const selected_emotion = ref("");
    const prompt = ref([]);
    const emotions = ref([]);
    const loading = ref(false);

    async function getPrompt() {
      loading.value = true;
      try {
        let { data, error, status } = await supabase.rpc("get_random_prompt");

        if (error && status !== 406) throw error;
        if (data) {
          prompt.value = data;
        }
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
      }
    }

    async function getEmotions() {
      loading.value = true;
      try {
        let { data, error, status } = await supabase.from("emotions").select();

        if (error && status !== 406) throw error;
        if (data) {
          emotions.value = data;
        }
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
      }
    }

    watch(selected_emotion, () => {
      updateStep(4);
    });

    const updateStep = (step) => {
      store.current_step = step;
    };

    onMounted(() => {
      getPrompt();
      getEmotions();
    });

    return {
      selected_emotion,
      loading,
      getPrompt,
      updateStep,

      store,
      steps,
      prompt,
      emotions,
      agreements,
    };
  },
};
</script>