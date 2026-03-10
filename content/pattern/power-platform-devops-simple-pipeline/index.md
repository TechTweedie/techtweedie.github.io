---
title: "Power Platform DevOps Simple Pipeline"
description: "Welcome to the very first episode of Power Platform Clinic! In this session, Duncan and Ian tackle two real-world Power Platform questions: showing/hiding tabs dynamically in model-driven apps and understanding calculated columns vs measures in Power BI."
tags:
  - Power Platform
  - Azure DevOps
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
draft: false
---




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