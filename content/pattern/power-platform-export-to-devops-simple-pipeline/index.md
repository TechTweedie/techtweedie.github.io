---
title: "Power Platform EXPORT to DevOps - Simple Pipeline"
description: "A comprehensive guide to implementing a simple yet effective DevOps pipeline for Power Platform solutions using Azure DevOps, including automated solution export, version control, and deployment strategies."
tags:
  - Power Platform
  - Azure DevOps
  - DevOps
  - CI/CD
  - Solution Management
categories:
  - Power Platform
  - Azure DevOps
date: 2026-03-10T00:00:00+01:00
publishDate: 2026-03-10T00:00:00+01:00
lastmod: 2026-03-10T00:00:00+01:00
author: "itweedie"
authorLink: "https://iantweedie.biz"
resources:
- name: "featured-image"
  src: "thin.png"
- name: "featured-image-preview"
  src: "large.png"
lightgallery: true
mermaid: true
draft: false
---

{{< alert type="info" >}}
**📋 REUSABLE PATTERN**  
This document provides a proven, reusable pattern for implementing Power Platform DevOps pipelines. Use this template to standardize your solution export and version control processes across your organization.
{{< /alert >}}

## Pattern Summary

**Pattern Name**: Power Platform Solution Export Pipeline  
**Category**: DevOps & CI/CD  
**Platform**: Azure DevOps + Power Platform  
**Difficulty**: Beginner to Intermediate  
**Time to Implement**: 1-2 hours  

### What This Pattern Solves

- Manual solution exports prone to human error
- Lack of version control for Power Platform solutions  
- Inconsistent deployment processes across environments
- No audit trail for solution changes
- Difficulty collaborating on Power Platform development

### Pattern Outcomes

After implementing this pattern, you will have:

✅ **Automated solution exports** from your development environment  
✅ **Version-controlled source code** for all solution components  
✅ **Consistent deployment artifacts** (managed & unmanaged solutions)  
✅ **Environment-specific settings** files for configuration management  
✅ **Audit trail** of all solution changes through Git history  

## Pattern Overview

This pattern demonstrates how to implement a simple yet effective DevOps pipeline for Power Platform solutions using Azure DevOps. The pipeline automates the export of solutions from your development environment, manages version control, and prepares your solutions for deployment across multiple environments.

## What This Pipeline Does

{{< mermaid align="center" >}}
flowchart TD
    A[Manual Trigger] --> B[Checkout Code]
    B --> C[Install Power Platform Tools]
    C --> D[Set Solution Version]
    D --> E[Export Managed Solution]
    E --> F[Export Unmanaged Solution]
    F --> G[Unpack Solution]
    G --> H[Create Settings File]
    H --> I[Commit & Push to Git]
    
    style A fill:#e1f5fe
    style I fill:#c8e6c9
{{< /mermaid >}}

## Prerequisites

Before implementing this pipeline, ensure you have:

- **Azure DevOps Organization** with appropriate permissions
- **Power Platform Environment** (Development/Source)
- **Service Principal** configured for Power Platform authentication
- **Git Repository** for solution source control
- **Power Platform Build Tools** extension installed in Azure DevOps

## Pipeline Configuration

### Variables

The pipeline uses two key variables that you need to customize:

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `varPowerPlatformSPN` | Service connection name for Power Platform authentication | `Dataverse - Backup` |
| `varSolutionName` | Name of the solution to export | `ProjectExpenseLogger` |

### Pipeline Steps Explained

{{< mermaid >}}
sequenceDiagram
    participant ADO as Azure DevOps
    participant PP as Power Platform
    participant Git as Git Repository
    
    ADO->>ADO: Install Power Platform Tools
    ADO->>PP: Set Solution Version
    Note over PP: Version: 1.0.0.{BuildID}
    ADO->>PP: Export Managed Solution
    ADO->>PP: Export Unmanaged Solution
    ADO->>ADO: Unpack Solution Files
    ADO->>ADO: Generate Settings File
    ADO->>Git: Commit All Changes
    ADO->>Git: Push to Repository
{{< /mermaid >}}

## Complete Pipeline YAML

```yaml
name: EXPORT $(TeamProject)_$(BuildDefinitionName)_$(SourceBranchName)_$(Date:yyyyMMdd)$(Rev:.r)

variables:
  - name: varPowerPlatformSPN
   # value: YOUR-OWN-VALUE-HERE 
    value: Dataverse - Backup
  - name: varSolutionName
   # value: YOUR-OWN-VALUE-HERE
    value: ProjectExpenseLogger

trigger: none

pool:
  vmImage: 'windows-latest'

steps:
- checkout: self
  persistCredentials: true
  clean: true
- task: PowerPlatformToolInstaller@2
  inputs:
    DefaultVersion: true
    AddToolsToPath: true
- task: PowerPlatformSetSolutionVersion@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    SolutionName: '$(varSolutionName)'
    SolutionVersionNumber: '1.0.0.$(Build.BuildID)'
- task: PowerPlatformExportSolution@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    SolutionName: '$(varSolutionName)'
    SolutionOutputFile: '$(Build.SourcesDirectory)\solutions\$(varSolutionName)_1.0.0.$(Build.BuildID)_managed.zip'
    Managed: true
    AsyncOperation: true
    MaxAsyncWaitTime: '60'
- task: PowerPlatformExportSolution@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    SolutionName: '$(varSolutionName)'
    SolutionOutputFile: '$(Build.SourcesDirectory)\solutions\$(varSolutionName)_1.0.0.$(Build.BuildID).zip'
    Managed: false
    AsyncOperation: true
    MaxAsyncWaitTime: '60'
- task: PowerPlatformUnpackSolution@2
  inputs:
    SolutionInputFile: '$(Build.SourcesDirectory)\solutions\$(varSolutionName)_1.0.0.$(Build.BuildID).zip'
    SolutionTargetFolder: '$(Build.SourcesDirectory)\solutions\src\$(varSolutionName)'
    SolutionType: 'Both'
- task: PowerShell@2
  inputs:
    targetType: 'inline'
    script: 'pac solution create-settings --solution-zip $(Build.SourcesDirectory)\solutions\$(varSolutionName)_1.0.0.$(Build.BuildID).zip --settings-file $(Build.SourcesDirectory)\solutions\$(varSolutionName)-settings.json'

- task: CmdLine@2
  inputs:
    script: |
      echo commit all changes
      git config user.email "$(Build.RequestedForEmail)"
      git config user.name "$(Build.RequestedFor)"
      git checkout -b main
      git add --all
      git commit -m "Latest solution changes."
      echo push code to new repo
      git -c http.extraheader="AUTHORIZATION: bearer $(System.AccessToken)" push origin main   
```

## Step-by-Step Breakdown

### 1. Repository Setup
```yaml
- checkout: self
  persistCredentials: true
  clean: true
```
- **Purpose**: Ensures we have access to the repository with credentials to push changes back
- **persistCredentials**: Enables the pipeline to push changes to Git
- **clean**: Starts with a clean working directory

### 2. Tool Installation
```yaml
- task: PowerPlatformToolInstaller@2
  inputs:
    DefaultVersion: true
    AddToolsToPath: true
```
- **Purpose**: Installs the Power Platform CLI tools needed for solution management
- **DefaultVersion**: Uses the latest stable version
- **AddToolsToPath**: Makes tools available throughout the pipeline

### 3. Version Management
```yaml
- task: PowerPlatformSetSolutionVersion@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    SolutionName: '$(varSolutionName)'
    SolutionVersionNumber: '1.0.0.$(Build.BuildID)'
```
- **Purpose**: Sets a unique version number for the solution using the build ID
- **Pattern**: `1.0.0.{BuildNumber}` ensures each export has a unique version
- **Benefits**: Enables proper version tracking and rollback capabilities

### 4. Solution Export (Managed)
```yaml
- task: PowerPlatformExportSolution@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    SolutionName: '$(varSolutionName)'
    SolutionOutputFile: '$(Build.SourcesDirectory)\solutions\$(varSolutionName)_1.0.0.$(Build.BuildID)_managed.zip'
    Managed: true
    AsyncOperation: true
    MaxAsyncWaitTime: '60'
```
- **Purpose**: Exports the managed version of the solution for production deployments
- **Managed Solutions**: Cannot be modified after import, ideal for production
- **AsyncOperation**: Handles large solutions that take time to export
- **File Naming**: Includes version number for easy identification

### 5. Solution Export (Unmanaged)
```yaml
- task: PowerPlatformExportSolution@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    SolutionName: '$(varSolutionName)'
    SolutionOutputFile: '$(Build.SourcesDirectory)\solutions\$(varSolutionName)_1.0.0.$(Build.BuildID).zip'
    Managed: false
    AsyncOperation: true
    MaxAsyncWaitTime: '60'
```
- **Purpose**: Exports the unmanaged version for development/testing environments
- **Unmanaged Solutions**: Can be modified after import, useful for development
- **Use Case**: Development and UAT environment deployments

### 6. Solution Unpacking
```yaml
- task: PowerPlatformUnpackSolution@2
  inputs:
    SolutionInputFile: '$(Build.SourcesDirectory)\solutions\$(varSolutionName)_1.0.0.$(Build.BuildID).zip'
    SolutionTargetFolder: '$(Build.SourcesDirectory)\solutions\src\$(varSolutionName)'
    SolutionType: 'Both'
```
- **Purpose**: Unpacks the solution into individual files for version control
- **Benefits**: 
  - Enables file-by-file tracking of changes
  - Supports merge conflict resolution
  - Provides visibility into solution components
  - Enables collaborative development

### 7. Settings File Generation
```yaml
- task: PowerShell@2
  inputs:
    targetType: 'inline'
    script: 'pac solution create-settings --solution-zip $(Build.SourcesDirectory)\solutions\$(varSolutionName)_1.0.0.$(Build.BuildID).zip --settings-file $(Build.SourcesDirectory)\solutions\$(varSolutionName)-settings.json'
```
- **Purpose**: Creates a settings file that can be used to configure environment-specific settings
- **Use Case**: Different connection strings, URLs, or configurations per environment
- **Format**: JSON file containing deployment settings

### 8. Git Operations
```yaml
- task: CmdLine@2
  inputs:
    script: |
      echo commit all changes
      git config user.email "$(Build.RequestedForEmail)"
      git config user.name "$(Build.RequestedFor)"
      git checkout -b main
      git add --all
      git commit -m "Latest solution changes."
      echo push code to new repo
      git -c http.extraheader="AUTHORIZATION: bearer $(System.AccessToken)" push origin main
```
- **Purpose**: Commits all exported and unpacked files to the repository
- **Process**:
  1. Configures Git with the build requester's identity
  2. Switches to main branch
  3. Stages all changes
  4. Creates a commit with descriptive message
  5. Pushes changes back to the repository

## Architecture Overview

{{< mermaid >}}
graph TB
    subgraph "Development Environment"
        Dev[Power Platform Dev Environment]
        Sol[Solution: ProjectExpenseLogger]
    end
    
    subgraph "Azure DevOps"
        Pipeline[Export Pipeline]
        Artifacts[Build Artifacts]
    end
    
    subgraph "Git Repository"
        Source[Source Code]
        Managed[Managed Solutions]
        Settings[Settings Files]
    end
    
    subgraph "Target Environments"
        Test[Test Environment]
        UAT[UAT Environment]
        Prod[Production Environment]
    end
    
    Dev --> Pipeline
    Pipeline --> Artifacts
    Pipeline --> Source
    Pipeline --> Managed
    Pipeline --> Settings
    
    Managed --> Test
    Managed --> UAT
    Managed --> Prod
    
    Source --> Test
    Settings --> Test
    Settings --> UAT
    Settings --> Prod
    
    style Dev fill:#e3f2fd
    style Pipeline fill:#fff3e0
    style Source fill:#e8f5e8
    style Prod fill:#fce4ec
{{< /mermaid >}}

## Benefits of This Approach

### Version Control
- **Complete History**: Track every change to your Power Platform solution
- **Branching**: Support multiple developers working on different features
- **Rollback**: Easy to revert to previous versions when needed
- **Compliance**: Audit trail for regulatory requirements

### Automated Exports
- **Consistency**: Same export process every time
- **Scheduled**: Can be triggered manually or on schedule
- **Reliable**: Reduces human error in export process
- **Efficient**: Saves developer time

### Multi-Environment Support
- **Managed Solutions**: For production deployments
- **Unmanaged Solutions**: For development/testing
- **Settings Files**: Environment-specific configurations
- **Artifacts**: Versioned deployment packages

## File Structure After Export

```
/solutions/
├── ProjectExpenseLogger_1.0.0.123_managed.zip    # Managed solution
├── ProjectExpenseLogger_1.0.0.123.zip             # Unmanaged solution
├── ProjectExpenseLogger-settings.json             # Deployment settings
└── src/
    └── ProjectExpenseLogger/                       # Unpacked source
        ├── CanvasApps/
        ├── Entities/
        ├── OptionSets/
        ├── Roles/
        ├── Workflows/
        └── Other/
```

## Next Steps

Once you have this export pipeline working, consider adding:

1. **Import Pipeline**: Automate deployment to test environments
2. **Solution Checker**: Validate solution quality automatically  
3. **Environment Variables**: Better configuration management
4. **Approval Gates**: Control production deployments
5. **Notifications**: Alert teams of successful exports/deployments

## Common Issues and Solutions

### Authentication Problems
- Verify Service Principal has correct permissions
- Check Power Platform Service Connection configuration
- Ensure SPN has System Administrator role in target environment

### Solution Export Failures
- Check solution dependencies are included
- Verify solution exists in the source environment
- Increase MaxAsyncWaitTime for large solutions

### Git Push Issues
- Ensure pipeline has Contribute permissions to repository
- Check branch policies don't block automated commits
- Verify System.AccessToken is available to the pipeline

## Customization Options

### Variable Modifications
```yaml
variables:
  - name: varEnvironmentUrl
    value: https://yourorg.crm.dynamics.com
  - name: varBranchName
    value: $(Build.SourceBranchName)
  - name: varVersionMajor
    value: 1
  - name: varVersionMinor
    value: 0
```

### Advanced Version Numbering
```yaml
SolutionVersionNumber: '$(varVersionMajor).$(varVersionMinor).$(Build.BuildID).$(Rev:r)'
```

### Multiple Solutions Export
Duplicate the export tasks for each solution you want to include in your pipeline.

This pattern provides a solid foundation for Power Platform DevOps practices and can be extended based on your specific organizational needs.

## Pattern Implementation Checklist

Use this checklist to ensure successful implementation:

### Before You Start

- [ ] Azure DevOps organization with admin access
- [ ] Power Platform development environment
- [ ] Service Principal created and configured
- [ ] Git repository prepared for solution storage
- [ ] Power Platform Build Tools extension installed

### Implementation Steps  

- [ ] Create new Azure DevOps pipeline
- [ ] Configure variables (varPowerPlatformSPN, varSolutionName)
- [ ] Set up service connection to Power Platform
- [ ] Copy and customize the YAML pipeline code
- [ ] Test pipeline execution with a sample solution
- [ ] Verify Git commits and solution artifacts
- [ ] Document pipeline for team use

### After Implementation

- [ ] Train team on pipeline usage
- [ ] Establish solution naming conventions  
- [ ] Set up monitoring and notifications
- [ ] Plan for import/deployment pipelines
- [ ] Regular pipeline maintenance and updates

## Related Patterns

Consider implementing these complementary patterns:

- **Power Platform Import Pipeline** - Deploy solutions to target environments
- **Solution Checker Integration** - Automated quality validation
- **Environment Variable Management** - Configuration across environments
- **Approval Gates Pattern** - Control production deployments
- **Multi-Solution Pipeline** - Handle multiple solutions in one pipeline

---

*This pattern is part of a comprehensive Power Platform DevOps pattern library. For more patterns and best practices, visit our pattern collection.*