<!-- @format -->









Deploy on gh pages:
https://dev.to/yuribenjamin/how-to-deploy-react-app-in-github-pages-2a1f

# CHALLANGES AND LEARNINGS OF THE PROJECT

Uncaught (in promise) FirebaseError: AppCheck: AppCheck is being used before activate() is called for FirebaseApp [DEFAULT]. Please make sure you call activate() before instantiating other Firebase services. (appCheck/use-before-activation).

Update App to latest version

## Working with git

Some commands that I used along the way , and learned some new ones

Delete branch remotely

```
git push origin --delete `branch-name`
```

Create new branch and switch to it

```
git checkout -b `branch-name`
```

Push code to new branch

```
git push -u origin `branch-name`
```

## Context Provider

https://javascript.plainenglish.io/introduction-to-react-context-api-with-firebase-authentication-92a6a3cf116d

## Deploying to Web

### Netlify

I faced a challange deploying code on Netlify. LOgs would run fine and site would get published. But as I go through the link on the homepage of my app, it would be blank. Here are some steps I took to deploy that solved the issue

1. Create netlify.toml file add following script inside

```
[build]
    publish = "build/"
```

3. In Netlify UI configure:
   Build command : CI= npm run build
   Publish directory: build/

4. Add this script in package.json

```
  "homepage": "."
```
