@echo off
git add -A
git commit -m "Fix: Move PDF to api directory and use correct import.meta.url path resolution for Vercel serverless"
git push origin Main
