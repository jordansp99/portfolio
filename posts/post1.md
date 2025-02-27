---
title: Building a Simple To-Do List with Vanilla JavaScript
date: 2023-10-27
category: Technology, JavaScript, Web Development
description: Learn how to create a basic to-do list application using only vanilla JavaScript, HTML, and CSS.
---

# Building a Simple To-Do List with Vanilla JavaScript

In this post, we'll walk through the process of creating a simple to-do list application using only vanilla JavaScript, HTML, and CSS. This project is a great way to solidify your understanding of DOM manipulation and event handling.

## HTML Structure

First, let's set up our HTML structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>To-Do List</h1>
        <div class="input-container">
            <input type="text" id="taskInput" placeholder="Add a new task...">
            <button id="addButton">Add</button>
        </div>
        <ul id="taskList"></ul>
    </div>
    <script src="script.js"></script>
</body>
</html>
```