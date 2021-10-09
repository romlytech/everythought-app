<!-- wip -->
<template>
  <section class="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <h2 class="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
        Frequently asked questions
      </h2>
      <dl class="mt-6 space-y-6 divide-y divide-sky-100">
        <Disclosure
          as="div"
          v-for="faq in faqs"
          :key="faq.question"
          class="pt-6"
          v-slot="{ open }"
        >
          <dt class="text-lg">
            <DisclosureButton
              class="
                text-left
                w-full
                flex
                justify-between
                items-start
                text-gray-400
              "
            >
              <span class="font-medium text-sky-900">
                {{ faq.question }}
              </span>
              <span class="ml-6 h-7 flex items-center">
                <ChevronDownIcon
                  :class="[
                    open ? '-rotate-180' : 'rotate-0',
                    'h-6 w-6 transform transition-transform ease-out-in duration-500',
                  ]"
                  aria-hidden="true"
                />
              </span>
            </DisclosureButton>
          </dt>
          <transition name="fade" mode="out-in">
            <DisclosurePanel as="dd" class="mt-2 pr-12">
              <p class="text-base text-gray-500 prose">
                {{ faq.answer }}
              </p>
            </DisclosurePanel>
          </transition>
        </Disclosure>
      </dl>
    </div>
  </section>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/outline";

const faqs = [
  {
    question: "How do I sign up?",
    answer: `Visit <b>everythought.app/signup</b> to get started.`,
  },
];

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ChevronDownIcon,
  },
  setup() {
    return {
      faqs,
    };
  },
};
</script>