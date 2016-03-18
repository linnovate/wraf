


### $cll.ItemsList(collection, data)

Inherits Array<br>
Is created as collection.items field


#### ItemsList methods:

##### .save(items)
  Create or update current item<br>
>  @param [items] [{$cll.Item}] List of items for save. Default current itemsList<br>
>  @return {Promise}

##### .moveToStart(items)
  Create or move current at start of items list of current collection<br>
>  @param items [{$cll.Item}] List of items<br>
>  @return {Promise}

##### .moveToEnd(items)
  Create or move current to the end of items list of current collection<br>
>  @param items [{$cll.Item}] List of items<br>
>  @return {Promise}

##### .moveBefore(items, beforeItemOrId)
  Create or move current item before specified<br>
>  @param items [{$cll.Item}] List of items<br>
>  @param beforeItemOrId {Number|$cll.Item} item or id<br>
>  @return {Promise}

##### .moveAfter(items, afterItemOrId)
  Create or move current item after specified<br>
>  @param items [{$cll.Item}] List of items<br>
>  @param afterItemOrId {Number|$cll.Item} item or id<br>
>  @return {Promise}

##### .delete(items)
  Delete current item<br>
>  @param [items] [{$cll.Item}] List of items to delete. Default current itemsList<br>
>  @return {Promise}

#### Example:

```coffee
$cll.get('123').then (collection) ->

  lastItem = collection.items[collection.items.length - 1]
  collection.items.moveToStart [lastItem]
```

