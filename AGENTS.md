# AGENTS.md — Project Guidelines

## 1. Project Overview

This project aims to build a **high-quality, production-ready React component library**, accompanied by comprehensive web-based documentation.

The project has two equally important objectives:

1. **Component library:** Develop reusable, robust, performant, accessible and maintainable UI components.
2. **Documentation:** Provide clear, comprehensive and interactive documentation, including examples, demonstrations and implementation details.

The quality of the components is the primary concern. Documentation must accurately reflect their actual behavior and API.

## 2. Technology Stack & Architecture

### Technology stack

- React 19
- Next.js 16
- TypeScript
- CSS

Use as few external dependencies as reasonably possible.

**Component library restrictions:**

- External libraries must NEVER be used to implement UI components.
- Components must rely on native browser APIs, React and CSS.
- Development dependencies and tools are encouraged when they improve maintainability, testing, performance or code quality.
- Documentation may use external libraries when they provide meaningful value, but unnecessary dependencies should be avoided.

### Project architecture

```text
src/
├── app/                 # Next.js routes and web pages
├── components/
│   ├── ui/              # Actual component library
│   └── ...              # Documentation components and utilities
├── data/                # Internal documentation data
├── types/               # Shared TypeScript types and constants
└── utils/               # Documentation utility functions
```

Additional component-library files:

- `src/app/globals.css`

**Important architectural distinction:**

- `src/components/ui/` and `src/app/globals.css` belong to the actual component library.
- Other elements in `src/components/` belong to the documentation infrastructure.

Never confuse documentation components with library components. Their requirements, responsibilities and modification permissions are different.

## 3. Development Commands

The following commands are explicitly authorized and may be executed without requesting permission:

| Command          | Purpose                      |
| ---------------- | ---------------------------- |
| `npm run dev`    | Start the development server |
| `npm run lint`   | Run linting                  |
| `npm run build`  | Build the application        |
| `npm run format` | Format the code              |
| `npm run test`   | Run tests                    |

**These are the only commands authorized for automatic execution without prior approval.**

Any other command, including package installation, package removal, Git operations, file deletion, scripts, migrations or system commands, requires explicit user authorization.

Do not assume that a command is safe simply because it is commonly used in development.

## 4. General Development Principles

All code must follow these principles:

### Code quality

- Prefer clear, concise and minimal implementations.
- Avoid unnecessary abstractions, complexity and duplication.
- Favor composition and reusable solutions.
- Follow existing project conventions and architecture.
- Avoid speculative features and unnecessary refactoring.
- Do not introduce dependencies without a compelling reason.
- Prefer explicit, strongly typed and predictable APIs.
- Do not sacrifice maintainability for premature optimization.

### Performance

- Minimize unnecessary React renders.
- Avoid unnecessary state and effects.
- Prefer native browser capabilities when appropriate.
- Avoid unnecessary JavaScript and runtime overhead.
- Consider bundle size and rendering performance.
- Use React and Next.js features appropriately.

### Modern browser support

- Target browser capabilities considered baseline in 2026.
- Avoid legacy compatibility code and unnecessary polyfills.
- Provide fallbacks whenever using functionality outside the supported baseline.
- Prefer progressive enhancement when appropriate.

Do not confuse modern browser support with permission to use experimental or unstable APIs.

### Accessibility

Accessibility is a fundamental requirement, not an optional enhancement.

All library components must aim to comply with:

- WCAG 2.2 Level AA.
- RGAA accessibility requirements, where applicable.
- Native HTML semantics and appropriate ARIA patterns.

Pay particular attention to:

- Keyboard navigation and focus management.
- Screen-reader compatibility.
- Accessible names and descriptions.
- Semantic HTML.
- Color contrast and non-color visual indicators.
- Reduced-motion preferences (`prefers-reduced-motion`).
- Form labels, validation and error announcements.
- Touch targets and interaction states.

Prefer native HTML elements and browser behavior over unnecessary custom implementations.

Never use ARIA when an appropriate native HTML element already provides the required semantics.

## 5. Project-Specific Instructions

More specific development conventions are documented in:

```text
.github/instructions/
```

These instructions are authoritative for their respective scopes.

Before modifying code, inspect the relevant instruction files and follow their requirements.

## 6. File Modification & Approval Policy

**No file may be modified without explicit user approval.**

This applies to:

- Creating files.
- Editing existing files.
- Deleting files.
- Renaming or moving files.
- Automatically formatting existing files.
- Generating or overwriting files.

Before making any modifications:

1. Analyze the requested changes.
2. Identify all files that would need to be modified.
3. Explain the proposed modifications.
4. Wait for explicit user approval.
5. Modify only the approved files.

Approval for one modification does not authorize unrelated changes.

Never assume that a request to analyze, explain, review, audit or suggest improvements grants permission to modify files.

When approval has not been granted, provide proposed code or patches in the response instead of applying them.

## 7. Documentation-Specific Restrictions

Documentation tasks have strict isolation requirements.

**When working on documentation, documentation-related Skills, or questions concerning documentation:**

- NEVER modify files inside `src/components/ui/`.
- NEVER modify `src/app/globals.css`.
- NEVER modify the actual component library.
- Do not refactor, optimize or fix library components as part of documentation work.
- Do not change component APIs or implementation details.

Documentation work may involve:

- Documentation pages in `src/app/`.
- Documentation components outside `src/components/ui/`.
- Documentation data in `src/data/`.
- Documentation-specific types and utilities.
- Documentation examples and presentation.

If a documentation issue originates from an actual library component, report the issue and propose a solution separately. Do not fix the component.

**This restriction takes precedence over general development instructions.**

## 8. Testing & Regression Protection

Existing tests are important safeguards.

The following rules are mandatory:

- NEVER delete an existing test.
- NEVER disable a test to make a test suite pass.
- NEVER weaken existing assertions simply to accommodate an implementation.
- NEVER modify expected results without understanding and justifying the change.
- Do not silently ignore failing tests.
- Preserve existing test coverage when modifying code.

When tests fail:

1. Identify the root cause.
2. Determine whether the issue comes from the implementation, the test or the environment.
3. Explain the findings.
4. Propose a correction.

Tests must not be removed or weakened to conceal regressions.

## 9. Working Method

For every development task, follow this workflow:

### Step 1 — Understand

- Identify the actual objective.
- Inspect the relevant files.
- Read applicable project instructions.
- Understand existing implementations and conventions.

### Step 2 — Analyze

- Identify dependencies and potential side effects.
- Consider accessibility, performance and maintainability.
- Identify the exact files requiring changes.
- Avoid unnecessary modifications.

### Step 3 — Propose

Before modifying files:

- Explain the proposed approach.
- List the files that need modification.
- Highlight potential risks or breaking changes.
- Request explicit approval.

### Step 4 — Implement

Only after approval:

- Make the smallest appropriate changes.
- Follow existing conventions.
- Preserve unrelated code.
- Avoid opportunistic refactoring.

### Step 5 — Verify

Use only authorized commands:

- `npm run lint`
- `npm run test`
- `npm run build`

Run relevant checks when appropriate.

Report any failures accurately. Never claim that a test or build succeeded without actually running it.

## 10. Final Response Requirements

At the end of every development task, provide a concise summary containing:

- What was changed.
- Which files were modified.
- Important implementation decisions.
- Tests and checks performed.
- Any remaining issues or limitations.

If no files were modified, explicitly state that the work was limited to analysis, recommendations or proposed changes.

Always distinguish between verified results and assumptions.

## 11. Guiding Principle

**Quality over quantity. Minimal changes over unnecessary refactoring. Accessibility by default. Explicit approval before every file modification.**

The goal is not simply to produce working code, but to build a reliable, maintainable and accessible component library with documentation of professional quality.
