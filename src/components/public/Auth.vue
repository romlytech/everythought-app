<template>
  <div
    class="
      bg-gradient-to-b
      from-gray-700
      to-gray-800
      sm:max-w-md
      sm:w-full
      sm:mx-auto
      sm:rounded-lg
      sm:overflow-hidden
    "
  >
    <div
      v-if="!store.user && !alert_msg"
      class="pt-6 px-4 sm:px-10 text-center"
    >
      <p class="text-xl font-serif font-medium text-white leading-10">
        Sign up <span class="text-gray-400 text-sm px-1.5">or</span> Log in
      </p>
      <div>
        <p class="text-sm text-gray-200 leading-7">
          Access your account with a magic link:
        </p>
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
    <div v-if="alert_msg" class="p-10 text-center space-y-6">
      <p class="text-white">
        {{ alert_msg }}
      </p>
      <button
        @click="this.$router.go()"
        class="
          inline-flex
          items-center
          px-3
          py-2
          border border-transparent
          text-sm
          leading-4
          font-medium
          rounded-md
          focus:outline-none
          focus:ring-2 focus:ring-offset-2 focus:ring-white
        "
        :class="
          error
            ? 'text-red-700 bg-red-100 hover:bg-red-200'
            : 'text-sky-700 bg-sky-100 hover:bg-sky-200'
        "
      >
        {{ error ? "Try again" : "Refresh" }} &olarr;
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
    const error = ref(false);
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
        error.value = true;
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
      error,
    };
  },
};
</script>