<template>
  <div class="max-w-2xl mx-auto pb-6 sm:px-6 lg:px-8">
    <div class="bg-white sm:rounded-lg shadow px-4 py-6">
      <InfoCard
        v-if="!store.profile.first_name"
        class="mb-6"
        title="Profile Required"
        msg="You must complete your profile before you can participate in our community."
      />
      <form
        class="space-y-6 grid grid-cols-1 lg:grid-cols-2 gap-x-4"
        @submit.prevent="updateProfile"
      >
        <div class="col-span-1 lg:col-span-2">
          <h2 class="text-lg mt-1 text-gray-700 font-semibold">My Profile</h2>
          <!-- <p class="text-sm mt-1 text-gray-500">
            Your first_name, avatar and home airport are shared with other pilots
            in the Local Chats you choose to participate in.
          </p> -->
        </div>
        <AvatarUploader
          class="col-span-1 lg:col-span-2"
          v-model:path="avatar_url"
          @upload="updateProfile"
        />
        <div>
          <label
            for="first_name"
            class="block text-sm font-medium text-gray-700"
            >First name</label
          >
          <input
            id="first_name"
            type="text"
            class="etp-input"
            maxlength="15"
            v-model="first_name"
            required
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email Address</label
          >
          <input
            id="email"
            type="text"
            class="etp-input"
            :value="store.user.email"
            disabled
          />
        </div>

        <div class="col-span-1 lg:col-span-2">
          <input
            type="submit"
            class="
              w-full
              px-4
              py-2
              border border-transparent
              rounded-md
              shadow-sm
              font-medium
              text-white
              bg-gray-700
              hover:bg-gray-800
              focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
            "
            :value="loading ? 'Loading ...' : 'Update Profile'"
            :disabled="loading"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { supabase } from "../../../supabase";
import { store } from "../../../store";
import { onMounted, ref } from "vue";
import AvatarUploader from "../profile/AvatarUploader.vue";
import { notify } from "notiwind";
import InfoCard from "../InfoCard.vue";
import { CheckIcon } from "@heroicons/vue/solid";
import { useRouter } from "vue-router";

export default {
  components: {
    AvatarUploader,
    InfoCard,
    CheckIcon,
  },
  setup() {
    const loading = ref(true);
    const first_name = ref("");
    const avatar_url = ref("");
    const router = useRouter();

    async function getProfile() {
      try {
        loading.value = true;
        store.user = supabase.auth.user();

        let { data, error, status } = await supabase
          .from("profiles")
          .select()
          .eq("id", store.user.id)
          .single();

        if (error && status !== 406) throw error;

        if (data) {
          first_name.value = data.first_name;
          avatar_url.value = data.avatar_url;
        }
      } catch (error) {
        notify(
          {
            group: "toast",
            type: "error",
            title: "Error",
            text: error.message,
          },
          6000
        );
      } finally {
        loading.value = false;
      }
    }

    async function updateProfile() {
      try {
        loading.value = true;

        store.user = supabase.auth.user();

        const updates = {
          id: store.user.id,
          first_name: first_name.value,
          avatar_url: avatar_url.value,
          updated_at: new Date(),
        };

        let { data, error } = await supabase
          .from("profiles")
          .upsert(updates)
          .single();
        if (data) {
          store.profile = data;
          notify({
            group: "toast",
            type: "success",
            title: "Success!",
            text: "Your profile was updated.",
          });
        }
        router.push("/home");
        if (error) throw error;
      } catch (error) {
        notify(
          {
            group: "toast",
            type: "error",
            title: "Error",
            text: error.message,
          },
          6000
        );
      } finally {
        loading.value = false;
      }
    }

    onMounted(() => {
      getProfile();
    });

    return {
      store,
      loading,
      first_name,
      avatar_url,

      updateProfile,
    };
  },
};
</script>
