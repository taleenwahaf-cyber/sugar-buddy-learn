# SugarBuddy

A mobile-first, AI-powered educational web application designed to help children with diabetes better understand glucose readings, glucose trends, food choices, and basic diabetes concepts.

![SugarBuddy Badge](https://img.shields.io/badge/status-Educational%20Prototype-blue)
![Mobile First](https://img.shields.io/badge/design-Mobile%20First-green)
![AI Powered](https://img.shields.io/badge/AI-Enabled-purple)

---

🎯 Overview

SugarBuddy is an AI-powered digital health companion designed to help children with diabetes understand their glucose readings, trends, and the impact of food in a simple and engaging way. The app connects children with their parents, allowing parents to remotely monitor glucose trends and receive alerts when a reading needs attention.

The Problem
Children may struggle to understand what their glucose readings mean, while parents cannot always be nearby to monitor them or guide them.
The Solution
SugarBuddy combines AI-powered education, personalized learning, gamification, and parent monitoring in one child-friendly experience. When a reading needs attention, the app can alert the parent and guide the child to their personalized care plan and parent-approved food options, while SugarBuddy AI provides simple educational guidance.
---

## ✨ Features

### 📊 Glucose Dashboard
- **Current Glucose Reading:** Display glucose value with real-time trend arrow
- **Status Indicators:** Visual feedback showing stable, rising, falling, low, or high readings
- **Trend Sparkline:** 3-hour glucose history visualization
- **Interactive Demo Scenarios:** Switch between different glucose scenarios to learn how readings change
- **Simple Explanations:** Age-appropriate context for each glucose status

### 🤖 SugarBuddy AI
- **Interactive Chat Interface:** Ask questions about glucose, trends, and food
- **Educational Responses:** AI-powered companion providing kid-friendly explanations
- **Suggested Questions:** Quick-tap questions to guide learning
- **Safe Guidance:** Directs to parents and care plans for medical decisions

### 🎮 Glucose Detective Game
- **Multi-Level Quiz:** Three difficulty levels (Easy, Medium, Hard)
- **Interactive Learning:** Read glucose trends and arrows, make predictions
- **Points & Scoring System:** Earn points for correct answers
- **Progress Tracking:** Visual performance feedback

### 🍎 Food Explorer
- **Food Library:** Educational exploration of common foods and their carbohydrate content
- **Categorized Foods:** Browse by food categories
- **Carb Education:** Learn how carbohydrates affect glucose levels
- **Custom Foods:** Parents can add household foods to personalize learning

### 📚 Learn & Play
- **Personalized Learning Path:** Adaptive recommendations based on performance
- **Badges & Achievements:** Unlock badges for completed lessons
- **Performance Tracking:** Track progress across glucose, trends, and food topics
- **Progress Levels:** Visual level progression system

### 👨‍👩‍👧 Parent Mode
- **Learning Insights:** Review child's quiz accuracy and performance
- **Performance Analytics:** Track points, levels, and topic mastery
- **Progress Overview:** See completed lessons and learning history
- **Food Library Access:** View all explored foods
- **Care Plan Management:** Input and manage the child's personalized diabetes care plan

### 💎 Gamification
- **Points System:** Earn points through quiz completion and learning
- **Level Progression:** Level up based on engagement and performance
- **Badge Unlocking:** Achievement-based badges for milestones
- **Encouragement Messages:** Personalized feedback and motivation

### 🌍 Language Support
- **English (LTR):** Full English interface
- **Arabic (RTL):** Complete Arabic translation with proper right-to-left layout
- **One-Click Language Toggle:** Easy switching between languages

### 📱 Mobile-First Responsive Design
- **Touch-Optimized Interface:** Designed for tablet and mobile devices
- **Responsive Layout:** Adapts seamlessly to different screen sizes
- **Accessibility-Focused:** Clear visual hierarchy and intuitive navigation

---

## 🧠 How AI Is Used

### Educational Companion
The SugarBuddy AI chatbot provides **instant, kid-friendly answers** to questions about:
- What glucose numbers mean
- How trend arrows work
- Why blood sugar goes up or down
- How food affects glucose

### Personalized Learning
The system **tracks performance** on quizzes and suggests what to learn next:
- Identifies the weakest topic (glucose, trends, or food)
- Recommends focused practice based on accuracy
- Adapts difficulty progression

### Interactive Questions
Children learn through **guided questioning** in the Glucose Detective game, reinforcing concepts through active problem-solving rather than passive reading.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI framework with TypeScript for type safety |
| **TypeScript** | Static type checking and developer experience |
| **TanStack Router** | Client-side routing and navigation |
| **TanStack React Query** | Data fetching and state management |
| **TanStack Start** | Full-stack framework with SSR support |
| **Tailwind CSS** | Utility-first CSS styling |
| **Radix UI** | Accessible, unstyled component primitives |
| **Vite** | Lightning-fast build tool and dev server |
| **Lucide Icons** | Clean, consistent icon library |
| **LocalStorage** | Client-side data persistence |
| **Hook Form + Zod** | Form handling and validation |
| **i18n (Internationalization)** | Multi-language support (English/Arabic) |
| **date-fns** | Date and time utilities |

---

## 👥 User Flow

### Child's Journey
1. **Home Dashboard** → View current glucose and understand status
2. **Ask SugarBuddy AI** → Ask questions about glucose concepts
3. **Play Glucose Detective** → Learn through interactive quiz game
4. **Explore Food Library** → Discover foods and carbs
5. **Learn & Play** → Follow personalized lesson recommendations
6. **Track Progress** → Earn badges and level up

### Parent's Journey
1. **Access Parent Mode** → View child's learning dashboard
2. **Review Performance** → Check quiz accuracy and progress
3. **Manage Care Plan** → Input personalized diabetes instructions
4. **Track Learning** → Monitor which topics were practiced
5. **Add Custom Foods** → Personalize food library

---

## 🌐 Language Support

**SugarBuddy supports two languages:**

- **English** — Left-to-right (LTR) layout
- **Arabic** — Right-to-left (RTL) layout with full translation

Users can toggle languages at any time with a single click.

---

## ⚠️ Safety & Disclaimer

**SugarBuddy is an educational prototype** and is **not** a medical device or clinical tool.

SugarBuddy:
- ❌ Does **not** diagnose diabetes or any medical condition
- ❌ Does **not** recommend insulin doses or medication changes
- ❌ Does **not** provide independent medical advice or treatment decisions
- ❌ Does **not** replace healthcare professionals, physicians, or endocrinologists
- ❌ Does **not** replace continuous glucose monitors (CGM) or glucose meters
- ❌ Does **not** replace a personalized diabetes management plan

**Disclaimer:**
> SugarBuddy is an educational prototype and does not replace medical advice or a personalized diabetes care plan.

**Always:**
- Consult with a pediatric endocrinologist or diabetes care team
- Follow your personalized diabetes management plan
- Use approved glucose monitoring devices
- Involve parents and caregivers in all diabetes-related decisions

---

## 📊 Project Status

**Educational Prototype / MVP**

SugarBuddy is an active learning project in its prototype phase. Core educational features are implemented and functional. The application is suitable for learning and demonstration purposes.

---

## 🚀 Future Improvements

- **Glucose Trend Predictions:** Teach children to predict future glucose trends
- **Advanced Quiz Topics:** Expand quiz coverage beyond glucose, trends, and food
- **Parent-Child Messaging:** Two-way communication between child and parent mode
- **Offline Functionality:** Progressive Web App (PWA) support for offline learning
- **Export & Reporting:** Generate PDF reports of learning progress for healthcare providers
- **Guardian Communication:** Alerts and summaries for parents/caregivers
- **Extended Language Support:** Additional languages beyond English and Arabic
- **Real Data Integration:** Connect to glucose monitoring devices (with appropriate safety measures)
- **Accessibility Enhancements:** Expanded support for screen readers and keyboard navigation
- **Parent Dashboard Analytics:** More advanced insights for parents and educators

---

## 📋 Organization / Reference

**SDAIA Academy**
- GitHub: [https://github.com/SDAIAAcademy](https://github.com/SDAIAAcademy)

*Note: This project is created for educational purposes as part of the SDAIA Academy community. SDAIA does not officially endorse, sponsor, or maintain this project.*

---

## 📜 License

This project is created for **educational purposes**.

---

## 🤝 Contributing

This is an educational prototype. For contributions, feedback, or questions, please refer to the project repository or contact the development team.

---

## 📞 Support

For more information about diabetes education or clinical guidance, please consult:
- Your pediatric endocrinologist
- Your diabetes care team
- Your healthcare provider
- Certified diabetes educator (CDE)

---

**Made with ❤️ for children with diabetes and their families.**
