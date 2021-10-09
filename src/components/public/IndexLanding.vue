<template>
  <main
    class="
      mx-auto
      max-w-7xl
      py-9
      px-4
      sm:px-6
      lg:py-32
      space-y-9
      md:space-y-12
      lg:space-y-16
    "
  >
    <PublicHeader />
    <!-- hero -->
    <section class="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6">
      <h1>
        <span
          class="
            block
            text-sm
            font-medium
            uppercase
            tracking-wider
            text-gray-500
            sm:text-base
            lg:text-sm
            xl:text-base
          "
        >
          Identify your feelings
        </span>
        <span
          class="
            mt-1
            block
            text-4xl
            tracking-tight
            font-extrabold
            sm:text-5xl
            xl:text-6xl
          "
        >
          <span class="block">Become a better</span>
          <span class="block text-sky-600">version of yourself</span>
        </span>
      </h1>
      <p
        class="
          mt-3
          text-base text-gray-500
          sm:text-lg
          md:mt-5
          md:text-xl
          md:max-w-3xl
          sm:mx-auto
        "
      >
        Every<span class="font-serif font-bold">Thought</span> is a web
        application designed to help you identify and recognize your emotions by
        using daily guided prompts and journaling.
      </p>
    </section>
    <!-- end of hero -->
    <!-- signup/login -->
    <Auth class="sm:mx-auto -mx-4" />
    <!-- results -->
    <dl
      class="
        px-6
        flex flex-wrap
        justify-center
        md:max-w-4xl
        sm:mx-auto
        gap-2
        md:gap-6
        sm:rounded-xl
      "
    >
      <div
        v-for="result in results"
        :key="result.title"
        class="
          w-full
          text-center
          md:text-lg
          tracking-tight
          sm:w-auto
          text-gray-700
          flex-auto
        "
      >
        <dt class="inline-flex space-x-2 items-center">
          <component
            :is="result.icon"
            :class="[result.color, 'h-5 w-5']"
            aria-hidden="true"
          />
          <span>{{ result.title }}</span>
        </dt>
      </div>
    </dl>
    <!-- end of results -->
    <!-- problem -->
    <section
      class="
        relative
        bg-sky-50
        lg:rounded-xl
        max-w-5xl
        lg:mx-auto
        -mx-4
        sm:-mx-6
        shadow-sm
      "
    >
      <div class="md:absolute md:inset-0">
        <div class="md:absolute md:inset-y-0 md:left-0 md:w-1/3 lg:w-1/2">
          <img
            class="
              h-80
              w-full
              object-cover
              md:absolute
              md:h-full
              lg:rounded-l-xl
            "
            src="/img/simi-iluyomade-tvbxqXI5mmo-unsplash.jpg"
            alt=""
          />
        </div>
      </div>
      <div
        class="
          relative
          pt-12
          pb-16
          px-4
          sm:pt-16
          sm:px-6
          md:px-8
          md:mx-auto
          md:grid md:grid-cols-3
          lg:grid-cols-2
        "
      >
        <article class="md:col-start-2 md:col-span-2 md:pl-8">
          <div class="text-base mx-auto md:max-w-lg md:mx-auto">
            <h2
              class="leading-6 text-sky-500 font-medium tracking-wide uppercase"
            >
              There is a problem
            </h2>
            <h3
              class="
                mt-2
                text-3xl
                leading-8
                font-bold
                tracking-tight
                text-gray-900
                sm:text-4xl
              "
            >
              Most people fail to identify and recognize their thoughts and
              emotions
            </h3>
            <div class="mt-5 prose md:prose-lg prose-sky text-gray-500">
              <p>
                Human behavior is triggered by emotion. When you ignore your
                emotions, you prevent yourself from understanding why you do the
                things you do.
              </p>
              <p>
                Your feelings should provide healing, not confusion. No one
                wants to be left feeling misunderstood.
              </p>
            </div>
            <SignupButton class="mt-5" />
          </div>
        </article>
      </div>
    </section>
    <!-- end of problem -->
    <!-- guide/action -->
    <section
      class="
        text-center
        max-w-5xl
        grid
        gap-6
        items-center
        md:grid-cols-2
        mx-auto
        space-y-9
        py-12
      "
    >
      <div class="space-y-9">
        <div>
          <span
            class="
              block
              text-sm
              font-medium
              uppercase
              tracking-wider
              text-sky-600
              lg:text-base
            "
          >
            Start your journey today
          </span>
          <h3
            class="
              mt-2
              text-4xl
              leading-8
              font-bold
              tracking-tight
              text-gray-900
              lg:text-5xl
              text-center
            "
          >
            Be your own <span class="text-sky-600">advocate</span>
          </h3>
          <p class="mt-2 text-lg text-gray-500">
            We know it can feel overwhelming to process your thoughts, so we
            built a framework to guide you through them.
          </p>
        </div>

        <dl
          class="
            px-6
            flex flex-col
            justify-between
            w-full
            max-w-xs
            mx-auto
            gap-2
            lg:gap-6
            sm:rounded-xl
          "
        >
          <div
            v-for="step in actionSteps"
            :key="step.id"
            class="
              text-left
              md:text-lg
              tracking-tight
              text-gray-700
              inline-flex
              justify-start
              items-start
              space-x-2
            "
          >
            <dt
              class="
                rounded-full
                px-2.5
                py-1
                bg-gradient-to-b
                text-sky-700
                from-sky-50
                to-sky-100
                font-medium
                inline-flex
                justify-center
                items-center
                text-sm
                flex-0
              "
            >
              <span>{{ step.id }}</span>
            </dt>
            <dd class="mt-0.5 md:mt-0">{{ step.title }}</dd>
          </div>
        </dl>
        <SignupButton secondary />
      </div>

      <img
        src="/img/localhost_8888_dashboard(iPhone 6_7_8 Plus).png"
        alt="EveryThought App Screenshot"
        class="
          block
          max-w-xs
          mx-auto
          h-auto
          rounded-xl
          transform
          rotate-2
          shadow-xl
        "
      />
    </section>
    <!-- end of guide/action -->
  </main>
</template>

<script>
import Auth from "./Auth.vue";
import { HeartIcon, TrendingUpIcon, UserGroupIcon } from "@heroicons/vue/solid";
import PublicHeader from "../nav/PublicHeader.vue";
import SignupButton from "./components/SignupButton.vue";

const actionSteps = [
  {
    id: 1,
    title: "Create a profile",
  },
  {
    id: 2,
    title: "Start a new Thought",
  },
  {
    id: 3,
    title: "Transform the way you view yourself and others",
  },
];

const results = [
  {
    title: "Increase emotional intelligence",
    icon: TrendingUpIcon,
    color: "text-amber-400",
  },
  { title: "Gain self-awareness", icon: HeartIcon, color: "text-rose-400" },
  {
    title: "Restore relationships",
    icon: UserGroupIcon,
    color: "text-sky-400",
  },
];

export default {
  components: {
    Auth,
    PublicHeader,
    SignupButton,
  },
  setup() {
    return {
      results,
      actionSteps,
    };
  },
};
</script>