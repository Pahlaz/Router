# Router
Router for single page web app using hashchange event

## How to use
> Creating reference to Router
```js
<script>             
	var router = new Router();
</script>
```

> Router constructor accepts 2 parameters
+ routes
    
    type = [object]
    
+ allowCaching - allow page data to be stored in localStorage.

    type = [boolean]
    default = true

Define routes in object. And pass it to construtor.
```js
<script>
  var routes = { 
                '#/': 'home',
	        '#/about/': 'about',
	        '#/contact/': 'contact'
	       };
  
  var router = new Router(routes);
</script>
```
