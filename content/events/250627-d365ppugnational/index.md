---
title: "At the National Power Platform User Day: Build Your First DevOps Pipeline for the Power Platform"
description: "Join me at the National User Group to learn how to build your first DevOps pipeline for the Power Platform."
tags:
  - Power Platform
  - DevOps
  - Azure DevOps
  - Community Event
  - Solution Lifecycle
date: 2025-06-22T06:00:00+01:00
publishDate: 2025-06-22T06:00:00+01:00
lastmod: 2025-06-22T06:00:00+01:00
author: "itweedie"
authorLink: "https://iantweedie.biz"
resources:
- name: "featured-image"
  src: "thin.png"
- name: "featured-image-preview"
  src: "large.png"
lightgallery: true
draft: true
---

<!--more-->

## Build Your First DevOps Pipeline for the Power Platform

**📅 Date:** Friday, June 27, 2025  
**🕒 Time:** 2:15 PM – 3:00 PM BST  
**📍 Location:** National Usergroup, Room G8  
**🎟️ Session Link:** [https://d365ppug-national-27-06-2025.sessionize.com/session/905816](https://d365ppug-national-27-06-2025.sessionize.com/session/905816)

## Session Overview
![alt text](image.png)
You’ve exported a solution. Maybe even unpacked it. But what’s next?

In this hands-on, beginner-friendly session, **Ian Tweedie (TechTweedie)**, Power Platform Technical Consultant at Capgemini, will walk you through building your very first DevOps pipeline for the Power Platform — using Azure DevOps and real-world tools that anyone can adopt.

You’ll see how to go from manual solution management to a repeatable, secure deployment process, powered by the Power Platform CLI and Azure DevOps build tasks. Expect practical guidance, live demos, and templates you can use right away.

Whether you’re a low-code maker or a seasoned dev dipping your toes into DevOps, you’ll leave with the confidence to automate your solution lifecycle.

## What You’ll Learn

- Why DevOps matters for Power Platform projects  
- How to structure your repo and solutions  
- Setting up your first Azure DevOps pipeline to export, unpack, commit, and document a solution  
- How to deploy  
- **Bonus:** How to include automated documentation of your solution  

## Demos Include

- Creating your first pipeline in Azure DevOps  
- Explore an unpacked solution  
- Generating documentation  
- Schedule a backup of the build  
- Deploy to a target  

## Why Attend?

- 💡 Gain practical insights into DevOps for Power Platform  
- 🛠️ Learn hands-on with live demos and real-world tools  
- 📂 Take away templates and guidance to start automating your solution lifecycle  

Don’t miss this opportunity to level up your Power Platform projects with DevOps!

## Slides

[Access the slides here](https://itweedie.github.io/devopspipelines/250627-build-your-first-devops-pipeline/#/)


## Pipelines

### Recommended Folder Structure

```
MyPowerPlatformProject/
├── solutions/
│   ├── src/
│   │   └── MySolution/
│   └── MySolution.zip
├── pipelines/
│   ├── export-solution.yml
│   ├── build-and-deploy-solution.yml
├── documentation/
└── README.md
```

### export-solution.yml

```yaml
name: $(TeamProject)_ExportSolution_$(BuildDefinitionName)_$(SourceBranchName)_$(Date:yyyyMMdd)$(Rev:.r)

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

### build-and-deploy-solution.yml

```yaml
name: $(TeamProject)_Build-Deploy_$(varSolutionName)_$(SourceBranchName)_$(Date:yyyyMMdd)$(Rev:.r)

variables:
  - name: varSolutionName
   # value: YOUR-OWN-VALUE-HERE
    value: FirstPipeline
  - name: varPowerPlatformSPN
   # value: YOUR-OWN-VALUE-HERE 
    value: Dataverse - mightora
  - name: varTargetEnvironment
   # value: YOUR-OWN-VALUE-HERE
    value: https://mightora.crm11.dynamics.com/

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

- task: PowerPlatformPackSolution@2
  inputs:
    SolutionSourceFolder: '$(Build.SourcesDirectory)\solutions\src\$(varSolutionName)'
    SolutionOutputFile: '$(Build.ArtifactStagingDirectory)\solutions\build\$(varSolutionName).zip'
- task: PowerPlatformImportSolution@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: '$(varPowerPlatformSPN)'
    Environment: '$(varTargetEnvironment)'
    SolutionInputFile: '$(Build.ArtifactStagingDirectory)\solutions\build\$(varSolutionName).zip'
    AsyncOperation: true
    MaxAsyncWaitTime: '60'

```
 
### Schedule / Backup

```yaml

schedules:
  - cron: 0 18 * * 1-5
    displayName: Weekday Backup
    branches:
      include:
        - main
    always: true

```

### Documentation 

Download from here:
https://marketplace.visualstudio.com/items?itemName=mightoraio.mightora-power-platform-devOps-extension

```yaml

steps:
- task: mightoraio.mightora-power-platform-devOps-extension.mightora-documentTableRelationships-task.documentTableRelationships@1
  displayName: 'Mightora Power Platform Table Relationship Documentation Generator'
  inputs:
    locationOfUnpackedSolution: $(Build.SourcesDirectory)\solutions\src\$(varSolutionName)
    wikiLocation: documentation

```