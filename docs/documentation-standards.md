# DemoForge Documentation Standards

## User Story Naming Convention

To maintain clear epic ownership and migration history, use the following standardized naming format for all user stories:

### Naming Format
- **E#-US#** - Core stories within an epic
- **E#-E#-US#** - Stories migrated from one epic to another

### Examples
```markdown
E1-US1 Tenant Admin Authentication      # Core Epic 1 story
E1-US2 Admin Consent                    # Sequential numbering within epic
E1-E0-US3 Connect Tenant CTA           # Migrated from Epic 0 to Epic 1
E2-E1-US7 Advanced Token Refresh       # Migrated from Epic 1 to Epic 2
```

### Implementation Rules

#### Core Epic Stories (E#-US#):
- Use sequential numbering within each epic: E1-US1, E1-US2, E1-US3...
- Epic prefix shows clear ownership: E0 (Epic 0), E1 (Epic 1), E2 (Epic 2)
- Reset numbering for each epic to maintain clarity

#### Migrated Stories (E#-E#-US#):
- Preserve original epic and story number: E0-US3 becomes E1-E0-US3
- Shows migration history: "Epic 1 story that came from Epic 0, originally US3"
- Maintains traceability across epic boundaries
- Never renumber migrated stories - keep original sequence

#### GitHub Integration:
- Update GitHub issue titles to match naming convention
- Use consistent naming in all documentation references
- Epic labels should match naming: `epic-0`, `epic-1`, etc.

### Migration Process
1. **Identify** story to migrate: `E0-US3 Connect Tenant CTA`
2. **Rename** in destination epic: `E1-E0-US3 Connect Tenant CTA`
3. **Update** epic labels: remove `epic-0`, add `epic-1`
4. **Document** migration in both epic documentation
5. **Commit** changes with clear migration message

## User Story Status Labels

To maintain consistency across all epics and ensure clear project tracking, use the following standardized status labels:

### Status Legend
- **🟢 Closed** - Fully implemented, tested, and complete
- **🚧 In Progress** - Currently being developed or actively worked on
- **🔄 Deferred** - Moved to another epic for better integration or technical reasons
- **📋 Backlog** - Planned for future iterations within the current epic
- **⏸️ Blocked** - Waiting on dependencies, decisions, or external factors
- **❌ Cancelled** - Decided not to implement (include reason in notes)

### Usage Guidelines

#### When to use **🟢 Closed**:
- Feature is fully implemented
- All acceptance criteria met
- Code committed and merged
- Documentation updated

#### When to use **🚧 In Progress**:
- Active development happening
- Story has been started but not completed
- Clear progress being made

#### When to use **🔄 Deferred**:
- Story moved to different epic for better technical integration
- Dependencies require different ordering
- Include destination epic in notes: `*(→ Epic 2)*`

#### When to use **📋 Backlog**:
- Story planned but not yet started
- Part of current epic scope
- Will be implemented in future iteration

#### When to use **⏸️ Blocked**:
- Cannot proceed due to external dependencies
- Waiting for architectural decisions
- Technical blockers preventing progress
- Always include reason in notes

#### When to use **❌ Cancelled**:
- Decided not to implement the story
- Requirements changed making story obsolete
- Always include reason for cancellation

### Example Usage

```markdown
### Stories
- [x] [#11] E0-US1 App Shell & Navigation **🟢 Closed** *(RBAC → Epic 1)*
- [x] [#12] E0-US2 Admin Sign-In **� Closed** *(merged with #2)*
- [ ] [#2] E1-US1 Tenant Admin Authentication **📋 Backlog**
- [ ] [#13] E1-E0-US3 Connect Tenant CTA **📋 Backlog** *(migrated from Epic 0)*
- [ ] [#15] E0-US5 Audit Preview **📋 Backlog** *(depends on E1-US8)*
```

### Cross-Epic References

When deferring stories between epics:
1. Mark original story as **🔄 Deferred** with destination
2. Add story to destination epic as **🔄 Deferred** with source reference
3. Update iteration plans in both epics
4. Maintain traceability in scope sections

### Commit Message Standards

When updating story status and naming:
```bash
git commit -m "docs: implement E#-US# naming convention for user stories

- Rename Epic 1 stories to E1-US# format (E1-US1 through E1-US8)  
- Migrated stories use E1-E0-US# format showing Epic 0 origin
- Update all documentation references to new naming
- Maintain GitHub issue title consistency"
```

This ensures clear project tracking and makes progress visible to all stakeholders.