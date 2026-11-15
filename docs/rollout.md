# Rollout guide (for Codex or any agent continuing the work)

Read `AGENTS.md` first (the writing standard), then the two scoped files `content/company-lessons/AGENTS.md` and `content/financial-reviews/AGENTS.md`.

## Goal

Cover every NIFTY 50 company (done) and then the NIFTY Next 50 with a plain-language lesson and verified financial figures, aimed at someone new to investing.

## Status (as of 15 November 2026)

- NIFTY 50: complete, lessons and verified figures.
- NIFTY Next 50: 25 of 48 originally missing companies added (batches 1 to 5, with lessons and verified figures). Including two companies already covered, that is 27 of 50 constituents. 23 remain.
- The batch list and order are in `content/source-reviews/nifty-next50-gap-2026-11-14.json` (`constituents[].batch`, `status`). Next up is batch 6: Canara Bank, Indian Railway Finance Corporation, Power Finance Corporation, Punjab National Bank and Union Bank of India. Batches 7 to 10 follow.
- When a batch lands, update `counts.addedSoFar`, `counts.missing`, each constituent's `status` and `id` in that file.

## Playbooks

The step-by-step rules live in `.claude/agents/`. They are written for Claude Code agents, but are plain Markdown instructions; follow them as written.

- `company-adder.md`: company record, offering pictures, lesson. No figures.
- `direction-reviewer.md`: reviews a batch for simplicity, accuracy and consistency.
- `figures-verifier.md`: verified figures plus an evidence file for every number.
- `lesson-editor.md`: clarity and source checks on lessons.

## Pipeline for each batch of five

1. **Add:** company records, pictures and lessons (company-adder rules). Leave figures as "awaiting verification".
2. **Review:** apply the direction-reviewer checklist and fix what it finds (jargon without a plain explanation, wrong wording, checker false positives).
3. **Check:** `npm run check:lessons` (must show 0 errors; the existing Infosys "logistics" warning is known) and `npm test` (all pass).
4. **Land:** push tested work straight to `main`. If a push is blocked, stop and report; do not force.
5. **Figures:** figures-verifier rules, one commit per company, same checks, then push to `main`.
6. Update the gap file and this status section.

## Rules that are easy to miss

- Financial amounts appear only in `content/financial-reviews/` and a lesson's `financialNotes`, never elsewhere in the lesson.
- Every document a lesson quotes must be in its `sources` list.
- Never invent product or brand profit. State the reporting scope (consolidated or standalone, period, date checked).
- Keep each company independently maintainable; regenerate bundles with `npm run build` (`npm test` does this first).
- A weekly GitHub Action (`scripts/watch-results.cjs`) opens `figures-update` issues when new results are due; see README.

## Housekeeping

- Work from one clean checkout. If you use git worktrees, remove them when merged (`git worktree remove <path>`); old ones pile up under `.claude/worktrees/`.
- Long agent runs stall if the computer sleeps. Check `git log` and the gap file before restarting anything.
