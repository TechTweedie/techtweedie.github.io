---
title: "Create a Solution Configuration File"
description: "Want to deploy your Power Apps Solution files quickly via Pipelines? Not sure how to set your environment variable or connection references.  This blog post will explain how we solved this problem using a Solution Configuration File. "
tags:
  - Pipeline
  - Model Driven Apps
categories:
  - Power Platform
date: 2024-02-07T19:00:00+01:00
lastmod: 2024-07-07T19:45:40+08:00
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

Want to deploy your Power Apps Solution files quickly via Pipelines? Not sure how to set your environment variable or connection references.  This blog post will explain how we solved this problem using a Solution Configuration File. 

## Understanding the Need for a Solution Settings File

A solution settings file is crucial when your solution involves environment variables or connection references. Without it, you might end up with configurations that do not carry over the intended values, leading to solutions that don’t behave as expected in different environments.

## Steps

- **Download your solution**
Download either a managed or unmanaged copy of your solution.
- **Generate the Settings File**
Use the Power Apps CLI (Command Line Interface) to create your settings file. Execute the following command, adjusting the file names as necessary:

```powershell
pac solution create-settings --solution-zip .\\YourSolution_managed.zip --settings-file .\\YourSettings.json
```

- This command generates a YourSettings.json file, which might look something like this initially:

```json
{
  "EnvironmentVariables": [
    {
      "SchemaName": "your_schema_name",
      "Value": ""
    }
  ],
  "ConnectionReferences": [
    {
      "LogicalName": "your_logical_name",
      "ConnectionId": "",
      "ConnectorId": "/providers/Microsoft.PowerApps/apis/your_connector"
    }
  ]
}

```

- **Populate Environment Variable Values**
You can directly edit the `YourSettings.json` file to include the appropriate values. For environment variables, which are typically straightforward text values, it’s as simple as inserting the desired content:

```json
"EnvironmentVariables": [
  {
    "SchemaName": "your_schema_name",
    "Value": "Your Custom Message"
  }
]

```

- **Update Connection References**
    
    To fill in the connection references:
    
    - Navigate to [make.powerapps.com](https://helpmewithmy.technology/how-to-create-a-solution-settings-file-in-microsoft-power-platform/), select your target environment, and then go to Dataverse > Connections. Either create a new connection or use an existing one that matches your needs. Once your connection is set up, find its Connection ID in the URL and update your settings file accordingly. Make sure you share the connection with the service account that will be importing the connection.
    
    Your final `ConnectionReferences` section should resemble this:
    

```json
"ConnectionReferences": [
  {
    "LogicalName": "your_logical_name",
    "ConnectionId": "your_connection_id",
    "ConnectorId": "/providers/Microsoft.PowerApps/apis/your_connector"
  }
]

```

- **Import the Updated Solution**
With your settings file populated, import the solution back into Power Apps using the CLI or a Pipeline. This command updates your solution in the target environment with the specified environment variable and connection reference values.

```powershell
pac solution import --path .\YourSolution_managed.zip --settings-file .\YourSettings.json

```

## Conclusion

By following these steps, you’ve successfully created and configured a solution settings file, tailoring your Power Platform solution to meet the specific needs of its deployment environment. This process not only ensures that your solutions are portable but also maintains consistency across different environments, making your Power Platform development more efficient and reliable.