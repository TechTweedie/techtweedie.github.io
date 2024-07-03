---
title: "Power Platform Developer Tools Install Script"
description: "Frequently moving between desktop builds, want to be able to get up and running quickly,  I’ve found it incredibly useful to have my own build script that covers 80% of the tools I am likely to need. It's essential tools ready to go saves a lot of time and hassle, that’s why I created a PowerShell script to automate the installation of the developer tools I often use when working on the Power Platform."
tags:
  - Developer Tools
  - Install Script
  - Automation
  - PowerShell
categories:
  - Power Platform
date: 2024-06-04T17:32:41+01:00
lastmod: 2020-01-01T16:45:40+08:00
author: "itweedie"
authorLink: "https://iantweedie.biz"
resources:
- name: "featured-image"
  src: "featureImage.jpg"
- name: "featured-image-preview"
  src: "featureImage.jpg"
lightgallery: true
draft: false
original: "https://helpmewithmy.technology/power-pages-developer-tools-install-script/"
---

## Introduction

Frequently moving between desktop builds, want to be able to get up and running quickly,  I’ve found it incredibly useful to have my own build script that covers 80% of the tools I am likely to need. It's essential tools ready to go saves a lot of time and hassle, that’s why I created a PowerShell script to automate the installation of the developer tools I often use when working on the Power Platform.

In this blog post, I’ll share my PowerShell script, explain how it works, and show you how you can use it to streamline your own setup process.

## Why Automate Your Setup?

Manually installing and configuring development tools can be a tedious process, especially if you need to do it frequently. By automating this process, you can:

- Save time and effort
- Ensure consistency across different setups
- Quickly get back to productive work

## Introducing the Power Platform Developer Tools Install Script

The script I developed leverages `winget` to install a variety of essential software packages. It also handles the setup of PowerShell modules, configuration of Git, installation of VSCode extensions, and more. Here’s a rundown of what the script does:

- Installs development tools such as Visual Studio Code, Power BI Desktop, SQL Server Management Studio, Windows Terminal, Notepad++, PowerToys, Postman, Visual Studio 2022 Professional, and Node Package Manager (NPM).
- Installs PowerShell modules for PowerApps Administration.
- Sets up Git and configures it with your Windows credentials.
- Installs Azure Storage Explorer.
- Downloads the latest release of XrmToolBox, extracts it to your Desktop, and organizes it in a specified folder.
- Installs useful VSCode extensions for Azure and Power Platform development.

## How to Use the Script

Using the script is straightforward. Here are the steps to get your development environment set up quickly:

- **Open PowerShell with Administrative Privileges**  
    Make sure you run PowerShell as an administrator to ensure all tools and configurations can be applied.
- **Run the Script**  
    Copy and paste the following command into your PowerShell window. This command will download the script from my GitHub repository and execute it.
    
```PowerShell
# Ensure the Desktop directory exists
$desktopPath = [System.Environment]::GetFolderPath('Desktop')
if (-Not (Test-Path -Path $desktopPath)) {
    New-Item -ItemType Directory -Path $desktopPath | Out-Null
}

# Download and run the script from GitHub
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/itweedie/Power-Platform-Developer-Tools-Install-Script/main/install-power-platform-dev-tools.ps1" -OutFile "$desktopPath\install-power-platform-dev-tools.ps1"
PowerShell -ExecutionPolicy Bypass -File "$desktopPath\install-power-platform-dev-tools.ps1"
```

- **Follow the Prompts**  
    The script will guide you through the installation process, ensuring all necessary tools are set up correctly.

### Behind the Scenes: How the Script Works

The script is designed to handle various installation tasks and configurations efficiently. Here’s a brief overview of its key components:

- **Winget Commands**: The script uses `winget` to install several essential tools, capturing any errors encountered during the process.
- **PowerShell Modules**: It installs important PowerShell modules for PowerApps development.
- **Git Configuration**: The script configures Git with your Windows credentials, ensuring a smooth version control setup.
- **VSCode Extensions**: Several VSCode extensions are installed to enhance your development experience with Azure and Power Platform.
- **Node Package Manager (NPM)**: Installs NPM for managing JavaScript packages, a crucial tool for many development projects.

### The full script

You can view the full script here, feel free to contribute  
[Power-Platform-Developer-Tools-Install-Script/install-power-platform-dev-tools.ps1 at main · itweedie/Power-Platform-Developer-Tools-Install-Script (github.com)](https://github.com/itweedie/Power-Platform-Developer-Tools-Install-Script/blob/main/install-power-platform-dev-tools.ps1)

### Conclusion

Automating the setup of your development environment can significantly improve your productivity and ensure consistency across different machines. By using my PowerShell script, you can quickly get all your essential tools installed and configured, allowing you to focus on what you do best—developing solutions on the Power Platform.

Feel free to check out the [Power Platform Developer Tools Install Script](https://github.com/itweedie/Power-Platform-Developer-Tools-Install-Script) on GitHub. Contributions and feedback are welcome!

Happy coding!

## Revisions
- 2024-07-03: Posted on https://techtweedie.github.io, my new self hosted blog
- Originally posted on May 24, 2024 my blog https://helpmewithmy.technology, a platform I am currently migrating away from. 
