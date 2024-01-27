# Init

```bash
pnpm add uploadthing @uploadthing/react
pnpm add @clerk/nextjs
pnpm dlx shadcn-ui@latest add separator button sheet form input select alert-dialog textarea checkbox
pnpm add mongoose mongodb svix query-string
pnpm add react-datepicker 
pnpm add -D @types/react-datepicker 
pnpm install --save stripe @stripe/stripe-js next
pnpm add stripe
```

## Enable clerk webhook

> https://clerk.com/docs/users/sync-data

## Git init

```bash
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:biaggii/event_platform.git
git push -u origin main
```
## edit config
```javascript
// next.config.js
const nextConfig = {
  images:{
    domains: ['utfs.io'],
  },
}


```