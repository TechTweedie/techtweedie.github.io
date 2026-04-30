---
title: "Power Platform EXPORT to DevOps - Complex Pipeline"
description: "A comprehensive guide to implementing a complex and robust DevOps pipeline for Power Platform solutions using Azure DevOps, including automated export of multiple solutions, documentation generation, and version control."
tags:
  - Power Platform
  - Azure DevOps
  - DevOps
  - CI/CD
  - Solution Management
  - Complex Pipeline
categories:
  - Power Platform
  - Azure DevOps
menu: 
  pattern:
    name: Export to ADO (Complex)
    identifier: export-to-devops-complex
    parent: ppcicd
    weight: 15
date: 2026-04-30T12:00:00+01:00
publishDate: 2026-04-30T12:00:00+01:00
lastmod: 2026-04-30T12:00:00+01:00
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
aliases:
  - /pattern/power-platform-export-to-devops-complex-pipeline/
---

{{< alert type="info" >}}
**📋 REUSABLE PATTERN**  
This document provides a proven, reusable pattern for implementing advanced Power Platform DevOps pipelines. Use this template to standardize and automate complex solution export, documentation, and version control processes.
{{< /alert >}}

## Pattern Summary

**Pattern Name**: Power Platform Complex Solution Export Pipeline  
**Category**: DevOps & CI/CD  
**Platform**: Azure DevOps + Power Platform  
**Difficulty**: Intermediate to Advanced  
**Time to Implement**: 2-4 hours  

### What This Pattern Solves

- Managing multiple interdependent solutions in a single pipeline.
- Automating the export of Power Platform Portals and reference data.
- Generating solution documentation automatically.
- Cleaning up the repository before processing new solution versions.
- Committing all unpacked solution components, portal data, and documentation to a new branch.

### Pattern Outcomes

After implementing this pattern, you will have:

✅ **Fully automated export** for multiple solutions, portals, and data.  
✅ **Version-controlled source code** for all solution components, including portals.  
✅ **Automated documentation generation** for tables, relationships, and security roles.  
✅ **Consistent build artifacts** published for deployment pipelines.  
✅ **A clean, auditable Git history** with a dedicated branch for each build.

## Pattern Overview

This pattern details a complex Azure DevOps pipeline designed for sophisticated Power Platform ALM scenarios. It handles the export of multiple solutions, downloads portal data, exports reference data, generates technical documentation, and commits everything to a new Git branch. This is ideal for large projects with multiple solution layers and a need for automated documentation.

## What This Pipeline Does

{{< mermaid align="center" >}}
flowchart TD
    A[Manual Trigger] --> B[Checkout & Clean]
    B --> C[Install Tools]
    C --> D{For Each Solution}
    D -- Loop 1-4 --> E[Set Version]
    E --> F[Export Managed & Unmanaged]
    F --> G[Run Checker]
    G --> H[Unpack Solution]
    H --> D
    D -- Done --> I[Handle Portal & Data]
    I --> J[Generate Documentation]
    J --> K[Commit & Push to Git]
    K --> L[Publish Artifacts]
    
    style A fill:#e1f5fe
    style L fill:#c8e6c9
{{< /mermaid >}}

## Prerequisites

Before implementing this pipeline, ensure you have:

- **Azure DevOps Organization** with appropriate permissions.
- **Power Platform Environment** (Development/Source).
- **Service Principal** with required permissions for all operations.
- **Git Repository** for solution source control.
- **Power Platform Build Tools** extension installed in Azure DevOps.
- **Third-party documentation generation tools** (e.g., `mightora-powerplatform-documentationgenerator-erdiagram`, `documentSolutionTables`) installed or available.
- A **Personal Access Token (PAT)** with Code (Read & write) permissions for committing to the wiki.

## Pipeline Configuration

### Variables

The pipeline relies on several variables to manage solution names, environment details, and other configurations. These should be configured in the pipeline's variable settings in Azure DevOps.

This pipeline is designed to be run against a development environment to export multiple solutions, check them, unpack them, and commit them to source control.

```yaml
name: $(TeamProject)_$(BuildDefinitionName)_$(SourceBranchName)_$(Date:yyyyMMdd)$(Rev:.r)

variables:
  - name: varPowerPlatformSPN
    value: <your-service-principal-name>
  - name: varSolutionName
    value: <your-solution-name-1>
  - name: varSolutionName2
    value: <your-solution-name-2>
  - name: varSolutionName3
    value: <your-solution-name-3>
  - name: varSolutionName4
    value: <your-solution-name-4>
  - name: varWebsiteId
    value: <your-portal-website-id>
  - name: varEnvironmentURL
    value: <your-environment-url>

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

## Clean out wiki

- task: PowerShell@2
  displayName: 'Clean wiki-output directory'
  inputs:
    targetType: 'inline'
    script: |
      $outputDir = "$(Build.SourcesDirectory)\wiki-output\"
      if (Test-Path $outputDir) {
          Remove-Item -Path $outputDir -Recurse -Force
          Write-Output "Cleaned directory: $outputDir"
      } else {
          Write-Output "Directory does not exist: $outputDir"
      }
- task: PowerShell@2
  displayName: 'Clean wiki-docx-output directory except template.docx'
  inputs:
    targetType: 'inline'
    script: |
      $outputDir = "$(Build.SourcesDirectory)\wiki-docx-output\"
      $templateFile = "$(Build.SourcesDirectory)\wiki-docx-output\template.docx"
      if (Test-Path $outputDir) {
          Get-ChildItem -Path $outputDir -Recurse | Where-Object { $_.FullName -ne $templateFile } | Remove-Item -Recurse -Force
          Write-Output "Cleaned directory: $outputDir except for $templateFile"
      } else {
          Write-Output "Directory does not exist: $outputDir"
      }


## SOLUTION 1
- task: PowerPlatformSetSolutionVersion@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    SolutionName: '$(varSolutionName)'
    SolutionVersionNumber: '1.3.0.$(Build.BuildID)'
- task: PowerPlatformExportSolution@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    SolutionName: '$(varSolutionName)'
    SolutionOutputFile: '$(Build.ArtifactStagingDirectory)\$(varSolutionName)_managed.zip'
    Managed: true
    AsyncOperation: true
    MaxAsyncWaitTime: '60'

- task: PowerPlatformExportSolution@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    SolutionName: '$(varSolutionName)'
    SolutionOutputFile: '$(Build.ArtifactStagingDirectory)\$(varSolutionName).zip'
    Managed: false
    AsyncOperation: true
    MaxAsyncWaitTime: '60'
- task: PowerPlatformChecker@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    FilesToAnalyze: '$(Build.ArtifactStagingDirectory)\$(varSolutionName).zip'
    RuleSet: '083a2ef5-7e0e-4754-9d88-9455142dc08b'
    ErrorLevel: 'InformationalIssueCount'
    FailOnPowerAppsCheckerAnalysisError: false
- task: PowerPlatformUnpackSolution@2
  inputs:
    SolutionInputFile: '$(Build.ArtifactStagingDirectory)\$(varSolutionName).zip'
    SolutionTargetFolder: '$(Build.SourcesDirectory)\src\solutions\$(varSolutionName)'
    SolutionType: 'Both'
    ProcessCanvasApps: true
    OverwriteFiles: true


## SOLUTION 2
- task: PowerPlatformSetSolutionVersion@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    SolutionName: '$(varSolutionName2)'
    SolutionVersionNumber: '1.3.0.$(Build.BuildID)'
- task: PowerPlatformExportSolution@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    SolutionName: '$(varSolutionName2)'
    SolutionOutputFile: '$(Build.ArtifactStagingDirectory)\$(varSolutionName2)_managed.zip'
    Managed: true
    AsyncOperation: true
    MaxAsyncWaitTime: '60'

- task: PowerPlatformExportSolution@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    SolutionName: '$(varSolutionName2)'
    SolutionOutputFile: '$(Build.ArtifactStagingDirectory)\$(varSolutionName2).zip'
    Managed: false
    AsyncOperation: true
    MaxAsyncWaitTime: '60'
- task: PowerPlatformChecker@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    FilesToAnalyze: '$(Build.ArtifactStagingDirectory)\$(varSolutionName2).zip'
    RuleSet: '083a2ef5-7e0e-4754-9d88-9455142dc08b'
    ErrorLevel: 'InformationalIssueCount'
    FailOnPowerAppsCheckerAnalysisError: false
- task: PowerPlatformUnpackSolution@2
  inputs:
    SolutionInputFile: '$(Build.ArtifactStagingDirectory)\$(varSolutionName2).zip'
    SolutionTargetFolder: '$(Build.SourcesDirectory)\src\solutions\$(varSolutionName2)'
    SolutionType: 'Both'
    ProcessCanvasApps: true
    OverwriteFiles: true

## SOLUTION 3
- task: PowerPlatformSetSolutionVersion@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    SolutionName: '$(varSolutionName3)'
    SolutionVersionNumber: '1.3.0.$(Build.BuildID)'
- task: PowerPlatformExportSolution@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    SolutionName: '$(varSolutionName3)'
    SolutionOutputFile: '$(Build.ArtifactStagingDirectory)\$(varSolutionName3)_managed.zip'
    Managed: true
    AsyncOperation: true
    MaxAsyncWaitTime: '60'

- task: PowerPlatformExportSolution@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    SolutionName: '$(varSolutionName3)'
    SolutionOutputFile: '$(Build.ArtifactStagingDirectory)\$(varSolutionName3).zip'
    Managed: false
    AsyncOperation: true
    MaxAsyncWaitTime: '60'
- task: PowerPlatformChecker@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    FilesToAnalyze: '$(Build.ArtifactStagingDirectory)\$(varSolutionName3).zip'
    RuleSet: '083a2ef5-7e0e-4754-9d88-9455142dc08b'
    ErrorLevel: 'InformationalIssueCount'
    FailOnPowerAppsCheckerAnalysisError: false
- task: PowerPlatformUnpackSolution@2
  inputs:
    SolutionInputFile: '$(Build.ArtifactStagingDirectory)\$(varSolutionName3).zip'
    SolutionTargetFolder: '$(Build.SourcesDirectory)\src\solutions\$(varSolutionName3)'
    SolutionType: 'Both'
    ProcessCanvasApps: true
    OverwriteFiles: true


## SOLUTION 4
- task: PowerPlatformSetSolutionVersion@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    SolutionName: '$(varSolutionName4)'
    SolutionVersionNumber: '1.3.0.$(Build.BuildID)'
- task: PowerPlatformExportSolution@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    SolutionName: '$(varSolutionName4)'
    SolutionOutputFile: '$(Build.ArtifactStagingDirectory)\$(varSolutionName4)_managed.zip'
    Managed: true
    AsyncOperation: true
    MaxAsyncWaitTime: '60'

- task: PowerPlatformExportSolution@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    SolutionName: '$(varSolutionName4)'
    SolutionOutputFile: '$(Build.ArtifactStagingDirectory)\$(varSolutionName4).zip'
    Managed: false
    AsyncOperation: true
    MaxAsyncWaitTime: '60'
- task: PowerPlatformChecker@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    FilesToAnalyze: '$(Build.ArtifactStagingDirectory)\$(varSolutionName4).zip'
    RuleSet: '083a2ef5-7e0e-4754-9d88-9455142dc08b'
    ErrorLevel: 'InformationalIssueCount'
    FailOnPowerAppsCheckerAnalysisError: false
- task: PowerPlatformUnpackSolution@2
  inputs:
    SolutionInputFile: '$(Build.ArtifactStagingDirectory)\$(varSolutionName4).zip'
    SolutionTargetFolder: '$(Build.SourcesDirectory)\src\solutions\$(varSolutionName4)'
    SolutionType: 'Both'
    ProcessCanvasApps: true
    OverwriteFiles: true

## PORTAL
- task: PowerPlatformDownloadPaportal@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    DownloadPath: '$(Build.SourcesDirectory)\src\ppages'
    WebsiteId: '$(varWebsiteId)'
    Overwrite: true
    ModelVersion: '2'
- task: PowerPlatformDownloadPaportal@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    DownloadPath:  '$(Build.ArtifactStagingDirectory)\ppages'
    WebsiteId: '$(varWebsiteId)'
    Overwrite: true
    ModelVersion: '2'
- task: PowerPlatformExportData@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    Environment: '$(BuildTools.EnvironmentUrl)'
    SchemaFile: '$(Build.SourcesDirectory)\referenceData\data_schema.xml'
    DataFile: '$(Build.ArtifactStagingDirectory)\rferenceData.zip'
    Overwrite: true
    Verbose: true
- task: ExtractFiles@1
  inputs:
    archiveFilePatterns: '$(Build.ArtifactStagingDirectory)\rferenceData.zip'
    destinationFolder: '$(Build.SourcesDirectory)\referenceData'
    cleanDestinationFolder: true
    overwriteExistingFiles: true
- task: PowerShell@2
  inputs:
    targetType: 'inline'
    script: 'pac solution create-settings --solution-zip $(Build.ArtifactStagingDirectory)/$(varSolutionName3).zip --settings-file $(Build.SourcesDirectory)/src/solutions/$(varSolutionName3)-settings.json'

## Generate Documentation
- task: PowerShell@2
  displayName: 'Clean wiki directory'
  inputs:
    targetType: 'inline'
    script: |
      $outputDir = "$(Build.SourcesDirectory)\wiki\"
      if (Test-Path $outputDir) {
          Remove-Item -Path $outputDir -Recurse -Force
          Write-Output "Cleaned directory: $outputDir"
      } else {
          Write-Output "Directory does not exist: $outputDir"
      }
- task: PowerShell@2
  displayName: 'Clean wiki-output directory'
  inputs:
    targetType: 'inline'
    script: |
      $outputDir = "$(Build.SourcesDirectory)\wiki-output\"
      if (Test-Path $outputDir) {
          Remove-Item -Path $outputDir -Recurse -Force
          Write-Output "Cleaned directory: $outputDir"
      } else {
          Write-Output "Directory does not exist: $outputDir"
      }
- task: PowerShell@2
  displayName: 'Clean wiki-docx-output directory except template.docx'
  inputs:
    targetType: 'inline'
    script: |
      $outputDir = "$(Build.SourcesDirectory)\wiki-docx-output\"
      $templateFile = "$(Build.SourcesDirectory)\wiki-docx-output\template.docx"
      if (Test-Path $outputDir) {
          Get-ChildItem -Path $outputDir -Recurse | Where-Object { $_.FullName -ne $templateFile } | Remove-Item -Recurse -Force
          Write-Output "Cleaned directory: $outputDir except for $templateFile"
      } else {
          Write-Output "Directory does not exist: $outputDir"
      }

## Check if any steps need repeating for split solutions
- task: mightora-powerplatform-documentationgenerator-erdiagram@1
  inputs:
    locationOfUnpackedSolution: '$(Build.SourcesDirectory)\src\solutions\$(varSolutionName2)'
    wikiLocation: '$(Build.SourcesDirectory)\wiki\data-dictionary\entity-relationship-diagram'
    authors: 'cg'
- task: documentSolutionTables@2
  continueOnError: true
  inputs:
    locationOfUnpackedSolution: '$(Build.SourcesDirectory)\src\solutions\$(varSolutionName2)'
    wikiLocation: '$(Build.SourcesDirectory)\wiki\data-dictionary\tables'
    useSingleFile: true
- task: documentTableRelationships@2
  continueOnError: true
  inputs:
    locationOfUnpackedSolution: '$(Build.SourcesDirectory)\src\solutions\$(varSolutionName2)'
    wikiLocation: '$(Build.SourcesDirectory)\wiki\data-dictionary\entity-relationship-diagram'
    useSingleFile: true
    createFullERD: true
    authors: 'cg'
- task: documentRoles@2
  continueOnError: true
  inputs:
    locationOfUnpackedSolution: '$(Build.SourcesDirectory)\src\solutions\$(varSolutionName3)'
    wikiLocation: '$(Build.SourcesDirectory)\wiki\security-roles'
    useSingleFile: true

- task: convertConvertInlineDiagrams@1
  continueOnError: true
  inputs:
    locationOfSourceMDFiles: '$(Build.SourcesDirectory)/wiki'
    outputLocation: '$(Build.SourcesDirectory)/wiki-output'
- task: mightora-UploadMDToWiki@0
  continueOnError: true
  inputs:
    ADOBaseUrl: '$(System.CollectionUri)'
    wikiSource: '$(Build.SourcesDirectory)/wiki-output'
    MDRepositoryName: 'Power-Platform'
    MDVersion: '$(Build.BuildNumber)'
    MDTitle: 'Title'
    WikiDestination: 'Architecture/Delivered'
    HeaderMessage: '<mark>DO NOT EDIT DIRECTLY - GENERATED FROM Dataverse REPO</mark>'
  env:
    SYSTEM_ACCESSTOKEN: $(PAT)
- task: convertMarkdownToDocx@1
  continueOnError: true
  inputs:
    locationOfMDFiles: '$(Build.SourcesDirectory)/wiki-output/'
    outputLocation: '$(Build.SourcesDirectory)/wiki-docx-output'
    templateFile: '$(Build.SourcesDirectory)/wiki-docx-output/template.docx'
- task: CmdLine@2
  inputs:
    script: |
      echo commit all changes
      git config user.email "$(Build.RequestedForEmail)"
      git config user.name "$(Build.RequestedFor)"
      git checkout -b <your-branch-name>
      git add --all
      git commit -m "Latest solution changes."
      echo push code to new repo
      git -c http.extraheader="AUTHORIZATION: bearer $(System.AccessToken)" push origin <your-branch-name>      
- task: PublishBuildArtifacts@1
  inputs:
    PathtoPublish: '$(Build.ArtifactStagingDirectory)'
    ArtifactName: 'drop'
    publishLocation: 'Container'
```
