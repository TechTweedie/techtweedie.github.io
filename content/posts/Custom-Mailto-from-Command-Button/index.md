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
draft: true
---

Hello there! Today, let’s unwrap a neat trick for those using Model-Driven Apps within the Dynamics 365 or Power Platform universe. The goal? To effortlessly send email notifications from a record, using a clever bit of JavaScript magic. This could be a game-changer for keeping your team in sync with account updates, without the fuss of manual updates.

## Why It Matters

In the whirlwind of managing customer accounts, staying ahead with real-time updates is key. Imagine you’ve got a plethora of accounts, each bustling with activity. You’d want your team to get instant notifications about important changes, right? Enter our solution: a straightforward script that triggers an email notification, leveraging the humble yet powerful mailto link.

## The Solution

Let’s break down this script, shall we? It’s a journey through fetching crucial data, crafting a message, and finally, launching an email draft in a flash. Here’s how it unfolds:

**1. Identifying the Record**

First off, we need to know which account record we’re dealing with. This snippet grabs the record’s unique ID straight from the form context. It’s like pinpointing the exact book you need from a vast library.
```JavaScript
var entityId = formContext.data.entity.getId().replace('{', '').replace('}', '');
```

**2. Fetching Account Details**

With the record ID in hand, we’re off to gather some details. This involves making a call to retrieve the account’s information, particularly looking out for the account’s name and the owner’s ID. It’s akin to gathering the ingredients before baking a cake.

```JavaScript
Xrm.WebApi.retrieveRecord("account", entityId).then( function success(account) {...}, function(error) {...} );
```
**3. Getting the Owner’s Email**

Now, we’ve got the account’s owner ID. The next step? Fetch the email address of this owner from the system user records. This is crucial because it tells us where our email notification is headed.

**4. Crafting the Email**

Here’s where the creativity kicks in. We piece together the email content, including a direct link to the account record. It’s all about making sure the recipient can jump straight to the details with a single click.

```JavaScript
var mailtoLink = `mailto:?cc=${ccEmail}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; window.open(mailtoLink, '_blank');
```

This line conjures up an email draft in the default mail client, pre-filled with all the details. It’s like setting the stage for a play, with every actor in place, ready for the curtain to rise.

## The Full Script

After touring through the script, step by step, here’s the entire ensemble, ready to take its place in your Model-Driven App:

```JavaScript
function sendEmail(primaryControl, UserLcid) {
    var formContext = primaryControl;
    var entityId = formContext.data.entity.getId().replace('{', '').replace('}', ''); // Remove curly braces
 
    // Retrieve current account record
    Xrm.WebApi.retrieveRecord("account", entityId).then(
        function success(account) {
            var ownerId = account._ownerid_value;
            var accountName = account.name; // Assuming 'name' is the field for account's name
 
            // Retrieve current owner's email address
            Xrm.WebApi.retrieveRecord("systemuser", ownerId).then(
                function success(systemUser) {
                    var ccEmail = systemUser.internalemailaddress;
 
                    var subject = accountName;
                    var currentHost = window.location.hostname;
 
                    // Get AppId
                    Xrm.Utility.getGlobalContext().getCurrentAppProperties().then(
                        function (appProperties) {
                            var appId = appProperties.appId;
                            console.log("App ID: " + appId);
                            var body = "Hello, I need to contact you about this record: https://" + currentHost + "/main.aspx?appid=" + appId + "&pagetype=entityrecord&etn=account&id=" + entityId;
                            var mailtoLink = "mailto:?cc=" + ccEmail + "&subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
                            window.open(mailtoLink, '_blank');
                        },
                        function (error) {
                            console.log("Error retrieving appId: " + error);
                            formContext.ui.setFormNotification(
                                "Error retrieving appId: " + error,
                                "ERROR",
                                "001"+ error.code );
                        }
                    );
 
                },
                function(error) {
                    console.log("Error retrieving owner email address: " + error.message);
                    formContext.ui.setFormNotification(
                        "Error retrieving owner email address: " + error.message,
                        "ERROR",
                        "001"+ error.code );
                }
            );
 
        },
        function(error) {
            console.log("Error retrieving account: " + error.message);
            formContext.ui.setFormNotification(
                "Error retrieving account: " + error.message,
                "ERROR",
                "001"+ error.code );
        }
    );
}
```

