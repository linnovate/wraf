

## Methods

### $cll.getAll()

  Load all collections from server by type
  
>  @param [type] {String} default "image": Defines type of collection's content (for example, "audio", "image", "video", etc.)<br>
>  @return {Promise}

```coffee
$cll.getAll('image').then (collections) ->
  # Collections are loaded
  # @param collections [{$cll.Collection}]: Array of collections
, ->
  # Error

```


### $cll.get(collectionOrId)
  Load single collection from server

>  @param collectionOrId {String|$cll.Collection}<br>
>  @return {Promise}<br>

```coffee
$cll.get('123').then (collection) ->
  # Collection is loaded
  # @param collection{$cll.Collection}
, ->
  # Error

```

### $cll.authorize(type, options)
  Authorize user with custom parameters<br>
  Is called automatically by any model or $cll.getAll(), $cll.get() requests on auth fails, so you don`t need to call this method for Wix auth<br>
  Facebook and Google are not supported yet

>  @param [type] {String} "wix" || "facebook" || "google", default "wix" <br>
>  @param [options] {Object} <br>
>  @return {Promise}<br>

```coffee
$cll.authorize('facebook', {token: '123'}).then ->
  # Auth success
  $cll.getAll()
, ->
  # Error

```


### $cll.logout()
  Destroy user session

>  @return {Promise}<br>

```coffee
$cll.logout().then ->
  # Logout success
, ->
  # Error

```
