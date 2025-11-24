---
title: "Query Parameters on HTTP Trigger"
description: "When your flow is triggered via an HTTP request, it might need to behave differently based on the values passed through query parameters. For instance, you may want your flow to process data differently depending on a user ID or a specific action indicated in the URL."
tags:
  - HTTP Trigger
  - Automation
categories:
  - Power Automate
  - Power Platform
date: 2022-04-03T19:00:00+01:00
lastmod: 2024-07-05T19:45:40+08:00
author: "itweedie"
authorLink: "https://iantweedie.biz"
resources:
- name: "featured-image"
  src: "featureImage.png"
- name: "featured-image-preview"
  src: "featureImage.png"
lightgallery: true
draft: false
---

<!--more-->


## Introduction

Working with Power Automate, especially with HTTP triggers, can unlock a lot of potential in automating tasks and workflows. A common requirement is to use query parameters from the trigger URL within your flow. I’ve found a straightforward method to do this and thought it might be helpful to share.

When your flow is triggered via an HTTP request, it might need to behave differently based on the values passed through query parameters. For instance, you may want your flow to process data differently depending on a user ID or a specific action indicated in the URL. 

## How to Access Query Parameters

To access these query parameters directly in your flow, you can use a simple expression right after the HTTP request trigger. Here’s how:

### Step 1: Start with the HTTP Request Trigger

Your flow should begin with an HTTP request trigger which listens for incoming requests.

### Step 2: Use the Expression to Access Parameters

To grab a query parameter, use the expression:

`@triggerOutputs()[‘queries’][‘yourQueryParamName’]`

Replace yourQueryParamName with the name of your query parameter.

For example, if your HTTP request includes a query parameter called userId, you can access it like so: `@triggerOutputs()[‘queries’][‘userId’]`

This lets you use the userId in subsequent steps of your flow, such as filtering database queries or customising responses.

## Conclusion

This method is a straightforward way to make your Power Automate flows more dynamic and responsive to the inputs they receive. I hope this tip helps you as much as it has helped me.

Feel free to share your experiences or any other useful tips for working with HTTP triggers in Power Automate.

This version is less dramatic and focuses directly on the information and steps involved in accessing query parameters within Power Automate. The accompanying image is designed to complement the post by visualizing the concept of automation in a calm and productive workspace.