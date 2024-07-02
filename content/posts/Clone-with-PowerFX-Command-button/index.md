---
title: Clone-with-PowerFX-Command-button
description: "Cloning multiple records within a data view in a Model-Driven App is a common request from end users. It helps them quickly fill out data fields in situations where only a few values differ between records."
categories:
  - Power Platform
tags:
  - Command Bar
  - PowerFX
date: 2024-04-22T19:00:00+01:00
lastmod: 2024-07-01T19:45:40+08:00
author: "itweedie"
authorLink: "https://iantweedie.biz"
resources:
- name: "featuredImage"
  src: "featureImage.png"
- name: "featuredImage"
  src: "featureImage.png"
lightgallery: true
draft: false
original: "https://helpmewithmy.technology/clone-multiple-records-with-custom-powerfx-button-in-model-driven-app/"
---
## Introduction

Cloning multiple records within a data view in a Model-Driven App is a common request from end users. It helps them quickly fill out data fields in situations where only a few values differ between records.

In this blog post, we will explore how to add a custom button to the command bar in a Power Apps model-driven application to duplicate multiple records. Power Apps recently introduced this helpful feature, and the best part is that it can be achieved using Power FX, the same language used for developing canvas apps. This latest capability has simplified the model-driven app development process, enabling anyone to customise the command bar, even those who are not proficient in JavaScript or experienced with the Ribbon Workbench.

This blog post will guide you through customising the command bar in a Power Apps model-driven app. You will learn how to create a button to duplicate one or more records in a table. This new feature will give users more control over their data and enable them to perform actions more efficiently.

## Command Bar Customisation

### Assumptions

- You are in a Dataverse environment
- You are in a solution
- You have a model-driven app already in that solution
- You have a table you would like to clone records on

### Navigate to your Model Driven App

Within your solution, navigate to the model-driven app, and open it up in edit mode.

![](https://helpmewithmy.technology/wp-content/uploads/2024/04/image-3.png)

### Navigate to the command bar editor

Find the **table** you which to add the custom command to, and then click on the ellipsis (three dots), then choose **Edit command bar.**

![](https://helpmewithmy.technology/wp-content/uploads/2024/04/image-4.png)

You will then be asked which **command bar** you wish to edit, choose **Main grid**.

![](https://helpmewithmy.technology/wp-content/uploads/2024/04/image-5.png)

### Create your new button

Choose **New**, and then select Command

![](https://helpmewithmy.technology/wp-content/uploads/2024/04/image-6.png)

This will place an object called NewCommand on the command bar. You can drag this to any position you want.

![](https://helpmewithmy.technology/wp-content/uploads/2024/04/image-7.png)

With the command selected choose, you will see on the **Right-Hand** side of the screen a number of options available for you to select.

![](https://helpmewithmy.technology/wp-content/uploads/2024/04/image-8.png)

For this demonstration, I am using the following values

- **Label:** Clone Record
- **Icon:** Use Icon, Clone
- **Action:** Run formula (at this point, if you have not already you will be asked to create a component library)
- **Visibility:** Show on condition form formula
- **Tooltip title:** Clone record(s)
- **Tooltip description:** This button clones all of the selected records
- **Accessibility text:** Press this button to clone selected records

### Configure our new button

In the top left-hand corner, you will see a drop-down box; this allows you to select either **Visible** or **OnSelect**.

![](https://helpmewithmy.technology/wp-content/uploads/2024/04/image-9.png)

With **Visible** chosen, copy and paste the following code:
```
// This is going to show the button as soon as an item is selected.
!IsEmpty(Self.Selected.AllItems)
```

This command is essentially verifying that there are items currently selected. If any items are selected, the result will be **true**, indicating that the list of selected items is not empty. Conversely, if no items are selected, the result will be **false**, signifying that the list is empty.

With **OnSelect** chosen, copy and paste the following code:

```
// We are going to iterate over all items that have been selected in the Table.
ForAll(
    Self.Selected.AllItems,
    Patch(
        Agreements,
        Defaults(Agreements),
        {Name: "CLONE - " & Text(Now(), "[$-en-US]yyyy-mm-dd hh:mm:ss") & " - " & ThisRecord.Name}
    )
);
Notify("The records selected have been cloned.")
```

Save, Publish, and Test

Now that we have finished our component, press on Save and Publish

![](https://helpmewithmy.technology/wp-content/uploads/2024/04/image-10.png)

Then navigate back to your Model Driven App, and **Play** the app

![](https://helpmewithmy.technology/wp-content/uploads/2024/04/image-11.png)

Once it opens, press **Ctrl + F5** to refresh your browser. Then you should see the Clone Record button in the **command bar** at the top of the screen.

![](https://helpmewithmy.technology/wp-content/uploads/2024/04/image-12.png)

When we press on the button we get the following result.

![](https://helpmewithmy.technology/wp-content/uploads/2024/04/image-13.png)

## Frequently Asked Questions

**What is a Model-Driven App in Power Apps?**  
A Model-Driven App in Power Apps is an application that is primarily driven by the underlying data model and business processes. It uses the metadata of your data and relationships to automatically generate and manage the app's user interface.

**What is Power FX?**  
Power FX is the formula language used in Power Apps, similar to Excel formulas. It is used to define logic and operations within the apps, making it easier for users without extensive programming backgrounds to customize applications.

**How can I add a custom button to the command bar in a Model-Driven App?**  
To add a custom button to the command bar, navigate to your Model-Driven App in edit mode, access the command bar editor, and select the table you wish to customise. Choose to add a new command, configure it with your desired settings, and save your changes.

**What does the 'Clone Record' button do?**  
The 'Clone Record' button duplicates the selected records in a table, allowing users to quickly replicate data with minor modifications. It uses a Power FX formula to handle the duplication process.

**How do I ensure the 'Clone Record' button is visible only when items are selected?**  
To control the visibility of the 'Clone Record' button, use the Power FX expression `!IsEmpty(Self.Selected.AllItems)`. This expression checks if any items are selected and shows the button accordingly.

## Conclusion

In this blog post, we explored the addition of a custom 'Clone Record' button to the command bar in a Power Apps model-driven application. This functionality leverages the newly introduced capabilities of Power FX, allowing even those with limited coding expertise to enhance their apps effectively. By following the steps outlined, you can customize your command bar to better suit your operational needs and streamline data management tasks.

This capability not only boosts productivity by simplifying the duplication of records but also empowers users to manage their data more autonomously. The integration of such features is a testament to the evolving landscape of app development, where user-friendliness and customisation go hand in hand. Whether you're a seasoned developer or a business user, these tools can help optimise your workflows and improve the overall efficiency of your operations.

Remember to save, publish, and test your new button to ensure it functions as expected. By doing so, you'll enhance the user experience within your Model-Driven App and take full advantage of the robust features Power Apps offers.
