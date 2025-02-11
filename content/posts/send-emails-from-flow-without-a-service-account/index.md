---
title: "Send Emails from Flow without a Service Account"
description: "Learn how to send emails from Power Automate without a service account! 🚀 This step-by-step guide walks you through setting up an App Registration, securing permissions in Exchange Online, and using a custom connector—no password resets or login issues. Perfect for secure, scalable email automation in Microsoft 365! 🔗 #PowerAutomate #Microsoft365 #Automation"
tags:
  - Power Automate
categories:
  - Azure
  - Power Platform
  - Power Automate
date: 2025-02-10T09:00:00+01:00
lastmod: 2025-02-10T09:00:00+01:00
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
Want to send emails from **Power Automate** but can't or don't want to use a service account? Tired of dealing with Conditional Access Policies, password expirations, and frequent logins? Do you want a simple, secure, and scalable way to send emails without constantly re-confirming security information?

Good news! In this guide, I'll show you how to send emails directly from Microsoft Exchange using only an App Registration. No service accounts, no password headaches. I'll also share a Custom Connector to make it even easier, plus step-by-step instructions to:

- Create and configure the App Registration
- Assign API permissions
- Restrict sending access to specific mailboxes
- Use Power Automate with the custom connector 


## Create the App Registration
For this section you will need the help of a Global Administrator

### Step 1 - Log in to Entra

By default most users will have the ability to go to [https://entra.microsoft.com](https://entra.microsoft.com)
and log in with your user account. 


### Step 2 - Create the app registration

Next we are going to create an application registration so our Power Automate flow can talk directly to Exchange Online.

1. When you are on the Entra Overview page, open up **Identity**.
2. Then navigate to **Applications** in the left hand menu and then open up **App Registrations**. 
3. From there select **New Registration**.
4. A new screen will open, give your new app registration a name and then click next.

![alt text](brave_T1ciTpvWmI.gif)


### Step 3 - Add API permission

We then need to give our App Registration an API Permission, This will be the permission used to talk to Exchange Online. 

1. In the left hand menu click on **API Permission**.
2. Click on **Add permission**.
3. A window will then open, select **Application Permission**.
4. Then using the search box type in **mail.send**.
5. The list will then filter, as it does open up the **Mail** option and select **mail.send**.

> **NOTE:** Yes this permission lets your send emails as anyone, however we will restrict this later. **DO NOT MISS USE IT IS POSSIBLE TO TRACK WHERE AN EMAIL CAME FROM**.

![alt text](brave_pyTrq7A2fH.gif)


### Step 4 - Grant Admin consent

1. You will notice that the Grant admin consent is grayed out
![alt text](brave_w3uDbOYeBk.gif)

2. This is Because we currently lack administrative roles for our account. For this next step you will need a Global Admin. 

3. Ask a Global administrator to grant admin consent for you
![alt text](msedge_b9Xouwxtt7.gif)


## Limiting application permissions in Exchange

Our next step is to limit what permissions our application will have within exchange, we have already said it will have `mail.send`
however without further limitation that ill allow the application to send emails from any users email account. 

This Stage will need to be done by an Exchange Online Administrator. 

> **Further reading:** Further information of these next steps can be found [here](https://learn.microsoft.com/en-us/graph/auth-limit-mailbox-access).


### Step 1 - Set up a Mail Enabled Security Group

When we tell exchange that we want to restrict access in some way for an application registration, we need to first create a **Mail-enabled Security group**.

There are a few ways to do this, however today we are going to do it from the Microsoft 365 Admin center.

1. Go to [Microsoft 365 Admin center](https://admin.microsoft.com/)
2. Then open up **Teams and Groups**.
3. Select 'Security' from the menu.
4. Click on **Add new security group**.

![alt text](msedge_JAl1jlS395-B.gif.gif)


### Step 2 - Access PowerShell

For this next step we are going to use some **Powershell**. You can do this from a location of your choice however today we are going to demo it from **Cloud Shell**.

1. Navigate to Exchange Online [https://admin.cloud.microsoft/exchange#/homepage](https://admin.cloud.microsoft/exchange#/homepage).
2. Click on the **Cloud Shell** button in the top right hand corner. 

![alt text](msedge_f9urvujFXS-B.gif.gif)


### Step 3 - Create Application Access Policy

Next we are going to create an application access policy using both the **Application ID** and the **Mail-enabled security group** we created in earlier steps. 

1. Lets look at our command. `New-ApplicationAccessPolicy -AppId b9701c1e-1364-464d-93e4-01ae925e8d6c -PolicyScopeGroupId PowerAutomateTest@Tweed.technology -AccessRight RestrictAccess -Description "Restrict this app to members of PowerAutomateTest@Tweed.technology"`
2. Breaking this down we have
   1. Command: `New-ApplicationAccessPolicy` - This cmdlet creates a new application access policy in Microsoft 365.
   2. Parameter: `-AppId b9701c1e-1364-464d-93e4-01ae925e8d6c` - Specifies the unique identifier (AppId) of the application for which the policy is being created.
   3. Parameter: `-PolicyScopeGroupId PowerAutomateTest@Tweed.technology` - Defines the scope of the policy by specifying the group ID (email address) that the policy will apply to.
   4. Parameter: `-AccessRight RestrictAccess` - Sets the access right for the policy. In this case, it restricts access.
   5. Parameter: `-Description "Restrict this app to members of PowerAutomateTest@Tweed.technology"` - Provides a description for the policy, explaining its purpose.
3. Lets try running the command in **PowerShell** using the **CloudShell**. 
4. Oh no, it doesn't work. You could be forgiven for thinking that given we have opened this up from the Exchange Admin center that we would indeed already have access to and be connected to exchange online within the **CloudShell** but unfortunately we are not. 
5. Therefore before we go any further we need to install the Exchange Online Management Module. `Install-Module -Name ExchangeOnlineManagement -Force`.


### Step 4 - Import and Connect

Our next step, is really to go back a stage and import and connect to Exchange Online. 

To do this we need to:

1. First we need to import the module we have just installed, to do this we run this command `Import-Module ExchangeOnlineManagement`
2. Next we need to connect to exchange, within the **CloudShell** the easiest way to to this is by using device login. Run this command `Connect-ExchangeOnline -Device`. 
3. This will give us a URL and a device code in order to log in to Exchange Online.
4. Next lets try re-running our command to create the new policy `New-ApplicationAccessPolicy -AppId b9701c1e-1364-464d-93e4-01ae925e8d6c -PolicyScopeGroupId PowerAutomateTest@Tweed.technology -AccessRight RestrictAccess -Description "Restrict this app to members of PowerAutomateTest@Tweed.technology"`
5. This time we get the response

```PowerShell
ScopeName        : Power Automate Test
ScopeIdentity    : Power Automate Test20250209121934
Identity         : 63759d9f-bfca-4f52-ae98-8f2f1d7bc173\b9701c1e-1364-464d-93e4-01ae925e8d6c:S-1-5-21-3787302941-3231517822-469913106-31437838;9
                   98e9d79-817d-41c9-87d8-d9c07f27f4b2
AppId            : b9701c1e-1364-464d-93e4-01ae925e8d6c
ScopeIdentityRaw : S-1-5-21-3787302941-3231517822-469913106-31437838;998e9d79-817d-41c9-87d8-d9c07f27f4b2
Description      : Restrict this app to members of PowerAutomateTest@Tweed.technology
AccessRight      : RestrictAccess
ShardType        : All
IsValid          : True
ObjectState      : Unchanged
```

![alt text](msedge_f9urvujFXS-C.gif.gif) 


### Step 5 - Let's test it in PowerShell
We can now test using PowerShell, to see if it's applied correctly. 

To do this:

1. We are going to run the following command `Test-ApplicationAccessPolicy -Identity testABC@Tweed.technology -AppId b9701c1e-1364-464d-93e4-01ae925e8d6c`
2. If we break down this command:
   1. Command: `Test-ApplicationAccessPolicy` - This cmdlet tests an application access policy in Microsoft 365 to verify if a user has access.
   2. Parameter: `-Identity testABC@Tweed.technology` - Specifies the identity (email address) of the user to test against the application access policy.
   3. Parameter: `-AppId b9701c1e-1364-464d-93e4-01ae925e8d6c` - Specifies the unique identifier (AppId) of the application for which the policy is being tested.
3. Running the command we get the following response:
      ```PowerShell
      AppId             : b9701c1e-1364-464d-93e4-01ae925e8d6c
      Mailbox           : testABC
      MailboxId         : 75283b3b-609a-4c1c-b8b8-baa1342fdfa6
      MailboxSid        : S-1-5-21-3787302941-3231517822-469913106-31499791
      AccessCheckResult : Granted
      ```
4. Let's test this against a different email address that is not within the **Mail-enabled security group** by running `Test-ApplicationAccessPolicy -Identity demo@Tweed.technology -AppId b9701c1e-1364-464d-93e4-01ae925e8d6c`.
      ```PowerShell  
      AppId             : b9701c1e-1364-464d-93e4-01ae925e8d6c
      Mailbox           : demo
      MailboxId         : d2ca4050-f8a9-4986-b998-387603b466b6
      MailboxSid        : S-1-5-21-3787302941-3231517822-469913106-19344836
      AccessCheckResult : Denied
      ```
5. We can see it has being **Denied** which is the response we expected. 

![alt text](msedge_4IBPmJ2a2n.gif)

## Download and testing the connector

### Step 1 - Find custom connectors 
First we need to find custom connectors in Power Automate. 

To do this we need to:

1. Navigate to `https://make.powerautomate.com/`
2. Change our environment should you need to.
3. Then in the left hand menu, navigate to **More** and then **Discover all**, and then locate **Custom connectors**. 

![alt text](msedge_eb1IgNQwCG.gif)


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

### Step 4 - Add C# to process the attachment
In order to be able to send attachments we need to add some C# to our connector. If you are not going to be sending attachments you can skip this step. 

To do this you need to:
1. Click on to **Code**
2. Click to enable code.
3. Copy and pase the below code in to the code box.

```CSharp
public class Script : ScriptBase
{
    public override async Task<HttpResponseMessage> ExecuteAsync()
    {
        // Read the request content as a string
        var requestContentAsString = await this.Context.Request.Content.ReadAsStringAsync().ConfigureAwait(false);
        
        // Parse the request content string into a JSON object
        var requestContentAsJson = JObject.Parse(requestContentAsString);

        // Modify the attachments array if it exists
        List<string> attachmentFileTypes = new List<string>();

        if (requestContentAsJson["message"]?["attachments"] is JArray attachments)
        {
            foreach (var attachment in attachments)
            {

                // Add the @odata.type element
                attachment["@odata.type"] = "#microsoft.graph.fileAttachment";

            }
        }
        
        // Set the modified JSON back to the request content
        this.Context.Request.Content = CreateJsonContent(requestContentAsJson.ToString());

        // Send the API request and get the response
        var response = await this.Context.SendAsync(this.Context.Request, this.CancellationToken).ConfigureAwait(continueOnCapturedContext: false);

        // Read the response content as a string
        var responseContentAsString = await response.Content.ReadAsStringAsync().ConfigureAwait(false);

        // Check if the response content is empty or null
        if (string.IsNullOrEmpty(responseContentAsString))
        {
            // Set a default message if there is no response from the endpoint
            responseContentAsString = "{\"message\": \"No response from the endpoint\"}";
        }
        else
        {
            try
            {
                // Try to parse the response content string into a JSON object
                var responseContentAsJson = JObject.Parse(responseContentAsString);
                
                // Convert the JSON object back to a string
                responseContentAsString = responseContentAsJson.ToString();
            }
            catch (JsonReaderException)
            {
                // If parsing fails, set an error message with the invalid JSON response
                responseContentAsString = $"{{\"message\": \"Invalid JSON response\", \"response\": \"{responseContentAsString}\"}}";
            }
        }

        // Create a JSON object to include the original request and the response content
        var finalResponseContent = new JObject
        {

            ["version"] = "1.2.0", // Add version number here
            ["responseContent"] = JObject.Parse(responseContentAsString),
 
        };

        // Set the response content back to the JSON string
        response.Content = CreateJsonContent(finalResponseContent.ToString());

        // Return the response
        return response;
    }

    private bool IsBinary(string content)
    {
        // Check if the content contains non-printable characters
        foreach (char c in content)
        {
            if (char.IsControl(c) && c != '\r' && c != '\n' && c != '\t')
            {
                return true;
            }
        }
        return false;
    }
}
```

![alt text](msedge_ETA3maJOWu.gif)

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

1. On the Test screen scroll down to **Operations**.
2. Enter in the following:
  - user-email: An email address you placed in the mail enabled security group earlier
  - message.subject: test message
  - message.body.contentType: HTML
  - message.body.content: test
  - saveToSentItems: true
  - emailAddress.address (note first one only): An email address you would like to send to
3. Then press **Test operation**
4. Scroll down to **Response** and you should get a 202.
5. Test and make sure the email comes through.

![alt text](msedge_jHKMp5JkcW.gif)

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

By following this guide, you’ve successfully set up a **secure, scalable** way to send emails from **Power Automate**—without relying on service accounts, password resets, or Conditional Access headaches.  

With your **App Registration configured**, **permissions locked down**, and **custom connector deployed**, you now have a **robust** method to send emails directly through **Exchange Online**—while ensuring access is tightly controlled.  

### Key Takeaways:  
✅ **No Service Account Required** – Uses an App Registration instead.  
✅ **Secure and Controlled** – Email sending is restricted to specific mailboxes.  
✅ **Fully Automated** – No need to log in or manage passwords.  
✅ **Scalable and Future-Proof** – Works seamlessly across flows, reducing admin overhead.  

Now that your setup is complete, you can start integrating **email automation into your Power Automate workflows** with confidence. Give it a try, experiment with different use cases, and let me know how it works for you!  

🚀 **Happy automating!** 🚀
