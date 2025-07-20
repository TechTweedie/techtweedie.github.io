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

# Automatically Tag DevOps Work Items by Email

This episode of the Power Platform Clinic was all about solving a common pain point: updating DevOps boards when conversations are happening outside the tool—like over email.

If you’ve ever had to manually keep your boards in sync after emailing a supplier, then this episode’s solution is for you. We show how to use **Power Automate** and **plus addressing** to send email content straight into Azure DevOps work items.

{{< youtube FgAxJkx6Zyk >}}

---

## Why This Is Useful

Sometimes you just need to chase something or someone by email—and you want that trail to be reflected in DevOps for visibility.

Instead of copying and pasting manually or creating duplicate entries, this approach uses **plus addressing** to route emails directly to the relevant DevOps ticket via a shared inbox and Power Automate.

---

## What is Plus Addressing?

If your environment supports it (and most do), you can use email aliases like:

```
ian+123@yourdomain.com
```

That `123` can represent your DevOps work item ID. Any email sent to this alias will still land in your regular inbox (or a shared one) and lets you extract the ID using Power Automate.

---

## The Flow Setup

Here’s a breakdown of the Power Automate Flow:

### ✅ Trigger: When a new email arrives
We use Office 365 Outlook to trigger the flow.

```text
Trigger: When a new email arrives (V3)
```

### 🛠️ Scope A: Prepare the Work Item ID
- Compose: Extract the ID using Copilot or a custom expression
- Convert HTML email body to plain text

```PowerAutomate
// Insert compose expressions here
```

---

### 📡 Scope B: Send to Azure DevOps

This is where we take the clean email body and make an HTTP call to Azure DevOps, adding the email as a comment to the work item.

```http
// Insert HTTP request code here
```

---

## 🧠 Debugging and Filtering

We ran into a great debugging scenario live on the call, and walked through using:

- `toUpper()` to normalize email addresses
- `split()` to handle multiple addresses
- `filter()` to isolate the plus-addressed item

We then adjusted the expressions to work even if multiple recipients are listed.

```PowerAutomate
// Insert the refined expressions here
```

---

## 🎯 Final Result

Once set up, this flow will let you:

- Email a shared inbox using a plus-addressed alias
- Automatically extract the work item ID
- Strip out the email body
- Add it as a comment to the right DevOps ticket

And yes—it even works with multiple email recipients (after a little tweak).

---

## Summary

A great practical automation to keep your boards up to date, especially when working across boundaries.

If you'd like to grab the full expressions or flow code, check back here shortly for the download link.

Let me know if you’d like to add this to your DevOps extensions on [Mightora.io](https://mightora.io) 👇

---

🎥 Watch the full episode here:  
[https://youtube.com/watch?v=FgAxJkx6Zyk](https://youtube.com/watch?v=FgAxJkx6Zyk)

🧠 Got a question for a future Clinic?  
Submit here: [https://powerplatformclinic.github.io](https://powerplatformclinic.github.io)