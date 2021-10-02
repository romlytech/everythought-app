<template>
  <div class="mb-4">
    <label for="photo" class="block text-sm font-medium text-gray-700">
      Avatar
    </label>
    <div class="mt-1 flex items-center">
      <img
        v-if="src"
        :src="src"
        alt="Avatar"
        class="h-12 w-12 rounded-full overflow-hidden bg-gray-100"
        :style="{ height: size, width: size }"
      />

      <span
        v-else
        class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100"
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

      <div>
        <label
          class="
            ml-5
            bg-white
            py-2
            px-3
            border border-gray-300
            rounded-md
            shadow-sm
            text-sm
            leading-4
            font-medium
            text-gray-700
            hover:bg-gray-50
            focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-sky-500
          "
          for="single"
        >
          {{ uploading ? "Uploading ..." : "Upload" }}
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
import { ref, toRefs, watch } from "vue";
import { supabase } from "../../../supabase";
import { notify } from "notiwind";

export default {
  props: {
    path: String,
  },
  emits: ["upload", "update:path"],
  setup(prop, { emit }) {
    const { path } = toRefs(prop);
    const size = ref("5em");
    const uploading = ref(false);
    const src = ref("");
    const files = ref();

    const downloadImage = async () => {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(path.value);
        if (error) throw error;
        src.value = URL.createObjectURL(data);
      } catch (error) {
        console.error("Error downloading image: ", error.message);
      }
    };

    const uploadAvatar = async (evt) => {
      files.value = evt.target.files;
      try {
        uploading.value = true;
        if (!files.value || files.value.length === 0) {
          throw new Error("You must select an image to upload.");
        }

        const file = files.value[0];
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        let { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, file);

        if (uploadError) throw uploadError;
        emit("update:path", filePath);
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

    watch(path, () => {
      path.value ? downloadImage() : "";
    });

    return {
      path,
      size,
      uploading,
      src,
      files,

      uploadAvatar,
    };
  },
};
</script>