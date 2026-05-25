# 🚀 Deployment Guide - NoxyProxy

## Quick Deployment on Render.com (FREE)

### Step 1: Prepare Your GitHub Repo
```bash
git add .
git commit -m "Add deployment configuration"
git push origin main
```

### Step 2: Create Render Account
1. Go to https://render.com
2. Click "Sign Up" (use GitHub to sign up - easier!)
3. Connect your GitHub account

### Step 3: Deploy
1. Go to Dashboard → New → Web Service
2. Connect to your repo: `imdum123172/noxyproxy`
3. Fill in these details:
   - **Name**: `noxyproxy`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Plan**: Free (or Starter if you want better performance)

4. Click "Create Web Service"
5. Wait for deployment (~2-5 minutes)

### Step 4: Get Your Live URL
- After deployment succeeds, you'll see a URL like:
  ```
  https://noxyproxy.onrender.com
  ```
- This is your live site! 🎉

---

## What Gets Deployed

✅ **Frontend** - React app with all 12 games  
✅ **Backend** - Node.js proxy & API server  
✅ **Database** - SQLite (auto-created)  
✅ **SSL** - Free HTTPS certificate  

---

## Environment Variables (Already Set)

The `render.yaml` file automatically sets:
- `NODE_ENV: production`
- `PORT: 10000` (Render's default)

---

## Features After Deployment

✨ Auto-deploys when you push to `main` branch  
✨ Free SSL/HTTPS (https://noxyproxy.onrender.com)  
✨ Can share the URL with anyone  
✨ Runs 24/7 (free tier sleeps after 15 min inactivity)  

---

## If You Want Better Performance (Paid)

| Tier | Price | Benefits |
|------|-------|----------|
| Free | $0 | Good for testing, sleeps after 15 min |
| Starter | $7/mo | Always running, better performance |
| Pro | $12/mo | Priority support, more resources |

---

## Troubleshooting

**Deployment fails?**
- Check build logs in Render dashboard
- Make sure all npm dependencies are installed locally first
- Run `npm run build` locally to test

**Site is slow?**
- Free tier sleeps after inactivity
- Upgrade to Starter plan for always-on

**Want custom domain?**
- Go to Settings → Custom Domain in Render
- Point your domain DNS to Render
- Free SSL auto-configured

---

## Local vs Production

**Development (localhost)**
```bash
npm run dev
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

**Production (render.com)**
```
https://noxyproxy.onrender.com
# Both frontend & backend on same URL
```

---

## Push New Updates

Just commit and push to GitHub:
```bash
git add .
git commit -m "Add new features"
git push origin main
```

Render will **automatically redeploy** your site! 🚀

---

## Need Help?

- Render Docs: https://render.com/docs
- Check deployment logs in Render dashboard
- Issues tab on your GitHub repo

---

**Status**: Ready to deploy! ✅
