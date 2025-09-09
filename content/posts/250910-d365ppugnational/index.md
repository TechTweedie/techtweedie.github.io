---
title: "Playwright for Makers – Bringing One-Click UI Tests to Model-Driven Apps & Power Pages"
description: "A 40-minute, demo-heavy walkthrough that adds the missing 'test' step to your low-code CI/CD story."
tags:
  - Power Platform
  - Playwright
  - DevOps
  - Azure DevOps
  - Automated Testing
categories:
  - Community
date: 2025-09-10T06:00:00+01:00
publishDate: 2025-09-08T06:00:00+01:00
lastmod: 2025-09-08T06:00:00+01:00
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

**📅 Date:** Wednesday, September 10, 2025  
**🕒 Time:** 10:45 AM – 11:30 AM BST  
**📍 Location:** UK D365 and Power Platform User Group, Microsoft UA92 Manchester, Room 102/103  
**🎟️ Session Link:** [https://d365ppug-national-10092025.sessionize.com/session/991575](https://d365ppug-national-10092025.sessionize.com/session/991575)

## Session Overview
In this hands-on, demo-heavy session, **Ian Tweedie (TechTweedie)**, Power Platform Technical Consultant at Capgemini, will showcase how to integrate automated UI testing into your low-code CI/CD workflows. Using the **FREE Open Source Playwright for Power Platform DevOps Extension**, you’ll learn how to:

- Create end-to-end tests for Model-Driven Apps and Power Pages.
- Automate test user permissions.
- Generate rich HTML reports directly in Azure DevOps.

Expect practical guidance, live demos, and a repeatable recipe to take home: **Commit → Automatic UI Tests → Deploy.**

## What You’ll Learn

- Why automated testing is essential for Power Platform projects.  
- How to set up the Playwright for Power Platform DevOps Extension.  
- Writing and running your first automated UI test.  
- Viewing and interpreting test results in Azure DevOps.  
- **Bonus:** How to integrate disposable test users for clean, repeatable tests.  

## Demos Include

- Forking the starter repository.  
- Using Playwright CodeGen to create tests.  
- Setting up and running an Azure DevOps pipeline.  
- Viewing test results and HTML reports.  
- Managing disposable test users.  

## Why Attend?

- 🚀 **Hands-On Learning:** See real-world demos and get practical tips.  
- 🛠️ **Tools You Can Use:** Learn about the free Playwright extension and starter templates.  
- 📂 **Takeaways:** Leave with a complete recipe for automated testing in your CI/CD pipeline.  

## Slides

AFTER THE EVENT

<!-- https://itweedie.github.io/devopspipelines/250910-playwright-for-makers/z -->

## Got questions 

Got a question or feeling a little stuck, just submit it to the [Power Platform Clinic](https://powerplatformclinic.github.io/) and I will be happy to answer it for you!

## Resources

- [Get Started with Playwright for Model Driven Apps by James Ryan](https://jamesryan.dev/blog/get-started-with-playwright-for-power-apps)
- [Playwright for Power Platform DevOps Extension](https://mightora.io/tools/cicd/playwright-for-power-platform/)
- [Starter Repository Template](https://github.com/itweedie/playwright-powerplatform-template)
- [CodeGen Documentation](https://playwright.dev/docs/codegen)
- [Starter Repository Template](https://github.com/itweedie/playwrightOnPowerPlatform)
- [Related YouTube video](https://techtweedie.github.io/posts/250702-running-playwright-tests-in-azure-devops-for-power-platform/)

### DevOps Pipeline

```yaml

name: $(TeamProject)_$(BuildDefinitionName)_$(SourceBranchName)_$(Date:yyyyMMdd)$(Rev:.r)

trigger:
- none

pool:
  vmImage: windows-latest

steps:
- checkout: self

- task: mightoria-playwrightForPowerPlatformAdvanced@1
  inputs:
    testLocation: '$(System.DefaultWorkingDirectory)/tests'
    browser: 'chromium'
    trace: 'on'
    outputLocation: '$(System.DefaultWorkingDirectory)'
    appUrl: 'https://techtweedie.crm11.dynamics.com/main.aspx?appid=6653f9fc-b74b-f011-877a-6045bd0e2fc6'
    appName: 'MDA Playwright Testing'
    o365Username: 'playwright-test@Tweed.technology'
    o365Password: '$(o365Password)'
    tenantId: '63759d9f-bfca-4f52-ae98-8f2f1d7bc173'
    dynamicsUrl: 'techtweedie.crm11.dynamics.com'
    clientId: '6f3163d1-bd41-4f0e-8725-980f05d2a82f'
    clientSecret: '$(ClientSecret)'
    userRole: 'System Administrator'
    team: 'orgbfc42920'
    businessUnit: 'orgbfc42920'

- task: ArchiveFiles@2
  inputs:
    rootFolderOrFile: '$(System.DefaultWorkingDirectory)/playwright-report'
    includeRootFolder: true
    archiveType: 'zip'
    archiveFile: '$(System.DefaultWorkingDirectory)/playwright-report/playwright-report.zip'
    replaceExistingArchive: true


- publish: $(System.DefaultWorkingDirectory)/playwright-report/
  artifact: playwright-report
  # always create the artifact, this is useful for debugging failed tests
  condition: always()

- task: PublishTestResults@2
  inputs:
    testResultsFormat: 'JUnit'
    testResultsFiles: '**/TEST-*.xml'


```