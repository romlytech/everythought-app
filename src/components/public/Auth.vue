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
      v-if="store.user && !store.alert_msg && $route.path == '/'"
      class="p-10 text-center space-y-4"
    >
      <h2 class="text-xl font-serif text-white">
        {{
          store.loading
            ? "Signing out of your account..."
            : "You are logged in as"
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
          :class="store.loading ? 'animate-pulse' : ''"
        >
          {{ store.loading ? "Goodbye..." : "Sign out" }}
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
    <div v-else-if="!store.alert_msg" class="px-4 sm:px-10 space-y-4 py-6">
      <h2 class="text-xl font-semibold text-center text-white">
        {{ authType.heading }}
      </h2>
      <form @submit.prevent="handleAuth()" class="space-y-4">
        <div v-if="authType.name != 'reset'">
          <label for="email" class="text-sm font-medium text-gray-200"
            >Email address</label
          >
          <input
            type="email"
            v-model="email"
            autocomplete="email"
            placeholder="your@email.com"
            required
            class="
              mt-1
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
        <transition name="fade" mode="out-in" appear>
          <div v-if="showPassword">
            <div class="flex items-center justify-between">
              <label for="password" class="text-sm font-medium text-gray-200">{{
                authType.name == "reset" ? "New password" : "Password"
              }}</label>
              <router-link
                v-if="authType.name == 'login'"
                to="/forgot"
                class="
                  text-sm
                  font-medium
                  text-gray-200
                  hover:underline
                  hover:text-white
                "
                tabindex="-1"
              >
                Forgot your password?
              </router-link>
            </div>
            <input
              type="password"
              v-model="password"
              required
              class="
                mt-1
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
        </transition>
        <transition name="fade" mode="out-in" appear>
          <div v-if="password && authType.name == 'reset'">
            <label
              for="passwordConfirm"
              class="text-sm font-medium text-gray-200"
              >Re-enter new password</label
            >
            <div class="relative">
              <input
                type="password"
                v-model="passwordConfirm"
                required
                class="
                  mt-1
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
              <div
                class="
                  absolute
                  inset-y-0
                  right-0
                  pr-3
                  flex
                  items-center
                  pointer-events-none
                "
              >
                <CheckCircleIcon
                  v-if="password == passwordConfirm"
                  class="h-5 w-5 text-green-400"
                  aria-hidden="true"
                />
                <XCircleIcon
                  v-else
                  class="h-5 w-5 text-red-400"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </transition>

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
              transition-colors
              ease-in-out
              duration-500
            "
            :class="store.loading ? 'animate-pulse' : ''"
            :value="store.loading ? 'Loading...' : authType.action + ' &rarr;'"
            :disabled="store.loading"
          />
        </div>
        <transition name="fade" mode="out-in" appear>
          <div v-if="error_msg" class="bg-red-50 rounded-md p-4 mt-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <XCircleIcon class="w-5 h-5 text-red-400" />
              </div>
              <div class="ml-3">
                <h3 class="text-red-700 dark:text-red-100 text-sm font-medium">
                  {{ error_msg }}
                </h3>
              </div>
            </div>
          </div>
        </transition>
        <transition name="fade" mode="out-in" appear>
          <p
            v-if="email && authType.name != 'forgot' && !error_msg"
            class="text-xs text-center text-gray-300"
          >
            {{
              authType.name == "signup"
                ? "By signing up"
                : "Each time you sign in"
            }}, you agree to our
            <router-link
              to="/terms-of-use"
              class="font-medium text-gray-200 hover:underline hover:text-white"
              >Terms</router-link
            >
            and
            <router-link
              to="privacy-policy"
              class="font-medium text-gray-200 hover:underline hover:text-white"
              >Privacy Policy</router-link
            >.
          </p>
        </transition>
      </form>
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
      v-if="!store.alert_msg && authType.name != 'reset' && !store.user"
      class="px-4 py-6 bg-gray-700 sm:px-10"
    >
      <p class="text-sm text-center font-medium text-gray-200">
        <router-link
          :to="authType.navigateTo"
          class="hover:text-white hover:underline block"
        >
          {{ authType.navigateTitle }} &rarr;
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, reactive, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { notify } from "notiwind";
import { supabase } from "@/supabase";
import { store } from "@/store";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/vue/solid";

export default {
  components: { CheckCircleIcon, XCircleIcon },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const error_msg = ref("");
    const email = ref("");
    const password = ref("");
    const passwordConfirm = ref("");
    const showPassword = ref(false);
    const authType = reactive({
      name: "signup",
      heading: "Get started today",
      action: "Create my account",
      navigateTo: "/login",
      navigateTitle: "Already have an account? Sign in",
    });

    function setForm() {
      if (route.path == "/login") {
        authType.name = "login";
        authType.heading = "Sign in to your account";
        authType.action = "Sign in";
        authType.navigateTo = "/signup";
        authType.navigateTitle = "Don't have an account? Sign up";
        showPassword.value = true;
      } else if (route.path == "/signup") {
        authType.name = "signup";
        authType.heading = "Create your account";
        authType.action = "Sign up";
        authType.navigateTo = "/login";
        authType.navigateTitle = "Already have an account? Sign in";
        email.value = "";
        password.value = "";
        showPassword.value = false;
      } else if (route.path == "/forgot") {
        authType.name = "forgot";
        authType.heading = "Reset your password";
        authType.action = "Send reset password instructions";
        authType.navigateTo = "/login";
        authType.navigateTitle = "Return to sign in";
        email.value = "";
        password.value = "";
        showPassword.value = false;
      } else if (route.path == "/reset") {
        authType.name = "reset";
        authType.heading = "Update your password";
        authType.action = "Update";
        authType.navigateTo = "/login";
        authType.navigateTitle = "Return to sign in";
        email.value = "";
        password.value = "";
        showPassword.value = true;
      }
    }

    onMounted(() => {
      setForm();
    });

    watch(route, () => {
      setForm();
      store.alert_msg = null;
      error_msg.value = null;
    });

    watch(email, () => {
      if (authType.name != "forgot") {
        showPassword.value = true;
      }
    });

    async function handleAuth() {
      try {
        store.error = false;
        store.loading = true;
        error_msg.value = "";
        store.alert_msg = null;

        if (authType.name == "signup") {
          const { error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
          });
          console.log(error);
          if (error && error.status == 400) {
            return router.push("/login");
          }
          if (error) throw error;
          if (!error) {
            store.alert_msg = "Check your email for login instructions!";
          }
        }

        if (authType.name == "login") {
          const { error } = await supabase.auth.signIn({
            email: email.value,
            password: password.value,
          });
          if (error) throw error;
          if (!error) {
            notify({
              group: "toast",
              type: "success",
              title: "Success!",
              text: "You're signed in.",
            });
            router.push("/dashboard");
          }
        }

        if (authType.name == "forgot") {
          const { error } = supabase.auth.api.resetPasswordForEmail(
            email.value
          );
          if (error) throw error;
          if (!error) {
            store.alert_msg = "Check your email for the reset instructions.";
          }
        }

        if (authType.name == "reset") {
          if (password.value != passwordConfirm.value) {
            passwordConfirm.value = "";
            throw { message: "Passwords do not match, please try again." };
          }
          const { user, error } = await supabase.auth.update({
            password: password.value,
          });
          if (error) throw error;
          if (user) {
            notify(
              {
                group: "toast",
                type: "success",
                title: "Success!",
                text: "Password updated successfully.",
              },
              7777
            );
            router.push("/dashboard");
          }
        }
      } catch (error) {
        console.log(error);
        store.error = true;
        error_msg.value = error.error_description || error.message;
      } finally {
        store.loading = false;
      }
    }

    // Sign Out
    async function signOut() {
      store.loading = true;
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
      signOut,
      error_msg,
      email,
      password,
      passwordConfirm,
      showPassword,
      authType,
      handleAuth,
    };
  },
};
</script>