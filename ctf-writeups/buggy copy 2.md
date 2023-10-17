---
title: Sample CTF Writeup
description: A samplessssssssssss s               ffffffffffffff d writeup for testing purposes.
date: October 20, 2023
author: Your Name
tags: [CTF, Security, Web]
---


#Buggy Portal
##Challenge Description
Embark on a journey through the Buggy Portal to discover its concealed treasure. 
[Challenge Url](http://45.76.177.238:8087/)

##Starting the Investigation

![Alt text](buggy.png)

Initially, upon visiting the website, we encountered a login page. Our suspicion was that the challenge might involve SQL injection. However, it appears that this method doesn't work. Therefore, let's examine the JavaScript part of the source code for further clues.

```
function validateLogin() {
    var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

    function checkName(name)
            {
                var check = name.split("").reverse().join("");
                return check === "ypjnimdarepus" ? !0: !1;
            }

    function checkLenght(pwd) {
            return (pwd.length % 4 == 0) ? !0: !1;
            }

    function obfuscatePassword(password) {
            var obfuscatedPassword = ""; 
            
            for (var i = 0; i < password.length; i++) {
                var obfuscatedChar = String.fromCharCode(password.charCodeAt(i) + 1);
                    obfuscatedPassword += obfuscatedChar;
                }
                return obfuscatedPassword;
            }

    function validatePassword(password) {
            return valid = (obfuscatePassword(password) === "tvqfsbenjoqx" ) ? !0 : !1;
            }

            if (!checkName(username)) {
                alert('Incorrect Name!');
            }

            if (!checkLenght(password) && !(validatePassword(password)) ) {
                alert('Incorrect Password');
            }

            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'auth.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        var response = JSON.parse(xhr.responseText)
                        document.getElementById('message').textContent = response.message;
                        window.location.href = 'flagggsxyhzb.php';                                       
                      } else {
                        console.error('Error:', xhr.status);
                    }
                }
            };

            var data = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);
            xhr.send(data);
        }
```
Upon analyzing the code, we discovered that the username is the reverse of **ypjnimdarepus** which gives us the username **superadminjpy** As for the password, it appears to be an obfuscated string, "tvqfsbenjoqx." We need to deobfuscate this text.

Please generate Python code to deobfuscate the text, and you can accomplish this with the assistance of ChatGPT.
```
def deobfuscate_password(obfuscated_password):
    original_password = ""
    for char in obfuscated_password:
        original_char = chr(ord(char) - 1)
        original_password += original_char
    return original_password

obfuscated_password = "tvqfsbenjoqx"  # Replace with the obfuscated password
original_password = deobfuscate_password(obfuscated_password)
print("Deobfuscated Password:", original_password)
```

Output: ```Deobfuscated Password: superadminpw```

"Proceed to log in and access the page **"/flagggsxyhzb.php"** as indicated in the JavaScript code above. Excitingly, we've located the flag!

##Flag


```CTF_BD{cl13nt_5id3_c0d3_r3v13w_15_h1dd3n_tr34sur3}```