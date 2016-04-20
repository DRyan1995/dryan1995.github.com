#The Git Instructions

*modified on Mar 13 2016 1:17AM*

---
## About config the editor:

`$ git config --global core.editor emacs`

## About the branch operations:

> + using `git branch` to check all the branches and your current branch
> + using `git branch -d` to delete the branch that are not needed
> + using `git checkout -b` to create or switch to another branch
> + using `git branch --set-upstream-to=origin/dev dev` to set the relation table beween your local branch and your remote branch

## About the basic operations:

> - using `git pull`
> - using `git push`
> - using `git init`
> - using `remote add`
> - ETC.....

## How to rollback:

![rollback_helper](http://120.27.114.115:8088/myblog/git_rollback.png)

## Use branches

- `git branch` to see all and the current local branch

- `git checkout -b` to create a local branch

- `git checkout -d` to delete a local branch

- `git merge ..` to merge a branch

- *You may need to `--set-upstream-to` your remote branch to make it work*
