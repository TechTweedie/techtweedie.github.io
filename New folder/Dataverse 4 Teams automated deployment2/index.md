Do you need to move a Solution in **Dataverse for Teams** form one environment to another, are you unable to use a Pipeline to move a solution around? Want easy reputable steps? Need to be able to drill in to what changes have taken place between exports. 

Today I'm going to show you how you can with a script move dataverse for teams around

### Step 1 - Copy the script

In this example we are going to use this repo: [mightora/Power-Paltform-Dataverse4Teams-Tools: This tool simplifies pushing solutions to your Dataverse for Teams environment. Easily choose to re-pack your solution or upload an existing zip file. It streamlines the process, saving time by skipping the re-packing of Canvas Apps. (github.com)](https://github.com/mightora/Power-Paltform-Dataverse4Teams-Tools) 
as a template so we can get up and running quickly. 

When we use this template we are prompted for the location and name where you would like to create this repository. 

Once created copy the link to it. 

![](vmconnect_wlnLwNJmoZ.gif)

However you could also import to an existing solution as a submodule using this command. 
```powershell
git submodule add https://github.com/mightora/Power-Platform-Dataverse4Teams-Tools.git scripts/dataverse4Teams
```
After doing this you will need to initialize and update the submodule running this command:
```powershell
git submodule update --init --recursive
```

> Please also note that you will have to update your script paths in the examples we give below.

### Step 2 - Clone the repository in to vscode
For our example we are going to clone the repository in to vscode using the link from step 1. 

To do this at the top of vscode enter `> Clone` and **Git: Clone** should appear. 

![](vmconnect_tnGx5Z0f2n.gif)

### Step 3 - Get setup 
You will then be prompted to install the extensions.  

If you are not then navigate to **File** >  **Preferences** > **Settings** and search for `Extension Ignore Recommendations`  or use this [link](vscode://settings/extensions.ignoreRecommendations) and make sure it is not ticked. 

![](vmconnect_0w0ZNJe8ul.gif)

### Step 4 - Get Environment ID for source

Navigate to [Environments | Power Platform admin center (microsoft.com)](https://admin.powerplatform.microsoft.com/environments) and locate your source environment. 

Go in to it and copy the Environment ID

![](vmconnect_wmEVAXE8S3.gif)

### Step 5 - Get Environment ID for source

Copy it for the target

![](vmconnect_NlOKjpNlq3.gif)

### Step 6 - check the source in the maker portal

You can do this by `https://make.powerapps.com/environments/{ENVIRONMENT ID HERE}/home`

![](vmconnect_jc6Aofcva6.gif)

### Step 7 - check the target in the maker portal

You can do this by `https://make.powerapps.com/environments/{ENVIRONMENT ID HERE}/home`
![](vmconnect_wwC5dSPbNy.gif)

### Step 8 - Overview of what we are going to do

A quick overview of what we are going to be doing.

```mermaid
graph LR
     A[Start] --> B[Export Solution]     
     B --> C[Unpack Solution]     
     C --> D[Review]     
     D --> E[Repack Solution]     
     E --> F[Import Solution]     
     F --> G[Publish Customizations]     
     G --> H[End]
```

![](vmconnect_j1SBE80ms2.gif)

### Step 9 - Lets run the script
We are going to run the command 
```powershell
.\pipelineScripts\downloadFromSource.ps1 -solutionName "Dataverse4TeamsDemo" -exportDirectory ".\demo\dataverse4TeamsDemo" -sourceEnv "1838fca4-6258-e6b8-a710-60838df81aa3" -unpackDirectory ".\demo\dataverse4TeamsDemo\unpacked"
```

Please remember to replace the variables with your own, for more information please consult [README](https://github.com/mightora/Power-Paltform-Dataverse4Teams-Tools/blob/main/README.md)

![](vmconnect_0yaaqi7RKy.gif)

### Step 10 - Explore our unpacked solution

This is where using GIT becomes very useful as you can see from the commits what the changes were on the solution between runs.

![](vmconnect_divOPE2jkP.gif)

### Step 11 - Explore our unpacked solution

Lets push out solution to the target environment

![](vmconnect_EbfBAo66X4.gif)

### Step 12 - Lets see if it worked

Lets explore using the maker portal to see if it has worked. 

![](vmconnect_M8yKgHnocP.gif)

### Step 13 - Lets push our code

Finally lets push our code to our repo so next time we run it we can see changes between runs. When you come to do this you may need to set your user in **GIT**.

You can set your user in **GIT** by running the below commands with your information. 

```powershell
  git config --global user.email "you@example.com"

  git config --global user.name "Your Name"
```

![](vmconnect_SBCk2QS9Tv.gif)
