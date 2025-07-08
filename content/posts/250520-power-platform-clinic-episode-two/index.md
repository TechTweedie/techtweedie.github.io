---
title: "Power Platform Clinic – Episode 2"
description: "In this episode of the Power Platform Clinic, Duncan and Ian discuss validating email domains using Power Automate, and Duncan shows how to create a Power BI app to collate reports for users."
tags:
  - Power Platform Clinic
  - Power Automate
  - Power BI
  - Email Validation
categories:
  - Power Platform Clinic
date: 2025-05-20T00:00:00+01:00
publishDate: 2025-05-20T00:00:00+01:00
lastmod: 2025-05-20T00:00:00+01:00
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

Welcome to Episode 2 of the Power Platform Clinic with Duncan and Ian!

{{< youtube N8XHipg1HPk >}}

In this episode:

### ✅ Validating Email Domains with Power Automate

Ian shares a powerful, free way to validate email domains using Power Automate, showing:

- Why validating the entire email address is tricky without sending a link
- How to split out the domain using the split function
- Using the **CheckDomain** connector to confirm whether a domain exists and can receive emails
- How this approach avoids the costs of third-party services and can be used with data from anywhere: Dataverse, Excel, or SharePoint

Ian walks through building the flow step by step, demonstrating how it splits the email, checks the domain, and writes the result back to a field in Dataverse to clean up data input.

### ✅ Collating Reports into a Power BI App

Duncan then dives into Power BI to show:

- How to create an app to group reports together for easy access
- Using the app to share reports with the whole organisation or specific groups
- Tips for embedding reports in Teams for easy mobile access by managers and leadership
- Key licensing considerations when deploying Power BI apps across your organisation

### 💡 Key Takeaways

- **Email validation** using Power Automate and the CheckDomain connector can significantly improve your data quality without paid tools.
- **Power BI apps** make accessing reports easier for end users and simplify sharing across Teams and devices.

---

We hope you find these insights useful for your next project!

Stay tuned for the next episode, where we continue to tackle real-world Power Platform questions from the community.

👉 **Have a question for us?** Drop it in the comments below or reach out via [Power Platform Clinic GitHub](https://powerplatformclinic.github.io).

---

*For more detailed walkthroughs, demos, and free tools, check out other posts on the blog and subscribe to our YouTube channel.*
