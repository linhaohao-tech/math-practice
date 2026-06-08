# Math Flashcard Practice App — Implementation Todo List

> **Strategy:** Complete one item at a time. Each step should be runnable before moving on.

---

## Phase 1: Foundation (Easiest)

- [x] **1. Project scaffold**
  - Initialize React app (Vite + TypeScript)
  - Add Tailwind CSS
  - Set up basic folder structure (`components/`, `context/`, `utils/`, `types/`)

- [x] **2. Type definitions**
  - Define `MathQuestion` and `SessionState` interfaces per spec (Section 4.1)
  - Export shared types from a central `types/` file

- [x] **3. App state provider**
  - Create React Context (or `useReducer`) holding `SessionState`
  - Provide actions: `setView`, `resetSession`, etc.
  - Wire provider at app root

- [x] **4. Multi-screen navigation skeleton**
  - Render placeholder screens for: `SETUP`, `PRACTICE`, `REVIEW`, `STATS`
  - Switch views via `currentView` state
  - Add minimal nav buttons to move between screens (for dev/testing)

---

## Phase 2: Question Generation Logic

- [x] **5. Addition question generator**
  - Generate `operandA + operandB ≤ 100` (positive integers)
  - Return a `MathQuestion` with `formattedString` and `correctAnswer`

- [x] **6. Subtraction question generator**
  - Enforce `operandA - operandB ≥ 0`, max starting value ≤ 100
  - No negative results

- [x] **7. Multiplication question generator**
  - Single/double digits up to `12 × 12`

- [x] **8. Division question generator**
  - Generate factors first (`A = B × C`), present as `A ÷ B = ?`
  - Ensure whole-number answers only

- [x] **9. MCQ distractor generator**
  - Build array of 4 choices: 1 correct + 3 plausible wrong answers
  - Shuffle choices so correct answer isn't always in the same position

- [x] **10. Deck builder**
  - Accept selected operations + session length (10, 20, or 50)
  - Generate a full `questionsDeck` array of `MathQuestion` objects

---

## Phase 3: Setup Screen

- [x] **11. Operation toggle buttons**
  - Large buttons for `+`, `−`, `×`, `÷`
  - Support multiple active operations at once

- [x] **12. Session length selector**
  - Let user pick 10, 20, or 50 flashcards

- [x] **13. Start Practice flow**
  - "Start" button builds deck and navigates to `PRACTICE` view
  - Validate at least one operation is selected

- [x] **14. Review Mistakes entry point (UI only)**
  - Add "Review Mistakes" button on setup screen
  - Disabled when `wrongQuestionsQueue` is empty (wire up later in Phase 5)

---

## Phase 4: Flashcard Engine (Core UX)

- [x] **15. Card front — question display**
  - Show `formattedString` with large, legible typography
  - Render 4 MCQ buttons from `question.choices`

- [x] **16. MCQ selection & lock**
  - On click: store `userSelectedAnswer`, visually lock selection
  - Disable other buttons after selection

- [x] **17. 3D card flip animation**
  - CSS: `transform-style: preserve-3d`, `rotateY(180deg)` on flip
  - Trigger flip immediately after MCQ selection

- [x] **18. Card back — answer & feedback**
  - Show correct numerical answer
  - Visual indicator: selected answer was correct or incorrect

- [x] **19. Self-assessment buttons**
  - "I Got It Right" and "I Got It Wrong" CTAs
  - Flip card back to front (zero rotation) and advance to next card

- [x] **20. Session progression**
  - Track `currentCardIndex`, iterate through `questionsDeck`
  - Handle end-of-deck (return to setup or show completion state)

---

## Phase 5: Stats & Review Mode

- [ ] **21. Basic session stats**
  - Increment `totalAttempted`, `totalCorrect`, `totalIncorrect` on self-assessment click

- [ ] **22. Per-operation stats**
  - Track `byOperation` breakdown (addition, subtraction, multiplication, division)
  - Update correct/total counts per operator

- [ ] **23. Wrong questions queue**
  - Push question to `wrongQuestionsQueue` when user clicks "I Got It Wrong"
  - Enable "Review Mistakes" button on setup when queue is non-empty

- [ ] **24. Review Mode**
  - Mount flashcard engine using only `wrongQuestionsQueue` as the deck
  - Isolated loop — no new questions mixed in

---

## Phase 6: Statistics Dashboard

- [ ] **25. Stats dashboard screen**
  - **Total Attempted** — count of self-assessed cards
  - **Accuracy Ratio** — correct vs. incorrect split
  - **Operational Performance** — accuracy % per operator (`+`, `−`, `×`, `÷`)

- [ ] **26. Stats navigation**
  - Link from setup screen to `STATS` view
  - Stats update reactively during the session (no persistence across reloads)

---

## Phase 7: Polish & UX (Hardest / Most Integrated)

- [ ] **27. Child-friendly visual design**
  - Large sans-serif fonts (Quicksand or Inter)
  - Light theme, high contrast
  - Emerald green for success, soft coral/red for corrections

- [ ] **28. Playful, non-punitive interactions**
  - Smooth transitions throughout
  - Encouraging copy and feedback states
  - Minimal distractions on practice screen

- [ ] **29. Parent/instructor readability**
  - Clean stats layout with clear labels
  - Easy-to-scan operational breakdown

- [ ] **30. Edge cases & session lifecycle**
  - Empty deck / no operations selected
  - Mid-session navigation back to setup
  - Review queue cleared or updated after review session
  - Browser reload resets all ephemeral state (by design)

---

## Suggested Implementation Order Summary

| Order | Feature | Difficulty |
|-------|---------|------------|
| 1–4 | Scaffold, types, state, navigation | ⭐ Easy |
| 5–10 | Math generators & deck builder | ⭐⭐ Easy–Medium |
| 11–14 | Setup screen | ⭐⭐ Medium |
| 15–20 | Flashcard engine | ⭐⭐⭐ Medium |
| 21–24 | Stats & review mode | ⭐⭐⭐ Medium–Hard |
| 25–26 | Statistics dashboard | ⭐⭐⭐ Hard |
| 27–30 | Polish & edge cases | ⭐⭐⭐⭐ Hardest |

---

Each checkbox is one shippable slice. After **#4**, you have a navigable app shell. After **#20**, core practice works. After **#24**, review mode is complete. After **#30**, the app matches the full spec.
