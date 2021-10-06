<template>
  <div class="max-w-2xl mx-auto pb-6 sm:px-6 lg:px-8">
    <h1
      class="text-lg leading-6 hidden sm:block font-medium text-gray-900 mb-2"
    >
      Account Settings
    </h1>
    <div class="bg-white sm:rounded-lg shadow p-4 space-y-11">
      <InfoCard
        v-if="!store.profile.first_name"
        title="Profile Required"
        msg="Let's get to know you by name. Your profile will not be shared with anyone, it's just to create a better experience for you within the app."
      />
      <form
        class="space-y-6 grid grid-cols-1 lg:grid-cols-2 gap-x-4"
        @submit.prevent="updateProfile"
      >
        <div class="col-span-1 lg:col-span-2">
          <h2 class="text-xl text-gray-700 font-semibold">My Profile</h2>
        </div>
        <AvatarUploader
          class="col-span-1 lg:col-span-2"
          v-model:path="avatar_name"
          @upload="updateProfile"
        />
        <div>
          <label
            for="first_name"
            class="block text-sm font-medium text-gray-700"
            >First Name</label
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
            type="email"
            class="etp-input"
            v-model="email"
            required
          />
          <p
            v-if="store.user.email != email"
            class="text-sm text-amber-500 mt-2"
          >
            Updating your email address will require confirmation.
          </p>
          <p v-if="store.user.new_email" class="text-sm text-red-500 mt-2">
            You haven't confirmed your new email address yet. Check your inbox
            for {{ store.user.new_email }}.
          </p>
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
      <div class="col-span-1 lg:col-span-2">
        <h2 class="text-xl mt-1 text-gray-700 font-semibold">Export Data</h2>
        <p class="text-sm mt-1 text-gray-500">
          Any data you input here is yours to keep. You have the ability to
          export all of your <b>Thoughts</b> as a CSV file.
        </p>
        <button
          @click="downloadCsv()"
          type="button"
          class="
            inline-flex
            px-4
            py-2
            mr-4
            text-sm
            rounded
            text-center
            font-medium
            mt-4
            text-sky-700
            bg-sky-100
            hover:bg-sky-500
            hover:text-white
          "
        >
          Download Thoughts
        </button>
      </div>
      <div class="col-span-1 lg:col-span-2">
        <h2 class="text-xl mt-1 text-gray-700 font-semibold">Danger Zone</h2>
        <p class="text-sm mt-1 text-gray-500">
          We take privacy very seriously. You are able to delete your account
          and all data associated with it completely. <b>Note:</b> this change
          is <span class="underline">permanent</span>.
        </p>
        <button
          type="button"
          v-if="!confirmDelete"
          @click="confirmDelete = true"
          class="
            inline-flex
            px-4
            py-2
            text-sm
            rounded
            text-center
            font-medium
            mt-4
            text-red-700
            dark:text-red-100
            bg-red-100
            dark:bg-red-600
            hover:bg-red-500
            hover:text-white
          "
        >
          Delete account
        </button>
        <form v-if="confirmDelete" @submit.prevent="deleteUser" class="mt-4">
          <label
            for="confirmEmail"
            class="block text-sm font-medium text-gray-700"
            >Confirm your email address to delete your account:</label
          >
          <input
            id="confirmEmail"
            type="email"
            class="etp-input sm:w-1/2"
            v-model="confirmEmail"
            required
          />
          <input
            v-if="confirmEmail == store.user.email"
            type="submit"
            class="
              inline-flex
              px-4
              py-2
              text-sm
              rounded
              text-center
              font-medium
              mt-4
              mr-4
              text-red-700
              dark:text-red-100
              bg-red-100
              dark:bg-red-600
              hover:bg-red-500
              hover:text-white
            "
            :value="
              loading
                ? 'Deleting your account ...'
                : 'I understand, delete my account.'
            "
            :disabled="loading"
          />
          <button
            type="button"
            v-if="confirmDelete"
            @click="confirmDelete = false"
            class="text-xs text-gray-600 font-medium hover:text-green-600"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase, csvThoughts } from "../../../supabase";
import { store } from "../../../store";
import { onMounted, ref } from "vue";
import AvatarUploader from "../settings/AvatarUploader.vue";
import { notify } from "notiwind";
import InfoCard from "../InfoCard.vue";
import { useRouter } from "vue-router";

export default {
  components: {
    AvatarUploader,
    InfoCard,
  },
  setup() {
    const loading = ref(true);
    const first_name = ref("");
    const confirmDelete = ref(false);
    const confirmEmail = ref("");
    const email = ref(store.user.email);
    const avatar_name = ref("");
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
          avatar_name.value = data.avatar_name;
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
      if (!first_name.value) {
        notify({
          group: "toast",
          type: "error",
          title: "Error",
          text: "Your first name is required.",
        });
        return;
      }
      try {
        loading.value = true;

        store.user = supabase.auth.user();

        const updates = {
          id: store.user.id,
          first_name: first_name.value,
          avatar_name: avatar_name.value,
          updated_at: new Date(),
        };

        let { data, error } = await supabase
          .from("profiles")
          .upsert(updates)
          .single();
        if (data) {
          store.profile = data;

          // update email if required
          if (store.user.email != email.value) {
            let { user, error } = await supabase.auth.update({
              email: email.value,
            });
            if (user) {
              store.user = user;
              notify(
                {
                  group: "toast",
                  type: "success",
                  title: "Email Updated",
                  text: "Check your inbox to confirm your new email address.",
                },
                20000
              );
            }
            if (error) throw error;
          } else {
            // all done
            notify(
              {
                group: "toast",
                type: "success",
                title: "Success!",
                text: "Your profile was updated.",
              },
              7777
            );
          }
          router.push("/dashboard");
        }
        if (error) throw error;
      } catch (error) {
        notify(
          {
            group: "toast",
            type: "error",
            title: "Error",
            text: error.message || error.description,
          },
          6000
        );
      } finally {
        loading.value = false;
      }
    }

    async function downloadCsv() {
      csvThoughts();
    }

    async function deleteUser() {
      loading.value = true;
      try {
        const session = supabase.auth.session();
        let res = await fetch(`/.netlify/functions/delete_user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: session.access_token,
          },
        });
        let data = await res.json();
        console.log(data);
        if (res.status == 200) {
          notify({
            group: "toast",
            type: "success",
            title: "Success!",
            text: "Account deleted.",
          });
          let { error } = await supabase.auth.signOut();
          store.user = {};
          router.go();
          console.log(error);
        } else {
          notify(
            {
              group: "toast",
              type: "error",
              title: "Error",
              text: data.error,
            },
            10000
          );
        }
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
      downloadCsv,
      confirmDelete,
      confirmEmail,
      first_name,
      email,
      avatar_name,

      updateProfile,
      deleteUser,
    };
  },
};
</script>
