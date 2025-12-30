---
description: How to walk the user through implementation, functional, or high-level aspects of the project
---

1. Use `list_dir` and `grep_search` to identify all relevant files for the requested topic.
2. Use `view_file_outline` and `view_file` to read and understand the implementation details.
3. Identify the different layers of the explanation:
   - **High-Level**: System architecture, purpose, and how it fits into the overall project.
   - **Functional**: The logical flow, API contracts, and user-facing behavior.
   - **Implementation**: Specific code patterns, optimization details, and technical debt if any.
4. Present the information using:
   - Clear headers and bullet points.
   - Mermaid diagrams to visualize complex logic or data flows.
   - File links to specific lines of code using the `[file.ts:L1-L10](file:///path/to/file.ts#L1-L10)` format.
   - Diff blocks or code snippets to highlight important sections.
5. Ask the user if they would like a deeper dive into any specific part of the explanation.