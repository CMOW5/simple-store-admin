#!/usr/bin/env sh

# abort on errors
set -e

# build
git checkout build
git merge master 
npm run build
git add .
git commit -m "0.0.1 simple store"
git subtree push --prefix build production master
git checkout master


git push production `git subtree split --prefix build build`:master --force
