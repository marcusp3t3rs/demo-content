# 🧪 Unattended Provisioning POC Progress

**Branch**: `poc/unattended-provisioning`  
**Timebox**: 2-4 days (recommended 3 days)  
**Owner**: @marcusp3t3rs  

## 🎯 POC Objective
Validate whether unattended provisioning and periodic "heartbeat" activity can be implemented safely and practically for demo users, mail, files, and chats using Microsoft Graph API with application permissions.

## 📋 POC Tasks Progress

### Phase 1: Azure App Registration & Permissions
- [ ] Register test Azure app with application permissions:
  - [ ] `User.ReadWrite.All` (create/manage demo users)
  - [ ] `Mail.ReadWrite` (create mail items)  
  - [ ] `Files.ReadWrite.All` (upload to OneDrive)
  - [ ] Teams-related permissions (TBD based on requirements)
- [ ] Configure admin consent for application permissions
- [ ] Test authentication with client_credentials flow

### Phase 2: Core Provisioning Script
- [ ] Implement minimal client_credentials authentication
- [ ] Create test user with Graph API
- [ ] Assign license to provision mailbox (if supported)
- [ ] Upload file to user's OneDrive
- [ ] Create mail item in user's mailbox
- [ ] Attempt Teams chat message creation

### Phase 3: Validation & Documentation  
- [ ] Verify authorship/attribution (From/CreatedBy) for created items
- [ ] Test Application Access Policies constraints
- [ ] Document security controls and limitations
- [ ] Performance and rate limiting assessment

### Phase 4: POC Report & Recommendations
- [ ] Document app-only vs delegated vs hybrid approaches
- [ ] Required Graph scopes and admin consent UX
- [ ] Security controls and tenant constraints
- [ ] Sample scripts and API request examples
- [ ] Implementation recommendations for MVP vs V1

## 🔬 Experiment Log

### Day 1: [Date]
*Experiments and findings will be documented here as we progress*

### Day 2: [Date]  
*Continue logging progress*

### Day 3: [Date]
*Final validation and report*

## 🎯 Success Criteria
- [ ] Clear determination: unattended background refresh feasibility with app-only credentials
- [ ] Documented trade-offs between app-only vs delegated vs hybrid approaches  
- [ ] Working example scripts with proper error handling
- [ ] Security assessment and tenant policy considerations
- [ ] Recommendation for Epic 1 implementation approach

## 📊 Impact on Backlog
**If POC succeeds**: Promote E1‑US2 (Admin Consent), E1‑US3 (Token Exchange & Storage), and E1‑US6 (Auto Refresh) for implementation in V1 or MVP.

**If POC identifies blockers**: Keep MVP focused on dashboard + login + mocked provisioning, schedule unattended provisioning for V1 with documented constraints.

---
**Related**: [provisioning-poc-plan.md](./provisioning-poc-plan.md)