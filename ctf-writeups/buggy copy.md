---
title: Sample CTF Writeup
description: A sample writeup for testing purposes.
date: October 20, 2023
author: Your Name
tags: [CTF, Security, Web]
---


In this writeup, we'll discuss the steps and techniques used to solve a Capture The Flag (CTF) challenge. This challenge focused on web security.


The CTF challenge was called "WebSec101" and involved finding and exploiting vulnerabilities in a vulnerable web application.

## Tools Used

- Burp Suite
- SQLMap
- Python
- Web browser

# Finding the Initial Vulnerability

Our journey started by inspecting the website. We noticed a login page, and the first thing that came to mind was SQL injection. Let's dig deeper.

After some manual testing and inspecting the login request, we found a possible vulnerability in the `username` parameter.

## Exploiting SQL Injection

We suspected SQL injection, so we tried to inject malicious SQL code into the `username` field. The payload we used was:

