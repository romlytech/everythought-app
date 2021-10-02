<template>
  <div
    class="
      bg-gray-800
      sm:max-w-md
      sm:w-full
      sm:mx-auto
      sm:rounded-lg
      sm:overflow-hidden
      shadow-lg
    "
  >
    <div
      v-if="!store.user && !alert_msg"
      class="pt-6 px-4 sm:px-10 text-center"
    >
      <p class="text-xl font-bold text-white leading-10">
        Find rest with your thoughts
      </p>
      <div>
        <p class="text-sm font-medium text-gray-200 leading-7">
          Sign in using social logins
        </p>

        <div class="mt-1 grid grid-cols-2 gap-3">
          <div class="hidden">
            <a
              href="#"
              class="
                w-full
                inline-flex
                justify-center
                py-2
                px-4
                border border-gray-300
                rounded-md
                shadow-sm
                bg-white
                text-sm
                font-medium
                text-gray-500
                hover:bg-gray-200
              "
            >
              <span class="sr-only">Sign in with Facebook</span>
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>

          <div>
            <button
              @click="socialLogin('google')"
              class="
                w-full
                inline-flex
                justify-center
                py-2
                px-4
                border border-gray-300
                rounded-md
                shadow-sm
                bg-white
                text-sm
                font-medium
                text-gray-600
                hover:bg-gray-200
              "
            >
              <svg
                class="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path
                    fill="#4285F4"
                    d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                  />
                  <path
                    fill="#34A853"
                    d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                  />
                </g>
              </svg>
              <span class="pl-2">Google</span>
            </button>
          </div>

          <div>
            <button
              @click="socialLogin('github')"
              class="
                w-full
                inline-flex
                justify-center
                py-2
                px-4
                border border-gray-300
                rounded-md
                shadow-sm
                bg-white
                text-sm
                font-medium
                text-gray-600
                hover:bg-gray-200
              "
            >
              <svg
                class="w-5 h-5 text-gray-800"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="pl-2">GitHub</span>
            </button>
          </div>
        </div>
      </div>

      <div class="mt-6 relative">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-gray-500"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-gray-800 text-gray-400"> or </span>
        </div>
      </div>

      <div class="my-6">
        <form @submit.prevent="emailLogin" class="space-y-6">
          <div>
            <label for="mobile-or-email" class="sr-only"
              >Enter your email address</label
            >
            <input
              type="email"
              v-model="email"
              autocomplete="email"
              placeholder="Enter your email address"
              required
              class="
                block
                w-full
                shadow-sm
                focus:ring-sky-500
                focus:border-sky-500
                sm:text-sm
                border-gray-300
                rounded-md
              "
            />
          </div>
          <div>
            <input
              type="submit"
              class="
                w-full
                flex
                justify-center
                py-2
                px-4
                border border-transparent
                rounded-md
                shadow-sm
                text-sm
                font-medium
                text-white
                bg-sky-600
                hover:bg-sky-700
                focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-sky-500
              "
              :value="loading ? 'Loading' : 'Continue &rarr;'"
              :disabled="loading"
            />
          </div>
        </form>
      </div>
    </div>
    <div v-if="store.user && !alert_msg" class="p-10 text-center space-y-4">
      <h2 class="text-2xl font-semibold text-white">Hello 👋</h2>
      <p class="text-white">You are logged in.</p>
      <router-link
        to="/home"
        class="
          inline-flex
          items-center
          justify-center
          px-5
          py-3
          mt-6
          text-base
          font-bold
          leading-6
          text-white
          transition
          duration-150
          ease-in-out
          bg-sky-600
          border border-transparent
          rounded-md
          hover:bg-sky-500
          focus:outline-none
        "
        >Go to App &rarr;</router-link
      >
    </div>
    <div v-if="alert_msg" class="p-10 text-center">
      <p class="text-lg text-white">
        {{ alert_msg }}
      </p>
      <button
        @click="this.$router.go()"
        class="
          px-4
          py-2
          text-sm
          mt-6
          font-bold
          leading-6
          text-white
          transition
          duration-150
          ease-in-out
          bg-gray-600
          border border-transparent
          rounded-md
          hover:bg-gray-500
          focus:outline-none
        "
      >
        &olarr; Try again
      </button>
    </div>
    <div v-if="!store.user" class="px-4 py-6 bg-gray-700 sm:px-10">
      <p class="text-xs font-light leading-5 text-center text-gray-300">
        By signing up, you agree to our
        <router-link
          to="/terms-of-use"
          class="font-medium text-gray-200 hover:underline"
          >Terms</router-link
        >
        and
        <router-link
          to="privacy-policy"
          class="font-medium text-gray-200 hover:underline"
          >Privacy Policy</router-link
        >.
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../../supabase";
import { notify } from "notiwind";
import { store } from "../../store";

export default {
  setup() {
    const loading = ref(false);
    const alert_msg = ref("");
    const email = ref("");

    const socialLogin = async (provider) => {
      try {
        loading.value = true;
        const { error } = await supabase.auth.signIn({ provider: provider });
        if (error) throw error;
        if (!error) {
          alert_msg.value = "Checking with your social provider...";
        }
      } catch (error) {
        alert_msg.value = error.error_description || error.message;
        notify(
          {
            group: "toast",
            type: "error",
            title: "Error",
          },
          6000
        );
      } finally {
        loading.value = false;
      }
    };

    const emailLogin = async () => {
      try {
        loading.value = true;
        const { error } = await supabase.auth.signIn({ email: email.value });
        if (error) throw error;
        if (!error) {
          alert_msg.value = "Check your email for the login link!";
        }
      } catch (error) {
        alert_msg.value = error.error_description || error.message;
        notify(
          {
            group: "toast",
            type: "error",
            title: "Error",
          },
          6000
        );
      } finally {
        loading.value = false;
      }
    };

    return {
      store,
      loading,
      email,
      emailLogin,
      socialLogin,
      alert_msg,
    };
  },
};
</script>