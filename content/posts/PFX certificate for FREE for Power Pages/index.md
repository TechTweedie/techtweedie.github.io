---
title: "PFX certificate for FREE for Power Pages"
description: "Do you want to deploy Power Pages on a custom domain securely without the need to buy a custom certificate? In this blog post, I’m going to show you how to do this quickly and easily acquire a PFX certificate that you can then use to deploy to Power Pages. "
tags:
  - Power Pages
  - Custom Domain
  - PFX Certificate
categories:
  - Power Platform
date: 2022-07-25T19:00:00+01:00
lastmod: 2024-07-08T19:45:40+08:00
author: "itweedie"
authorLink: "https://iantweedie.biz"
resources:
- name: "featured-image"
  src: "featureImage.png"
- name: "featured-image-preview"
  src: "featureImage.png"
lightgallery: true
draft: false
original: "https://helpmewithmy.technology/how-to-choose-what-dataverse-search-indexes-a-guide/"
---

<!--more-->

## Introduction

Do you want to deploy Power Pages on a custom domain securely without the need to buy a custom certificate? In this blog post, I’m going to show you how to do this quickly and easily acquire a PFX certificate that you can then use to deploy to Power Pages. 

## Pre-requisite

This is a brilliant tool for generating SSL, and it is simple to use and quick to deploy.

You can download the tool here; https://www.win-acme.com/

## Steps

Make sure you run the wacs.exe as an administrator

![Untitled](img/Untitled.png)

![Untitled](img/Untitled%201.png)

We are going to make a certificate with **full options**

![Untitled](img/Untitled%202.png)

Then we are going to use **manual input**

![Untitled](img/Untitled%203.png)

Next, we are going to create **verification records manually** on our DNS server

![Untitled](img/Untitled%204.png)

Then choose **RSA key**

![Untitled](img/Untitled%205.png)

Then we want to create a PFX archive

![Untitled](img/Untitled%206.png)

Pop in the location where you would like to store the PFX certificate

![Untitled](img/Untitled%207.png)

Create a password

![Untitled](img/Untitled%208.png)

This is a short lived cert, so we **don’t want to save** it in the vault

![Untitled](img/Untitled%209.png)

We **don’t want to** take any additional steps

![Untitled](img/Untitled%2010.png)

We **don’t want to** store it anywhere else

It then pops up with the TXT DNS record you need to add. This will need to be added at your registrar.

Then remove the record.

If you get the error, **WindowsCryptographicException** try running the programme as administrator.

You should have your PFX file now, if you need a hand please get in touch and we can arrange some help.