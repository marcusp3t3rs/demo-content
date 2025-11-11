#!/bin/bash

# Project Board Sync Script
# Syncs GitHub issue states with project board status
# Usage: ./sync-project-status.sh [mvp|v1|all]

set -e

# Project configurations
MVP_PROJECT_ID="PVT_kwHOBcvPe84BHzw0"
V1_PROJECT_ID="PVT_kwHOBcvPe84BHzxg"
STATUS_FIELD_ID="PVTSSF_lAHOBcvPe84BHzw0zg4dEuo"
DONE_OPTION_ID="98236657"
TODO_OPTION_ID="f75ad846"
OWNER="marcusp3t3rs"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if GitHub CLI is authenticated
check_auth() {
    if ! gh auth status &>/dev/null; then
        log_error "GitHub CLI not authenticated. Please run 'gh auth login' first."
        exit 1
    fi
    
    log_success "GitHub CLI authenticated"
}

# Sync closed issues to Done status for a specific project
sync_project_closed_to_done() {
    local project_num=$1
    local project_id=$2
    local label_filter=$3
    
    log_info "Syncing closed issues to Done status in Project $project_num..."
    
    # Get all closed issues with the specified label
    local closed_issues
    if [ "$label_filter" != "" ]; then
        closed_issues=$(gh issue list --state closed --label "$label_filter" --json number,title --jq '.[].number')
    else
        closed_issues=$(gh issue list --state closed --json number,title --jq '.[].number')
    fi
    
    local synced_count=0
    
    for issue_num in $closed_issues; do
        # Get project item details
        local item_info=$(gh project item-list $project_num --owner $OWNER --format json | \
            jq -r ".items[] | select(.content.number == $issue_num) | {id: .id, status: .status, title: .title}")
        
        if [ "$item_info" != "" ] && [ "$item_info" != "null" ]; then
            local item_id=$(echo "$item_info" | jq -r '.id')
            local current_status=$(echo "$item_info" | jq -r '.status')
            local title=$(echo "$item_info" | jq -r '.title')
            
            if [ "$current_status" != "Done" ]; then
                log_info "Moving #$issue_num ($title) to Done status..."
                
                if gh project item-edit --id "$item_id" \
                    --project-id "$project_id" \
                    --field-id "$STATUS_FIELD_ID" \
                    --single-select-option-id "$DONE_OPTION_ID" &>/dev/null; then
                    
                    log_success "Synced #$issue_num to Done"
                    ((synced_count++))
                else
                    log_error "Failed to sync #$issue_num"
                fi
            else
                log_info "Issue #$issue_num already in Done status"
            fi
        fi
    done
    
    log_success "Synced $synced_count items in Project $project_num"
}

# Sync open issues to Todo status for a specific project  
sync_project_open_to_todo() {
    local project_num=$1
    local project_id=$2
    local label_filter=$3
    
    log_info "Syncing open issues to Todo status in Project $project_num..."
    
    # Get all open issues with the specified label
    local open_issues
    if [ "$label_filter" != "" ]; then
        open_issues=$(gh issue list --state open --label "$label_filter" --json number,title --jq '.[].number')
    else
        open_issues=$(gh issue list --state open --json number,title --jq '.[].number') 
    fi
    
    local synced_count=0
    
    for issue_num in $open_issues; do
        # Get project item details
        local item_info=$(gh project item-list $project_num --owner $OWNER --format json | \
            jq -r ".items[] | select(.content.number == $issue_num) | {id: .id, status: .status, title: .title}")
        
        if [ "$item_info" != "" ] && [ "$item_info" != "null" ]; then
            local item_id=$(echo "$item_info" | jq -r '.id')
            local current_status=$(echo "$item_info" | jq -r '.status')
            local title=$(echo "$item_info" | jq -r '.title')
            
            if [ "$current_status" == "Done" ]; then
                log_info "Moving #$issue_num ($title) to Todo status..."
                
                if gh project item-edit --id "$item_id" \
                    --project-id "$project_id" \
                    --field-id "$STATUS_FIELD_ID" \
                    --single-select-option-id "$TODO_OPTION_ID" &>/dev/null; then
                    
                    log_success "Synced #$issue_num to Todo"
                    ((synced_count++))
                else
                    log_error "Failed to sync #$issue_num"
                fi
            fi
        fi
    done
    
    log_success "Synced $synced_count items in Project $project_num"
}

# Main sync function
sync_project() {
    local target=$1
    
    case $target in
        "mvp")
            log_info "Syncing MVP Project Board..."
            sync_project_closed_to_done 1 "$MVP_PROJECT_ID" "mvp"
            sync_project_open_to_todo 1 "$MVP_PROJECT_ID" "mvp"
            ;;
        "v1")
            log_info "Syncing V1 Project Board..."
            sync_project_closed_to_done 2 "$V1_PROJECT_ID" "v1"
            sync_project_open_to_todo 2 "$V1_PROJECT_ID" "v1"
            ;;
        "all")
            log_info "Syncing All Project Boards..."
            sync_project "mvp"
            sync_project "v1"
            ;;
        *)
            log_error "Invalid target. Use: mvp, v1, or all"
            echo "Usage: $0 [mvp|v1|all]"
            exit 1
            ;;
    esac
}

# Main script
main() {
    local target=${1:-"all"}
    
    echo -e "${BLUE}🔄 Project Board Sync Script${NC}"
    echo "================================"
    
    check_auth
    sync_project "$target"
    
    echo "================================"
    log_success "Sync completed successfully!"
}

# Run main function with all arguments
main "$@"