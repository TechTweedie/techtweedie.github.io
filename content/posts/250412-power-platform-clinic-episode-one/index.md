---
title: "Power Platform Clinic Episode 1"
description: "Welcome to the very first episode of Power Platform Clinic! In this session, Duncan and Ian tackle two real-world Power Platform questions: showing/hiding tabs dynamically in model-driven apps and understanding calculated columns vs measures in Power BI."
tags:
  - Power Platform
  - Power Automate
  - Power BI
  - Model Driven Apps
categories:
  - Power Platform Clinic
date: 2025-04-12T00:00:00+01:00
publishDate: 2025-04-12T00:00:00+01:00
lastmod: 2025-04-12T00:00:00+01:00
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

## Introduction

Welcome to the very first episode of **Power Platform Clinic** with Duncan and Ian.

{{< youtube xWqKIG3GvN8 >}}

In this episode:

### ✅ Topic 1 – Show/Hide Tabs Dynamically in Model Driven Apps

Ian walks through how to show or hide a whole tab in a model-driven app based on the value of a field, such as **Status Reason**. The demo covers:

- Why you might want to hide/show tabs  
- A full explanation of the JavaScript snippet used  
- How to upload and register the script in your form libraries  
- Gotchas to watch out for (like needing to register the event handler onload and onchange)  
- Testing the functionality and reviewing console logs to understand what's happening under the hood

👉 This approach is especially useful when you only want tabs visible at specific record statuses instead of toggling individual fields.

### ✅ Topic 2 – Calculated Columns vs Measures in Power BI

Duncan takes over to demystify when to use calculated columns vs measures in Power BI, including:

- How calculated columns are stored in the model and increase dataset size  
- How measures calculate dynamically based on report context  
- Use cases for each, including slicing, relationships, and dynamic calculations  
- Performance considerations for model refresh times and visuals  
- Best practice tips on organising measures in a dedicated Measures table

🔎 **Key takeaway:**  
Use calculated columns when you need a static value for slicing or relationships, and measures for dynamic aggregations like KPIs and totals.

## 👥 Get Involved

Have a Power Platform question you want answered on the Clinic? Drop it in the comments, reach out on LinkedIn, or send a carrier pigeon (we’re flexible).

---

**🙏 Thanks for watching.**  
If you found this episode helpful, please **like, subscribe, and share** to support the channel and help others in the community.

---

> **About Power Platform Clinic**  
> A community-driven video series where Duncan Boyne and Ian Tweedie answer real questions from the Power Platform world, covering everything from Model Driven Apps to Power BI to DevOps and beyond.
