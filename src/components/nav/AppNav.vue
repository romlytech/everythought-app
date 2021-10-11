<template>
  <header class="bg-gray-800">
    <!-- Main Nav -->
    <nav
      class="
        max-w-2xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        flex
        items-center
        justify-between
        h-16
      "
    >
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <router-link to="/dashboard" class="text-lg md:text-2xl text-sky-600">
            Every<span class="text-gray-300 font-serif font-medium"
              >Thought</span
            >
          </router-link>
        </div>
      </div>
      <!-- menus -->
      <div>
        <div class="ml-4 flex items-center md:ml-6">
          <!-- Notifications dropdown -->
          <Menu as="div" class="ml-3 relative">
            <div>
              <MenuButton
                class="
                  max-w-xs
                  bg-gray-800
                  text-gray-400
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
                <span class="sr-only">Open notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
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
                  md:w-96
                  rounded-xl
                  shadow-lg
                  py-1
                  bg-white
                  dark:bg-gray-700
                  ring-1 ring-black ring-opacity-5
                  focus:outline-none
                "
              >
                <MenuItem v-for="message in notifications" :key="message.text">
                  <button
                    class="
                      px-4
                      py-2
                      block
                      items-center
                      text-sm text-gray-700
                      hover:text-gray-900
                    "
                  >
                    {{ message.text
                    }}<span class="text-sm">{{ message.author }}</span>
                  </button>
                </MenuItem>
                <MenuItem v-if="!notifications.length">
                  <p
                    class="
                      p-4
                      text-sm text-gray-700
                      dark:text-gray-200
                      hover:text-gray-900
                      inline-flex
                    "
                  >
                    <CheckCircleIcon class="h-5 w-5 mr-2 text-green-500" />
                    You don't have any notifications.
                  </p>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
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
                <Avatar class="w-10 h-10" />
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
                  rounded-xl
                  shadow-lg
                  py-1
                  bg-white
                  dark:bg-gray-700
                  ring-1 ring-black ring-opacity-5
                  focus:outline-none
                "
              >
                <div class="p-4 pb-3 border-b dark:border-gray-600 mb-2">
                  <div
                    class="
                      leading-none
                      tracking-tight
                      mb-1
                      font-medium
                      break-all
                    "
                  >
                    Hello,
                    {{
                      store.profile.first_name
                        ? store.profile.first_name
                        : "friend"
                    }}!
                  </div>
                  <div
                    class="
                      text-sm
                      leading-6
                      text-gray-500
                      dark:text-gray-300
                      break-all
                      font-serif
                    "
                  >
                    {{ store.user.email }}
                  </div>
                </div>
                <MenuItem v-for="item in navigation" :key="item.name">
                  <router-link
                    :to="{ name: item.name }"
                    class="
                      px-4
                      py-2
                      block
                      items-center
                      font-medium
                      tracking-tight
                      text-sm text-gray-700
                      dark:text-gray-200
                      hover:text-gray-900
                      dark:hover:text-white
                      transition
                      ease-in-out
                      duration-500
                    "
                    >{{ item.title }}</router-link
                  >
                </MenuItem>
                <MenuItem>
                  <button
                    @click="signOut()"
                    class="
                      px-4
                      py-2
                      inline-flex
                      items-center
                      font-medium
                      tracking-tight
                      text-sm text-gray-700
                      dark:text-gray-200
                      hover:text-gray-900
                      dark:hover:text-white
                      transition
                      ease-in-out
                      duration-500
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
    </nav>
  </header>
</template>
<script>
import { getProfile, supabase } from "@/supabase";
import { store } from "@/store";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import Avatar from "../app/settings/Avatar.vue";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

import {
  MenuIcon,
  XIcon,
  LogoutIcon,
  BellIcon,
  CheckCircleIcon,
} from "@heroicons/vue/outline";

const navigation = [{ title: "Account Settings", name: "account" }];

const notifications = [];

export default {
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    LogoutIcon,
    BellIcon,
    MenuIcon,
    XIcon,
    CheckCircleIcon,
    Avatar,
  },
  setup() {
    const router = useRouter();

    // Sign Out
    async function signOut() {
      store.user = supabase.auth.user();
      try {
        let { error } = await supabase.auth.signOut();
        if (error) throw error;
      } catch (error) {
        console.log(error.message);
      } finally {
        store.user = {};
        router.go();
      }
    }

    onMounted(() => {
      getProfile();
    });

    return {
      store,
      navigation,
      notifications,

      getProfile,
      signOut,
    };
  },
};
</script>