# Syncly

A modern web application for project and task management built with React and TypeScript.

## 🖼️ Preview

**_Landing Page_**

<p align="center">
<img src="https://github.com/dev-dimas/syncly-client/blob/master/screenshots/landing-page.png?raw=true" style="padding-bottom: 15px" />
</p>

**_Dashboard_**

<p align="center">
<img src="https://github.com/dev-dimas/syncly-client/blob/master/screenshots/dashboard.png?raw=true" style="padding-bottom: 15px" />
</p>

## 🚀 Tech Stack

- ⚛️ **Library:** React 18+
- 📦 **Build Tool:** Vite
- 🔷 **Language:** TypeScript
- 📦 **State Management:** Redux
- 🎨 **Styling:**
  - Tailwind CSS
  - GSAP
  - Shadcn/ui components
- 🛠️ **Routing:**
  - Generouted - File-based routing for Vite
  - Type-safe routing with automatic route generation
- ✨ **Features:**
  - User authentication
  - Project management capabilities
  - Task assignment system
  - Realtime notification

## 🌟 Project Structure

This project uses [Generouted](https://github.com/oedotme/generouted) for file-based routing. The routing convention follows:

- `index.tsx` - Index route
- `+login.tsx` - Named global modals
- `(tasks)` - Group routes (won't affect URL)
- `[projectId].tsx` - Dynamic route
- `_component.tsx` - Excluded from routing (components)

For more information, please refer to the [Generouted naming convention](https://github.com/oedotme/generouted?tab=readme-ov-file#conventions).

## 🌟 Features

### Project Management

- Create and manage multiple projects
- Invite team members to collaborate
- Track project progress
- Manage tasks within projects

### Task Management

- Detailed task view and management
- Task status tracking
- Task assignments

### User Interface

- Inspired by Notion & Figma UI Design
- Responsive design
- Modern and clean UI using shadcn/ui
- Smooth animations and transitions

### Authentication

- Secure user authentication
- Protected routes
- User role management

## 🛠 Getting Started

1. Clone the repository

```bash
git clone https://github.com/dev-dimas/syncly-client.git
```

2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## 📝 Environment Variables

Create a `.env` file in the root directory and add the variables like the variables in `.env.example`.
