const faqData = [
  {
    category: "Account & Authentication",
    items: [
      {
        q: "I forgot my password. How can I reset it?",
        a: "Use the Forgot Password option on the login page. A reset link will be sent to your email.",
      },
      {
        q: "I did not receive the password reset email. What should I do?",
        a: "Check your spam folder. If not found, try again or contact support.",
      },
      {
        q: "How do I change my profile picture or name?",
        a: "Go to Settings → Profile and update your information.",
      },
    ],
  },

  {
    category: "Projects & Collaboration",
    items: [
      {
        q: "How do I create a new project?",
        a: "Go to the dashboard and click Create Project, then enter project name, description, and members.",
      },
      {
        q: "How do I add or remove members from a project?",
        a: "Inside a project → Members section → add or remove collaborators.",
      },
      {
        q: "Why can’t I delete a project?",
        a: "Only the project owner or users with required permissions can delete a project.",
      },
      {
        q: "How do I view project activity?",
        a: "Every change is recorded in the Activity Log.",
      },
    ],
  },

  {
    category: "Tasks / To-Do Management",
    items: [
      {
        q: "How do I assign a task to a member?",
        a: "Open a project → Tasks → create task → assign member.",
      },
      {
        q: "I assigned a task but it’s not showing for the other member?",
        a: "Ensure the member is part of the project and their internet connection is active.",
      },
      {
        q: "Can I filter tasks by status or priority?",
        a: "Yes, filter by status (todo/in-progress/done) or priority.",
      },
    ],
  },

  {
    category: "Real-Time Chat & Messages",
    items: [
      {
        q: "Why can’t I send a message?",
        a: "Check shared project, internet connection, and running socket server.",
      },
      {
        q: "Does the app support file sharing in chat?",
        a: "Yes, images, PDFs, docs, and more using Cloudinary.",
      },
      {
        q: "Can I see who is online?",
        a: "Active users are shown with a green dot.",
      },
    ],
  },

  {
    category: "Files & Cloudinary Upload",
    items: [
      {
        q: "What types of files can I upload?",
        a: "Images, PDFs, documents, zip files, code files, and more.",
      },
      {
        q: "Why is my Cloudinary link not downloading?",
        a: "Ensure proper upload preset: image/upload or raw/upload.",
      },
      {
        q: "What is the max file size?",
        a: "Cloudinary free plan supports up to 100MB per file.",
      },
    ],
  },

  {
    category: "Calendar & Notification System",
    items: [
      {
        q: "How do notifications work?",
        a: "You receive real-time notifications for messages, tasks, updates, and file uploads.",
      },
      {
        q: "Can I disable notifications?",
        a: "Currently no, but you can mute chats in settings.",
      },
    ],
  },

  {
    category: "Permissions & Roles",
    items: [
      {
        q: "I cannot access some project sections. Why?",
        a: "Roles (owner, admin, member) have different permissions.",
      },
      {
        q: "Can I restrict members from deleting files or tasks?",
        a: "Yes, customize roles in project settings.",
      },
    ],
  },

  {
    category: "General App Usage",
    items: [
      {
        q: "Which browsers are supported?",
        a: "Chrome, Edge, Brave, Firefox recommended.",
      },
      {
        q: "How do I report a bug or request a feature?",
        a: "Use the Support Form on this page to contact admin.",
      },
    ],
  },
];

export default faqData;
