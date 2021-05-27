<!-- @format -->

Deploy on gh pages:
https://dev.to/yuribenjamin/how-to-deploy-react-app-in-github-pages-2a1f

# CHALLANGES AND LEARNINGS OF THE PROJECT

## Deploying to Web

### Gitgub pages

### Netlify

1. create netlify.toml file
2. add following script

```
[build]
    publish = "build/"
```

3. In Netlify UI configure:
   Build command : CI= npm run build
   Publish directory: build/

4. in package.json add script

```
  "homepage": "."
```
