---
description: Multi-agent development workflow for implementing features
---

# Multi-Agent Development Workflow

This workflow defines a structured, iterative approach for implementing new features or making significant changes to the codebase. Each step has clear objectives, deliverables, and quality gates.

---

## Step 1: Implementation Design (Planning)

### Objective

Research the codebase, understand requirements, and create a comprehensive implementation plan.

### Agent Responsibilities

1. **Understand the request**: Clarify the feature, bug fix, or enhancement
2. **Research the codebase**:
   - Examine existing code structure
   - Identify affected files and components
   - Review related tests
   - Check for similar patterns in the codebase
3. **Identify dependencies**:
   - Determine required libraries or tools
   - Assess impact on existing functionality
   - Consider SEO and performance implications
4. **Create implementation plan**:
   - Document proposed changes
   - List files to be created, modified, or deleted
   - Outline verification strategy
   - Highlight any breaking changes or user review requirements

### Deliverables

- **implementation_plan.md**: Comprehensive plan with:
  - Goal description and context
  - User review requirements (if any)
  - Proposed changes grouped by component
  - Verification plan (tests + manual verification)

### Entry Criteria

- User request received
- Requirements are clear (or clarification questions asked)

### Exit Criteria

- Implementation plan created
- User has reviewed and approved the plan
- All design questions resolved

### Quality Gates

- [ ] Plan addresses all user requirements
- [ ] All affected files identified
- [ ] Verification strategy is comprehensive
- [ ] Breaking changes are clearly documented
- [ ] User has approved the plan (via notify_user)

---

## Step 2: Execution (Implementation)

### Objective

Implement the approved changes according to the implementation plan.

### Agent Responsibilities

1. **Follow the plan**: Implement changes in the order specified
2. **Write clean code**:
   - Follow code standards (`.agent/rules/code-standards.md`)
   - Use appropriate tools and frameworks (`.agent/rules/tools-and-frameworks.md`)
   - Add proper TypeScript types
   - Include JSDoc comments for complex functions
3. **Maintain consistency**:
   - Match existing code patterns
   - Use established component structures
   - Follow naming conventions
4. **Track progress**: Update task.md as implementation progresses

### Deliverables

- **Code changes**: All files created, modified, or deleted as planned
- **Updated task.md**: Progress tracking with completed items checked off

### Entry Criteria

- Implementation plan approved
- Environment ready for development

### Exit Criteria

- All planned code changes completed
- Code compiles/builds without errors
- Linting passes (`npm run lint`)
- Ready for testing

### Quality Gates

- [ ] All code changes match the plan
- [ ] TypeScript compilation succeeds
- [ ] ESLint checks pass
- [ ] Prettier formatting applied
- [ ] No console errors or warnings
- [ ] Code follows project standards

---

## Step 3: Testing (Quality Assurance)

### Objective

Write comprehensive tests and iterate on code/tests until all tests pass.

### Agent Responsibilities

1. **Write tests**:
   - Unit tests for new/modified functions
   - Component tests for UI changes
   - Integration tests for feature flows
   - Follow testing standards (`.agent/rules/code-standards.md`)
2. **Run tests**: Execute test suite with `npm test`
3. **Fix failures**:
   - Debug failing tests
   - Update code or tests as needed
   - Ensure tests are meaningful and not just passing
4. **Verify coverage**: Check that critical paths are tested
5. **Iterate**: Repeat test → fix → test cycle until all tests pass

### Deliverables

- **Test files**: New or updated test files in `__tests__/` or `*.test.ts(x)`
- **Passing test suite**: All tests green
- **Coverage report**: Adequate coverage for new code

### Entry Criteria

- Implementation complete
- Code compiles and lints successfully

### Exit Criteria

- All tests pass (`npm test`)
- Coverage meets project standards
- Tests are meaningful and test behavior, not implementation

### Quality Gates

- [ ] All tests pass
- [ ] New functionality has test coverage
- [ ] Tests follow AAA pattern (Arrange, Act, Assert)
- [ ] Tests use React Testing Library best practices
- [ ] No skipped or disabled tests without justification
- [ ] Edge cases are tested

---

## Step 4: Code Review (Quality Check)

### Objective

Review all changes for code quality, standards compliance, security, and best practices.

### Agent Responsibilities

1. **Review code quality**:
   - Check for code smells and anti-patterns
   - Verify proper error handling
   - Ensure null/undefined safety
   - Review performance implications
2. **Validate standards compliance**:
   - TypeScript best practices followed
   - React patterns properly applied
   - Next.js conventions adhered to
   - Styling guidelines followed
3. **Security review**:
   - Input validation present
   - No hardcoded secrets
   - XSS prevention measures in place
   - Dependencies are safe
4. **Accessibility check** (for UI changes):
   - Semantic HTML used
   - ARIA labels where needed
   - Keyboard navigation works
   - Color contrast adequate
5. **SEO review** (for pages):
   - Metadata properly configured
   - OG images generated if needed
   - Sitemap updated
6. **Document findings**: List issues to address in refactor step

### Deliverables

- **Review report**: Document with:
  - Code quality issues
  - Standards violations
  - Security concerns
  - Accessibility problems
  - SEO improvements needed
  - Refactoring recommendations

### Entry Criteria

- All tests passing
- Implementation complete

### Exit Criteria

- Comprehensive review completed
- All issues documented
- Severity assessed for each issue

### Quality Gates

- [ ] No critical security issues
- [ ] No accessibility blockers
- [ ] Code follows project standards
- [ ] Performance is acceptable
- [ ] SEO requirements met
- [ ] Error handling is comprehensive

---

## Step 5: Refactor (Polish & Optimize)

### Objective

Address code review findings, optimize code, and finalize the implementation.

### Agent Responsibilities

1. **Address review findings**:
   - Fix critical and high-priority issues
   - Refactor code smells
   - Improve error handling
   - Enhance accessibility
2. **Optimize**:
   - Remove duplicate code
   - Extract reusable components/functions
   - Improve performance where needed
   - Optimize bundle size
3. **Polish**:
   - Add/improve comments
   - Enhance code readability
   - Verify consistent formatting
4. **Final verification**:
   - Re-run tests after refactoring
   - Verify build still succeeds
   - Check for any regressions
5. **Document work**: Create walkthrough.md showing what was accomplished

### Deliverables

- **Refactored code**: All review issues addressed
- **Passing tests**: Tests still pass after refactoring
- **walkthrough.md**: Summary of:
  - What was accomplished
  - What was tested
  - Validation results
  - Screenshots/recordings of changes (for UI work)

### Entry Criteria

- Code review completed
- Review findings documented

### Exit Criteria

- All critical issues resolved
- Code is polished and production-ready
- Documentation complete
- User can review the walkthrough

### Quality Gates

- [ ] All critical review findings addressed
- [ ] Tests still pass after refactoring
- [ ] Build succeeds
- [ ] No new linting errors
- [ ] Code is DRY (Don't Repeat Yourself)
- [ ] Performance is optimized
- [ ] Walkthrough document is comprehensive

---

## Workflow Iteration

### When to Backtrack

- **From Execution to Planning**: Major architectural issue discovered
- **From Testing to Execution**: Tests reveal fundamental implementation flaws
- **From Review to Execution**: Critical issues require significant rework
- **From Refactor to Testing**: Refactoring broke existing functionality

### When to Skip Steps

Generally, **do not skip steps**. However, for very minor changes:

- **Trivial fixes**: May combine Planning + Execution
- **Documentation-only**: May skip Testing if no code changes
- **Emergency hotfixes**: May expedite but still follow all gates

### Parallel Work

Some steps can overlap:

- Write tests while implementing (TDD approach)
- Begin refactoring obvious issues during implementation
- Document as you go

---

## Tools & Commands Reference

### Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run lint -- --fix # Auto-fix lint issues
```

### Testing

```bash
npm test             # Run all tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

### Quality

```bash
git status           # Check uncommitted changes
npm run lint         # Lint check
npx prettier --check . # Format check
```

---

## Success Criteria

A feature is **complete** when:

1. ✅ All tests pass
2. ✅ Linting passes
3. ✅ Build succeeds
4. ✅ Code review gates passed
5. ✅ User has approved (if needed)
6. ✅ Walkthrough documents the work
7. ✅ Ready for deployment

---

## Tips for Effective Workflow

1. **Start small**: Break large features into smaller, manageable tasks
2. **Communicate early**: Ask clarifying questions in Planning phase
3. **Test often**: Don't wait until Step 3 to run tests
4. **Document as you go**: Update task.md throughout the process
5. **Be thorough**: Each quality gate exists for a reason
6. **Learn from iterations**: Note what works well and what doesn't
7. **Stay consistent**: Follow project standards religiously
