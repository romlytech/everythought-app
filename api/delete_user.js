require("dotenv").config();
const { VITE_SUPABASE_URL, SUPABASE_SERVICE_KEY } = process.env;

// create supabase client
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(VITE_SUPABASE_URL, SUPABASE_SERVICE_KEY);

exports.handler = async function (event) {
  // only allow POST method
  if (event.httpMethod != "POST") {
    return {
      statusCode: 405,
    };
  }

  // verify user is authenticated first
  const token = event.headers.token;

  try {
    const { data: user, error: user_error } = await supabase.auth.api.getUser(
      token
    );

    if (user_error) throw error;

    console.log("====Check User====");
    console.log(user || user_error);

    if (user) {
      // get avatars
      const { data: avatars, avatarError } = await supabase.storage
        .from("avatars")
        .list(user.id);

      if (avatarError) throw error;

      console.log("====Avatars to delete====");
      console.log(avatars || avatarError);

      for (const avatar of avatars) {
        // delete avatars
        const { data: deleteAvatars, delavError } = await supabase.storage
          .from("avatars")
          .remove([`${user.id}/${avatar.name}`]);

        if (delavError) throw error;

        console.log("====Delete avatars====");
        console.log(deleteAvatars || delavError);
      }

      // delete profile
      const { data: profile, profileError } = await supabase
        .from("profiles")
        .delete()
        .match({ id: user.id });

      if (profileError) throw error;

      console.log("====Delete Profile====");
      console.log(profile || profileError);

      // delete thoughts
      const { data: thoughts, thoughtsError } = await supabase
        .from("thoughts")
        .delete()
        .match({ profile_id: user.id });

      if (thoughtsError) throw error;

      console.log("====Delete Thoughts====");
      console.log(thoughts || thoughtsError);

      // delete user
      const { data: deletedUser, deletedError } =
        await supabase.auth.api.deleteUser(user.id, SUPABASE_SERVICE_KEY);

      if (deletedError) throw error;

      console.log("====Delete User====");
      console.log(deletedUser || deletedError);

      if (!deletedError) {
        return {
          statusCode: 200,
          body: JSON.stringify({
            user: JSON.stringify(deletedUser || null),
            thoughts: JSON.stringify(thoughts || null),
          }),
        };
      }
    }
  } catch (error) {
    return {
      statusCode: error.status,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
