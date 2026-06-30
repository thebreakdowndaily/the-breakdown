@echo off

cd /d C:\newsjack-content

opencode run prompts\content.md > output\content-%date:~-4%-%date:~4,2%-%date:~7,2%.md