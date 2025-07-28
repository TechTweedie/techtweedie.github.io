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


[![](https://mermaid.ink/img/pako:eNp9Ul1r4zAQ_CtCD_dSJ_hDThM_HDhJSwtXGqiPg9qlqPE2MWdLRlqX5EL-e9dx2hPluNWLVpqZnbF84GtdAk_4xsh2y7JloRiV7V6Gg9RneWb2zykbsasdGrlGdtXIqn4agH2lQb7QTastEAj1z7YF88RGo-8sDZ0b29YVurRwwET5dVUjGCaNkXsCLrRCWSnLLtKyNGCtS4oGknCErytjkd1JXG_PSFBlob4mGYLMnSC_tPnNbhEadrtk3_q5b2CQ3WR3P9yRsTPrg0qEzlZq0-tbNLQ7J57krgx9DpbBDv_jaz74WpD4SlMOYizh7b51U8-D_CbLVmx1_5D1gL_GyVkD6h_69HAnP-fu1My5xxsw9Hwlvfihvyo4bqGBgie0LeFVdjUWvFBHgsoO9cNerXmCpgOPG91ttjx5lbWlrmtLibCsJMVoPk9bqR61bj4o1PLkwHc8CYUYCzGZCeGLWRBPw9Dje55MZuOpH0WxH0QipnV59Pifk4A_nl7GvlOBRz9p7_zshsKCWehOIckEx3dv4tb_?type=png)](https://mermaid.live/edit#pako:eNp9Ul1r4zAQ_CtCD_dSJ_hDThM_HDhJSwtXGqiPg9qlqPE2MWdLRlqX5EL-e9dx2hPluNWLVpqZnbF84GtdAk_4xsh2y7JloRiV7V6Gg9RneWb2zykbsasdGrlGdtXIqn4agH2lQb7QTastEAj1z7YF88RGo-8sDZ0b29YVurRwwET5dVUjGCaNkXsCLrRCWSnLLtKyNGCtS4oGknCErytjkd1JXG_PSFBlob4mGYLMnSC_tPnNbhEadrtk3_q5b2CQ3WR3P9yRsTPrg0qEzlZq0-tbNLQ7J57krgx9DpbBDv_jaz74WpD4SlMOYizh7b51U8-D_CbLVmx1_5D1gL_GyVkD6h_69HAnP-fu1My5xxsw9Hwlvfihvyo4bqGBgie0LeFVdjUWvFBHgsoO9cNerXmCpgOPG91ttjx5lbWlrmtLibCsJMVoPk9bqR61bj4o1PLkwHc8CYUYCzGZCeGLWRBPw9Dje55MZuOpH0WxH0QipnV59Pifk4A_nl7GvlOBRz9p7_zshsKCWehOIckEx3dv4tb_)

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
@substring(
  outputs('EMAIL'),
  add(
    indexOf(outputs('EMAIL'), '+'),
    1
  ),
  sub(
    indexOf(outputs('EMAIL'), '@'),
    add(
      indexOf(outputs('EMAIL'), '+'),
      1
    )
  )
)
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

## Download the Solution & Flow

You can download the ready-to-import Power Platform solution and the Leglsey Power Automate flow from the public GitHub repository:

[https://mars.mightora.io/yourls/250720github](https://mars.mightora.io/yourls/250720github)

- The `/solutions/` folder contains the solution ZIP files (managed and unmanaged).
- The `/flows/` folder contains the Leglsey Power Automate flow ZIP file.
- See the repository README for import instructions.

---

🎥 Watch the video: [https://mars.mightora.io/yourls/250720yt](https://mars.mightora.io/yourls/250720yt)  
❓ Got a question? Submit it here: [https://powerplatformclinic.github.io](https://powerplatformclinic.github.io)