# Contributing to `demo-app`

Thank you for your interest in contributing to Rayos! This document outlines how to contribute effectively to the `demo-app` repository.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Branch Strategy](#branch-strategy)
- [Commit Messages](#commit-messages)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Issue Guidelines](#issue-guidelines)
- [What We're Looking For](#what-were-looking-for)
- [What We're Not Looking For](#what-were-not-looking-for)

---

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). By participating, you agree to uphold this standard. Report unacceptable behaviour to the maintainers.

---

## How to Contribute

1. **Check existing issues** before opening a new one — your idea or bug might already be tracked.
2. **Fork the repository** and create a branch from `main`.
3. **Make your changes** — keep them focused and scoped to one concern.
4. **Verify all checks pass** locally (see [Development Setup](./SETUP.md)).
5. **Open a Pull Request** — fill out the PR template and link the related issue.

---

## Development Setup

See **[docs/SETUP.md](./SETUP.md)** for the complete guide.

**Quick start:**

```bash
git clone https://github.com/Rayos-Org/demo-app.git
cd demo-app
npm install
cp .env.example .env.local
npm run dev
```

---

## Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Stable, always deployable. Protected — no direct pushes. |
| `feat/<name>` | New features |
| `fix/<name>` | Bug fixes |
| `chore/<name>` | Tooling, dependency updates, configuration |
| `docs/<name>` | Documentation only |

---

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<optional scope>): <short description>

[optional body]

[optional footer]
```

**Types:**

| Type | When to use |
|---|---|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes only |
| `style` | Formatting, whitespace — no logic changes |
| `refactor` | Code restructuring — no feature/fix |
| `test` | Adding or updating tests |
| `chore` | Build, tooling, dependencies |
| `ci` | CI pipeline changes |

**Examples:**

```bash
feat: add product filtering by category
fix: prevent button overflow on narrow screens
docs: update SETUP.md with relay-backend wiring instructions
chore: upgrade framer-motion to v12
ci: add Node 24 engine check
```

---

## Pull Request Guidelines

- **One concern per PR.** Don't mix unrelated changes.
- **Keep it small.** Prefer several focused PRs over one large one.
- **Fill in the template.** A PR without a filled template may be closed and asked to re-submit.
- **All CI checks must pass** before a maintainer will review.
- **Link the issue** your PR resolves (e.g. `Closes #42`).
- Screenshots or recordings of UI changes are strongly appreciated.

---

## Issue Guidelines

- **Search first** — duplicates will be closed.
- **Use the templates** — bug reports and feature requests have structured templates. Fill them in completely.
- **One issue per report.** Don't bundle multiple bugs into one issue.
- Be respectful and constructive.

---

## What We're Looking For

- **Bug fixes** — especially anything that breaks the demo checkout flow
- **Accessibility improvements** — keyboard navigation, ARIA labels, colour contrast
- **Mobile / responsive fixes** — the app is shown to reviewers on all devices
- **Documentation improvements** — setup clarity, typo fixes, better explanations
- **Test coverage** — additional Playwright scenarios
- **Performance improvements** — bundle size, image loading, animation performance
- **Internationalisation** — locale support for labels and currency display

---

## What We're Not Looking For

- **Scope expansion** — adding entirely new verticals or major features without prior discussion
- **Dependency upgrades** without a clear motivation (open an issue first)
- **Style changes** that deviate from the existing dark-theme design system without prior discussion
- **Hard-coded credentials, API keys, or secrets** — these will be immediately rejected

---

## Questions?

Open a [Discussion](https://github.com/Rayos-Org/demo-app/discussions) or reach out via the issue tracker. We're happy to help you get your contribution merged.
