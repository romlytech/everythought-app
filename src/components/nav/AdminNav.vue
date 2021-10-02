<template>
  <div class="bg-gray-800 pb-32">
    <!-- Main Nav -->
    <Disclosure
      as="nav"
      class="bg-gray-800 fixed top-0 z-20 w-full"
      v-slot="{ open }"
    >
      <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
        <div class="border-b border-gray-700">
          <div class="flex items-center justify-between h-16 px-4 sm:px-0">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <router-link
                  to="/"
                  class="text-lg md:text-2xl font-bold text-sky-600"
                >
                  Every<span class="text-gray-300">Thought</span
                  ><span class="text-gray-400 text-base">.app</span>
                </router-link>
              </div>
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                  <router-link
                    v-for="item in navigation"
                    :key="item.name"
                    :to="{ name: item.name }"
                    exact-active-class="bg-gray-900 text-white"
                    class="
                      text-gray-300
                      hover:bg-gray-700
                      hover:text-white
                      px-3
                      py-2
                      rounded-md
                      text-sm
                      font-medium
                    "
                    >{{ item.title }}</router-link
                  >
                </div>
              </div>
            </div>
            <div class="hidden md:block">
              <div class="ml-4 flex items-center md:ml-6">
                <!-- Profile dropdown -->
                <Menu as="div" class="ml-3 relative">
                  <div>
                    <MenuButton
                      class="
                        max-w-xs
                        bg-gray-800
                        rounded-full
                        flex
                        items-center
                        text-sm
                        focus:outline-none
                        focus:ring-2
                        focus:ring-offset-2
                        focus:ring-offset-gray-800
                        focus:ring-white
                      "
                    >
                      <span class="sr-only">Open user menu</span>
                      <img
                        v-if="store.avatar_src"
                        class="h-10 w-10 rounded-full"
                        :src="store.avatar_src"
                        alt=""
                      />
                      <span
                        v-else
                        class="
                          inline-block
                          h-10
                          w-10
                          rounded-full
                          overflow-hidden
                          bg-gray-100
                        "
                      >
                        <svg
                          class="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      </span>
                    </MenuButton>
                  </div>
                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <MenuItems
                      class="
                        origin-top-right
                        absolute
                        right-0
                        mt-2
                        w-56
                        rounded-md
                        shadow-lg
                        py-1
                        bg-white
                        ring-1 ring-black ring-opacity-5
                        focus:outline-none
                      "
                    >
                      <div class="px-4 py-3">
                        <div
                          class="
                            text-base
                            font-medium
                            leading-none
                            text-gray-800
                            break-all
                          "
                        >
                          {{ store.profile.first_name }}
                          {{ store.profile.last_name }}
                        </div>
                        <div
                          class="
                            text-sm
                            font-medium
                            leading-6
                            text-gray-500
                            break-all
                          "
                        >
                          {{ store.user.email }}
                        </div>
                      </div>
                      <MenuItem>
                        <button
                          @click="signOut()"
                          class="
                            px-4
                            py-2
                            inline-flex
                            items-center
                            text-sm text-gray-700
                            hover:text-gray-900
                            font-semibold
                          "
                        >
                          Sign Out
                          <LogoutIcon class="mx-1 h-5 w-5" aria-hidden="true" />
                        </button>
                      </MenuItem>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </div>
            <div class="-mr-2 flex md:hidden">
              <!-- Mobile menu button -->
              <DisclosureButton
                class="
                  bg-gray-800
                  inline-flex
                  items-center
                  justify-center
                  p-2
                  rounded-md
                  text-gray-400
                  hover:text-white
                  hover:bg-gray-700
                  focus:outline-none
                  focus:ring-2 focus:ring-gray-400
                "
              >
                <span class="sr-only">Open main menu</span>
                <MenuIcon
                  v-if="!open"
                  class="block h-6 w-6"
                  aria-hidden="true"
                />
                <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
              </DisclosureButton>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel class="border-b border-gray-700 md:hidden">
        <DisclosureButton class="w-full">
          <div class="px-2 py-3 space-y-1 sm:px-3 text-left">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="{ name: item.name }"
              exact-active-class="bg-gray-900 text-white"
              class="
                text-gray-300
                hover:bg-gray-700
                hover:text-white
                block
                px-3
                py-2
                rounded-md
                text-base
                font-medium
              "
              >{{ item.title }}</router-link
            >
          </div>
        </DisclosureButton>
        <div class="pt-4 pb-3 border-t border-gray-700">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img
                v-if="store.avatar_src"
                class="h-10 w-10 rounded-full"
                :src="store.avatar_src"
                alt=""
              />
              <span
                v-else
                class="
                  inline-block
                  h-10
                  w-10
                  rounded-full
                  overflow-hidden
                  bg-gray-100
                "
              >
                <svg
                  class="h-full w-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </span>
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-white">
                {{ store.profile.first_name }} {{ store.profile.last_name }}
              </div>
              <div class="text-sm font-medium leading-6 text-gray-400">
                {{ store.user.email }}
              </div>
            </div>
          </div>
          <div class="mt-3 px-2 space-y-1">
            <button
              @click="signOut()"
              class="
                px-3
                rounded-md
                text-base
                font-medium
                inline-flex
                items-center
                text-gray-400
                hover:text-white
                hover:bg-gray-700
              "
            >
              Sign Out
              <LogoutIcon class="mx-1 h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
    <header class="pt-16">
      <!-- Breadcrumbs -->
      <Breadcrumbs class="py-4 md:py-8" />
    </header>
  </div>
</template>
<script>
import { supabase } from "../../supabase";
import { store } from "../../store";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { notify } from "notiwind";
import Breadcrumbs from "../nav/Breadcrumbs.vue";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";

import { MenuIcon, XIcon, LogoutIcon } from "@heroicons/vue/outline";

const navigation = [
  { title: "Home", name: "home" },
  { title: "Edit Profile", name: "profile" },
];

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    LogoutIcon,
    MenuIcon,
    XIcon,
    Breadcrumbs,
  },
  setup() {
    const router = useRouter();
    const open = ref(false);
    store.user = supabase.auth.user();

    // Get user's profile on first load
    async function getProfile() {
      try {
        let { data, error, status } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", store.user.id)
          .single();
        if (error && status !== 406) throw error;
        if (data) {
          store.profile = data;
        }
      } catch (error) {
        notify(
          {
            group: "toast",
            type: "error",
            title: "Error",
            text: error.error_description || error.message,
          },
          6000
        );
      } finally {
        if (store.profile.avatar_url) {
          downloadImage();
        }
      }
    }

    // Download avatar
    const downloadImage = async () => {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(store.profile.avatar_url);
        if (error) throw error;
        store.avatar_src = URL.createObjectURL(data);
      } catch (error) {
        console.error("Error downloading image: ", error.message);
      }
    };

    // Sign Out
    async function signOut() {
      try {
        let { error } = await supabase.auth.signOut();
        if (error) throw error;
      } catch (error) {
        console.log(error.message);
      } finally {
        store.user = {};
        router.push("/");
        router.go();
      }
    }

    onMounted(() => {
      getProfile();
    });

    return {
      store,
      navigation,
      open,

      getProfile,
      signOut,
    };
  },
};
</script>