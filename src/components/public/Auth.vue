<template>
  <div
    class="
      bg-gradient-to-b
      from-gray-700
      to-gray-800
      dark:to-gray-700
      sm:max-w-md
      sm:w-full
      sm:mx-auto
      sm:rounded-xl
      sm:overflow-hidden
    "
  >
    <div
      v-if="!store.user && !store.alert_msg"
      class="pt-6 px-4 sm:px-10 text-center"
    >
      <p class="text-xl font-semibold text-white leading-10">
        Sign up <span class="text-gray-400 text-sm px-1.5">or</span> Log in
      </p>
      <div>
        <p class="text-sm font-medium text-gray-200 leading-7">
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
                text-gray-900
                border-gray-300
                rounded-xl
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
                rounded-xl
                text-sm text-white
                bg-sky-600
                hover:bg-sky-700
                font-semibold
                focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-sky-500
              "
              :class="loading ? 'animate-pulse' : ''"
              :value="loading ? 'Loading...' : 'Continue &rarr;'"
              :disabled="loading"
            />
          </div>
        </form>
      </div>
    </div>
    <div
      v-if="store.user && !store.alert_msg"
      class="p-10 text-center space-y-4"
    >
      <h2 class="text-xl font-serif text-white">
        {{ loading ? "Signing out of your account..." : "You are logged in as"
        }}<br />
        <span class="text-gray-300">{{ store.user.email }}</span>
      </h2>
      <div class="flex-inline space-x-2">
        <button
          @click="signOut()"
          class="
            inline-flex
            items-center
            justify-center
            px-5
            py-2.5
            text-base
            leading-6
            transition
            duration-150
            font-medium
            ease-in-out
            bg-gray-200
            text-gray-800
            border border-transparent
            rounded-xl
            hover:bg-gray-300
            focus:outline-none
          "
          :class="loading ? 'animate-pulse' : ''"
        >
          {{ loading ? "Goodbye..." : "Sign out" }}
        </button>
        <router-link
          to="/dashboard"
          class="
            inline-flex
            items-center
            justify-center
            px-5
            py-2.5
            text-base
            leading-6
            text-white
            transition
            font-medium
            duration-150
            ease-in-out
            bg-sky-600
            border border-transparent
            rounded-xl
            hover:bg-sky-500
            focus:outline-none
          "
          >Go to App &rarr;</router-link
        >
      </div>
    </div>
    <transition name="fade" appear>
      <div v-if="store.alert_msg" class="p-10 text-center space-y-6">
        <p class="text-white whitespace-pre-wrap">
          {{ store.alert_msg }}
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
            rounded-xl
            focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-white
          "
          :class="
            store.error
              ? 'text-red-700 bg-red-100 hover:bg-red-200'
              : 'text-sky-700 bg-sky-100 hover:bg-sky-200'
          "
        >
          {{ store.error ? "Try again" : "Refresh" }} &olarr;
        </button>
      </div>
    </transition>
    <div
      v-if="!store.user && !store.alert_msg"
      class="px-4 py-6 bg-gray-700 sm:px-10"
    >
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
import { useRouter } from "vue-router";
import { supabase } from "@/supabase";
import { store } from "@/store";

export default {
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const email = ref("");

    const emailLogin = async () => {
      try {
        loading.value = true;
        const { error } = await supabase.auth.signIn({ email: email.value });
        if (error) throw error;
        if (!error) {
          store.alert_msg = "Check your email for the login link!";
        }
      } catch (error) {
        store.error = true;
        store.alert_msg = error.error_description || error.message;
      } finally {
        loading.value = false;
      }
    };

    // Sign Out
    async function signOut() {
      loading.value = true;
      try {
        let { error } = await supabase.auth.signOut();
        if (error) throw error;
      } catch (error) {
        console.log(error);
      } finally {
        store.user = {};
        router.push("/");
        router.go();
      }
    }

    return {
      store,
      loading,
      signOut,
      email,
      emailLogin,
    };
  },
};
</script>