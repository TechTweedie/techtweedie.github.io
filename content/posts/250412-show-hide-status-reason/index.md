---
title: "Show and Hide Tabs Based on Status Reason in Model Driven Apps"
description: "In this post, I share a simple JavaScript snippet you can use in Model-Driven Apps to show or hide tabs based on the Status Reason of a record. It’s clean, easy to implement, and great for improving the user experience."
tags:
  - JavaScript
  - Model Driven App
  - Status Reason
  - UX
categories:
  - Power Platform
date: 2025-04-12
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

## Introduction

Ever wanted to show or hide a tab in a **Model-Driven App** based on the **Status Reason** of a record? Maybe you’ve got a section of a form that’s only relevant when a record hits a specific state — like “Approved” or “Rejected”?

This post walks you through a reusable JavaScript snippet I’ve shared on GitHub that **dynamically toggles tab visibility** based on the **statuscode** field.

## Why This Is Useful

Sometimes users don’t need to see everything all the time. Maybe you’ve got a whole section for post-approval actions — or maybe you want to hide advanced options until a record is in a specific state.

Rather than relying on Business Rules (which can’t target tabs), or overcomplicating things with multiple forms, a bit of client-side JavaScript is just the trick.

## What It Does

This script listens for changes to the **Status Reason** field and shows/hides a tab (`tab3` in this case) depending on the value:

- If **Status Reason = 1** → hide the tab  
- If **Status Reason = 304880001** → show the tab  
- For all other statuses → hide the tab by default

You can easily customise the status values and tab name to suit your scenario.

## How to Use It

### 1. Download or copy the snippet

You can grab the full snippet from GitHub here:  
👉 [View on GitHub](https://github.com/itweedie/PowerPlatform-JavaScript-Snippets/blob/main/Model-Driven-App/show-hide-based-on-StatusReason.js)

Or copy it below:

```javascript

"use strict";

function toggleByStatusReason(executionContext) {
    console.log("==== START show/hide Status Reason ===="); // Start log

    // Get the form context from the execution context
    const formContext = executionContext.getFormContext();
    console.log("Retrieved form context.");

    // Get the Status Reason value (statuscode column)
    const status = formContext.getAttribute("statuscode").getValue(); // Status Reason
    console.log(`Status Reason value retrieved: ${status}`);

    // Get the tab to show/hide (tab3)
    const tab = formContext.ui.tabs.get("tab3");
    if (tab) {
        console.log("Tab 'tab3' found.");

        // Decision-making based on the Status Reason value
        if (status === 1) {
            console.log("Status Reason is 'Status One' (value: 1). Hiding tab3.");
            tab.setVisible(false); // Hide tab3
        } else if (status === 304880001) {
            console.log("Status Reason is 'Status Two' (value: 304880001). Showing tab3.");
            tab.setVisible(true); // Show tab3
        } else {
            console.log(`Status Reason is an unhandled value (${status}). Defaulting to hiding tab3.`);
            tab.setVisible(false); // Default to hiding tab3 for other values
        }
    } else {
        console.log("Tab 'tab3' not found. No action taken.");
    }

    console.log("==== END show/hide Status Reason ===="); // End log
}

function registerOnChangeEvent(executionContext) {
    console.log("Registering OnChange event for Status Reason...");

    // Get the form context from the execution context
    const formContext = executionContext.getFormContext();
    console.log("Retrieved form context.");

    // Get the Status Reason attribute (statuscode column)
    const statusAttribute = formContext.getAttribute("statuscode");
    if (statusAttribute) {
        console.log("Status Reason attribute found. Registering OnChange event handler.");

        // Register the toggleByStatusReason function for the OnChange event
        statusAttribute.addOnChange(toggleByStatusReason);

        // Call the function initially to set the correct visibility on form load
        console.log("Calling toggleByStatusReason initially to set visibility on form load.");
        toggleByStatusReason(executionContext);
    } else {
        console.log("Status Reason attribute not found. OnChange event handler not registered.");
    }
}
```

### 2. Update the script

1. Update the tab name in your version of the javascript script to match the tab name in your model driven app form.

### 3. Add it to your solution

1. In your solution, navigate to **Web Resources**.
2. Upload a new JavaScript file (e.g. `statusReasonToggle.js`).
3. Paste in the code.
4. Publish.

### 4. Hook it up in the Form Editor

1. Open the form you want to target.
2. Go to **Form Properties**.
3. Add your new JavaScript Web Resource.
4. Under **Events**, for the **Form OnLoad**, call `registerOnChangeEvent`.
5. Pass in the form context
6. Save and publish the form.

### 5. Test It Out

Now when you load a record, or change the **Status Reason**, the tab will show or hide automatically based on the logic you’ve defined. Nice and clean.

## Notes

- This script uses **console.log** statements throughout — which makes it really easy to troubleshoot using browser dev tools.
- You’ll need to replace `tab3` with the name of the tab on your own form.
- Adjust the numeric values (`1`, `304880001`) to match your own **Status Reason options**.

## Final Thoughts

This is one of those tiny bits of polish that makes a big difference for your users. A cleaner interface, less noise, and a better user experience — with just a few lines of JavaScript.

If you find this useful, feel free to ⭐ the GitHub repo or fork it for your own snippets!

If you’ve got a similar problem or want to do something more complex — drop me a message. Always happy to help.

Happy building!
