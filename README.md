# data-marketplace

### Architecture

![Data Marketplace Architecture](./docs/assets/data_marketplace.png 'Data Marketplace Architecture')

## PM2

```bash
# start an app
$ yarn run build

$ pm2 start dist/main.js --name data-marketplace

# stop app
pm2 stop <id>

# restart app
pm2 restart <id>
```
