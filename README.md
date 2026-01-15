# Live Notification System

This project is a simple way to handle live notifications. I wanted to see if I could make a system where updates show up for users as soon as they are sent, without them needing to manually refresh the page.

## Core Features

(1) Live Updates: Notifications appear instantly using WebSockets.
(2) Simple Subscriptions: Users can choose the categories they want to hear from.
(3) Basic Admin Tools: A simple space for admins to send out new alerts.
(4) Read Status: A quick way for users to keep track of what they have seen.

## How it was built

### The Process

I tried to keep the code organized by splitting things into small modules, like auth and home. This made it easier for me to manage the project as it grew and helped me keep track of where everything was.

### Learning Realtime Logic

Since I am still learning how to handle live data, I used Socket.IO to manage the connection.

1. When a new notification is sent, the server sends a signal to the app.
2. The app catches that signal and adds the info to the feed.
3. If something is updated, the app tries to find that specific item and change it on the fly.

### Tools Used

(A) Frameworks: React 19, TypeScript, Vite
(B) State: Redux Toolkit
(C) Styling: Tailwind CSS 4
(D) Live Updates: Socket.IO Client
(E) Icons: Lucide React

## Folder Structure

```text
src/
  assets/              # Images and visual files
  components/
    layout/            # Basic parts like the Navbar
    ui/                # Buttons, inputs, and other shared parts
    ...                # Notification and category cards
  config/              # Basic app settings
  constant/            # Role and category names
  lib/                 # Setup for the API and socket connections
  middleware/          # Checking user permissions
  modules/             # Main feature logic (Auth, Home)
  pages/
    admin/             # Admin notification tools
    user/              # User feed and subscription pages
  redux/
    features/          # Data management for different features
    store.ts           # The main data hub
    baseApi.ts         # Shared API setup
  routes/              # The app's page navigation map
  utility/             # Small helper functions
```

## Reflections on the project

This was a big learning experience for me, especially since it was my first time really working with WebSockets. Because I am still figuring things out, I decided to use local state to handle the live updates. It is not perfect and there is definitely a lot I can improve, but it helped me get the live features working for now.

I also went with a simple monochrome design. I am still practicing my UI skills, so I kept it clean and relied on simple icons to keep things clear.

Dealing with live data is definitely a challenge, and I know my current way of syncing things could be much better. But building this really sparked my interest in realtime apps, and I am looking forward to learning more about how to make these systems more efficient as I keep growing as a developer.
