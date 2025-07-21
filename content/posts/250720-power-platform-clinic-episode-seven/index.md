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

## 🗺️ Flow Overview

```mermaid
graph TD
    subgraph A0 [Scope Try_A0 - Extract Email]
        A1[Compose - toUpper] --> A2[Compose - split]
        A2 --> A3[Filter array - Contains +Address]
        A3 --> A4[Compose - First Match]
    end

    subgraph A [Scope Try_A - Extract Work Item ID & Convert HTML]
        A5[Compose - Extract ID using substring] --> A6[Convert HTML to Text]
    end

    subgraph B [Scope Try_B - Post to DevOps]
        B1[HTTP POST to Work Item Comment]
    end

    A0 --> A
    A --> B
```

---

## 🔧 Key Expressions

### Extract Recipient Email (Uppercase & Split)
```powerautomate
@toUpper(triggerOutputs()?['body/toRecipients'])
```

```powerautomate
@split(outputs('GET_ID0'),';')
```

### Filter to Find +Address
```powerautomate
@contains(item(),'DUNCAN.BOYNE')
```

### Extract Work Item ID
```powerautomate
@substring(outputs('EMAIL'), add(indexOf(outputs('EMAIL'), '+'), 1), sub(indexOf(outputs('EMAIL'), '@'), add(indexOf(outputs('EMAIL'), '+'), 1)))
```

### HTTP POST to Azure DevOps
```json
{
  "workItemId": "@{outputs('GET_ID')}",
  "text": "@{body('Html_to_text')}"
}
```

---

## ✅ Result

This setup lets you:

- Email using plus addressing like `support+123@domain.com`
- Extract the DevOps ticket number
- Convert email body to plain text
- Post the content as a comment to the DevOps item

---

## Wrap-Up

It’s a simple, powerful way to ensure nothing gets missed—especially when your team lives in Outlook more than DevOps.

Want the full expressions and examples? Stay tuned for the downloadable version, or get in touch.

---

🎥 Watch the video: [https://youtube.com/watch?v=FgAxJkx6Zyk](https://youtube.com/watch?v=FgAxJkx6Zyk)  
❓ Got a question? Submit it here: [https://powerplatformclinic.github.io](https://powerplatformclinic.github.io)