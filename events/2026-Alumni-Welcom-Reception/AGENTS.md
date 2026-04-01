# AGENTS.md

## Table of Contents

- [Repository Identity](#Repository%20Identity)
- [What Agents Should Assume](#What%20Agents%20Should%20Assume)
- [Repository Layout](#Repository%20Layout)
- [Build, Lint, Test, and Verification Commands](#Build,%20Lint,%20Test,%20and%20Verification%20Commands)
- [Rule Files Check](#Rule%20Files%20Check)
- [Authoring Conventions](#Authoring%20Conventions)
- [Content Patterns to Reuse](#Content%20Patterns%20to%20Reuse)
- [Editing Workflow for Agents](#Editing%20Workflow%20for%20Agents)
- [Consistency Checks](#Consistency%20Checks)
- [Error-Handling Guidance for This Repo](#Error-Handling%20Guidance%20for%20This%20Repo)
- [Obsidian-Specific Notes](#Obsidian-Specific%20Notes)
- [When Adding New Documents](#When%20Adding%20New%20Documents)
- [When Not to Expand Scope](#When%20Not%20to%20Expand%20Scope)
- [Good Final Reporting for This Repo](#Good%20Final%20Reporting%20for%20This%20Repo)
- [Quick Reference](#Quick%20Reference)

## Repository Identity

- This repository is primarily a documentation and planning vault, with one code sub-project (`two-maps/`).
- The primary working area is `events/2026-Alumni-Welcom-Reception/`, organized into `planning/`, `posts/`, `artifacts/`, and `two-maps/`.
- Content is authored in Markdown and managed comfortably in Obsidian.
- `.obsidian/core-plugins.json` confirms this is an Obsidian vault with core plugins such as `templates`, `daily-notes`, `canvas`, `outline`, `sync`, and `bases` enabled.
- `LICENSE` is MPL 2.0; preserve it and keep new repository-level guidance compatible with that license context.

## What Agents Should Assume

- Do not assume there is a frontend, backend, API, package manager, or test suite.
- Do not invent build, lint, typecheck, or CI commands that are not present in the repo.
- Do not introduce code scaffolding unless the user explicitly asks to turn this vault into a software project.
- Treat this repo as content operations: event plans, volunteer runbooks, and public-facing bilingual posts.
- Prefer small, precise document edits over broad rewrites.

## Repository Layout

- `events/` stores event-specific working material.
- `events/2026-Alumni-Welcom-Reception/README.md` is the event-level index.
- `events/2026-Alumni-Welcom-Reception/planning/cn/` contains all Chinese planning documents (proposal, runbook, and 10 role plans).
- `events/2026-Alumni-Welcom-Reception/planning/en/` contains all English planning documents (mirrors `cn/`).
- `events/2026-Alumni-Welcom-Reception/two-maps/` is a pnpm workspace monorepo containing Nuxt 3 web apps and Remotion video projects for the Alumni Journey Map and Local Guide Map.
- `events/2026-Alumni-Welcom-Reception/posts/post-official_en.md` and `events/2026-Alumni-Welcom-Reception/posts/post-official_cn.md` are longer public-facing recruitment posts.
- `events/2026-Alumni-Welcom-Reception/posts/post-wechat_en.md` and `events/2026-Alumni-Welcom-Reception/posts/post-wechat_cn.md` are shorter channel-specific posts.
- `events/2026-Alumni-Welcom-Reception/artifacts/耶鲁上海校友活动志愿者执行计划.pdf` is a rendered Chinese document artifact; do not edit it directly unless the user explicitly asks for PDF work.

## Build, Lint, Test, and Verification Commands

### Existing Commands in This Repo

- Build: none configured.
- Lint: none configured.
- Format: none configured.
- Typecheck: none configured.
- Test suite: none configured.
- Single-test command: not applicable because there is no test runner in this repository.

### Practical Verification Agents Can Use

- `git diff -- AGENTS.md` to inspect the exact documentation changes before finishing.
- `rg --files .` to confirm what files actually exist before referencing them.
- `rg -n "<phrase>" events/2026-Alumni-Welcom-Reception/planning events/2026-Alumni-Welcom-Reception/posts` to check consistency across bilingual or channel variants.
- `wc -l <file>` if line-count constraints matter for long-form docs.
- Manual Markdown review is the real validation path here: headings, tables, bullets, mirrored content, and wording accuracy.

### What Not To Claim

- Do not claim tests passed; there are no tests.
- Do not claim lint passed; there is no linter.
- Do not claim a build succeeded; there is no build system.
- Instead, say you verified the edited Markdown against the repository structure and source documents.

## Rule Files Check

- No repository-local `AGENTS.md` existed before this one.
- No `.cursorrules` file exists in this repo.
- No `.cursor/rules/` directory exists in this repo.
- No `.github/copilot-instructions.md` file exists in this repo.
- If any of those files are added later, update this document so agent instructions stay aligned.

## Authoring Conventions

### Bilingual Structure

- Mirror substantive content in both English and Chinese when the repo already provides both.
- Follow the existing suffix convention: `_en.md` for English and `_cn.md` for Chinese.
- Keep English and Chinese documents semantically aligned even if wording is not sentence-by-sentence identical.
- If you update one side of a bilingual pair, check whether the paired file should be updated in the same change.

### File Naming

- Keep directory names descriptive and event-specific.
- Existing event folder naming uses a date/topic slug style such as `2026-Alumni-Welcom-Reception`.
- Within each event folder, group source docs by function: `planning/`, `posts/`, and `artifacts/`.
- Keep Markdown filenames descriptive and channel-aware: `plan`, `event-plan`, `post-official`, `post-wechat`.
- When a planning or post document is intended for ongoing operational use or sharing, prefer maintaining both English and Chinese variants.
- Preserve existing names even if you notice typos unless the user asks for a rename; renaming affects links and expectations.

### Markdown Formatting

- Use ATX headings (`#`, `##`, `###`) consistently.
- Top-level content generally starts with a single H1 title.
- Use numbered H2 sections for long operational documents, as seen in `events/2026-Alumni-Welcom-Reception/planning/en/plan_en.md` and `events/2026-Alumni-Welcom-Reception/planning/cn/plan_cn.md`.
- Use tables for decision registers, staffing models, timelines, deliverables, and runbooks.
- Use ordered lists for sequences and checklists.
- Use unordered lists for role lists and concise highlights.
- Use backticks for file names, handles, tool names, and literal terms such as `events/2026-Alumni-Welcom-Reception/planning/cn/event-plan_cn.md` or `franklonely`.

### Tone and Style

- Match the document's audience before editing.
- Planning/runbook documents should be explicit, operational, and decision-oriented.
- Public-facing posts should be warm, inviting, and community-centered.
- English content in this repo favors clear, direct prose over jargon.
- Chinese content mixes concise operational language with community tone; preserve that balance.
- Keep claims concrete and tied to the event context instead of adding generic promotional language.

## Content Patterns to Reuse

- In runbooks, prefer section order like purpose -> assumptions -> command structure -> recruiting -> readiness -> day-of execution -> fallback -> next actions.
- In public posts, introduce the event briefly, list volunteer roles, explain fit, then end with a clear contact CTA.
- In bilingual operational docs, preserve key operational terms across languages, including names like OpenClaw and Fishbowl.
- Protect operational promises that recur across files: warm community experience, smooth execution, collaboration, and visible outputs.

## Editing Workflow for Agents

1. Read the target file and its paired language or channel variants.
2. Identify whether the change is local wording, structural, or cross-document.
3. Edit only the files that need to stay consistent.
4. Re-read surrounding sections to avoid breaking tone or duplicated logic.
5. Verify any event facts, names, dates, counts, and contacts against existing source files before finalizing.

## Consistency Checks

- Confirm people, organizations, and product names are spelled consistently.
- Confirm counts and ranges match across files, for example volunteer counts and attendee ranges.
- Confirm contact details stay exact.
- Confirm Markdown tables still render cleanly after edits.
- Confirm bilingual pairs still cover the same substantive points.

## Error-Handling Guidance for This Repo

- If source documents disagree, do not silently choose one version; note the discrepancy in your final message.
- If a requested fact is missing, prefer leaving a clear placeholder note in prose only when the user asked for drafting despite incomplete inputs.
- If a change would require restructuring multiple bilingual documents, say which files were synchronized.
- Avoid speculative additions about logistics, staffing, or venue details unless a source document supports them.

## Obsidian-Specific Notes

- Keep plain Markdown compatible with Obsidian.
- Avoid adding exotic Markdown extensions unless the repo already uses them.
- Do not edit `.obsidian/workspace.json` or other workspace-state files unless the user explicitly requests Obsidian configuration changes.
- Core plugin state lives in `.obsidian/core-plugins.json`; treat it as environment metadata, not business content.
- PDF export settings live in `.obsidian/app.json`; do not change them casually.

## When Adding New Documents

- Put new event materials under `events/<event-folder>/` unless the user asks for a new top-level structure.
- Place internal planning docs in `planning/`, external-facing copy in `posts/`, and rendered outputs in `artifacts/`.
- Prefer creating both `_en.md` and `_cn.md` when the new document is meant for ongoing operational use or public distribution.
- Choose a filename that signals purpose and channel.
- Keep new documents focused; split long content by function if that improves maintainability.

## When Not to Expand Scope

- Do not create software tooling files just to satisfy generic agent expectations.
- Do not add npm, Python, Docker, CI, or testing instructions unless the repository actually gains those systems.
- Do not convert this vault into a product spec repository unless asked.

## Good Final Reporting for This Repo

- Name the edited Markdown files.
- State whether bilingual partner files were also updated.
- State that there are no repo-native build/lint/test commands.
- Describe manual verification performed, such as cross-file consistency review or structure checks.

## Quick Reference

- Primary content type: bilingual Markdown documents.
- Primary workflow: read paired docs, edit carefully, preserve structure and tone.
- Tooling status: no build, no lint, no tests, no single-test runner.
- Local rule files: no Cursor rules and no Copilot instructions found.
- Best default behavior: act like a careful technical editor, not like an app scaffolding agent.
