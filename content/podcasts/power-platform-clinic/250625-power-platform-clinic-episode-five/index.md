---
title: "Power Platform Clinic – Episode 5: Converting Forms with Images to PDF"
description: "In Episode 5 of the Power Platform Clinic, Duncan and Ian walk through converting a Microsoft Form—complete with text and image uploads—into a structured PDF using Power Automate. This proof of concept demonstrates data handling, file encoding, dynamic HTML generation, and emailing the final document."
tags:
  - Power Automate
  - Forms
  - HTML
  - PDF
  - Power Platform Clinic
categories:
  - Power Platform Clinic
menu:
  podcasts:
    name: Episode 5
    identifier: podcast-episode-five
    parent: podcast-ppc
    weight: 50
aliases:
  - /posts/250625-power-platform-clinic-episode-five/
date: 2025-06-25T00:00:00+01:00
publishDate: 2025-06-25T00:00:00+01:00
lastmod: 2025-06-25T00:00:00+01:00
author: "itweedie"
authorLink: "https://iantweedie.biz"
resources:
- name: "featured-image"
  src: "thin.png"
- name: "featured-image-preview"
  src: "large.png"
hero: large.png
lightgallery: true
draft: false
---

<!--more-->

## Introduction

In this episode of the **Power Platform Clinic**, Ian (that’s me!) tackles a real-world community question: 

> *Is it possible to convert a Microsoft Form that contains both text and images into a PDF using Power Automate?*

As usual, we go deep on the technical side—pulling data, parsing responses, handling images, encoding files as base64, generating dynamic HTML, and finally converting it all to a PDF and emailing it out.

This is a proof-of-concept walkthrough using standard Power Automate connectors—no premium, no external APIs, and no code hosting needed.


{{< youtube 22SL8thkPmo >}}


## What We Covered

### 🧾 The Scenario

- A Microsoft Form allows users to enter text and upload an image.
- We want to capture the form data and generate a PDF.
- The image should be embedded directly into the PDF, not linked separately.

### 🛠️ The Flow Design

1. **Trigger:** When a form response is submitted.
2. **Scope Try-A:** Get response details and parse the JSON.
3. **HTML Compose:** Generate a valid HTML structure using Compose actions, injecting form responses and base64-encoded images.
4. **Conversion:** Save the HTML to OneDrive, then use the built-in “Convert to PDF” action.
5. **Email:** Send the final PDF as an attachment.

### 🖼️ Image Handling

This was the tricky part:

- Images uploaded in Microsoft Forms are stored in the responder's OneDrive.
- We retrieved the file path and then used `decodeUriComponent()` to convert it into a valid format.
- From there, we used “Get File Content Using Path” to get the base64 body.
- That base64 string was embedded directly into an `<img>` tag inside the HTML.

### 📄 Building the HTML

We built the structure dynamically:

```html
<h2>Questionnaire</h2>
<table>
  <tr>
    <th>Question</th>
    <th>Response</th>
  </tr>
  <tr>
    <td>Here is question one</td>
    <td>[Dynamic Text Response]</td>
  </tr>
  <tr>
    <td>Image</td>
    <td><img src="data:image/png;base64,[Dynamic Base64]" /></td>
  </tr>
</table>
```

We also made this dynamic by setting the image `contentType` dynamically using expressions like:

```plaintext
body('Get_file_content_using_path')?['$content-type']
```

This means your flow works whether someone uploads a PNG, JPEG, or GIF.

### ✉️ Sending the PDF

We wrapped up by converting the HTML to a PDF using OneDrive’s native “Convert File” action and emailing the result with `Send Email (V2)`.

The attachment file name was dynamically set using the `utcNow()` expression, like:

```plaintext
utcNow() & '.pdf'
```

## 🧪 Proof of Concept Success

We tested the end-to-end flow live:

- Microsoft Form submitted with text and image ✅  
- PDF generated with embedded base64 image ✅  
- Email sent with correct attachment ✅  
- Flow structured using scopes for clear error handling (Try A, Try B, Try C) ✅  

## Key Learnings

- 🧠 Working with Microsoft Forms and file uploads can be fiddly—but Power Automate handles it with some clever expressions.
- 🛠️ Always structure flows using Scopes. It helps make error handling easier and documentation cleaner.
- 📩 Embedding images as base64 in HTML is a great trick when sending visual PDFs.

## Coming Next

Stay tuned for the next Power Platform Clinic! As always, if you’ve got questions, submit them at:

🔗 https://powerplatformclinic.github.io

Or comment on the video—we’re always on the lookout for the next fun challenge!

---

Got a tricky Power Platform scenario? Comment, subscribe, and we might tackle your problem in the next episode!
