import { createClient } from "@supabase/supabase-js";
import { store } from "./store";
import { notify } from "notiwind";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function fetchThoughts() {
  try {
    store.loading = true;
    store.error = null;
    store.user = supabase.auth.user();

    let { count: thoughtCount, error } = await supabase
      .from("thoughts")
      .select("id", {
        count: "exact",
      })
      .neq("response", null);

    if (thoughtCount) {
      store.thoughtCount = thoughtCount.toLocaleString();
      let { data: thoughts, error } = await supabase
        .from("thoughts")
        .select(`date, agreement, response, prompts(id,emotion(name))`)
        .neq("response", null)
        .filter(
          "date",
          "gte",
          new Date(new Date().setDate(new Date().getDate() - 30)).toUTCString()
        )
        .order("updated_at", { ascending: false });

      if (thoughts) {
        store.thoughts = thoughts;
        let { count: oldThoughts, error } = await supabase
          .from("thoughts")
          .select("id", {
            count: "exact",
          })
          .neq("response", null)
          .filter(
            "date",
            "lte",
            new Date(
              new Date().setDate(new Date().getDate() - 30)
            ).toUTCString()
          );
        if (oldThoughts) {
          store.oldThoughts = true;
        }
        if (error) throw error;
      }
      if (error) throw error;
    }
    if (error) throw error;
  } catch (error) {
    store.error = error;
    console.log(error);
  } finally {
    store.loading = false;
  }
}

export async function csvThoughts() {
  try {
    store.loading = true;
    store.error = null;
    store.user = supabase.auth.user();

    let { data: csv, error } = await supabase
      .from("thoughts")
      .select(`updated_at, response`)
      .neq("response", null)
      .order("updated_at", { ascending: false })
      .csv();

    if (csv) {
      store.loading = false;
      console.log(csv);

      const anchor = document.createElement("a");
      anchor.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
      anchor.target = "_blank";
      anchor.download = `EveryThought_export_${new Date().toLocaleDateString()}.csv`;
      anchor.click();
    }
    if (error) throw error;
  } catch (error) {
    store.error = error;
    store.loading = false;
    console.log(error);
  }
}

export async function initThought() {
  try {
    store.loading = true;
    store.error = null;
    store.showStepnav = false;
    store.showContinue = false;
    store.todaysThought = {};
    store.user = supabase.auth.user();

    // fetch profile if not already in store
    if (!store.profile.length) {
      let { data: profile, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", store.user.id)
        .single();
      if (profile) {
        store.profile = profile;
      }
      if (error) throw error;
    }

    // check if thought already exists today
    let { data: thought, error } = await supabase
      .from("thoughts")
      .select()
      .eq("date", new Date().toLocaleString().split(",")[0])
      .is("complete", false)
      .order("id", { ascending: false })
      .limit(1);

    if (thought.length) {
      store.todaysThought = thought[0];
    } else {
      // create a new thought if none
      let { data: prompt, error } = await supabase.rpc("get_random_prompt");
      if (prompt.id) {
        // insert new thought
        let { data: thought, error } = await supabase
          .from("thoughts")
          .insert({
            profile_id: store.user.id,
            prompt_id: prompt.id,
            step: 1,
            date: new Date().toLocaleString().split(",")[0],
          })
          .single();
        if (thought) {
          store.todaysThought = thought;
        }
        if (error) throw error;
      } else {
        store.error = "Sorry, there was a problem.";
        throw error;
      }
      if (error) throw error;
    }

    if (store.todaysThought.prompt_id) {
      let { data: prompt, error } = await supabase
        .from("prompts")
        .select(`*,emotions(*)`)
        .eq("id", store.todaysThought.prompt_id)
        .single();

      if (error) throw error;

      if (prompt.id) {
        store.prompt = prompt;
      }

      if (prompt.emotions.name) {
        store.emotion = prompt.emotions;
      }
    }

    getImages();

    if (error) throw error;
  } catch (error) {
    notify(
      {
        group: "toast",
        type: "error",
        title: "Error",
        text: store.error || error.message,
      },
      10000
    );
    console.log(error);
  } finally {
    store.loading = false;
  }
}

export async function updateStep(step) {
  store.showStepnav = false;
  store.todaysThought.step = step;
  if (store.todaysThought.step >= 7 && store.todaysThought.response) {
    store.todaysThought.complete = true;
  } else if (!store.todaysThought.response && step >= 6) {
    store.todaysThought.step = 6;
  }
  updateThought();
}

export async function updateThought() {
  try {
    store.loading = true;
    store.showStepnav = false;
    console.log(store.todaysThought);

    // upsert new thought if none
    let { data: thought, error } = await supabase
      .from("thoughts")
      .upsert(store.todaysThought)
      .single();
    if (thought) {
      store.todaysThought = thought;
    }

    if (store.todaysThought.prompt_id) {
      let { data: prompt, error } = await supabase
        .from("prompts")
        .select(`*,emotions(*)`)
        .eq("id", store.todaysThought.prompt_id)
        .single();

      if (error) throw error;

      if (prompt.id) {
        store.prompt = prompt;
      }

      if (prompt.emotions.name) {
        store.emotion = prompt.emotions;
      }
    }

    if (error) throw error;
  } catch (error) {
    console.log(error);
    notify(
      {
        group: "toast",
        type: "error",
        title: "Error",
        text: error.message || error,
      },
      6000
    );
  } finally {
    store.loading = false;
  }
}

export async function getProfile() {
  try {
    store.loading = true;
    store.user = supabase.auth.user();

    let { data, error, status } = await supabase
      .from("profiles")
      .select()
      .eq("id", store.user.id)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      store.profile = data;
      if (store.profile.avatar_name) {
        downloadAvatar();
      }
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
    store.loading = false;
  }
}

export const downloadAvatar = async () => {
  try {
    const { data, error } = await supabase.storage
      .from("avatars")
      .download(`${store.user.id}/${store.profile.avatar_name}`);
    if (error) throw error;
    store.avatar_src = URL.createObjectURL(data);
  } catch (error) {
    console.error("Error downloading image: ", error.message);
  }
};

export async function getImages() {
  try {
    let { data, error } = await supabase.rpc("get_random_images");
    if (data) {
      let imgUrls = [];

      for (const row of data) {
        const { data: src, error } = await supabase.storage
          .from(row.bucket)
          .download(row.image);
        if (src) {
          imgUrls.push({
            url: URL.createObjectURL(src),
            name: row.image,
            category: row.bucket,
          });
        }
        if (error) throw error;
      }

      // shuffle the responses
      function shuffle(array) {
        let currentIndex = array.length,
          randomIndex;
        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
          ];
        }
        return array;
      }
      store.prompt_images = shuffle(imgUrls);
    }
    if (error) throw error;
  } catch (error) {
    notify(
      {
        group: "toast",
        type: "error",
        title: "Error",
        text: store.error || error.message,
      },
      10000
    );
    console.log(error);
  } finally {
    store.loading = false;
  }
}
