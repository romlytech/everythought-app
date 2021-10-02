<template>
  <div class="relative py-16 bg-white overflow-hidden">
    <Dots />
    <div class="relative px-4 sm:px-6 lg:px-8">
      <LegalHeader />
      <div class="mt-12 max-w-prose mx-auto">
        <div
          class="
            bg-gray-800
            md:shadow-md
            md:rounded-md
            -mx-4
            px-4
            py-16
            overflow-hidden
            md:p-8
            -mb-16
            md:mb-0
          "
        >
          <h1 class="text-2xl font-bold tracking-tight text-white sm:text-4xl">
            Contact Us
          </h1>
          <p class="text-lg tracking-tight text-gray-300 mb-6">
            Submit product feedback, report issues or simply say hello.
          </p>
          <form
            name="contact-me"
            method="POST"
            class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="contact-me" />
            <input type="hidden" name="bot-field" />
            <div>
              <label
                for="first_name"
                class="block text-sm font-semibold text-gray-300"
                >First name</label
              >
              <div class="mt-1">
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  autocomplete="given-name"
                  :value="store.profile.first_name"
                  class="
                    py-3
                    px-4
                    block
                    w-full
                    shadow-sm
                    border border-transparent
                    focus:border-sky-600
                    focus:outline-none
                    focus:ring-sky-500
                    bg-gray-700
                    text-gray-200
                    rounded-md
                  "
                  required
                />
              </div>
            </div>
            <div>
              <label
                for="last_name"
                class="block text-sm font-semibold text-gray-300"
                >Last name</label
              >
              <div class="mt-1">
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  autocomplete="family-name"
                  :value="store.profile.last_name"
                  class="
                    py-3
                    px-4
                    block
                    w-full
                    shadow-sm
                    border border-transparent
                    focus:border-sky-600
                    focus:ring-sky-500
                    focus:outline-none
                    bg-gray-700
                    text-gray-200
                    rounded-md
                  "
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label
                for="email"
                class="block text-sm font-semibold text-gray-300"
                >Email</label
              >
              <div class="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  :value="store.profile.email"
                  class="
                    py-3
                    px-4
                    block
                    w-full
                    shadow-sm
                    border border-transparent
                    focus:border-sky-600
                    focus:ring-sky-500
                    focus:outline-none
                    bg-gray-700
                    text-gray-200
                    rounded-md
                  "
                  required
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label
                for="message"
                class="block text-sm font-semibold text-gray-300"
                >Message</label
              >
              <div class="mt-1">
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  class="
                    py-3
                    px-4
                    block
                    w-full
                    shadow-sm
                    border border-transparent
                    focus:border-sky-600
                    focus:ring-sky-500
                    focus:outline-none
                    bg-gray-700
                    text-gray-200
                    rounded-md
                  "
                  required
                ></textarea>
              </div>
            </div>
            <div class="sm:col-span-2">
              <button
                type="submit"
                class="
                  w-full
                  inline-flex
                  items-center
                  justify-center
                  px-6
                  py-3
                  border border-transparent
                  rounded-md
                  shadow-sm
                  text-base
                  font-medium
                  text-white
                  bg-sky-700
                  hover:bg-sky-800
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-sky-500
                "
              >
                Submit &rarr;
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Dots from "./Dots.vue";
import LegalHeader from "../nav/LegalHeader.vue";

import { store } from "../../store";

export default {
  components: {
    Dots,
    LegalHeader,
  },
  setup() {
    return { store };
  },
};
</script>