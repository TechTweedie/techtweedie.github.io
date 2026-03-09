---
title: "🚀 Build Your First Azure DevOps Pipeline for Power Platform (Complete Beginner Tutorial!)"
description: "Have you ever wished you could automatically export your Dataverse solutions, back up your Power Platform work, or finally start using DevOps like the pros? In this step-by-step tutorial, I’ll show you EXACTLY how to build your first Azure DevOps pipeline — even if you’ve never touched DevOps before."
tags:
  - Power Platform
  - DevOps
categories:
  - How to
date: 2025-11-18T06:00:00+01:00
publishDate: 2025-11-18T06:00:00+01:00
lastmod: 2025-11-18T06:00:00+01:00
author: "itweedie"
authorLink: "https://iantweedie.biz"
resources:
- name: "featured-image"
  src: "thin.png"
- name: "featured-image-preview"
  src: "large.png"
hero: large.png
lightgallery: true
draft: false 
---

<!--more-->

## Your First Azure DevOps Pipeline for Power Platform – A Complete Beginner’s Guide

Have you ever wondered how to set up Azure DevOps pipelines for the Power Platform?  
Ever wished you could *export your solutions safely*, *run tests*, *add security checks*, *generate documentation*, or *deploy across tenants* with confidence?

All of this becomes simple once you introduce Azure DevOps into your Power Platform ALM story — and in this guide (based on my YouTube walkthrough), I’ll show you exactly how to build **your first Azure DevOps pipeline**.

Whether you're brand new to DevOps or just automating your Power Platform workflows, this guide will get you from nothing to a working pipeline step-by-step.

### 🎥 Watch the video tutorial

{{< youtube OUcXHBx3wJY >}}

## Introduction

In this walkthrough, we’re going to build a simple Azure DevOps pipeline that:

✔ Connects securely to your Dataverse environment  
✔ Exports a Power Platform solution  
✔ Unpacks it into source control  
✔ Commits the changes to your repository  

Later, you can extend this pipeline to build, deploy, test, create documentation, enforce ALM governance, and much more — but today we focus on getting your first working pipeline running.

## Prerequisites

Before we touch DevOps, we need three things.

### **1. Dataverse System Administrator permissions**

You need the ability to add/remove users (because we’ll add a service principal).

### **2. An Azure DevOps organisation (Basic licence)**

The first five are free, so you're almost certainly covered.

### **3. Parallelism Request (free)**

Azure DevOps uses a hosted VM to run pipelines, but you must request free parallelism.  
Submit it here:

**https://aka.ms/azpipelines-parallelism-request**

Approval normally takes a few minutes.

After that, install the **Power Platform Build Tools** extension from the Visual Studio Marketplace.

## Step 1 — Create an App Registration

We need a service principal so our pipeline can authenticate to Dataverse.

1. Open **Entra Admin Center → App Registrations**
2. Select **New Registration**
3. Add API permission **Dynamic CRM → user_impersonation**
4. No admin consent required
5. Copy:
   - Client ID  
   - Tenant ID  
   - Secret  

Keep them safe — we’ll need them later.

## Step 2 — Add the App User in Dataverse

In the **Power Platform Admin Center**:

1. Open your environment  
2. Go to **Settings → Users → Application Users**  
3. Click **New App User**  
4. Choose your App Registration  
5. Assign **System Administrator** (for demo purposes)

## Step 3 — Create the DevOps Service Connection

In Azure DevOps:

1. Open **Project Settings → Service Connections**  
2. Select **New Service Connection → Power Platform**  
3. Enter:
   - Environment URL  
   - Client ID  
   - Tenant ID  
   - Secret  
4. Name it something like **Dataverse - Backup**

This will be the authentication method for your pipeline.

## Step 4 — Structure Your Repository

A recommended structure:

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

## Step 5 — Create Your First Pipeline

Inside **Pipelines → New Pipeline**:

1. Choose **Azure Repos Git**
2. Select your repo
3. Choose **Starter Pipeline**
4. Save it under:  
   **/pipelines/export-solution.yml**

Your first run will likely fail due to parallelism — this is normal.

## Step 6 — Fix Parallelism (If Needed)

If you get an error about free parallelism not being enabled:

👉 Submit the form: **https://aka.ms/azpipelines-parallelism-request**

Once approved, rerun your pipeline — it should now work.

## Step 7 — Build the Export Pipeline

Now we turn the basic boilerplate pipeline into something useful.

### 1. Add name + variables

```yaml
name: $(TeamProject)_$(BuildDefinitionName)_$(Date:yyyyMMdd)$(Rev:.r)

variables:
  - name: varPowerPlatformSPN
    value: Dataverse - Backup
  - name: varSolutionName
    value: ExpenseReportManager1
```

### 2. Use Windows build agent

```yaml
pool:
  vmImage: 'windows-latest'
```

### 4. Pipeline Steps

```yaml
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

```

### 3. Commit to the repository

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

## Step 8 — Fix Build Service Permissions (If Needed)

If you see:

**“Build Service does not have Contribute permissions”**

Fix it here:

**Project Settings → Repositories → {repo} → Security**

Find:

**ProjectName Build Service (ProjectName)**  
Set **Contribute = Allow**

Re-run — pipeline succeeds.

## Step 9 — Review the Exported Solution

Your repo now contains:

### ✔ Managed ZIP  
### ✔ Unmanaged ZIP  
### ✔ Settings file  
### ✔ Unpacked solution including:  
- Entities  
- Model-driven apps  
- Canvas apps (if any)  
- Workflows  
- Security roles  
- Choices  
- Relationships  
- Customizations  
- Plans  

Everything you need for full Git-based version control.


# Conclusion

🎉 **Congratulations — you now have a working Azure DevOps export pipeline!**

This pipeline gives you:

✔ A safe, repeatable backup  
✔ Git history of every solution change  
✔ Managed + unmanaged builds  
✔ A foundation for full ALM automation

From here, you can expand into:

- Deployment pipelines  
- Automated versioning  
- Power Pages / Portal pipelines  
- Automated documentation  
- Solution analysis & testing  
- Cross-tenant deployments  
- Pull request validation  

If you’d like the next blog/video to cover **solution deployment**, **unit testing**, **wiki documentation generation**, or **advanced ALM**, just let me know!

---
