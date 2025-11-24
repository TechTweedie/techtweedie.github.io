---
title: "Running ADVANCED Playwright Tests in Azure DevOps for Power Platform Apps"
description: "Run Playwright tests in Azure DevOps for your Power Platform apps with dynamic user role assignment, business unit switching, and detailed test results."
tags:
  - Power Platform
  - DevOps
  - Playwright
  - Testing
categories:
  - How to
date: 2025-07-15T00:00:00+01:00
publishDate: 2025-07-15T00:00:00+01:00
lastmod: 2025-07-15T00:00:00+01:00
author: "itweedie"
authorLink: "https://iantweedie.biz"
resources:
- name: "featured-image"
  src: "thumbnail.png"
- name: "featured-image-preview"
  src: "thumbnail.png"
lightgallery: true
draft: false
--- 


## 🧪 Playwright + Power Platform + DevOps Pipelines? Yes please!

Just dropped a new video where I walk through the latest update to my **Playwright for Power Platform DevOps Extension**. This time, we’re not just running tests — we’re dynamically assigning roles, business units, and teams to a test user before your Playwright test runs, and then removing them right after. Clean, controlled, reusable testing every time ✅

{{< youtube lFHQ8HUsnMI >}}

## 🎯 What's new in this release?
- Assign security roles dynamically in a DevOps pipeline
- Switch business units and teams for your test user
- Clean up roles after the test completes
- Fully open-source DevOps task ready to install
- Compatible with any Playwright tests against Power Platform

This means fewer test users, more test coverage, and pipelines you can actually trust.

📺 **Watch the video now:** [https://youtu.be/lFHQ8HUsnMI](https://youtu.be/lFHQ8HUsnMI)  
🌐 **Get the extension from Mightora.io:** [https://mightora.io](https://mightora.io)  
💬 **Let me know how you're testing Power Platform apps!**

## 🔧 Sample DevOps Pipeline Task

```yaml
- task: mightoria-playwrightForPowerPlatformAdvanced@1
  inputs:
    testLocation: '$(System.DefaultWorkingDirectory)/PlaywrightTests'
    browser: 'chromium'
    trace: 'on'
    outputLocation: '$(System.DefaultWorkingDirectory)'
    appUrl: 'https://techtweedie.crm11.dynamics.com/main.aspx?appid=6653f9fc-b74b-f011-877a-6045bd0e2fc6'
    appName: 'MDA Playwright Testing'
    o365Username: 'playwright-test@Tweed.technology'
    o365Password: '$(o365Password)'
    tenantId: '63759d9f-bfca-4f52-ae98-8f2f1d7bc173'
    dynamicsUrl: 'techtweedie.crm11.dynamics.com'
    clientId: 'db808651-052b-4fc1-83da-ac5149066043'
    clientSecret: '$(ClientSecret)'
    userRole: 'System Administrator'
    team: 'orgbfc42920'
    businessUnit: 'orgbfc42920'
```

---

#PowerPlatform #DevOps #Playwright #Testing #Automation #Mightora #ModelDrivenApps #AzureDevOps
