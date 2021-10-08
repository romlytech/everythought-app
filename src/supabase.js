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
      .gte("step", 5);

    if (thoughtCount) {
      store.thoughtCount = thoughtCount.toLocaleString();
      let { data: thoughts, error } = await supabase
        .from("thoughts")
        .select(`date, agreement, response, prompts(id,emotion(name))`)
        .gte("step", 5)
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
          .gte("step", 5)
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
      .gte("step", 5)
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
    store.showContinue = true;
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
      .lte("step", 4)
      .order("id", { ascending: false })
      .limit(1);

    if (thought.length) {
      store.todaysThought = thought[0];
    } else {
      // create a new thought if none
      let { data: prompt, error } = await supabase.rpc("get_random_prompt");
      if (prompt) {
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

    if (error) throw error;
  } catch (error) {
    store.error = error;
    console.log(error);
  } finally {
    store.loading = false;
  }
}

export async function updateStep(step) {
  store.showStepnav = false;
  store.todaysThought.step = step;
  updateThought();
}

export async function updateThought() {
  try {
    store.loading = true;
    store.error = null;
    store.showStepnav = false;

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
    store.error = error;
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
