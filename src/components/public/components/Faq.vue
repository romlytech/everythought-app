<!-- wip -->
<template>
  <section class="max-w-2xl mx-auto pt-12 sm:pt-16">
    <h2 class="text-center text-3xl font-extrabold sm:text-4xl">
      Frequently asked questions
    </h2>
    <dl
      class="
        mt-6
        max-w-xl
        mx-auto
        space-y-3
        sm:space-y-6
        divide-y divide-sky-100
        dark:divide-gray-700
      "
    >
      <Disclosure
        as="div"
        v-for="faq in faqs"
        :key="faq.question"
        class="pt-2 sm:pt-6"
        v-slot="{ open }"
      >
        <dt class="sm:text-lg">
          <DisclosureButton
            class="
              text-left
              w-full
              pt-2
              sm:pt-0
              flex
              justify-between
              items-center
            "
            :class="
              open
                ? 'text-sky-600 dark:text-sky-400'
                : 'text-sky-900 dark:text-gray-300'
            "
          >
            <span class="font-medium">
              {{ faq.question }}
            </span>
            <span class="ml-6 h-3 sm:h-7 flex items-center">
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
          <DisclosurePanel as="dd" class="py-4">
            <p
              class="text-base text-gray-500 dark:text-gray-200 prose prose-sky"
              v-html="faq.answer"
            ></p>
          </DisclosurePanel>
        </transition>
      </Disclosure>
    </dl>
    <div class="w-full text-center mt-16">
      <SignupButton secondary />
    </div>
  </section>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/outline";
import SignupButton from "./SignupButton.vue";

const faqs = [
  {
    question: "How does it work?",
    answer: `<p>Each time you create a new thought, you start a journey through a guided prompt. First, you'll be asked a thought-provoking question with an opportunity to respond. Then, as you continue through the steps of the thought, you'll learn about the associated emotion and how it relates to your life.</p><p>Whether you choose to create a new thought each day, week, or as many times as you desire; that's up to you.</p>`,
  },
  {
    question: "Where do I sign up?",
    answer: `<p>Visit <a href="/signup">everythought.app/signup</a> to create your account.</p>`,
  },
  {
    question: "Is my data secure?",
    answer: `<p>We take privacy very seriously. Inside the app, any data you input is entirely private to your account; you are the only user that can see it.</p><p>Your data is yours to keep. To make the process easy on you, we have a data export feature, which allows you to download all of your thoughts as a CSV file at any time.</p><p>If you want to delete your account completely, you can do that, too. However, account deletion is permanent, and your data is removed from our servers forever.</p>`,
  },
  {
    question: "What is the cost?",
    answer: `<p>The cost of not processing your emotions? <em>Devastating</em>.</p><p>The cost of this app? <b>Free</b>.</p><p>Seriously though, this is still a beta product and is totally free to use.</p>`,
  },
  {
    question: "When will more features be added?",
    answer: `<p>As we move through our initial beta launch, we'll continue to gather feedback from our users. We aren't sharing a public roadmap yet, but we can assure you what's coming will be worth it.</p><p>In the meantime, we'd love to hear from users like you to help shape the future of EveryThought for your benefit. Use our <a href="/contact">contact page</a> to let us know what you'd like to see. We read and respond to every message.</p>`,
  },
];

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ChevronDownIcon,
    SignupButton,
  },
  setup() {
    return {
      faqs,
    };
  },
};
</script>