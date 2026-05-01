---
title: "Power Platform Build Backup Pipeline"
description: "A comprehensive guide to implementing a build backup pipeline for multiple Power Platform solutions using Azure DevOps, including automated export of multiple solutions, portal configuration, reference data, and version control."
tags:
  - Power Platform
  - Azure DevOps
  - DevOps
  - CI/CD
  - Solution Management
  - Backup
categories:
  - Power Platform
  - Azure DevOps
menu: 
  pattern:
    name: Build Backup
    identifier: build-backup
    parent: ppcicd
    weight: 20
date: 2026-05-01T12:00:00+01:00
---

```yaml
name: $(TeamProject)_$(BuildDefinitionName)_$(SourceBranchName)_$(Date:yyyyMMdd)$(Rev:.r)

variables:
  - name: varPowerPlatformSPN
    value: Dataverse - Build - AzureDevOps
  - name: varPowerPlatformSPN2
    value: Dataverse - TracsIntegration-Build - AzureDevOps
  - name: varSolutionName
    value: TRACSCustomConnectors
  - name: varSolutionName2
    value: Entities
  - name: varSolutionName3
    value: Environment_Configuration
  - name: varSolutionName4
    value: Core
  - name: varSolutionName5
    value: Dataflows
  - name: varSolutionName6
    value: TRACS_Integration_Solution
  - name: varSolutionName7
    value: Document_Migration
  - name: varWebsiteId
    value: ca958ff8-3c4b-ee11-be6f-0022481ab062

## revert schedule to 0 once old build backup is retired
schedules:
  - cron: 30 13,18 * * 1-5
    displayName: Weekday Backup
    branches:
      include:
        - main
    always: true

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


## SOLUTION 1 - CUSTOM CONNECTORS
- task: PowerPlatformSetSolutionVersion@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    SolutionName: '$(varSolutionName)'
    SolutionVersionNumber: '2.4.0.$(Build.BuildID)'
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
- task: PowerPlatformUnpackSolution@2
  inputs:
    SolutionInputFile: '$(Build.ArtifactStagingDirectory)\$(varSolutionName).zip'
    SolutionTargetFolder: '$(Build.SourcesDirectory)\src\solutions\$(varSolutionName)'
    SolutionType: 'Both'


## SOLUTION 2 - ENTITIES
- task: PowerPlatformSetSolutionVersion@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    SolutionName: '$(varSolutionName2)'
    SolutionVersionNumber: '2.4.0.$(Build.BuildID)'
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
- task: PowerPlatformUnpackSolution@2
  inputs:
    SolutionInputFile: '$(Build.ArtifactStagingDirectory)\$(varSolutionName2).zip'
    SolutionTargetFolder: '$(Build.SourcesDirectory)\src\solutions\$(varSolutionName2)'
    SolutionType: 'Both'


## SOLUTION 3 - ENVIRONMENT CONFIGURATION
- task: PowerPlatformSetSolutionVersion@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    SolutionName: '$(varSolutionName3)'
    SolutionVersionNumber: '2.4.0.$(Build.BuildID)'
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
- task: PowerPlatformUnpackSolution@2
  inputs:
    SolutionInputFile: '$(Build.ArtifactStagingDirectory)\$(varSolutionName3).zip'
    SolutionTargetFolder: '$(Build.SourcesDirectory)\src\solutions\$(varSolutionName3)'
    SolutionType: 'Both'


## SOLUTION 4 - CORE
- task: PowerPlatformSetSolutionVersion@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    SolutionName: '$(varSolutionName4)'
    SolutionVersionNumber: '2.4.0.$(Build.BuildID)'
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
- task: PowerPlatformUnpackSolution@2
  inputs:
    SolutionInputFile: '$(Build.ArtifactStagingDirectory)\$(varSolutionName4).zip'
    SolutionTargetFolder: '$(Build.SourcesDirectory)\src\solutions\$(varSolutionName4)'
    SolutionType: 'Both'

## SOLUTION 5 - DATAFLOWS
- task: PowerPlatformSetSolutionVersion@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    SolutionName: '$(varSolutionName5)'
    SolutionVersionNumber: '2.4.0.$(Build.BuildID)'
- task: PowerPlatformExportSolution@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    SolutionName: '$(varSolutionName5)'
    SolutionOutputFile: '$(Build.ArtifactStagingDirectory)\$(varSolutionName5)_managed.zip'
    Managed: true
    AsyncOperation: true
    MaxAsyncWaitTime: '60'
- task: PowerPlatformExportSolution@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    SolutionName: '$(varSolutionName5)'
    SolutionOutputFile: '$(Build.ArtifactStagingDirectory)\$(varSolutionName5).zip'
    Managed: false
    AsyncOperation: true
    MaxAsyncWaitTime: '60'
- task: PowerPlatformUnpackSolution@2
  inputs:
    SolutionInputFile: '$(Build.ArtifactStagingDirectory)\$(varSolutionName5).zip'
    SolutionTargetFolder: '$(Build.SourcesDirectory)\src\solutions\$(varSolutionName5)'
    SolutionType: 'Both'

## SOLUTION 6 - TRACS INTEGRATION
- task: PowerPlatformSetSolutionVersion@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN2)'
    SolutionName: '$(varSolutionName6)'
    SolutionVersionNumber: '2.4.0.$(Build.BuildID)'
- task: PowerPlatformExportSolution@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN2)'
    SolutionName: '$(varSolutionName6)'
    SolutionOutputFile: '$(Build.ArtifactStagingDirectory)\$(varSolutionName6)_managed.zip'
    Managed: true
    AsyncOperation: true
    MaxAsyncWaitTime: '60'
- task: PowerPlatformExportSolution@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN2)'
    SolutionName: '$(varSolutionName6)'
    SolutionOutputFile: '$(Build.ArtifactStagingDirectory)\$(varSolutionName6).zip'
    Managed: false
    AsyncOperation: true
    MaxAsyncWaitTime: '60'
- task: PowerPlatformUnpackSolution@2
  inputs:
    SolutionInputFile: '$(Build.ArtifactStagingDirectory)\$(varSolutionName6).zip'
    SolutionTargetFolder: '$(Build.SourcesDirectory)\src\tracsIntegrationSolutions\$(varSolutionName6)'
    SolutionType: 'Both'

# SOLUTION 7 - DOCUMENT MIGRATION
- task: PowerPlatformSetSolutionVersion@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    SolutionName: '$(varSolutionName7)'
    SolutionVersionNumber: '2.4.0.$(Build.BuildID)'
- task: PowerPlatformExportSolution@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    SolutionName: '$(varSolutionName7)'
    SolutionOutputFile: '$(Build.ArtifactStagingDirectory)\$(varSolutionName7)_managed.zip'
    Managed: true
    AsyncOperation: true
    MaxAsyncWaitTime: '60'
- task: PowerPlatformExportSolution@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    SolutionName: '$(varSolutionName7)'
    SolutionOutputFile: '$(Build.ArtifactStagingDirectory)\$(varSolutionName7).zip'
    Managed: false
    AsyncOperation: true
    MaxAsyncWaitTime: '60'
- task: PowerPlatformUnpackSolution@2
  inputs:
    SolutionInputFile: '$(Build.ArtifactStagingDirectory)\$(varSolutionName7).zip'
    SolutionTargetFolder: '$(Build.SourcesDirectory)\src\solutions\$(varSolutionName7)'
    SolutionType: 'Both'

## PORTAL
- task: PowerPlatformDownloadPaportal@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    DownloadPath:  '$(Build.SourcesDirectory)\src\ppages'
    WebsiteId: '$(varWebsiteId)'
    Overwrite: true
    ModelVersion: 2


## REFERENCE DATA
- task: PowerPlatformExportData@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    Environment: '$(BuildTools.EnvironmentUrl)'
    SchemaFile: '$(Build.SourcesDirectory)\referenceData\data_schema.xml'
    DataFile: '$(Build.ArtifactStagingDirectory)\$rferenceData.zip'
    Overwrite: true
- task: ExtractFiles@1
  inputs:
    archiveFilePatterns: '$(Build.ArtifactStagingDirectory)\$rferenceData.zip'
    destinationFolder: '$(Build.SourcesDirectory)\referenceData'
    cleanDestinationFolder: true
    overwriteExistingFiles: true


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
