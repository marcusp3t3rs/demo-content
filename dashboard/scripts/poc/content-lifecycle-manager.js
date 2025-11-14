/**
 * POC Content Lifecycle Manager
 * 
 * Tracks created content for systematic cleanup when users disconnect.
 * This addresses the critical Epic 1 requirement for clean tenant disconnection.
 */

const fs = require('fs');
const path = require('path');

/**
 * Content record for tracking created resources
 * @typedef {Object} ContentRecord
 * @property {string} id
 * @property {string} tenantId
 * @property {string} demoSessionId
 * @property {'user'|'file'|'email'|'chat'|'team'|'license'} resourceType
 * @property {string} resourceId
 * @property {string} [parentResourceId]
 * @property {string} graphApiEndpoint
 * @property {string} displayName
 * @property {string} createdAt
 * @property {any} metadata
 */

/**
 * Demo session for tracking POC demonstrations
 * @typedef {Object} DemoSession
 * @property {string} sessionId
 * @property {string} tenantId
 * @property {string} startedAt
 * @property {'active'|'completed'|'cleaning'|'cleaned'} status
 * @property {number} totalResources
 * @property {number} cleanedResources
 * @property {ContentRecord[]} resources
 */

class ContentLifecycleManager {
  constructor(trackingFilePath) {
    this.trackingFile = trackingFilePath || path.join(__dirname, 'poc-content-tracking.json');
    this.sessions = new Map();
    this.loadTracking();
  }

  loadTracking() {
    try {
      if (fs.existsSync(this.trackingFile)) {
        const data = fs.readFileSync(this.trackingFile, 'utf8');
        const parsed = JSON.parse(data);
        this.sessions = new Map();
        for (const [sessionId, session] of Object.entries(parsed)) {
          this.sessions.set(sessionId, session);
        }
      }
    } catch (error) {
      console.error('Error loading tracking data:', error.message);
    }
  }

  saveTracking() {
    try {
      fs.writeFileSync(this.trackingFile, JSON.stringify(Object.fromEntries(this.sessions), null, 2));
    } catch (error) {
      console.error('Error saving tracking data:', error.message);
    }
  }

  startDemoSession(tenantId) {
    const sessionId = `demo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const session = {
      sessionId,
      tenantId,
      startedAt: new Date().toISOString(),
      status: 'active',
      totalResources: 0,
      cleanedResources: 0,
      resources: []
    };

    this.sessions.set(sessionId, session);
    this.saveTracking();

    console.log(`🚀 Started demo session: ${sessionId} for tenant: ${tenantId}`);
    return sessionId;
  }

  trackResource(
    sessionId,
    resourceType,
    resourceId,
    displayName,
    graphApiEndpoint,
    parentResourceId,
    metadata
  ) {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    const record = {
      id: `${resourceType}-${resourceId}-${Date.now()}`,
      tenantId: session.tenantId,
      demoSessionId: sessionId,
      resourceType,
      resourceId,
      parentResourceId,
      graphApiEndpoint,
      displayName,
      createdAt: new Date().toISOString(),
      metadata: metadata || {}
    };

    session.resources.push(record);
    session.totalResources = session.resources.length;
    this.saveTracking();

    console.log(`📝 Tracked ${resourceType}: ${displayName} (${resourceId})`);
  }

  getSessionResources(sessionId) {
    const session = this.sessions.get(sessionId);
    return session ? session.resources : [];
  }

  getAllActiveSessions() {
    return Array.from(this.sessions.values()).filter(s => s.status === 'active');
  }

  getSessionsByTenant(tenantId) {
    return Array.from(this.sessions.values()).filter(s => s.tenantId === tenantId);
  }

  generateCleanupPlan(sessionId) {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    const resources = new Map();
    const warnings = [];

    // Define cleanup order (most dependent first)
    const cleanupOrder = ['file', 'email', 'chat', 'license', 'user', 'team'];
    
    // Initialize resource groups
    cleanupOrder.forEach(type => {
      resources.set(type, []);
    });

    // Group resources by type
    session.resources.forEach(resource => {
      if (!resources.has(resource.resourceType)) {
        resources.set(resource.resourceType, []);
        warnings.push(`Unknown resource type: ${resource.resourceType}`);
      }
      resources.get(resource.resourceType).push(resource);
    });

    // Check for potential issues
    const userResources = resources.get('user') || [];
    const licenseResources = resources.get('license') || [];
    
    if (userResources.length > 0 && licenseResources.length === 0) {
      warnings.push('Users found without tracked licenses - may leave orphaned assignments');
    }

    return {
      order: cleanupOrder,
      resources,
      warnings
    };
  }

  previewCleanup(sessionId) {
    const plan = this.generateCleanupPlan(sessionId);
    
    console.log(`\n🧹 Cleanup Preview for Session: ${sessionId}`);
    console.log('='.repeat(50));
    
    plan.order.forEach(resourceType => {
      const items = plan.resources.get(resourceType) || [];
      if (items.length > 0) {
        console.log(`\n${resourceType.toUpperCase()} (${items.length} items):`);
        items.forEach(item => {
          console.log(`  • ${item.displayName} (${item.resourceId})`);
        });
      }
    });

    if (plan.warnings.length > 0) {
      console.log('\n⚠️  Warnings:');
      plan.warnings.forEach(warning => console.log(`  • ${warning}`));
    }
  }

  async executeCleanup(sessionId, accessToken, dryRun = true) {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    const plan = this.generateCleanupPlan(sessionId);
    session.status = 'cleaning';
    this.saveTracking();

    console.log(`\n${dryRun ? '🧪 DRY RUN' : '🧹 EXECUTING'} Cleanup for Session: ${sessionId}`);
    console.log('='.repeat(60));

    let cleanedCount = 0;

    for (const resourceType of plan.order) {
      const items = plan.resources.get(resourceType) || [];
      
      for (const item of items) {
        try {
          if (dryRun) {
            console.log(`[DRY RUN] Would delete ${resourceType}: ${item.displayName}`);
          } else {
            // Here you would make the actual Graph API DELETE request
            console.log(`[LIVE] Deleting ${resourceType}: ${item.displayName}`);
            // await fetch(item.graphApiEndpoint, {
            //   method: 'DELETE',
            //   headers: { 'Authorization': `Bearer ${accessToken}` }
            // });
          }
          cleanedCount++;
        } catch (error) {
          console.error(`❌ Failed to clean ${resourceType} ${item.resourceId}:`, error.message);
        }
      }
    }

    session.cleanedResources = cleanedCount;
    session.status = dryRun ? 'active' : 'cleaned';
    this.saveTracking();

    console.log(`\n✅ Cleanup ${dryRun ? 'preview' : 'execution'} completed: ${cleanedCount} resources processed`);
  }

  completeDemoSession(sessionId) {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.status = 'completed';
      this.saveTracking();
      console.log(`✅ Demo session completed: ${sessionId}`);
    }
  }

  // Integration helpers for POC scripts
  static createForPOC() {
    return new ContentLifecycleManager(path.join(__dirname, 'poc-content-tracking.json'));
  }

  exportSummary() {
    const summary = {
      totalSessions: this.sessions.size,
      activeSessions: Array.from(this.sessions.values()).filter(s => s.status === 'active').length,
      totalResources: Array.from(this.sessions.values()).reduce((sum, s) => sum + s.totalResources, 0),
      resourcesByType: {},
      tenants: new Set()
    };

    Array.from(this.sessions.values()).forEach(session => {
      summary.tenants.add(session.tenantId);
      
      session.resources.forEach(resource => {
        if (!summary.resourcesByType[resource.resourceType]) {
          summary.resourcesByType[resource.resourceType] = 0;
        }
        summary.resourcesByType[resource.resourceType]++;
      });
    });

    return {
      ...summary,
      tenants: Array.from(summary.tenants)
    };
  }
}

// Example usage for POC integration
async function demonstrateContentTracking() {
  console.log('🧪 POC Content Lifecycle Management Demo');
  console.log('='.repeat(50));

  const manager = ContentLifecycleManager.createForPOC();
  
  // Start a demo session
  const sessionId = manager.startDemoSession('0e812be8-3f9b-4e74-8461-98b684e5cf1f');
  
  // Track some example resources (as would be done during POC)
  manager.trackResource(
    sessionId,
    'user',
    '882a1861-6dad-4df2-92a8-c4c7fcb29151',
    'POC Licensed User 1763118073715',
    'https://graph.microsoft.com/v1.0/users/882a1861-6dad-4df2-92a8-c4c7fcb29151',
    undefined,
    { license: 'DEVELOPERPACK_E5', createdInPhase: '2B' }
  );

  manager.trackResource(
    sessionId,
    'license',
    'DEVELOPERPACK_E5_882a1861-6dad-4df2-92a8-c4c7fcb29151',
    'E5 Developer License Assignment',
    'https://graph.microsoft.com/v1.0/users/882a1861-6dad-4df2-92a8-c4c7fcb29151/assignLicense',
    '882a1861-6dad-4df2-92a8-c4c7fcb29151',
    { skuId: 'DEVELOPERPACK_E5', assignedAt: new Date().toISOString() }
  );

  // Preview cleanup
  manager.previewCleanup(sessionId);
  
  // Dry run cleanup
  await manager.executeCleanup(sessionId, 'mock-token', true);
  
  // Export summary
  console.log('\n📊 Content Tracking Summary:');
  console.log(JSON.stringify(manager.exportSummary(), null, 2));
}

// Run demo if executed directly
if (require.main === module) {
  demonstrateContentTracking().catch(console.error);
}

module.exports = { ContentLifecycleManager };