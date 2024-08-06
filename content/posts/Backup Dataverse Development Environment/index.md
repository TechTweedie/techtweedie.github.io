---
title: "Backup Dataverse Development Environment"
description: "Frequently moving between desktop builds, want to be able to get up and running quickly,  I’ve found it incredibly useful to have my own build script that covers 80% of the tools I am likely to need. It's essential tools ready to go saves a lot of time and hassle, that’s why I created a PowerShell script to automate the installation of the developer tools I often use when working on the Power Platform."
tags:
  - Developer Tools
  - Install Script
  - Automation
  - PowerShell
categories:
  - Power Platform
date: 2024-06-04T17:32:41+01:00
lastmod: 2020-01-01T16:45:40+08:00
author: "itweedie"
authorLink: "https://iantweedie.biz"
resources:
- name: "featured-image"
  src: "featureImage.jpg"
- name: "featured-image-preview"
  src: "featureImage.jpg"
lightgallery: true
draft: true
original: "https://helpmewithmy.technology/power-pages-developer-tools-install-script/"
---

```yaml


name: $(TeamProject)_$(BuildDefinitionName)_$(SourceBranchName)_$(Date:yyyyMMdd)$(Rev:.r)

variables:
  - name: varPowerPlatformSPN
    value: <YOUR SERVICE CONNECTION>
  - name: varSolutionName
    value: <YOUR SOLUTION NAME>
  - name: varWebsiteId
    value: <YOUR WEBSITE ID IN HERE>

trigger:
  - main

schedules:
  - cron: 0 13,18 * * 1-5
    displayName: Weekday Backup
    branches:
      include:
        - main
    always: true

stages:
  - stage: solutionFromDev
    jobs:
      - job: CopySolution
        pool:
          vmImage: 'windows-latest'
        steps:
          - checkout: self
            persistCredentials: true
            clean: true
          - task: PowerPlatformToolInstaller@2
            inputs:
              DefaultVersion: true
          - task: PowerPlatformSetSolutionVersion@2
            inputs:
              authenticationType: 'PowerPlatformSPN'
              PowerPlatformSPN: '$(varPowerPlatformSPN)'
              SolutionName: '$(varSolutionName)'
              SolutionVersionNumber: '1.0.0.$(Build.BuildID)'
          # Export core solution as managed
          - task: PowerPlatformExportSolution@2
            inputs:
              authenticationType: 'PowerPlatformSPN'
              PowerPlatformSPN: '$(varPowerPlatformSPN)'
              SolutionName: '$(varSolutionName)'
              SolutionOutputFile: '$(Build.ArtifactStagingDirectory)\$(varSolutionName)_managed.zip'
              Managed: true
              AsyncOperation: true
              MaxAsyncWaitTime: '60'
          # Export core solution as unmanaged
          - task: PowerPlatformExportSolution@2
            inputs:
              authenticationType: 'PowerPlatformSPN'
              PowerPlatformSPN: '$(varPowerPlatformSPN)'
              SolutionName: '$(varSolutionName)'
              SolutionOutputFile: '$(Build.ArtifactStagingDirectory)\$(varSolutionName).zip'
              AsyncOperation: true
              MaxAsyncWaitTime: '60'
          # Export config data
          - task: PowerPlatformExportData@2
            inputs:
              authenticationType: 'PowerPlatformSPN'
              PowerPlatformSPN: '$(varPowerPlatformSPN)'
              Environment: '$(BuildTools.EnvironmentUrl)'
              SchemaFile: '$(Build.SourcesDirectory)\configData\data_schema.xml'
              DataFile: '$(Build.ArtifactStagingDirectory)\configData\data.zip'
              Overwrite: true
          # Unpack config data
          - task: ExtractFiles@1
            inputs:
              archiveFilePatterns: '$(Build.ArtifactStagingDirectory)\configData\data.zip'
              destinationFolder: '$(Build.ArtifactStagingDirectory)\configData\'
              cleanDestinationFolder: true
              overwriteExistingFiles: true
          # Unpack both solutions
          - task: PowerPlatformUnpackSolution@2
            inputs:
              SolutionInputFile: '$(Build.ArtifactStagingDirectory)\$(varSolutionName).zip'
              SolutionTargetFolder: '$(Build.SourcesDirectory)\src\solutions\$(varSolutionName)'
              SolutionType: 'Both'
          # Download the Portal from Dev
          - task: PowerPlatformDownloadPaportal@2
            inputs:
              authenticationType: 'PowerPlatformSPN'
              PowerPlatformSPN: '$(varPowerPlatformSPN)'
              DownloadPath: 'src\pp'
              Overwrite: true
              WebsiteId: '$(varWebsiteId)'
              ModelVersion: 2
          # Install power apps CLI tools
          - task: NuGetToolInstaller@1
            inputs:
              versionSpec: 
          - task: NuGetCommand@2
            inputs:
              command: 'custom'
              arguments: 'install Microsoft.PowerApps.CLI -OutputDirectory "$(Build.ArtifactStagingDirectory)\pac2"'
          - task: PowerShell@2
            inputs:
              targetType: 'inline'
              script: |
                $pacNugetFolder = Get-ChildItem "$(Build.ArtifactStagingDirectory)\pac2" | Where-Object {$_.Name -match "Microsoft.PowerApps.CLI."}
                $pacPath = $pacNugetFolder.FullName + "\tools"
                echo "##vso[task.setvariable variable=pacPath]$pacPath"
          # Create deployment settings file
          - task: PowerShell@2
            inputs:
              targetType: 'inline'
              script: |
                dir $(pacPath)
                $pacFullPath = "$(pacPath)\pac.exe" # Ensure this is the correct path to the pac executable
                & $pacFullPath solution create-settings --solution-zip $(Build.ArtifactStagingDirectory)/$(varSolutionName).zip --settings-file $(Build.SourcesDirectory)/scr/solutions/$(varSolutionName)-settings.json
          # Commit to the main branch
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
