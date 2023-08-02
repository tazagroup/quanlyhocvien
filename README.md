# Tazagroup
# CLI Libs Shared 
## Angular
npx nx g @nrwl/angular:guard  auth/guards/auth --project=shared

npx nx g @nrwl/angular:guard  auth/guards/admin --project=shared

npx nx g @nrwl/angular:guard  auth/guards/guest --project=shared

npx nx g @nrwl/angular:service auth/auth --project=shared

npx nx g @nrwl/angular:service admin/admin-baihoc --project=dtv2-shell

npx nx g @nrwl/angular:interceptor auth/auth --project=shared

npx nx g @nrwl/angular:component dangky --project=shared

npx nx g @nrwl/angular:component datlaimatkhau --project=shared

npx nx g @nrwl/angular:component dangnhap --project=shared

npx nx g @nrwl/angular:service dangnhap/dangnhap --project=shared

npx nx g @nrwl/angular:component quenmatkhau --project=shared

## Nestjs

npx nx g @nrwl/workspace:library datatype --project=shared

npx nx g @nrwl/nest:library api/auth --controller --service

npx nx g @nrwl/nest:module api/auth --project=shared

npx nx g @nrwl/nest:controller api/auth --project=shared

npx nx g @nrwl/nest:service api/auth --project=shared

npx nx g @nrwl/nest:guard api/jwt-auth --project=shared

npx nx g @nrwl/nest:class api/auth/jwt.strategy --project=shared

npx nx g @nrwl/nest:class api/auth/auth.dto --project=shared

npx nx g @nrwl/nest:decorator api/common/decorators/auth-user --project=shared

npx nx g @nrwl/nest:module api/prisma --project=shared

npx nx g @nrwl/nest:service api/prisma --project=shared

npx nx g @nrwl/nest:module api/users --project=shared

npx nx g @nrwl/nest:controller api/users --project=shared

npx nx g @nrwl/nest:service api/users --project=shared

npx nx g @nrwl/nest:class api/users/user.dto --project=shared

## CLI Libs daotaov2 
npx nx serve apidaotaov2

npx nx g @nrwl/nest:library dtv2/api --controller --service

npx nx g @nrwl/nest:application apidaotaov2

npx nx g @nrwl/nest:library dtv2/api/tailieunguon --controller --service




# CLI HRM APP
## Angular
npx nx g @angular/material:ng-add --project=hrm
npx nx generate @nrwl/angular:setup-tailwind hrm

npx nx g @nrwl/angular:application hrm

npx nx g @nrwl/angular:library libhrm/site

npx nx g @nrwl/angular:module libhrm/site/quanlynhansu --project=libhrm-site

npx nx g @nrwl/angular:component libhrm/site/quanlynhansu/detailnhanvien --project=libhrm-site

npx nx g @nrwl/angular:class libhrm/site/quanlynhansu/user.type --project=libhrm-site

## Nestjs
npx nx g @nrwl/nest:application apihrm

npx nx g @nrwl/nest:library libhrm/api

npx nx g @nrwl/workspace:library datatype --project=shared

npx nx g @nrwl/nest:library api/auth --controller --service

npx nx g @nrwl/nest:module api/auth --project=shared

npx nx g @nrwl/nest:controller api/auth --project=shared

npx nx g @nrwl/nest:service api/auth --project=shared

npx nx g @nrwl/nest:guard api/jwt-auth --project=shared

npx nx g @nrwl/nest:class api/auth/jwt.strategy --project=shared

npx nx g @nrwl/nest:class api/auth/auth.dto --project=shared

npx nx g @nrwl/nest:decorator api/common/decorators/auth-user --project=shared

npx nx g @nrwl/nest:module api/prisma --project=shared

npx nx g @nrwl/nest:service api/prisma --project=shared

npx nx g @nrwl/nest:module api/users --project=shared

npx nx g @nrwl/nest:controller api/users --project=shared

npx nx g @nrwl/nest:service api/users --project=shared

npx nx g @nrwl/nest:class api/users/user.dto --project=shared




## Run Remote
"start": "node dist/main.js",


## Git CLI
git remote prune origin "Đồng Bộ Nhánh Trên máy Chủ"
git push origin --delete  xóa nhánh remote
git branch -D xóa nhánh local
## Workspace CLI
npx nx g @nrwl/workspace:remove hrm
npx nx run-many --target=serve --projects=apidaotaov2,daotaov2 --parallel
npx nx run-many --target=build --projects=api-timona-tiktok,timona-tiktok --parallel

### Buid
npx nx build apidaotaov2 --prod --outputHashing=all
npx nx build hrm --prod --outputHashing=all
yarn add -W @angular/material && yarn nx g @angular/material:ng-add
npm install -D tailwindcss --force
npm install -D postcss -force
nx add @nestjs/ng-universal --clientProject=hdermaapp
npm install @nestjs/ng-universal && npx nx g @nestjs/ng-universal:ng-add
npx nx g @nrwl/angular:ng-add --clientProject=timonahttp://localhost:4200/
npm install -D @nrwl/angular



git branch gh-pages

git checkout gh-pages

git push origin gh-pages

npx ng add angular-cli-ghpages

npx ng deploy --base-href=https://quocbao1983.github.io/demo/

npx ng build --prod --base-href https://quocbao1983.github.io/demo/

npx ng add angular-cli-ghpages --project site

npx ngh --dir=dist/apps/site  --no-silent

 git config --global user.email "quocbao280783@gmail.com"

git config --global user.name "quocbao1983"

npx nx build --prod --outputHashing=all

### Docker BackEnd End
#### create and add to .dockerignore
Dockerfile

.dockerignore

node_modules
 
npm-debug.log
#### create and add to Dockerfile

FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

CMD [ "node", "dist/apps/api/main.js" ]

docker build -t demoapi .

After Deploy Get Link API and repalce APIURL
### Docker Front End
#### create and add to .dockerignore
Dockerfile

.dockerignore

node_modules
 
npm-debug.log
#### create and add to Dockerfile

FROM nginx:1.17.1-alpine

COPY /dist/apps/site /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/

EXPOSE 4200

docker build -t demosite .

docker build -t anhsonsite .
docker tag anhsonsite gcr.io/alert-rush-279906/anhsonsite
docker push gcr.io/alert-rush-279906/anhsonsite