# mydata3
```
升级到vue3,router|axios封装|element+
```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### 正式环境nginx配置
```
    location /api {

            proxy_pass_header Server;

            proxy_redirect off;

            proxy_set_header   Host             $http_host;

            proxy_set_header   x-forwarded-for  $remote_addr;

            proxy_set_header   X-Real-IP        $remote_addr;

            proxy_read_timeout 120;
           proxy_pass   http://127.0.0.1:8081;

    }

```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
