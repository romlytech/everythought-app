<template>
  <div>
    <img
      v-if="src"
      :src="src"
      class="h-8 w-8 md:h-10 md:w-10 rounded-full"
      alt=""
    />
    <span
      v-else
      class="
        inline-block
        h-8
        w-8
        md:h-10
        md:w-10
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
</template>
<script>
import { onMounted, ref } from "vue";
import { supabase } from "../../../supabase";

export default {
  props: {
    avatar_url: String,
  },
  setup(props) {
    const src = ref("");

    async function downloadImage() {
      if (props.avatar_url) {
        try {
          const { data, error } = await supabase.storage
            .from("avatars")
            .download(props.avatar_url);
          if (error) throw error;
          src.value = URL.createObjectURL(data);
        } catch (error) {
          console.error("Error downloading image: ", error.message);
        }
      }
    }

    onMounted(() => {
      downloadImage();
    });

    return {
      downloadImage,
      src,
    };
  },
};
</script>