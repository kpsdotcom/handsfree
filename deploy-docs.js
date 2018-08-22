const shell = require('shelljs')

// build
shell.exec('npm run docs:build')

// navigate into the build output directory
shell.cd('docs/.vuepress/dist')

// if you are deploying to a custom domain
shell.echo('"handsfree.js.org" > CNAME')

shell.exec('git init')
shell.exec('git add -A')
shell.exec('git commit -m "deploy docs 🐵"')

// if you are deploying to https://<USERNAME>.github.io
// git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

// if you are deploying to https://<USERNAME>.github.io/<REPO>
shell.exec('git remote add origin https://github.com/handsfreejs/docs')
shell.exec('git push origin master:gh-pages')

shell.cd('-')
