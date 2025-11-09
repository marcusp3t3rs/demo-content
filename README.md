# demo-content

## 🧭 Project Overview

The **Demo Content Project** aims to create a modular, tenant-ready service for generating and managing AI-powered demo content across industries and business functions.  
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

## 🧩 Next Steps

1. Extend `.devcontainer/devcontainer.json` when custom tooling or features are needed.  
2. Define folder structure for epics (`epic-1-tenant-setup`, `epic-2-function-layering`, etc.).  
3. Add sample scripts or notebooks to test tenant connections and content generation.  
4. Document setup and workflow for contributors as the codebase grows.

---

_This repository is designed to stay minimal until core modules (Epics 1–6) are defined and implemented._