
## Events

Each Class or instance has .on() method
### .on(eventsNames, listener, scope)
  Add event(s) listener<br>
>  @param eventsNames [{String}]|{String}<br>
>  @param listener {Function}<br>
>  @param [scope] {Object} for call listener with custom scope


```coffee
$cll.Collection.on 'any', (promise, event, args...) ->

  # @param promise {Promise}
  # @param event {Object}
  # @param event.name {String}
  # @param event.model {_CollectionsList|$cll.Collection|$cll.ItemsList|$cll.Item} 
  # @param args... list of arguments of action (! not an array, see coffee syntax)

  # action just called
  
  promise.done ->
    # action completed
    
  promise.fail ->
    # action failed
  
```


You can track Class or instance events
```coffee
$cll.Collection.on 'eventName', (promise, event, args...) ->
  # track any collection action
  
myCollection = new $cll.Collection()
myCollection.on 'eventName', (promise, event, args...) ->
  # track current collection only
```

### $cll (_CollectionsList)
* **any**
* **create**
* **getAll**
* **get**

### $cll.Collection
* **any**
* **create**
* **get**
* **save**
* **delete**
* **publish**

### $cll.ItemsList
* **any**
* **create**
* **save**
* **moveToStart**
* **moveToEnd**
* **moveBefore**
* **moveAfter**
* **delete**

### $cll.Item
* **any**
* **create**
* **save**
* **moveToStart**
* **moveToEnd**
* **moveBefore**
* **moveAfter**
* **delete**
