<template>
  <div class="mb-4">
    <label
      for="photo"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      Avatar
    </label>
    <div class="mt-2 inline-flex items-center space-x-4">
      <Avatar class="h-16 w-16" />
      <div class="flex-grow">
        <label
          class="
            bg-white
            py-2
            px-3
            border border-gray-300
            rounded-xl
            shadow-sm
            text-sm
            leading-4
            font-medium
            text-gray-700
            hover:bg-gray-50
            dark:bg-gray-400
            dark:text-gray-900
            dark:border-gray-500
            focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-sky-500
          "
          for="single"
        >
          {{ uploading ? "Uploading ..." : "Upload image" }}
        </label>
        <input
          class="hidden"
          type="file"
          id="single"
          accept="image/*"
          @change="uploadAvatar($event)"
          :disabled="uploading"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, toRefs } from "vue";
import { supabase } from "../../../supabase";
import { store } from "../../../store";
import { notify } from "notiwind";
import Avatar from "./Avatar.vue";

export default {
  props: {
    path: String,
  },
  components: { Avatar },
  emits: ["upload", "update:path"],
  setup(prop, { emit }) {
    const { path } = toRefs(prop);
    const size = ref("5em");
    const uploading = ref(false);
    const files = ref();

    const uploadAvatar = async (evt) => {
      files.value = evt.target.files;
      try {
        uploading.value = true;
        if (!files.value || files.value.length === 0) {
          throw new Error("You must select an image to upload.");
        }

        const file = files.value[0];

        if (file.size > 5242880) {
          throw new Error(`The maximum file size limit is 5 MB.`);
        }

        const fileExt = file.name.split(".").pop();
        const fileName = `avatar.${fileExt}`;
        const filePath = `${store.user.id}/${fileName}`;

        let { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: true,
          });

        if (uploadError) throw uploadError;
        emit("update:path", fileName);
        emit("upload");
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
        uploading.value = false;
      }
    };

    return {
      path,
      store,
      size,
      uploading,
      files,

      uploadAvatar,
    };
  },
};
</script>