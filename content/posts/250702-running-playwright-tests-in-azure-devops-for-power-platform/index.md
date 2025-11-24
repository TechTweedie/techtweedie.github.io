---
title: "Running Playwright Tests in Azure DevOps for Power Platform Apps"
description: "Learn how to run Playwright tests on your Power Platform model-driven apps using a free Azure DevOps extension. This tutorial walks you through installing the extension, creating a pipeline, and viewing your results with HTML reports and trace analysis."
tags:
  - Power Platform
  - DevOps
  - Playwright
  - Testing
categories:
  - How to
date: 2025-07-02T00:00:00+01:00
publishDate: 2025-07-02T00:00:00+01:00
lastmod: 2025-07-02T00:00:00+01:00
author: "itweedie"
authorLink: "https://iantweedie.biz"
resources:
- name: "featured-image"
  src: "thumbnail1.png"
- name: "featured-image-preview"
  src: "thumbnail1.png"
lightgallery: true
draft: false
--- 


<!--more-->

## Introduction

Are you looking to easily run Playwright tests for your Power Platform apps within an Azure DevOps pipeline? In this tutorial, I show you how to use my **[Playwright for Power Platform DevOps extension](https://marketplace.visualstudio.com/items?itemName=mightoraio.mightora-playwright-for-power-platform)** to run tests against your model-driven app, capture reports, and publish results.

Below is the embedded video:

<!-- Add your YouTube HTML snippet here -->

{{< youtube IKgxUOEDFog >}}

## What you will learn

- How to install the Playwright for Power Platform DevOps extension
- How to write a Playwright test that creates a Contact record using fake data
- How to set up your Azure DevOps pipeline to run these tests, archive reports, and publish results



---

## Code Snippet – Playwright Test

Here is the test script used in the video to add a contact with fake data:

```typescript
import { test, expect } from '@playwright/test';
import 'dotenv/config';

interface Config {
  appUrl: string;
  appName: string;
  username: string;
  password: string;
  tenantId: string;
}

const config: Config = {
  appUrl: process.env.APP_URL || 'default_url',
  appName: process.env.APP_NAME || 'default_name',
  username: process.env.O365_USERNAME || 'default_username',
  password: process.env.O365_PASSWORD || 'default_password',
  tenantId: process.env.O365_TENANT_ID || 'default_tenant_id',
};

let fakeData: { firstName: string; lastName: string; email: string };

test('add-contact', async ({ page }) => {
  const fetch = (await import('node-fetch')).default;
  const response = await fetch('https://fakerapi.it/api/v2/custom?_quantity=1&FirstName=firstName&LastName=lastName&Email=email');
  const result = await response.json() as { data: Array<{ FirstName: string; LastName: string; Email: string }> };
  const user = result.data[0];
  fakeData = {
    firstName: user.FirstName,
    lastName: user.LastName,
    email: user.Email,
  };

  await page.goto(config.appUrl);
  const appTitle = page.locator(`text="${config.appName}"`).first();
  await expect(appTitle).toBeVisible({ timeout: 10000 });

  await page.getByText('AddSpecificResource_16Contacts').click();
  await page.getByRole('menuitem', { name: 'New', exact: true }).click();
  await page.getByRole('button', { name: 'dismiss' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).fill(fakeData.firstName);
  await page.getByRole('textbox', { name: 'Last Name' }).fill(fakeData.lastName);
  await page.getByRole('textbox', { name: 'Email', exact: true }).fill(fakeData.email);
  await page.getByRole('menuitem', { name: 'Save & Close' }).click();
});
```

---

## Pipeline YAML

Here is the Azure DevOps pipeline YAML shown in the video to run your tests, archive reports, publish test results, and commit changes to your repo:

```yaml
name: $(TeamProject)_$(BuildDefinitionName)_$(SourceBranchName)_$(Date:yyyyMMdd)$(Rev:.r)

trigger:
- none

pool:
  vmImage: windows-latest

steps:
- checkout: self
  persistCredentials: true
  clean: true

- task: mightoria-playwrightForPowerPlatform@1
  inputs:
    testLocation: '$(System.DefaultWorkingDirectory)/PlaywrightTests'
    browser: 'chromium'
    trace: 'on'
    outputLocation: '$(System.DefaultWorkingDirectory)'
    appUrl: 'https://techtweedie.crm11.dynamics.com/main.aspx?appid=6653f9fc-b74b-f011-877a-6045bd0e2fc6'
    appName: 'MDA Playwright Testing'
    o365Username: 'playwright-test@Tweed.technology'
    o365Password: '$(o365Password)'

- task: ArchiveFiles@2
  inputs:
    rootFolderOrFile: '$(System.DefaultWorkingDirectory)/playwright-report'
    includeRootFolder: true
    archiveType: 'zip'
    archiveFile: '$(System.DefaultWorkingDirectory)/playwright-report/playwright-report.zip'
    replaceExistingArchive: true

- publish: $(System.DefaultWorkingDirectory)/playwright-report/
  artifact: playwright-report
  condition: always()

- task: PublishTestResults@2
  inputs:
    testResultsFormat: 'JUnit'
    testResultsFiles: '**/TEST-*.xml'

- task: commitToRepo@2
  inputs:
    commitMsg: '$(Date:yyyyMMdd)$(Rev:.r)'
    branchName: 'main'
```

---

## Why use this approach?

✅ **Simple integration** – install the free DevOps extension  
✅ **Automated testing** – validate your app’s functionality on every build  
✅ **Reports and trace analysis** – diagnose flaky tests or environment issues  
✅ **Secure credentials** – use pipeline variables for secrets

---

## Conclusion

Running Playwright tests against your Power Platform apps in Azure DevOps is now easier than ever with the free extension I’ve released. Start incorporating tests into your pipelines to catch issues early, improve app quality, and increase confidence in every deployment.

If you have any questions or want to see how this works with other Power Platform components such as Canvas Apps or Power Pages, leave a comment on the video – I’d be happy to cover those in future posts.

Happy testing!
