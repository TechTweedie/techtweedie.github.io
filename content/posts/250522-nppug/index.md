---
title: "Enabling Low-Code Developers to Create Custom Client Reports with a Helping Hand from Azure – Norfolk Power Platform User Group"
description: "In this session at the Norfolk Power Platform User Group, I shared how low-code developers can create secure, custom client reports using Power Automate and Azure. Learn about reverse proxy functions, integrating Azure Functions with Power Automate, and deploying the solution in your own environment."
tags:
  - Power Platform
  - Power Automate
  - Azure Functions
  - Community Event
categories:
  - Community
date: 2025-05-12T06:00:00+01:00
publishDate: 2025-05-12T06:00:00+01:00
lastmod: 2025-05-12T06:00:00+01:00
author: "itweedie"
authorLink: "https://iantweedie.biz"
resources:
- name: "featured-image"
  src: "image.png"
- name: "featured-image-preview"
  src: "image.png"
lightgallery: true
draft: false
---

# Enabling Low-Code Developers to Create Custom Client Reports with a Helping Hand from Azure – Norfolk Power Platform User Group

📅 **Date:** 22nd May 2025  
📍 **Location:** Norwich Digital Hub  
🍕 **Pizza included!**

## Session Overview

At the Norfolk Power Platform User Group, I delivered a session titled:

✨ **“Enabling low-code developers to create custom client reports with a helping hand from Azure”**

In this session, I explored:

- Using Power Automate to generate custom reports securely.  
- How to leverage an **Azure Function as a reverse proxy** to enhance security and scalability.  
- An architectural pattern that integrates **Dataverse, Power Automate, SharePoint, and Azure Functions** to deliver dynamic, client-ready PDFs via secure links.

## Presentation Slides

You can view my full presentation here:

➡️ [View the Presentation Slides](https://itweedie.github.io/flowproxy/250522-nppug/#/)

## GitHub Repository

The demo and solution shared in this session are available on GitHub:

➡️ [AzureFunction-PowerAutomateProxy Repository](https://github.com/itweedie/AzureFunction-PowerAutomateProxy)

This repository includes:

- An **Azure Function HTTP Proxy** that authenticates requests and forwards them to your Power Automate Flow.
- Full support for **GET, POST, and OPTIONS methods**.
- Configurable environment variables to avoid hardcoded URLs or keys.
- Deploy-to-Azure templates for quick deployment into your own environment.

## Key Features of the Solution

✅ Forwards all headers from the incoming request.  
✅ Adds a custom `Flow-Key` header (from environment variables).  
✅ Appends query parameters to the external URL dynamically.  
✅ Provides a robust pattern for **securely exposing Power Automate flows as web endpoints**.

## Try It Out

If you’re interested in setting up this pattern for your own client reporting requirements, follow these steps:

1. Access the [GitHub repo](https://github.com/itweedie/AzureFunction-PowerAutomateProxy).  
2. Deploy using the **Deploy to Azure** button provided in the README.  
3. Import the **Power Platform solutions** to your environment.  
4. Configure your environment variables with your Logic App or Flow URL and secret key.  
5. Test your new secure reverse proxy-enabled flow!

## Why This Matters

Many organisations need to provide custom PDF or HTML reports to clients securely without exposing their backend systems. Combining **Power Automate for report generation** with **Azure Functions for authentication and reverse proxying** provides a scalable, secure, and low-code approach to achieve this.

## Event Registration Link

Here is the original event registration link for reference:

➡️ [Event Registration – Norfolk Power Platform User Group](https://lnkd.in/eMxdRaBH)

---

💡 **Want to know more?**  
Reach out if you’re interested in deploying this pattern in your organisation or have questions about Azure Functions and Power Automate integration.

---

*Thank you to everyone who attended the session. It was great to see so much interest in combining low-code solutions with pro-code architecture to deliver real business value.*
