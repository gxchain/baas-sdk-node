# Install

```bash
npm install baas-sdk --save
```

# Usage

```js
import {BaaSClient} from 'baas-sdk'

let client = new BaaSClient('5Ka9YjFQtfUUX2Ddnqka...', '1.2.19');
console.time('data-exchange');
client.store("123").then(resp=>{
    console.end('data-exchange');
    console.log(resp);
}).catch(ex => {
    console.error('error when create data exchange request:', ex);
});
console.time('fetch-content');
client.data('').then(resp=>{
    console.end('fetch-content');
    console.log(resp);
}).catch(ex => {
    console.error('error when fetching content:', ex);
});
```

# Dev Documents

https://doc.gxb.io/gxchain/api/baas-api.html
