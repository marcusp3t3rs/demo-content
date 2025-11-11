# ⚡️ DemoForge

> **Modular AI Demo Environment Framework for Microsoft Tenants**  
> Build, connect, and showcase intelligent demo content — effortlessly.

---

## 🧭 Project Overview

**DemoForge** is a modular, tenant-ready platform for generating and managing AI-powered demo content across industries and business functions.  
It enables teams to **forge reproducible demo environments** that connect to Microsoft tenants, layer functional and industry logic, and provision users and sample content automatically.

With DemoForge, you can:
- Connect securely to Microsoft 365 tenants  
- Layer business functions and industries modularly  
- Auto-provision demo users and content  
- Monitor usage and performance  
- Package and deploy reproducible environments  

---

## 🧱 Core Epics

| # | Epic | Status | Issue | Description |
|:-:|------|--------|-------|-------------|
| 0 | **[Admin Dashboard & App Shell](docs/epics/mvp/epic-0-admin-dashboard.md)** | 🟢 In Progress | [#10](https://github.com/marcusp3t3rs/demoforge/issues/10) | Entry point: auth, nav, connect CTA, status widgets |
| 1 | **[Tenant Connection & Setup](docs/epics/mvp/epic-1-tenant-connection.md)** | 🟢 In Refinement | [#1](https://github.com/marcusp3t3rs/demoforge/issues/1) | Secure onboarding & tenant authentication via OAuth 2.0 / Entra ID |
| 2 | **Function & Industry Layering** | ⚪ Planned | — | Modularly define business functions and industry logic |
| 3 | **Demo User Provisioning** | ⚪ Planned | — | Automatically create realistic demo personas and assign roles |
| 4 | **Content Generation** | ⚪ Planned | — | Generate AI-driven demo data, documents, and interactions |
| 5 | **Dashboard & Monitoring** | ⚪ Planned | — | Visualize system health, tenant status, and usage analytics |
| 6 | **Installation & Packaging** | ⚪ Planned | — | Deploy anywhere — locally, via Codespaces, or Azure |

📋 **[Complete MVP Backlog](docs/mvp-backlog.md)**

## 🧭 Service Overview

The **DemoForge Project** aims to create a modular, tenant-ready service for generating and managing AI-powered demo content across industries and business functions.  
It provides a foundation for building repeatable, installable demo environments that connect to Microsoft tenants, layer functional and industry-specific logic, and provision demo users and sample content automatically.

Ultimately, the goal is to deliver a **self-contained, reproducible environment** for demonstrating AI and Copilot scenarios — with clear separation between:
- **Tenant Connection & Setup**
- **Functional and Industry Layering**
- **Demo User Provisioning**
- **Content Generation**
- **Dashboard & Monitoring**
- **Installation & Packaging**

This repository is the **development workspace** for implementing those epics using a standardized dev container setup.

---

## ⚙️ Development Container

This repository relies on the Microsoft “universal” dev container image specified in `.devcontainer/devcontainer.json`:

```json
{"image": "mcr.microsoft.com/devcontainers/universal:2"}
```

That means the development environment is provided entirely by the container image.  
It includes common tools and runtimes (Node.js, Python, .NET, PowerShell, Git, etc.), so there are **no repository-level configuration files** like `package.json` or `pyproject.toml` at this stage.

When project-specific setup is required (e.g., installing packages, adding VS Code extensions, running post-create commands, or pinning tool versions), update `.devcontainer/devcontainer.json` or add a `Dockerfile` / devcontainer features to extend the environment.

For now, the minimal single-line devcontainer configuration is **intentional** — keeping the setup lightweight while focusing on architecture and content structure.

---

## 🧰 Tech Requirements

Developers contributing to this project should ensure the following:

### Prerequisites
- **VS Code** with the **Dev Containers** extension  
- **Docker Desktop** or a compatible container runtime  
- Optional: **GitHub Codespaces** for cloud-based development  

### Recommended Skills
- Familiarity with **TypeScript**, **Python**, or **Node.js**  
- Basic understanding of **Microsoft 365 tenants** and **Azure Active Directory**  
- Experience with **OpenAI / Azure OpenAI API** integrations  
- Comfort with **containerized development** (Dev Containers / Docker)  

### Optional Tools
- **Makefile** or simple shell scripts for automation  
- **Task runners** like `npm` or `poetry` once project-specific modules are added  
- **Prettier / ESLint / Black** for consistent code formatting  

---

## 🚀 Getting Started

### Development Setup
1. **Dashboard Application:**
   ```bash
   cd dashboard
   npm install
   cp .env.example .env.local
   npm run dev
   ```
   Navigate to [http://localhost:3000](http://localhost:3000)

2. **VS Code Development:**
   - Open in Dev Container for full environment
   - Install recommended extensions
   - Use integrated terminal for all commands

## 🔄 CI/CD Pipeline

### Automated Quality Gates
- ✅ **ESLint**: Code quality and style checking
- ✅ **TypeScript**: Type safety validation  
- ✅ **Build**: Production build verification
- ✅ **Security**: Dependency vulnerability scanning
- ✅ **Docker**: Container image building

### Deployment Strategy
- 🔄 **Pull Requests**: Auto-deploy to staging for preview
- 🚀 **Main Branch**: Auto-deploy to production
- 📋 **Quality Gates**: All checks must pass before deployment

**CI/CD Documentation:** [.github/CICD.md](.github/CICD.md)

## 🧩 Next Steps

1. ✅ ~~Define folder structure for epics~~ → **Complete** (`docs/epics/mvp/` and `docs/epics/v1/` created)
2. ✅ ~~Create Epic 0 & Epic 1 documentation~~ → **Complete** ([Epic 0](docs/epics/mvp/epic-0-admin-dashboard.md) + [Epic 1](docs/epics/mvp/epic-1-tenant-connection.md))
3. ✅ ~~E0-US0 Initial Setup~~ → **Complete** (Next.js dashboard running)
4. 🚀 **Current Focus:** Epic 0 development (E0-US1 App Shell & Navigation next)
5. **Next:** Complete Epic 0, then Epic 1 (Microsoft Entra ID integration)
6. **Next:** Joint V1 planning and go-to-market features

---

## 📋 Documentation Structure

**MVP Planning:**
- 📋 [MVP Backlog](docs/mvp-backlog.md) - Complete epic overview and user stories
- � [MVP Epics](docs/epics/mvp/) - Detailed epic documentation and implementation plans

**V1 Planning:**
- 📁 [V1 Epics](docs/epics/v1/) - Future V1 epics (planned jointly)

_This repository follows a structured approach: MVP foundation first, then collaborative V1 planning._