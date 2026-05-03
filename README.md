# CivicFlow AI 🗳️

> **The Smart, Context-Aware Election Assistant**

CivicFlow AI is an interactive, intelligent web application designed to guide citizens through the complexities of the election process. Built with a focus on usability and real-world problem-solving, it helps users understand their eligibility, navigate voter registration, prepare for voting day, and troubleshoot common electoral issues with personalized, step-by-step guidance.

---

## 📖 Overview

Elections can be confusing, with different forms, deadlines, and requirements. CivicFlow AI replaces static FAQ pages with a dynamic, context-aware assistant. By understanding the user's current situation (age, registration status, possession of Voter ID), it provides exact, actionable steps rather than generic explanations. Whether you are a first-time voter or someone struggling with a lost Voter ID, CivicFlow AI serves as your personal election advisor.

---

## ✨ Key Features

- **🧠 Context-Aware Guidance:** Tailors every response based on the user's unique profile (age, citizenship, registration status).
- **🛤️ Decision-Based Flow:** Dynamically routes users through the correct steps instead of relying on static Q&A.
- **🛠️ Real-World Problem Solving:** Dedicated workflows for common issues like a missing name on the voter list, a lost Voter ID, or a change of address.
- **💬 "Ask Anything" Input:** A natural language interface powered by an intelligent intent-matching engine to understand and answer user queries instantly.
- **✅ Actionable Checklists:** Generates clear, step-by-step checklists and lists of required documents for every scenario.
- **🎨 Clean & Intuitive UI:** Features a modern, glassmorphism-inspired interface that is fully responsive and accessible.

---

## ⚙️ How It Works

1. **Profile Setup:** The user provides basic context (Age, Registration Status, Voter ID).
2. **State Management:** The app stores this context to personalize future interactions.
3. **Intent Engine:** When a user asks a question, the natural language engine analyzes keywords and matches them to the structured knowledge base.
4. **Actionable Output:** The system returns formatted UI cards containing explanations, step-by-step instructions, and exact next steps.

---

## 💻 Tech Stack

- **Frontend:** React.js, Vite, HTML5, Vanilla CSS
- **Icons & Typography:** Lucide React, Google Fonts (Inter)
- **Deployment & Hosting:** Docker, Google Cloud Run (GCP)
- **Architecture:** Client-side State Machine & Custom NLP Intent Engine

---

## 🎯 Use Cases

- **First-Time Voters:** Step-by-step guidance on filling out Form 6 and finding required documents.
- **Fixing Registration Issues:** Clear instructions for users who need to update their address via Form 8.
- **Voting Day Preparation:** Explaining what to expect at the polling booth, how to use EVMs, and verifying votes via VVPAT.
- **Troubleshooting:** Rapid recovery steps for users who lost their Voter ID right before the election.

---

## 🚀 Setup Instructions

To run CivicFlow AI locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SaptajitSaha/ElecApp.git
   cd ElecApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in Browser:**
   Navigate to `http://localhost:5173` to interact with the assistant.

---

## 🔮 Future Improvements

- **Advanced AI Integration:** Implementing the Gemini API as a seamless fallback layer for edge-case queries.
- **Localization & Multilingual Support:** Translating the assistant into regional languages to increase accessibility across different demographics.
- **Real-Time Data Integration:** Connecting to live election APIs to show real-time polling booth wait times and candidate lists.
- **Voice Input:** Allowing users to ask questions using voice commands for better accessibility.

---

## 🌍 Why This Project Matters

Democracy works best when citizens are informed and empowered. Unfortunately, bureaucratic friction often prevents eligible voters from participating. CivicFlow AI bridges the gap between complex governmental processes and the average citizen, improving civic awareness and helping users navigate elections with confidence.

---

## 📸 Screenshots

*(Replace the placeholders below with actual screenshots of your application)*

| Setup Profile | Smart Chat Interface | Actionable Checklists |
| :---: | :---: | :---: |
| ![Setup Flow](https://via.placeholder.com/300x400?text=Profile+Setup) | ![Chat UI](https://via.placeholder.com/300x400?text=Interactive+Chat) | ![Checklist Output](https://via.placeholder.com/300x400?text=Actionable+Cards) |

---
*Built with ❤️ for Civic Tech & Hackathons.*
