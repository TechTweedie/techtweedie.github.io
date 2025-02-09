---
title: "Send Emails from Flow without a Service Account"
description: ""
tags:
  - Power Automate
categories:
  - Azure
date: 2025-02-08T09:00:00+01:00
lastmod: 2025-02-08T09:00:00+01:00
author: "itweedie"
authorLink: "https://iantweedie.biz"
resources:
- name: "featured-image"
  src: "featureImage.png"
- name: "featured-image-preview"
  src: "featureImage.png"
lightgallery: true
draft: true
---
Want to send emails from a **Power Automate Flow** but **Can't** or **Don't want to** use a Service Account. Don't wan't to worry about Conditional Access Policy's, Password changes, and having to re-log in every few months. No need to worry about re-confirming policy's or Security information every 180 days.

Well today I am going to show you how you can send am email from Microsoft Exchange from a Power automate Flow using just a App Registration. I am going to share a Custom Connector with you I have created to enable you do to this. Then share with you how to Create the App Registration, permission the app registration, and how you can limit which email accounts the app registration can send from within exchange. 


## What you will need 


## Steps - App Registration    
For this section you will need the following permissions
- Exchange Administrator  


### Step 1 - Log in to Entra 
Go to https://entra.microsoft.com and log in with your user account

### Step 2 - Create the app registration  
- When you are on the Entra Overview page navigate to **Applications** in the left hand menu
and then open up **App Regestrations**. 
- From there select **New Regestration**.
- A new screen will open, give your new app registration a name and then click next.

![alt text](brave_T1ciTpvWmI.gif)

### Add API permission
We then need to give our App Registration an API Permission. 
- In the left hand menu click on **API Permission**
- Click on **Add permission**
- A window will then open, select **Application Permission**
- Then using the search box type in **mail.send** 
- THe list will then filter, as it does open up the **Mail** option and select **mail.send**

> **NOTE:** Yes this permission lets your send emails as anyone, however we will restrict this later. **DO NOT MISS USE IT IS POSSILE TO TRACK WHERE AN EMAIL CAME FROM**

![alt text](brave_pyTrq7A2fH.gif)

### Grant Admin consent 
You will notice that the Grant admin consent is grayed out

This is becuse currently we have no administraton roles


## Steps - Limiting application permissions to specific Exchange Online mailboxes
https://learn.microsoft.com/en-us/graph/auth-limit-mailbox-access


## Steps - Download and testing the connector