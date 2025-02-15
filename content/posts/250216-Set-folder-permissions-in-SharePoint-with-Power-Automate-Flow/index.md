---
title: "Set folder permissions in SharePoint with Power Automate Flow"
description: ""
tags:
  - Power Automate
  - EntraID
  - Power Platform
categories:
  - Power Automate
  - EntraID
  - Power Platform
date: 2025-02-10T11:00:00+01:00
lastmod: 2025-02-10T11:00:00+01:00
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
Want to set item or folder permissions in SharePoint using **Power Automate** but can't out how to do it? Not able to do it with the out of the box SharePoint Connector?

Good news! In this guide, I'll show you how to set these using an App Registration. No service accounts, no password headaches. I'll also share a Custom Connector to make it even easier, plus step-by-step instructions to:

- Create and configure the App Registration
- Assign API permissions
- Setting permissions using sites.selected
- Use Power Automate with the custom connector

## Whats the problem

Let's have a look at the problem we are trying to solve. We are going to go into Power Automate Flow and see if we can edit, add, or remove a SharePoint Permission using the [Standard SharePoint Connector](https://learn.microsoft.com/en-us/connectors/sharepointonline/).

![alt text](msedge_l29tV1NhHD.gif)

As we can see it is not possible.

To solve this problem I am going to share with you a connector I have written and released that is free to use, and show you how to set it up and use it.

## Create the App Registration

For this section you will need the help of a Global Administrator
 
### Step 1 - Log in to Entra
 
By default most users will have the ability to go to [https://entra.microsoft.com](https://entra.microsoft.com)
and log in with your user account.

![alt text](brave_yym6HjxqsT.gif)

### Step 2 - Create the app registration

Next we are going to create an application registration so our Power Automate flow can talk directly to SharePoint Online.

1. When you are on the Entra Overview page, open up **Identity**.
2. Then navigate to **Applications** in the left hand menu and then open up **App Registrations**.
3. From there select **New Registration**.
4. A new screen will open, give your new app registration a name and then click next.

![alt text](brave_AEQxFOEbOc-B.gif)

### Step 3 - Add API permission

We then need to give our App Registration an API Permission, This will be the permission used to talk to Exchange Online.

1. In the left hand menu click on **API Permission**.
2. Click on **Add permission**.
3. A window will then open, select **Application Permission**.
4. Then using the search box type in `sites.selected`.
5. The list will then filter, as it does open up the **Mail** option and select `sites.selected`.

![alt text](brave_9744WEVLUO-B.gif)

### Step 4 - Grant Admin consent

1. If the Grant admin consent is grayed out then this is because we lack administrative roles for our account. For this next step you will need a some help from a Global Admin.

2. Ask a Global administrator to grant admin consent for you if you cant do it.

![alt text](brave_wlJHahJXVv.gif)

## Setting your application permissions in SharePoint Online

Our next step is to set what permissions the application has within SharePoint. This is different to Exchange where you are limiting the default permission, with `sites.selected` we have to explicitly give permission rather than specifically limiting it.
This Stage will need to be done by someone who is an Owner of the SharePoint site using Microsoft Graph.  

> **Further reading:** Further information on the API call can be found [here](https://learn.microsoft.com/en-us/graph/api/site-post-permissions?view=graph-rest-1.0&tabs=http).

### Step 1 - Get SharePoint Site ID

Navigate to your SharePoint Site, e.g. `https://tweedtech.sharepoint.com/sites/TechTweedieDemoSite1` and then just add `/_api/site?$select=Id` on the end.

For example this would give you the URL `https://tweedtech.sharepoint.com/sites/TechTweedieDemoSite1/_api/site?$select=Id`.

You will get XML back that looks like this

```xml
<?xml version="1.0" encoding="utf-8"?>
<entry xml:base="https://tweedtech.sharepoint.com/sites/TechTweedieDemoSite1/_api/" xmlns="http://www.w3.org/2005/Atom" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns:georss="http://www.georss.org/georss" xmlns:gml="http://www.opengis.net/gml">
   <id>https://tweedtech.sharepoint.com/sites/TechTweedieDemoSite1/_api/site</id>
   <category term="SP.Site" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />
   <link rel="edit" href="site" />
   <title />
   <updated>2025-02-13T21:53:24Z</updated>
   <author>
       <name />
   </author>
   <content type="application/xml">
       <m:properties>
           <d:Id m:type="Edm.Guid">9ce4e8e2-fa87-474b-bd2f-d858d828f8a1</d:Id>
       </m:properties>
   </content>
</entry>
```

Locate the ID value, it will look something like this from within the xml 

```xml
<d:Id m:type="Edm.Guid">9ce4e8e2-fa87-474b-bd2f-d858d828f8a1</d:Id>
```

We need the Site ID value which in this example is `9ce4e8e2-fa87-474b-bd2f-d858d828f8a1`

### Step 2 - Give Permission to our App Regestration for this site

The first stage is to give the permission to our app permissions on the SharePoint site, to do this we need to use Graph Explorer. You will also need to be an Owner of the SharePoint Site you are giving permissions to.

### Step 1 - Access MS Graph Explorer

1. Go to [https://developer.microsoft.com/en-us/graph/graph-explorer](https://developer.microsoft.com/en-us/graph/graph-explorer)
2. Sign in to your account.
3. Make sure the Tenant shows your tenant or company name. 
4. Then Press **Run query** to make sure you are connected. 

![alt text](msedge_QUHtmixvFm-B.gif)

### Step 2 - Set permissions

The next stage is to run the **Create permission** command for the app registration to give tit the necessary permissions to be able to set permissions for files and folders.

To do this we need to;

1. Change the method to `POST`.
2. Enter in the following address `https://graph.microsoft.com/v1.0/sites/{sitesId}/permissions`, replacing the `{siteID}` with your **siteID**. e.g. `https://graph.microsoft.com/v1.0/sites/9ce4e8e2-fa87-474b-bd2f-d858d828f8a1/permissions`.
3. Click on **Modify permissions** and open the **permissions panel**.
4. Search for site, and then open up **Sites**.
5. Click on **Consent** for `Sites.FullControl.All`. This will open up a consent screen.
6. Then in **Request body** enter in the below json replacing `{clientID}` and `{displayName}` with your applications details.  

    ```json
    { 
    "roles": ["owner"],
    "grantedToIdentities": [
      {
        "application": {
          "id": "{clientID}",  
          "displayName": "{displayName}" 
        }
      }
      ]
    }
    ```
    e.g.

    ```json
    { 
    "roles": ["owner"],
    "grantedToIdentities": [
      {
        "application": {
          "id": "229df885-246d-4b6f-8280-267e51f9dc65",  
          "displayName": "SharePoint - Demo1 - PowerAutomate" 
        }
      }
      ]
    }
    ```

7. You will then get the response like the below

    ```json
    {
        "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#sites('9ce4e8e2-fa87-474b-bd2f-d858d828f8a1')/permissions/$entity",
        "id": "aTowaS50fG1zLnNwLmV4dHwyMjlkZjg4NS0yNDZkLTRiNmYtODI4MC0yNjdlNTFmOWRjNjVANjM3NTlkOWYtYmZjYS00ZjUyLWFlOTgtOGYyZjFkN2JjMTcz",
        "grantedToIdentitiesV2": [
            {
                "application": {
                    "displayName": "SharePoint - Demo1 - PowerAutomate",
                    "id": "229df885-246d-4b6f-8280-267e51f9dc65"
                }
            }
        ],
        "grantedToIdentities": [
            {
                "application": {
                    "displayName": "SharePoint - Demo1 - PowerAutomate",
                    "id": "229df885-246d-4b6f-8280-267e51f9dc65"
                }
            }
        ]
    }
    ```

![alt text](msedge_eb1IgNQwCG-B.gif)


## Download and testing the connector

### Step 1 - Find custom connectors

First we need to find custom connectors in Power Automate.

To do this we need to:

1. Navigate to `https://make.powerautomate.com/`
2. Change our environment should you need to.
3. Then in the left hand menu, navigate to **More** and then **Discover all**, and then locate **Custom connectors**.

![alt text](../send-emails-from-flow-without-a-service-account/msedge_eb1IgNQwCG.gif)

******************************************
### Step 2 - Create a new connector
 
1. Click on **New custom connector**.
2. Then click on **Import an OpenAPI from URL**.
3. Then enter in the connector name `Send email using Graph`.
4. Then enter in the URL `https://raw.githubusercontent.com/itweedie/PowerPlatform-Send-Emails-from-Power-Automate-without-a-Service-Account/refs/heads/main/connector/shared_mightora-5fsend-20mail-20with-20graph-5fe07b0f04a8b0d4c3/apiDefinition.swagger.json`
 
![alt text](msedge_Q2g7mnzmR9.gif)
 
 
### Step 3 - Configure your connector
 
1. Click on to the Security tab.
2. Make sure we are using **OAuth 2.0**
3. Make sure the Identity Provider is set to **Azure Active Directory** and that **Enable Service Principle support** is ticked.
4. Click in to **Client ID**
5. Navigate back to Entra and locate your App Registration.
6. Copy the **Client ID** and paste it in to the **Client ID** box on the Custom Connector.
7. Go back to the App Registration in Entra, and click on **Certificates & secrets**, then click on **New client secret**. Choose a name and a reasonable date for expiry that fits within your organisations policy's.
8. Copy the **Secret value**, NOT Secret ID, and paste it in to your connector. You will need your secret ID one more time so keep the Entra page open with it on.
9. Click Create
 
![alt text](msedge_aKfrGH1oIO.gif)
 
### Step 5 - Add your first connection
 
1. Click on to Test.
2. Then click on to **New connection**.
3. You should then get a screen which lets your choose **Service Principle**, if you don't repeat step 3.
4. Then click **Create Connection**.
5. Enter in your **Secret** (we do this first as we already have the page open from Step 3).
6. Then enter in your **Client ID** and **Tenant ID**.
7. Then click **Create Connection**.
 
![alt text](msedge_2mOjLRkn39.gif)
 
 
### Step 6 - Test
 
### Step 7 - Lets try it in a Flow
 
1. Click on **My flows**
2. Create a new flow.
3. Add a trigger.
4. Add a new step.
5. From Connector type choose Custom.
6. Then select **Send email using Graph** from the list.
7. Fill out the details for the connector that you want to use.
8. Test and make sure the email comes through.
 
![alt text](msedge_7if2t23IPS.gif)
 
 
## Conclusion: Secure, Scalable Email Sending from Power Automate