---
title: "Power Platform Clinic Episode 7: Automatically Tag DevOps Tickets by Email"
description: "In this session of the Power Platform Clinic, we walk through a brilliant way to automatically post email content to Azure DevOps work items using Power Automate and plus addressing. If you're working with teams outside your scrum or chasing up suppliers, this trick can keep your board updated with zero manual effort."
tags:
  - Power Platform
  - Azure DevOps
  - Power Automate
  - Plus Addressing
  - Work Item Automation
categories:
  - Power Platform Clinic
date: 2025-07-20T00:00:00+01:00
publishDate: 2025-07-20T00:00:00+01:00
lastmod: 2025-07-20T00:00:00+01:00
author: "itweedie"
authorLink: "https://iantweedie.biz"
resources:
- name: "featured-image"
  src: "thin.png"
- name: "featured-image-preview"
  src: "lg.jpg"
lightgallery: true
draft: false
---

# Auto-Tag DevOps Tickets via Email using Power Automate

In this episode of the Power Platform Clinic, we explore how to keep Azure DevOps tickets updated when discussions happen over email.

{{< youtube FgAxJkx6Zyk >}}

---

## Why It’s Handy

You often need to chase suppliers or clients via email. This approach helps thread those email updates directly into DevOps using **plus addressing** and **Power Automate**.

---

## What You’ll Need

- A shared mailbox that supports plus addressing  
- Power Automate  
- Azure DevOps API

---

## Flow Overview

1. **Trigger** when a new email is received  
2. **Extract** the work item ID from the email address (e.g. `support+123@domain.com`)  
3. **Clean** the email content  
4. **Post** it as a comment to the corresponding DevOps work item

```powerautomate
// Placeholders for your expressions and HTTP request
```

---

## Wrap-Up

It’s a simple, powerful way to ensure nothing gets missed—especially when your team lives in Outlook more than DevOps.

Want the full expressions and examples? Stay tuned for the downloadable version, or get in touch.

---

🎥 Watch the video: [https://youtube.com/watch?v=FgAxJkx6Zyk](https://youtube.com/watch?v=FgAxJkx6Zyk)  
❓ Got a question? Submit it here: [https://powerplatformclinic.github.io](https://powerplatformclinic.github.io)