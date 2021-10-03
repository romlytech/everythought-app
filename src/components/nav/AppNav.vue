<template>
  <div class="bg-gray-800">
    <!-- Main Nav -->
    <div class="max-w-2xl mx-auto sm:px-6 lg:px-8">
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
                      w-72
                      rounded-md
                      shadow-lg
                      py-1
                      bg-white
                      ring-1 ring-black ring-opacity-5
                      focus:outline-none
                    "
                  >
                    <MenuItem
                      v-for="message in notifications"
                      :key="message.text"
                    >
                      <button
                        class="
                          px-4
                          py-2
                          block
                          items-center
                          text-sm text-gray-700
                          hover:text-gray-900
                          font-semibold
                        "
                      >
                        {{ message.text
                        }}<span class="text-sm">{{ message.author }}</span>
                      </button>
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
                    <div class="p-4 pb-3 border-b mb-2">
                      <div
                        class="
                          text-base
                          font-medium
                          leading-none
                          text-gray-800
                          break-all
                        "
                      >
                        Hello, @{{ store.profile.username }}!
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
                    <MenuItem v-for="item in navigation" :key="item.name">
                      <router-link
                        :to="{ name: item.name }"
                        class="
                          px-4
                          py-2
                          block
                          items-center
                          text-sm text-gray-700
                          hover:text-gray-900
                          font-semibold
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
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { supabase } from "../../supabase";
import { store } from "../../store";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { notify } from "notiwind";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

import { MenuIcon, XIcon, LogoutIcon, BellIcon } from "@heroicons/vue/outline";

const navigation = [
  // { title: "Home", name: "home" },
  { title: "Edit Profile", name: "profile" },
];

const notifications = [
  { date: "1/1/21", text: "Here's a notification test.", author: "romlytech" },
  { date: "3/1/21", text: "Here's another test.", author: "emily" },
  { date: "4/3/21", text: "Testing test.", author: "another" },
  { date: "6/3/21", text: "For you, a test.", author: "stella" },
];

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
  },
  setup() {
    const router = useRouter();
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
      notifications,

      getProfile,
      signOut,
    };
  },
};
</script>