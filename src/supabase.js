import { createClient } from "@supabase/supabase-js";
import { store } from "./store";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function fetchThoughts() {
  try {
    store.loading = true;
    store.error = null;
    store.user = supabase.auth.user();

    let {
      data: thoughts,
      error,
      count,
    } = await supabase
      .from("thoughts")
      .select(`date, agreement, response, prompts(id,emotion(name))`, {
        count: "exact",
      })
      .gte("step", 5)
      .order("updated_at", { ascending: false })
      .limit(10);

    if (count) {
      store.thoughts = thoughts;
      store.thoughtCount = count.toLocaleString();
      console.log(thoughts);
    }

    if (error) throw error;
  } catch (error) {
    store.error = error;
    console.log(error);
  } finally {
    store.loading = false;
  }
}

export async function initThought() {
  try {
    store.loading = true;
    store.error = null;
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

export async function updateThought() {
  try {
    store.loading = true;
    store.error = null;

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
