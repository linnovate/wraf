

### $cll.Item(collection, data)

### Item properties:
#### id
GUID assigned on item creation
> type: {Integer}<br>
default: undefined

#### type
Defines type of item's content (for example, "audio", "image", "video", etc.)
> type: {String}<br>
default: "image"


#### title
Title of the item (may be empty)
> type: {String}<br>
default: ""

#### tags
Optional tags
> type: [{String}]<br>
default: []

#### sortOrder
Item's position in collection
> type: {Float}<br>
default: undefined

#### publicProperties
Item-specific data, which will be published on /collections/publish request
> type: {Object}<br>
default: {}

#### privateProperties
Item-specific data, which will not be published (May be empty)
> type: {Object}<br>
default: {}


#### Create item:

```coffee
new $cll.Item myCollection,
  type:               'image'  
  title:              ''       
  tags:               []           
  publicProperties:   {}   
  privateProperties:  {}  
```

#### Item methods:

##### .save()
  Create or update current item<br>
>  @return {Promise}

##### .moveToStart()
  Create or move current at start of items list of current collection<br>
>  @return {Promise}

##### .moveToEnd()
  Create or move current at end of items list of current collection<br>
>  @return {Promise}

##### .moveBefore(beforeItemOrId)
  Create or move current item before specified<br>
>  @param beforeItemOrId {Number|$cll.Item}<br>
>  @return {Promise}

##### .moveAfter(afterItemOrId)
  Create or move current item after specified<br>
>  @param afterItemOrId {Number|$cll.Item}<br>
>  @return {Promise}

##### .delete()
  Delete current item<br>
>  @return {Promise}

#### Example:

```coffee
$cll.get('123').then (collection) ->
  item = new $cll.Item collection, title: 'First Image'
  item.save().then ->
    collection.publish()
```
