---
title: "Calculate Working Day"
description: "Calculating working days in Power Automate can be challenging due to the various factors like weekends, holidays, and custom schedules. To help simplify this process, I’ve developed a tool designed to handle multiple working day scenarios with ease. This post walks you through the setup and usage of the tool, complete with step-by-step instructions."
tags:
  - Power Automate
categories:
  - Azure
date: 2024-09-24T09:00:00+01:00
lastmod: 2024-09-24T09:00:00+01:00
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
Want to calculate working day in Power Automate, having trubble with the number of variations. That’s why I’ve put together a nifty little tool to help out the community and make this process a whole lot easier. In this post, I'll guide you step-by-step through setting up and using this tool. Whether you’re trying to figure out the next working day, handle complex scheduling, or just want a smoother way to automate your date calculations, this is for you. Let’s dive in. 

## The conenctor
T


# Steps

## Step 1 - Create a Power Automate Flow
We are going to create a Power Automate Flow with a manual trigger. We are also going to add a date field to that trigger. 
![](Step%201%20-%20Create%20a%20Power%20Automate%20Flow.gif)

## Step 2 - Lets add the connector
Then we are going to search for the connector `Calculate Working Day` in the connector list. 
![](Step%202%20-%20Lets%20add%20the%20connector.gif)

## Step 3 - Enter in the API key
We are going to enter in the API key, currently you can just enter in `free` for the key. However we may need to change this in the future to put some throttling in place but we will always be **FREE**. 
![](Step%203%20-%20Enter%20in%20the%20API%20key.gif)

## Step 4 - Configure Basic working Day
Lets configure our first connector, **Basic Next Working Day**, this connector will tell you when the next working day is, assuming working days are Monday to Friday. 
![](Step%204%20-%20Configure%20Basic%20working%20Day.gif)

## Step 5 - Test it
Lets give that a test to see if it works.
![](Step%205%20-%20Test%20it.gif)

## Step 6 - Date In X Working Days
Lets complicate matters slightly, lets calculate the working day in **4** working days time, assuming that **Monday**, **Tuesday**, **Wednesday**, **Thursday**, **Friday** are all working days. This is symbolised by `1,2,3,4,5` in the **Working Days** input box. 
![](Step%206%20-%20Date%20In%20X%20Working%20Days.gif)

## Step 7 - Test Date In X Working Days
Now lets give that a test, to see if it works. 
![](Step%207%20-%20Lets%20test%20Date%20In%20X%20Working%20Days.gif)

## Step 8 - Lets complicate it a little
Lets say we want to know the working day in **4** working days time, however only **Monday** and **Wednesday** are working days. 

We configure this by entering `1,3` in to the **Working Days** input box.

As we can see it calculate the working day to be 7th October. 
![](Step%208%20-%20Lets%20complicate%20it%20a%20little.gif)

## Step 9 - Lets use a Combination of all Calculated Working Day Endpoints
Using the action **Combination of all Calculated Working Day Endpoints**, lets set it again, but this time using the **Trigger Date** field as the **Input Date** on the connector. 

We also want to set it so that **Working Days** are only a **Monday** and **Wednesday**.

We also want to add in a filter for **Scottish bank holidays**. 
![](Step%209%20-%20Combination%20of%20all.gif)


## Step 9 - Lets test Combination action
Ok, lets give that a test, we can see it has returned some useful data for us. The connectors has told us based on what we input that;
- The **Next working day** is `2024-12-30`
- The **Working day in x days** is `2025-01-13`

Because this is a combination of all our end points it has given us some other information as well;
- The **First Working day of month** is `2024-12-04`
- The **Last Working day of month** is `2024-12-30`

![](Step%209%20-%20Lets%20test%20Combination%20action.gif)

## Step 10 - Lets add in some non-working days
Lets take this one step further, lets add in some **Non working days** as `2024-12-23,2024-12-24,2024-12-27,2024-12-30,2024-12-31` as maybe your business is closed over this period. We are also going to change our **Input Date** to be `2024-12-20`.

With this new information what has the connector told us;
- Is input date a working day `No`
- Next working day `2025-01-06`
- Working day in x days `2025-01-15`
- First Working day of month `2024-12-04`
- Last working day of month `2024-12-18`

Currently this end point only supports UK Bank Holidays, there is an update coming which will allow you to select none for bank holidays. 

However we can enter a blank custom value to not filter out any bank holidays.

![](Step%209%20-%20add%20non-working%20days.gif)

## Step 10 - Combined with no bank holidays
Changing the settings of our connector to work with no bank holidays, lets use the same settings as above but this time changing the **Filter bank holidays for Country** to no value. 

We are also going to keep our **Input Date** to be `2024-12-20`.

With this new information what has the connector told us;
- Is input date a working day `No`
- Next working day `2024-12-25`
- Working day in x days `2025-01-08`
- First Working day of month `2024-12-02`
- Last working day of month `2024-12-25`

## Step 11 - Is today a working day
Lets take a look at another connector, **Is Today A Working Day**, this one tells you if today is a working day or not based on the **Working Days** entered. 

Trying this connector out, we enter that our only working day is a **Friday** by using `5`. 

As you can see we are testing this on a Monday and therefore it tells us that today is not one of the working days. 
![](Step%2011%20-%20Is%20today%20a%20working%20day.gif)

## Step 12 - First and Last working days of a month
We also have an action called **First And Last Working Day Of Month**, this action will tell you the first and the last working days of the month. 

In this example we have entered in;
- Working Days as being **Monday**, **Tuesday**, **Wednesday** by entering `1,2,3`

In the response we can see that based on the date provided it has calculated the first and last working day of the month to be;
- First Working day as `2024-09-02`
- Last working day as `2024-09-30`

![](Step%2012%20-%20First%20and%20Last%20working%20days%20of%20a%20month.gif)

## Conclusion

With the various connectors outlined in this guide, you now have a powerful toolkit to handle a wide range of working day calculations within Power Automate. Whether you need to find the next working day, calculate a future date, or exclude specific holidays and non-working days, these connectors make the process seamless and adaptable to your specific needs.

This tool is designed to be flexible and user-friendly, allowing you to quickly and accurately perform complex date calculations with ease. And while this guide focused on basic scenarios, the connectors are capable of handling even more intricate requirements as you explore their full potential.

As always, I'm keen to hear your feedback and see how you implement these solutions. If you have any questions or suggestions, feel free to reach out—let's continue to make Power Automate workflows even more powerful together!