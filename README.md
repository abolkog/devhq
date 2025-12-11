# DevBoard

A developer-focused VS Code extension that brings together **tasks**, **notes**, and a **TODO/FIXME code tree** — all in one clean workspace panel.

DevBoard helps you stay organized without leaving your editor.

---

## ✨ Features

### 🗂️ Unified Dev Panel

A single panel that contains three tabs:

#### ✔️ **1. Checklist (Todos)**

- Add / remove / check off tasks
- Persistent storage across sessions
- Keyboard-friendly

#### 📝 **2. Notes**

- Quick notes area for ideas, snippets, reminders
- Auto-save
- Markdown-friendly text area (optional future mode)

#### 🌲 **3. TODO/FIXME Tree**

- Automatically scans your project for:
  - `TODO`
  - `FIXME`
- Organized by file
- Click to jump directly to source

---

## 🧰 How It Works

DevBoard has two major components:

### **Webview Panel**

Contains the Checklist, Notes, and Tree tabs.  
It communicates with the extension backend through VS Code’s messaging API.

### **Tree Provider**

A native VS Code TreeView that powers the TODO/FIXME explorer.

Everything stays in sync automatically.

## 📁 Project Structure

media/ # Webview UI (HTML/CSS/JS)
src/
panel/ # Webview panel controller
tree/ # TODO/FIXME Tree provider
storage/ # Persistent data mgmt
utils/ # Helper utilities

## 🚀 Getting Started (Development)

### 1. Install dependencies

### 2. Run the extension in VS Code

Press **F5** to launch the VS Code Extension Host.

### 3. Build (optional)

## 🧩 Commands

| Command                       | Description                       |
| ----------------------------- | --------------------------------- |
| **DevBoard: Open Panel**      | Opens the main DevBoard panel     |
| **DevBoard: Rescan TODOs**    | Forces a re-scan of the workspace |
| **DevBoard: Clear Checklist** | Clears all tasks                  |
| **DevBoard: Clear Notes**     | Clears all notes                  |

## 🔧 Settings (Optional)

You can add user preferences like:

```
"devboard.scanPattern": ["TODO", "FIXME"],
"devboard.autoSave": true,
"devboard.defaultTab": "notes"
```

## 🛠 Tech Stack

- **VS Code Webview API**
- **TreeDataProvider**
- **TypeScript**
- **Lightweight JSON storage**

## 📌 Roadmap

- Markdown mode for Notes
- Custom TODO keywords
- Cloud sync support
- Snippet drawer
- Workspace-specific boards

---

y

## 🤝 Contributing

PRs, issues, and suggestions are welcome!  
This project is meant to grow into a polished dev productivity tool.

---

## 📜 License

MIT License.
