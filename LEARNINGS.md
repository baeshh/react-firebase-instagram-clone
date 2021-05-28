<!-- @format -->

Deploy on gh pages:
https://dev.to/yuribenjamin/how-to-deploy-react-app-in-github-pages-2a1f

# CHALLANGES AND LEARNINGS OF THE PROJECT

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
