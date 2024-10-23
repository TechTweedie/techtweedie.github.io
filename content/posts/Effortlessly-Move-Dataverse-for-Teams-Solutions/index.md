---
title: "Effortlessly Move Dataverse for Teams Solutions"
description: "Learn how to easily move Dataverse for Teams solutions between environments using a simple PowerShell script. This step-by-step guide walks you through the entire process—no need for Azure DevOps—helping you manage solution exports, imports, and version tracking with Git. Perfect for both beginners and seasoned developers looking for a streamlined approach to solution management."
tags:
  - PowerShell
  - Pipeline
categories:
  - Power Platform
date: 2024-10-22T07:00:00+01:00
lastmod: 2024-10-22T07:00:00+01:00
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

Do you need to move a Solution in **Dataverse for Teams** form one environment to another, are you unable to use a Pipeline to move a solution around? Want easy reputable steps? Need to be able to drill into what changes have taken place between solution builds. 

Today I will show you a tool that I have made to make this process easier by using a PowerShell Script to move Dataverse for Teams solutions between environments. 

{{< youtube gUXnVNcEWR0 >}}


## What you don't need
1. Azure DevOps - however, if you have Azure DevOps I have a pipeline tool currently in **Preview** for you on the **Visual Studio Market Place**; you can find it [here!](https://marketplace.visualstudio.com/items?itemName=mightoraio.mightora-power-platform-devOps-extension)

## What you need
Things you need to follow along with this demo, however as you will see you don't need them all to use the tool. 

1. [Git](https://git-scm.com/downloads) - This is a small programme to help with source control.
2. [GitHub Account](https://github.com/) - If you want to follow the steps exactly, however, you can also just download a copy of the repository. 
3. [Visual Studio Code]([Visual Studio Code - Code Editing. Redefined](https://code.visualstudio.com/)) - A free tool, or you can use another IDE of your preference. 
5. PowerShell and the ability to run `Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope CurrentUser`

Any other tools are covered in the tutorial. 

## Steps to use the tool
### Step 1 - Copy the script

In this example we are going to use this repo: [Power-Paltform-Dataverse4Teams-Tools](https://github.com/mightora/Power-Paltform-Dataverse4Teams-Tools) 
as a template so we can get up and running quickly. 

When we use this template we are prompted for the location and name for your version of the repository, I have made mine public [here]([itweedie/Power-Platform-Dataverse4Teams-Demo (github.com)](https://github.com/itweedie/Power-Platform-Dataverse4Teams-Demo)), but you may wish to use private. 


Once created your version of the repository from the template, copy a link to it using the button just above the file list. 

![](1.gif)

However you could also import to an existing solution as a submodule using this command. 
```powershell
git submodule add https://github.com/mightora/Power-Platform-Dataverse4Teams-Tools.git scripts/dataverse4Teams
```
After doing this you will need to initialize and update the submodule running this command:
```powershell
git submodule update --init --recursive
```

{{< admonition type=note title="Note" open=true >}}
Please also note that you will have to update your script paths in the examples we give below.
{{< /admonition >}}

### Step 2 - Clone the repository in to Visual Studio Code
For our example we are going to clone the repository in to Visual Studio Code, using the link from Step 1. 

To do this at the top of your **Visual Studio Code** window enter `> Clone` and **Git: Clone** should appear. 

![](2.gif)

### Step 3 - Get setup 
You will then be prompted to install the extensions that are useful when using this repository.   

{{< admonition type=note title="If you are not" open=true >}}
**If you are not** then navigate to **File** >  **Preferences** > **Settings** and search for `Extension Ignore Recommendations`  or use this [link](vscode://settings/extensions.ignoreRecommendations) and make sure it is not ticked. 
{{< /admonition >}}

![](3.gif)

### Step 4 - Get Environment ID for source

We are going to need our **Environment ID** to use this script, to get this, navigate to [Environments | Power Platform admin center (microsoft.com)](https://admin.powerplatform.microsoft.com/environments) and locate your source environment. 

Go in to it and copy the **Environment ID**

![](4.gif)

### Step 5 - Get Environment ID for target

We now need to do the same for our **target Environment**.

![](5.gif)

### Step 6 - Check the source in the maker portal

You can do this by `https://make.powerapps.com/environments/{ENVIRONMENT ID HERE}/home`

For ease I am going to keep these in a file called note.md

![](6.gif)

### Step 7 - Check the target in the maker portal

You can do this by `https://make.powerapps.com/environments/{ENVIRONMENT ID HERE}/home`
![](7.gif)

### Step 8 - Overview of what we are going to do

A quick overview of what we are going to be doing.

{{< mermaid >}}
graph LR;
     A[Start] --> B[Export Solution]     
     B --> C[Unpack Solution]     
     C --> D[Review]     
     D --> E[Repack Solution]     
     E --> F[Import Solution]     
     F --> G[Publish Customizations]     
     G --> H[End]
{{< /mermaid >}}

![](8.gif)

### Step 9 - Lets run the script

This script exports a solution from a source environment, generates a solution settings template, and unpacks the solution, including any Canvas Apps it contains.

**Parameters:**
- `-solutionName`: The name of the solution to export.
- `-exportDirectory`: Directory where the solution's zip file will be exported.
- `-sourceEnv`: ID of the source environment from which to export the solution.
- `-unpackDirectory`: Directory where the solution will be unpacked and Canvas Apps will be processed.


**Pulling all of this together we are going to run the command:**

```powershell
.\pipelineScripts\downloadFromSource.ps1 -solutionName "Dataverse4TeamsDemo" -exportDirectory ".\demo\dataverse4TeamsDemo" -sourceEnv "1838fca4-6258-e6b8-a710-60838df81aa3" -unpackDirectory ".\demo\dataverse4TeamsDemo\unpacked"
```

Please remember to replace the variables with your own, for more information please consult 

![](9.gif)

### Step 10 - Explore our unpacked solution

We can now explore our unpacked solution. This is where using **GIT** becomes very useful as you can see from the commits what the changes were on the solution between runs.

![](10.gif)

### Step 11 - Explore our unpacked solution

Lets push out solution to the target environment.

This script re-packs a previously unpacked solution and imports it into a target environment. If an environment settings file is provided, the import will include those settings.

**Parameters:**
- `-solutionName`: Name of the solution to be processed.
- `-unpackDirectory`: Directory where the solution is unpacked.
- `-environmentSettingsFile`: (Optional) Path to the environment settings file.
- `-targetEnvironment`: Target environment to which the solution will be imported.
- `-exportDirectory`: Directory where the repacked solution will be exported.
- `-Managed`:  Switch  **true** or **false** to indicate whether the solution should be managed.

![](11.gif)

### Step 12 - Lets see if it worked

Lets explore using the maker portal to see if it has worked. 

![](12.gif)

### Step 13 - Lets push our code

Finally lets push our code to our repository on **GitHub** so next time we run it we can see changes between runs. When you come to do this you may need to set your user in **GIT**.

You can set your user in **GIT** by running the below commands with your information. 

```powershell
  git config --global user.email "you@example.com"

  git config --global user.name "Your Name"
```

![](13.gif)

## Concludion 

By following these steps, you can establish a straightforward and repeatable process for transferring Dataverse for Teams solutions between environments without relying on Azure DevOps. 
The PowerShell scripts simplify the task, of exporting and reimporting Dataverse for Teams solutions. 
Integration with Git streamlines tracking changes, enabling you to monitor differences between solution builds over time. 
