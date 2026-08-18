# SugarBuddy Explorer

Role

You are a senior UX/UI designer, AI product designer, and full-stack web developer specializing in child-friendly health education applications.

Context

Create a mobile-first web application called SugarBuddy.

SugarBuddy is an AI-powered educational companion designed to help children with diabetes better understand their glucose readings, glucose trends, food choices, and everyday diabetes-related concepts.

The goal is to make learning about glucose easier, less intimidating, and more interactive for children.

The application should combine:

AI

Education

Gamification

Personalization

Interactive visualizations

The application is an educational prototype and must not replace a doctor, parent, glucose monitoring device, or personalized diabetes care plan.

Task

Build a fully functional mobile-first web application called SugarBuddy.

The application should feel like a real product, not a static landing page.

1. Home Dashboard

Create a child-friendly dashboard displaying simulated glucose data.

Show:

Current glucose value

Trend arrow

Glucose status

Simple explanation

"What does this mean?"

"Ask SugarBuddy AI"

"Learn & Play"

"Food Explorer"

Example:

Glucose: 105 mg/dL
Trend: → Stable

Use simulated data for the prototype.

Allow the user to switch between different demo glucose scenarios:

Stable

Rising

Falling

Low

High

Update the visual dashboard when the scenario changes.

2. SugarBuddy AI

Create an interactive AI-style chat assistant called SugarBuddy AI.

The child can ask educational questions such as:

"What does this number mean?"

"What does the arrow mean?"

"Why can my sugar go up?"

"Can food affect my sugar?"

"Why do I need to check my sugar?"

The assistant should respond using simple, friendly, age-appropriate language.

The AI should focus on education and understanding.

For situations outside the child's normal range, guide the child toward their personalized diabetes plan and parent/caregiver instead of making independent medical decisions.

Include suggested questions that the child can tap.

3. Glucose Detective Game

Create an interactive educational game.

Show a glucose value and trend arrow.

Example:

82 mg/dL ↓

Ask:

"What do you notice?"

Options:

Going Up

Going Down

Staying Stable

Give immediate feedback.

Add:

Score

Progress

Correct/incorrect feedback

Encouraging messages

Multiple difficulty levels

Make the game visually engaging and simple.

4. Food Explorer

Create an interactive food library.

Include example foods:

Apple

Milk

Bread

Rice

Juice

Dates

Chocolate

Sandwich

For each food, display:

Food name

Image or icon

Basic carbohydrate information

Simple educational explanation about how carbohydrates can affect glucose

Allow parents to add foods available at home.

Allow children to explore foods through categories.

Do not provide insulin dosage recommendations.

5. Personalized Learning

Create an AI-powered learning system.

Track:

Quiz results

Completed lessons

Frequently missed questions

Learning progress

Use this information to recommend what the child should practice next.

Example:

"You've practiced glucose numbers really well! Let's practice trend arrows next."

If the child repeatedly gets trend questions wrong, recommend a short lesson about glucose trends.

Make the learning experience adaptive.

6. My Diabetes Plan

Create a section called:

My Diabetes Plan

This section should contain personalized instructions entered by a parent/caregiver or healthcare professional.

Allow the parent to configure:

Personal instructions

Approved quick-carb options

Important reminders

Parent/caregiver contact

What the child should do when they need help

The application must display these instructions to the child in a simplified format.

Do not automatically generate medical treatment instructions.

7. Parent Mode

Create a separate Parent Mode.

Show:

Child learning progress

Quiz performance

Completed lessons

Frequently practiced topics

Food library

Personalized plan

Learning recommendations

Keep Parent Mode more organized and informative than Child Mode.

Use simulated demo data.

8. Gamification

Add simple gamification elements:

Points

Badges

Progress levels

Daily learning goals

Achievement messages

Example:

"Glucose Detective — Level 2"

"You got 8/10 questions correct!"

Keep rewards educational rather than competitive.

9. Language Support

The application must support:

English

Arabic

Add a visible language switcher.

When Arabic is selected:

Translate the entire interface

Translate buttons

Translate navigation

Translate educational content

Translate AI suggested questions

Use proper RTL layout

When English is selected:

Use English throughout the interface

Use proper LTR layout

Make sure the language switch works across the entire application.

Do not mix Arabic and English unnecessarily.

Design Direction

Create a modern, polished, mobile-first design.

The application should feel like:

A children's learning app + AI companion + simple health dashboard.

Avoid making it look like a hospital or clinical system.

Use:

Large readable numbers

Rounded cards

Friendly icons

Simple illustrations

Progress bars

Interactive elements

Soft blue/purple/green visual palette

Clean typography

Plenty of whitespace

Create a friendly mascot called:

SugarBuddy

The mascot should appear throughout the learning experience and provide encouragement.

Child Mode

Make it:

Playful

Simple

Friendly

Interactive

Easy to understand

Parent Mode

Make it:

Organized

Clear

More informative

Less playful

Technical Requirements

Build this as a functional responsive web application.

Requirements:

Mobile-first responsive design

Functional navigation

Interactive buttons

Working language switcher

Arabic RTL support

English LTR support

Simulated glucose data

Interactive glucose scenarios

Functional AI-style chat interface

Food library

Personalized learning

Mini-games

Parent Mode

Local/demo data storage

Reusable components

Smooth transitions and interactions

Use realistic demo data so the application can be demonstrated immediately.

Do not create unnecessary complexity that makes the prototype difficult to use.

Prioritize a polished user experience.

Safety Constraints

This application is an educational prototype.

It must NOT:

Diagnose medical conditions

Recommend insulin doses

Recommend medication doses

Make independent medical treatment decisions

Replace healthcare professionals

Replace glucose monitoring devices

Replace a child's personalized diabetes care plan

When the child encounters a concerning glucose scenario, the application should direct them to their configured personal plan and encourage contacting their parent/caregiver.

Add this disclaimer:

"SugarBuddy is an educational prototype and does not replace medical advice or a personalized diabetes care plan."

Tone

The overall experience should be:

Friendly

Encouraging

Reassuring

Educational

Positive

Child-friendly

Modern

The AI should never sound judgmental, frightening, or overly clinical.

Use short and simple sentences for children.

Final Goal

Create a polished, functional MVP-level web application that demonstrates how AI can transform diabetes education for children.

The core concept is:

AI + Personalized Learning + Gamification + Diabetes Education

The application should be impressive enough for a live classroom demonstration.

Start by building the complete application rather than creating only a landing page or design mockup.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://sugar-buddy-learn.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/eed30bb0-bdaf-4486-9fab-bda061f491ad).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
