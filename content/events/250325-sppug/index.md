---
title: "At the Scottish Power Platform User Group: Enabling Low-Code Developers to Create Custom Client Reports with a Helping Hand from Azure – Scottish Power Platform User Group"
description: "In this session at the Scottish Power Platform User Group, I shared how low-code developers can create secure, custom client reports using Power Automate and Azure. Learn about reverse proxy functions, integrating Azure Functions with Power Automate, and deploying the solution in your own environment."
tags:
  - Power Platform
  - Power Automate
  - Azure Functions
  - Community Event
categories:
  - Power Platform
  - Power Automate
  - Azure Functions
  - Community Event
menu:
  events:
    name: Scotland Mar 2025
    identifier: event-250325-sppug
    weight: 70
location: SWG3, 100 Eastvale Place, Glasgow
locationLat: 55.8672
locationLon: -4.2945
date: 2025-03-25T18:00:00+00:00
publishDate: 2025-03-25T18:00:00+00:00
lastmod: 2025-03-25T18:00:00+00:00
author: "itweedie"
authorLink: "https://iantweedie.biz"
resources:
- name: "featured-image"
  src: "image-1.png"
- name: "featured-image-preview"
  src: "image-2.png"
hero: image-2.png
lightgallery: true
draft: false
---

<!--more-->

📅 **Date:** 25th March 2025  
📍 **Location:** SWG3 Glasgow (100 Eastvale Pl, Stobcross Rd, Glasgow City)  
🕕 **Time:** 6:00 PM to 9:00 PM GMT

## Session Overview

At the Scottish Power Platform User Group, I delivered a session titled:

✨ **“Enabling low-code developers to create custom client reports with a helping hand from Azure”**

In this session, I explored:

- Using Power Automate to generate custom reports securely.  
- How to leverage an **Azure Function as a reverse proxy** to enhance security and scalability.  
- An architectural pattern that integrates **Dataverse, Power Automate, SharePoint, and Azure Functions** to deliver dynamic, client-ready PDFs via secure links.

## Presentation Slides

You can view my full presentation here:

➡️ [View the Presentation Slides](https://itweedie.github.io/flowproxy/250325-sppug/#/1)

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

Here is the event registration link:

➡️ [Event Registration – Scottish Power Platform User Group](https://www.meetup.com/scottish-power-platform-user-group/events/306536993/?utm_medium=referral&utm_campaign=announceModal_savedevents_share_modal&utm_source=link)

This event was proudly presented by the Scottish Power Platform User Group featuring sessions from community superstars Ian Tweedie and Duncan Boyne.
