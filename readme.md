# Errorscape

## Problem Statement

Managing dependencies in modern software development is challenging. Developers often face issues like deprecated packages, security vulnerabilities, and unaddressed bugs. Manual checks are time-consuming and error-prone. We need an automated tool to check dependencies for potential issues.

## Our Solution

Errorscape automates the process of checking your project's dependencies for known issues using GitHub’s issue tracker. It helps you stay on top of bugs, security flaws, and unmaintained dependencies.

### Features:
- Scans both `dependencies` and `devDependencies`.
- Fetches GitHub issues related to your dependencies.
- Provides warnings for known issues with direct links.
- Helps keep your dependencies up-to-date and safe.

## How to Use

### Prerequisites

- Node.js (version 12 or later)
- npm
- A GitHub API token (create one at [GitHub Tokens](https://github.com/settings/tokens)).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/errorscape.git
   cd errorscape
Install dependencies:

npm install
# Create a .env file and add your GitHub API token:

GITHUB_API_TOKEN=your-github-api-token

Run -
error-helper write this in terminal 

# How It Works

Reads package.json: Gets the list of dependencies.
Fetches issues: Queries GitHub for issues related to each dependency.
Displays results: Logs warnings or success messages based on the issues found.
Analyze an Error Stack Trace 
Check Dependencies for Issues 

# Competitors

Dependabot: GitHub-native tool for dependency updates. Focuses on updates, not on issue tracking.
Snyk: Focuses on security vulnerabilities only.
npm audit: Provides basic security audits, but lacks comprehensive issue tracking.

# Our Advantage
Errorscape combines GitHub issue tracking with dependency management, offering more than just security checks. It also tracks bugs, deprecations, and performance issues for a thorough overview of your project's dependencies.

# Example Output

Checking axios...
⚠️ Issues found for axios:
- 'Security vulnerability in version 0.21.0' (https://github.com/axios/axios/issues/1234)
✅ No known issues for chalk

# Contributing
Feel free to fork and contribute! To get started:

Fork the repository.
Create a new branch.
Make your changes.
Submit a pull request.

# Keep your dependencies healthy and secure with Errorscape!

# Contact - kunalkhare2004@gmail.com
