---
title: "Generate Power Platform Solution Documentation with Azure DevOps"
description: "Learn how to automatically generate clear, accurate documentation for your Power Platform solutions using the Power Platform Documentation Extension for Azure DevOps."
tags:
  - Power Platform
  - DevOps
  - Documentation
  - Azure DevOps Extension
categories:
  - How to
date: 2025-09-04T06:00:00+01:00
publishDate: 2025-09-04T06:00:00+01:00
lastmod: 2025-09-04T06:00:00+01:00
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

<!--more-->

## Instantly Document Your Power Platform Solutions with Azure DevOps

Are you tired of manually documenting your Power Platform solutions? Struggling to keep your tables, relationships, option sets, and workflows up to date for your team or clients? The **Power Platform Documentation Extension for Azure DevOps** is designed to solve these problems—automatically. This tool helps you generate clear, accurate, and SEO-friendly Markdown documentation for your wikis and repositories, saving you hours and improving collaboration.

{{< youtube 6hUmTh4KcL4 >}}

## Why Documentation Matters

Documentation is often overlooked in the development lifecycle. Without it, teams can struggle to understand:
- What tables, relationships, or option sets are in a solution.
- Which roles have which privileges.
- How workflows are configured and triggered.

This extension removes that pain by automating the process. Run it as part of your pipeline, and instantly get up-to-date documentation every time you export your solutions.

## Installing the Extension

1. Head over to the **[Azure DevOps Marketplace](https://marketplace.visualstudio.com/items?itemName=mightoraio.mightora-power-platform-devOps-extension)**.
2. Search for **Power Platform Documentation Extension**.
3. Click **Get it free** and choose your DevOps organisation.
   - If you’re not an admin, you can still **request installation** from your administrator.
4. Once approved, the extension will be available in your organisation.

## Adding Documentation to Your Pipeline

To use the extension, add it as a step in your pipeline:

- **Export and unpack** your solution (using your existing tasks).
- **Add a documentation step**, for example:
  - Generate **Table Documentation**
  - Generate **Roles Documentation**
  - Output files as **single Markdown** or split by table.
- Point the extension to your **unpacked solution location** and your **wiki/output folder**.

Once the pipeline runs, you’ll see a new folder (for example `/wiki/solutions/YourSolutionName`) containing your Markdown files.

### Example Output

After running the extension, you’ll get Markdown tables like this:

| Column Name | Type   | Description       |
|-------------|--------|-------------------|
| test1       | String | (no description) |
| test2       | String | Example column   |

Open these files in preview mode in Azure DevOps and you’ll see clean, well-structured documentation.

## Features Available

The extension currently supports:
- **Table Documentation Generator**
- **Entity Relationship Diagrams (ERD)**
- **Option Set Documentation**
- **Roles and Privileges Documentation**
- **Workflow Documentation** (currently in preview)
- **Solution Manifest Documentation**

Each feature generates Markdown output that you can store in a wiki, repository, or publish as part of your CI/CD pipelines.

## Why Choose This Extension?

- **Automated, always up-to-date documentation**—no more manual edits.
- **SEO-friendly Markdown** for better search visibility in wikis and repos.
- **Easy integration** with Azure DevOps pipelines.
- **Supports ERDs, roles, option sets, and more** for complete solution coverage.
- **Saves time and reduces errors** for teams and solo makers alike.

## Where to Get It

- [Official product page — detailed docs & screenshots](https://mightora.io/tools/cicd/power-platform-documentation-extension/)
- [Visual Studio Marketplace listing — install for your Azure DevOps org](https://marketplace.visualstudio.com/items?itemName=mightoraio.mightora-power-platform-devOps-extension)

## Get Started — Quick Steps

1. Install the extension from the Marketplace link above.
2. Add a pipeline step after your solution export/unpack task that points to the unpacked solution folder.
3. Configure output options (single Markdown file or split by table) and an output path (for example: /wiki/solutions/YourSolutionName).
4. Run your pipeline and review the generated Markdown in the output location or in your DevOps wiki.

If you want help integrating the extension into an existing pipeline, drop a comment below or reach out via the links on the product page.

👉 Try it today and let your documentation keep pace with your development. If you found this useful, please share with your network or leave feedback below!
