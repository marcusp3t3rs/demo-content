# CI/CD Configuration Guide

## 🚀 GitHub Actions Pipeline

This repository includes a comprehensive CI/CD pipeline with multiple stages:

### Pipeline Jobs

1. **Code Quality** - Runs on every push/PR
   - ESLint linting
   - TypeScript type checking
   - Build verification
   - Artifact upload

2. **Security Scan** - Dependency vulnerability checks
   - npm audit for high/critical vulnerabilities
   - Security best practices validation

3. **Docker Build** - Container image creation (main branch only)
   - Multi-stage Docker build
   - Build caching for performance
   - Production-ready containers

4. **Deploy to Staging** - Preview deployments (PRs only)
   - Automatic Vercel deployment for PR previews
   - Environment isolation

5. **Deploy to Production** - Live deployment (main branch only)
   - Production Vercel deployment
   - Only after all quality gates pass

## 🔧 Required Secrets

Set these in GitHub repository settings → Secrets and variables → Actions:

### Vercel Deployment Secrets
```bash
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id  
VERCEL_PROJECT_ID=your_vercel_project_id
```

### Future: Azure Deployment Secrets
```bash
AZURE_CLIENT_ID=your_azure_client_id
AZURE_CLIENT_SECRET=your_azure_client_secret
AZURE_TENANT_ID=your_azure_tenant_id
```

## 🌍 Environment Setup

### Development
```bash
cd dashboard
cp .env.example .env.local
npm run dev
```

### Staging
- Automatic deployment on PR creation
- Uses staging environment variables
- Preview URL provided in PR comments

### Production  
- Automatic deployment on main branch push
- Uses production environment variables
- Live at production domain

## 📋 Local Testing

Run the same checks as CI:
```bash
cd dashboard

# Quality checks
npm run lint
npm run type-check
npm run build

# Security check
npm audit --audit-level high

# Docker build (optional)
docker build -t demoforge-dashboard .
```

## 🎯 Branch Protection

Recommended GitHub branch protection rules for `main`:

1. ✅ Require status checks to pass
   - Code Quality
   - Security Scan
2. ✅ Require branches to be up to date  
3. ✅ Require linear history
4. ✅ Include administrators

## 🚀 Deployment Workflow

1. **Feature Development**
   - Create feature branch
   - Develop & commit changes
   - CI runs on every push

2. **Pull Request**
   - Create PR to main
   - Staging deployment created
   - Review with preview URL

3. **Merge to Main**
   - All CI checks pass
   - Automatic production deployment
   - Live application updated

## 🔍 Monitoring

- **Build Status**: GitHub Actions tab
- **Security**: Dependabot alerts
- **Performance**: Vercel Analytics (when configured)
- **Uptime**: Production monitoring (Epic 5)