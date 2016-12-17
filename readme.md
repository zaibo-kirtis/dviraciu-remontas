1. Install node.js
2. `npm install gulp -g`
3. `npm install`
4. `gulp prod`
5. `node .`

To add new module:
1. copy `/app/bikes` folder to `/app/{name}`
2. replace `bike`->`{name}` and `Bike`->`{Name}` in that folder
3. add menu item in `/index.html` if necessary
4. copy `/server/bikes` folder to `/server/{name}`
5. replace `bike`->`{name}` and `Bike`->`{Name}` in that folder
6. add new router in `/server/express.js`
7. edit db queries in `/server/{name}`
