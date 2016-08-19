
### $cll.Collection(data)

#### Collection properties:

#### id
GUID assigned on item creation
> type: {Integer}<br>
default: undefined

#### type
Defines type of collection's content (for example, "audio", "image", "video", etc.)
> type: {String}<br>
default: "image"

#### title
Title of the collection (may be empty)
> type: {String}<br>
default: ""

#### tags
Optional tags
> type: [{String}]<br>
default: []

#### thumbnailUrl
URL of the image representing this collection (may be empty)
> type: {String}<br>
default: ""

#### publicProperties
Collection-specific data, which will be published on /collections/publish request
> type: {Object}<br>
default: {}

#### privateProperties
Collection-specific data, which will not be published (May be empty)
> type: {Object}<br>
default: {}

#### items
Items array with group actions
> type: {$cll.ItemsList}<br>
default: []



#### Create collection:

```coffee
new $cll.Collection
  type:               'image'
  title:              ''  
  tags:               []  
  thumbnailUrl:       '' 
  publicProperties:   {}   
  privateProperties:  {} 
  items:              [] 
```


#### Collection methods:

##### .get()
  Reload current collection
>  @return {Promise}

##### .save()
  Create or update current collection<br>
>  @return {Promise}

##### .delete()
  Delete current collection<br>
>  @return {Promise}

##### .publish()
  Publish current collection<br>
>  @return {Promise}


#### Example:

```coffee
collection = new $cll.Collection title: 'My Images'

collection.save().then ->
  collection.publish()
```
