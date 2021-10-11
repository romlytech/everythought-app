[![Netlify Status](https://api.netlify.com/api/v1/badges/17c284f3-4aeb-45fc-9f83-0ed8c388b1d7/deploy-status)](https://app.netlify.com/sites/everythought/deploys)

# [EveryThought](https://everythought.app) ☁

EveryThought is a web application designed to help you identify and recognize your emotions through daily guided prompts and journaling.

### Key Features

- Discover your emotions with our peaceful, guided prompts each day.
- Write a simple response to be saved in your recent thoughts.
- Prioritize your mental health by keeping track your Thoughts over time.

### How does it work?
Each time you create a new thought, you start a journey through a guided prompt. First, you'll be asked a thought-provoking question with an opportunity to respond. Then, as you continue through the steps of the thought, you'll learn about the associated emotion and how it relates to your life.

Whether you choose to create a new thought each day, week, or as many times as you desire; that's up to you.

### Getting Started

1. Go to [EveryThought.app](https://everythought.app) to sign up.
2. Complete your Profile.
3. Open **Start a new Thought** and follow the guided prompt.

---

## Built with/for/by

- [Vue 3](https://vuejs.org)
- [Vite](https://vitejs.dev/)
- Postgres DB using [Supabase.io](https://supabase.io)
- [TailwindCSS](https://tailwindcss.com) (including [Forms](https://github.com/tailwindlabs/tailwindcss-forms), [Typography](https://github.com/tailwindlabs/tailwindcss-typography), [HeadlessUI](https://headlessui.dev/vue/menu) & [Heroicons](https://github.com/tailwindlabs/heroicons#vue))
- Hosted on [Netlify](https://netlify.com/) with Netlify Functions

### Supabase Hacktoberfest Hackathon 2021

This MVP was built in participation of [hacktoberfest](https://supabase.io/blog/2021/09/28/supabase-hacktoberfest-hackathon-2021). Supabase is _the_ open-source Firebase alternative. The development process was made easy by utilizing their supa-easy Javascript client. User authentication is handled by Supabase Auth. Storage is used to save user profile avatars and images used within the guided prompts. The postgres database hosts all user data and any content created by us. Users can service themselves completely within the app and handle sign up, data exporting to CSV, and account deletion.

_**Built with 🏝 in Florida, USA by Mike & Emily Roberts.**_

We are a husband &amp; wife team passionate about mental health &amp; entrepreneurship. [Mike](https://twitter.com/romlytech) is a CTO by day &amp; [Emily](https://instagram.com/teamromly) has a background in psychology and counseling. Let's be friends.

Follow us on Twitter [@romlytech](https://twitter.com/romlytech) (Mike) or on GitHub - [@romlytech](https://github.com/romlytech) (Mike) and [@teamromly](https://github.com/teamromly) (Emily)..

---

## ~~Local Installation~~

This app requires keys to our [Supabase](https://supabase.io)-powered backend which holds all of our IP which makes the app what it is, so you won't be able to do much with a local install.

```sh
# install the dependencies
npm i
# start dev server for local development
npm run dev
# build for production
npm run build
# serve production app
npm run serve
```
---

## License ⚖️

Copyright (C) 2021 Mike Roberts, Emily Roberts &amp; Romly Holdings, LLC

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

See `LICENSE` for more information.
