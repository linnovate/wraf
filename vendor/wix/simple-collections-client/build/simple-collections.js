(function(){
var Collection, CollectionModel, CollectionsList, CollectionsListModel, Events, Item, ItemModel, ItemsList, ItemsListModel, apiUrl, authRequests, authorize, authorizeOnFail, collectionsRequests, collectionsUrlPart, getId, getNoIdPromise, getPromise, initializeAngular, itemsRequests, logout, noModelIdError, toArray, toCamelCase, toClientModel,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  _this = this;

apiUrl = '//collections.wix.com';

noModelIdError = 'modelOrId does not contain id';

getId = function(modelOrId) {
  if (typeof modelOrId === 'string' || typeof modelOrId === 'number') {
    return modelOrId;
  } else if (typeof modelOrId === 'object' && ((modelOrId != null ? modelOrId.id : void 0) != null)) {
    return modelOrId.id;
  } else {
    throw new Error(noModelIdError);
    return void 0;
  }
};

collectionsUrlPart = function(collectionOrId) {
  return "collections/" + (getId(collectionOrId));
};

toArray = function(data) {
  if (data instanceof Array) {
    return data;
  } else {
    return [data];
  }
};

getNoIdPromise = function() {
  var deferred;
  deferred = $.Deferred();
  deferred.reject(noModelIdError);
  return deferred.promise();
};

getPromise = function(request, getProperty) {
  var deferred;
  deferred = $.Deferred();
  request.done(function(res) {
    var property;
    property = getProperty != null ? getProperty(res) : res;
    if (!(res != null ? res.error : void 0) && (property != null)) {
      return deferred.resolve(property);
    } else {
      return deferred.reject(res);
    }
  });
  request.fail(function(res) {
    return deferred.reject(res);
  });
  return deferred.promise();
};

authRequests = {
  wix: function() {
    return getPromise($.ajax({
      url: "" + apiUrl + "/auth/wix/login",
      type: 'POST',
      contentType: "application/json; charset=utf-8",
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true
    }));
  },
  logout: function() {
    return getPromise($.ajax({
      url: "" + apiUrl + "/auth/logout",
      type: 'POST',
      contentType: "application/json; charset=utf-8",
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true
    }));
  }
};

collectionsRequests = null;

(function() {
  var getCollectionPromise, getCollectionsListPromise;
  getCollectionsListPromise = function(request) {
    return getPromise(request, function(res) {
      return res != null ? res.collections : void 0;
    });
  };
  getCollectionPromise = function(request) {
    return getPromise(request, function(res) {
      return res != null ? res.collection : void 0;
    });
  };
  return collectionsRequests = {
    getAll: function(type, withItems) {
      return getCollectionsListPromise($.ajax({
        url: "" + apiUrl + "/collections",
        type: 'GET',
        data: {
          type: type,
          include_items: withItems
        },
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true
      }));
    },
    create: function(collection) {
      return getCollectionPromise($.ajax({
        url: "" + apiUrl + "/collections",
        type: 'POST',
        data: JSON.stringify(collection),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        }
      }));
    },
    get: function(collectionOrId) {
      if (getId(collectionOrId) == null) {
        return getNoIdPromise();
      }
      return getCollectionPromise($.ajax({
        url: "" + apiUrl + "/" + (collectionsUrlPart(collectionOrId)),
        type: 'GET',
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        }
      }));
    },
    partialUpdateProperties: function(collectionOrId, fieldsToUpdate) {
      if (getId(collectionOrId) == null) {
        return getNoIdPromise();
      }
      return getCollectionPromise($.ajax({
        url: "" + apiUrl + "/" + (collectionsUrlPart(collectionOrId)),
        type: 'PUT',
        data: JSON.stringify(fieldsToUpdate),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        }
      }));
    },
    updateProperties: function(collection) {
      if (getId(collection) == null) {
        return getNoIdPromise();
      }
      return getCollectionPromise($.ajax({
        url: "" + apiUrl + "/" + (collectionsUrlPart(collection.id)),
        type: 'PUT',
        data: JSON.stringify(collection),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        }
      }));
    },
    "delete": function(collectionOrId) {
      if (getId(collectionOrId) == null) {
        return getNoIdPromise();
      }
      return getPromise($.ajax({
        url: "" + apiUrl + "/" + (collectionsUrlPart(collectionOrId)),
        type: 'DELETE',
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        }
      }));
    },
    publish: function(collectionOrId) {
      if (getId(collectionOrId) == null) {
        return getNoIdPromise();
      }
      return getPromise($.ajax({
        url: "" + apiUrl + "/" + (collectionsUrlPart(collectionOrId)),
        type: 'POST',
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        }
      }));
    }
  };
})();

itemsRequests = null;

(function() {
  var getItemsPromise;
  getItemsPromise = function(request) {
    return getPromise(request, function(res) {
      var data;
      if (!(res != null ? res.items : void 0)) {
        return null;
      }
      data = [];
      _.forEach(res != null ? res.items : void 0, function(itemData) {
        if (itemData.object != null) {
          data.push(itemData.object);
        }
      });
      return data;
    });
  };
  return itemsRequests = {
    createAsFirst: function(collectionOrId, items) {
      if (getId(collectionOrId) == null) {
        return getNoIdPromise();
      }
      return getItemsPromise($.ajax({
        url: "" + apiUrl + "/" + (collectionsUrlPart(collectionOrId)) + "/items/prepend",
        type: 'POST',
        data: JSON.stringify({
          items: toArray(items)
        }),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        }
      }));
    },
    createAsLast: function(collectionOrId, items) {
      if (getId(collectionOrId) == null) {
        return getNoIdPromise();
      }
      return getItemsPromise($.ajax({
        url: "" + apiUrl + "/" + (collectionsUrlPart(collectionOrId)) + "/items/append",
        type: 'POST',
        data: JSON.stringify({
          items: toArray(items)
        }),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        }
      }));
    },
    createBefore: function(collectionOrId, items, beforeItemOrID) {
      if (getId(collectionOrId) == null) {
        return getNoIdPromise();
      }
      if (getId(beforeItemOrID) == null) {
        return getNoIdPromise();
      }
      return getItemsPromise($.ajax({
        url: "" + apiUrl + "/" + (collectionsUrlPart(collectionOrId)) + "/items/insert-before/" + (getId(beforeItemOrID)),
        type: 'POST',
        data: JSON.stringify({
          items: toArray(items)
        }),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        }
      }));
    },
    createAfter: function(collectionOrId, items, afterItemOrID) {
      if (getId(collectionOrId) == null) {
        return getNoIdPromise();
      }
      if (getId(afterItemOrID) == null) {
        return getNoIdPromise();
      }
      return getItemsPromise($.ajax({
        url: "" + apiUrl + "/" + (collectionsUrlPart(collectionOrId)) + "/items/insert-after/" + (getId(afterItemOrID)),
        type: 'POST',
        data: JSON.stringify({
          items: toArray(items)
        }),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        }
      }));
    },
    update: function(collectionOrId, items) {
      if (getId(collectionOrId) == null) {
        return getNoIdPromise();
      }
      return getItemsPromise($.ajax({
        url: "" + apiUrl + "/" + (collectionsUrlPart(collectionOrId)) + "/items",
        type: 'PUT',
        data: JSON.stringify({
          items: toArray(items)
        }),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        }
      }));
    },
    "delete": function(collectionOrId, itemsOrIds) {
      var ids;
      if (getId(collectionOrId) == null) {
        return getNoIdPromise();
      }
      ids = _.map(toArray(itemsOrIds), getId);
      return getPromise($.ajax({
        url: "" + apiUrl + "/" + (collectionsUrlPart(collectionOrId)) + "/items/delete",
        type: 'POST',
        data: JSON.stringify({
          item_ids: ids
        }),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        }
      }));
    },
    moveToStart: function(collectionOrId, itemsOrIds) {
      var ids;
      if (getId(collectionOrId) == null) {
        return getNoIdPromise();
      }
      ids = _.map(toArray(itemsOrIds), getId);
      return getItemsPromise($.ajax({
        url: "" + apiUrl + "/" + (collectionsUrlPart(collectionOrId)) + "/items/move-first",
        type: 'POST',
        data: JSON.stringify({
          item_ids: ids
        }),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        }
      }));
    },
    moveToEnd: function(collectionOrId, itemsOrIds) {
      var ids;
      if (getId(collectionOrId) == null) {
        return getNoIdPromise();
      }
      ids = _.map(toArray(itemsOrIds), getId);
      return getItemsPromise($.ajax({
        url: "" + apiUrl + "/" + (collectionsUrlPart(collectionOrId)) + "/items/move-last",
        type: 'POST',
        data: JSON.stringify({
          item_ids: ids
        }),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        }
      }));
    },
    moveBefore: function(collectionOrId, itemsOrIds, beforeItemOrID) {
      var ids;
      if (getId(collectionOrId) == null) {
        return getNoIdPromise();
      }
      if (getId(beforeItemOrID) == null) {
        return getNoIdPromise();
      }
      ids = _.map(toArray(itemsOrIds), getId);
      return getItemsPromise($.ajax({
        url: "" + apiUrl + "/" + (collectionsUrlPart(collectionOrId)) + "/items/move-before/" + (getId(beforeItemOrID)),
        type: 'POST',
        data: JSON.stringify({
          item_ids: ids
        }),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        }
      }));
    },
    moveAfter: function(collectionOrId, itemsOrIds, afterItemOrID) {
      var ids;
      if (getId(collectionOrId) == null) {
        return getNoIdPromise();
      }
      if (getId(afterItemOrID) == null) {
        return getNoIdPromise();
      }
      ids = _.map(toArray(itemsOrIds), getId);
      return getItemsPromise($.ajax({
        url: "" + apiUrl + "/" + (collectionsUrlPart(collectionOrId)) + "/items/move-after/" + (getId(afterItemOrID)),
        type: 'POST',
        data: JSON.stringify({
          item_ids: ids
        }),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        }
      }));
    }
  };
})();

(function() {
  var initializeXDomain;
  if (/(MSIE|Trident)/i.test(window.navigator.userAgent || '')) {
    initializeXDomain = $.Deferred();
    $.getScript('//static.parastorage.com/services/third-party/xdomain/0.6.11/xdomain.min.js', function() {
      var proxies, siteUrl;
      siteUrl = "" + document.location.protocol + "//" + document.location.hostname;
      proxies = {};
      proxies[apiUrl] = "/assets/iframe_cors_proxy.html?site_url=" + siteUrl;
      xdomain.slaves(proxies);
      return initializeXDomain.resolve();
    });
    return _.forEach([collectionsRequests, authRequests, itemsRequests], function(requests) {
      return _.forEach(requests, function(request, name) {
        return requests[name] = function() {
          var args, deffer;
          if (initializeXDomain.state() === 'resolved') {
            return request.apply(requests, arguments);
          }
          deffer = $.Deferred();
          args = arguments;
          initializeXDomain.promise().then(function() {
            var promise;
            promise = request.apply(requests, args);
            return promise.then(deffer.resolve, deffer.reject);
          });
          return deffer.promise();
        };
      });
    });
  }
})();

toCamelCase = function(name) {
  return name.replace(/_([a-z])/g, function(all, symbol) {
    return symbol.toUpperCase();
  });
};

toClientModel = function(model) {
  var attrs;
  attrs = {};
  _.forEach(model, function(val, key) {
    attrs[toCamelCase(key)] = val;
    return true;
  });
  return attrs;
};

authorizeOnFail = function(methods, methodsNames) {
  return _.forEach(methodsNames, function(methodName) {
    var method;
    method = methods[methodName];
    return methods[methodName] = function() {
      var args, deferred,
        _this = this;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      deferred = $.Deferred();
      method.call.apply(method, [this].concat(__slice.call(args))).done(deferred.resolve).fail(function(res) {
        if (res.status === 403) {
          return authorize().fail(function() {
            return deferred.reject(res);
          }).done(function() {
            return method.call.apply(method, [_this].concat(__slice.call(args))).done(deferred.resolve).fail(deferred.reject);
          });
        } else {
          return deferred.reject(res);
        }
      });
      return deferred.promise();
    };
  });
};

CollectionModel = (function() {
  function CollectionModel(attributes) {
    this._toDefaults();
    this._mergeProperties(attributes);
  }

  CollectionModel.prototype._toDefaults = function() {
    this.id = void 0;
    this.type = 'image';
    this.title = '';
    this.tags = [];
    this.uniquePerUser = false;
    this.thumbnailUrl = '';
    this.publicProperties = {};
    this.privateProperties = {};
    if (this.items) {
      return this.items.length = 0;
    } else {
      return this.items = new ItemsList(this);
    }
  };

  CollectionModel.prototype._mergeProperties = function(serverData) {
    var modelData, _ref,
      _this = this;
    modelData = toClientModel(serverData);
    _.forEach(modelData, function(val, key) {
      if (key !== 'items' && typeof val !== 'function' && key[0] !== '_') {
        _this[key] = val;
      }
      return true;
    });
    if ((_ref = modelData.items) != null ? _ref.length : void 0) {
      return this.items._merge(modelData.items);
    }
  };

  CollectionModel.prototype._toServerModel = function() {
    return {
      id: this.id,
      type: this.type,
      title: this.title,
      tags: this.tags,
      thumbnail_url: this.thumbnailUrl,
      unique_per_user: this.uniquePerUser,
      public_properties: this.publicProperties,
      private_properties: this.privateProperties
    };
  };

  CollectionModel.prototype.get = function() {
    var _this = this;
    return collectionsRequests.get(this.id).then(function(serverData) {
      _this._toDefaults();
      _this._mergeProperties(serverData);
      return _this;
    });
  };

  CollectionModel.prototype.update = function(newFields) {
    var _this = this;
    return collectionsRequests.partialUpdateProperties(this.id, newFields).then(function(res) {
      _this._mergeProperties(res);
      return _this;
    });
  };

  CollectionModel.prototype.save = function() {
    var items,
      _this = this;
    if (this.id) {
      return collectionsRequests.updateProperties(this._toServerModel()).then(function(res) {
        _this._mergeProperties(res);
        return _this;
      });
    } else {
      items = this.items._toServerModel();
      return collectionsRequests.create(_.extend({
        items: items
      }, this._toServerModel())).then(function(res) {
        _this._toDefaults();
        _this._mergeProperties(res);
        return _this;
      });
    }
  };

  CollectionModel.prototype["delete"] = function() {
    return collectionsRequests["delete"](this.id);
  };

  CollectionModel.prototype.publish = function() {
    var _this = this;
    return collectionsRequests.publish(this.id).then(function(res) {
      _this._mergeProperties(res);
      return _this;
    });
  };

  return CollectionModel;

})();

authorizeOnFail(CollectionModel.prototype, ['get', 'save', 'delete', 'publish', 'update']);

CollectionsListModel = (function(_super) {
  __extends(CollectionsListModel, _super);

  function CollectionsListModel() {
    var _this = this;
    Collection.on('construct', function(promise) {
      return promise.then(function(collectionModel) {
        var existedCollection;
        existedCollection = _.find(_this, function(c) {
          return c.id === collectionModel.id;
        });
        if (existedCollection != null) {
          return existedCollection._mergeProperties(collectionModel);
        } else {
          return _this.push(collectionModel);
        }
      });
    });
    Collection.on('delete', function(promise, event) {
      return promise.then(function() {
        return _.remove(_this, function(c) {
          return c.id === event.model.id;
        });
      });
    });
  }

  CollectionsListModel.prototype.getAll = function(type, withItems) {
    var remove_later,
      _this = this;
    if (type == null) {
      type = "image";
    }
    if (withItems == null) {
      withItems = true;
    }
    remove_later = [];
    return collectionsRequests.getAll(type, withItems).then(function(allModelsData) {
      _.forEach(allModelsData, function(modelData) {
        return new Collection(toClientModel(modelData));
      });
      _.forEach(_this, function(savedCollection) {
        var obsolete;
        obsolete = !_.find(allModelsData, function(current) {
          return current.id === savedCollection.id;
        });
        if (obsolete) {
          return remove_later.push(savedCollection);
        }
      });
      _.remove(_this, function(c) {
        return _.includes(remove_later, c);
      });
      return _this;
    });
  };

  CollectionsListModel.prototype.get = function(collectionOrId) {
    return collectionsRequests.get(collectionOrId).then(function(modelData) {
      return new Collection(toClientModel(modelData));
    });
  };

  return CollectionsListModel;

})(Array);

authorizeOnFail(CollectionsListModel.prototype, ['getAll', 'get']);

ItemModel = null;

(function() {
  var callWithOrWithoutId;
  callWithOrWithoutId = function() {
    var args, itemModel, promise, withIdRequest, withoutIdRequest,
      _this = this;
    itemModel = arguments[0], withIdRequest = arguments[1], withoutIdRequest = arguments[2], args = 4 <= arguments.length ? __slice.call(arguments, 3) : [];
    promise = itemModel.id ? withIdRequest.apply(null, [itemModel._collection, itemModel._toServerModel()].concat(__slice.call(args))) : withoutIdRequest.apply(null, [itemModel._collection, itemModel._toServerModel()].concat(__slice.call(args)));
    return promise.then(function(res) {
      itemModel._mergeProperties(res);
      return itemModel;
    });
  };
  ItemModel = (function() {
    ItemModel.prototype._collection = null;

    function ItemModel(_collection, attributes) {
      this._collection = _collection;
      this._toDefaults();
      this._mergeProperties(attributes);
    }

    ItemModel.prototype._toDefaults = function() {
      return _.extend(this, {
        id: void 0,
        type: 'image',
        title: '',
        tags: [],
        sortOrder: void 0,
        publicProperties: {},
        privateProperties: {}
      });
    };

    ItemModel.prototype._mergeProperties = function(serverData) {
      var _this = this;
      if (serverData instanceof Array) {
        serverData = serverData[0];
      }
      return _.forEach(toClientModel(serverData), function(val, key) {
        if (typeof val !== 'function' && key[0] !== '_') {
          _this[key] = val;
        }
        return true;
      });
    };

    ItemModel.prototype._toServerModel = function() {
      return {
        id: this.id,
        type: this.type,
        title: this.title,
        tags: this.tags,
        public_properties: this.publicProperties,
        private_properties: this.privateProperties
      };
    };

    ItemModel.prototype.save = function() {
      return callWithOrWithoutId(this, itemsRequests.update, itemsRequests.createAsLast);
    };

    ItemModel.prototype.moveToStart = function() {
      return callWithOrWithoutId(this, itemsRequests.moveToStart, itemsRequests.createAsFirst);
    };

    ItemModel.prototype.moveToEnd = function() {
      return callWithOrWithoutId(this, itemsRequests.moveToEnd, itemsRequests.createAsLast);
    };

    ItemModel.prototype.moveBefore = function(beforeItemOrId) {
      return callWithOrWithoutId(this, itemsRequests.moveBefore, itemsRequests.createBefore, beforeItemOrId);
    };

    ItemModel.prototype.moveAfter = function(afterItemOrId) {
      return callWithOrWithoutId(this, itemsRequests.moveAfter, itemsRequests.createAfter, afterItemOrId);
    };

    ItemModel.prototype["delete"] = function() {
      return itemsRequests["delete"](this._collection, this);
    };

    return ItemModel;

  })();
  return authorizeOnFail(ItemModel.prototype, ['save', 'moveToStart', 'moveToEnd', 'moveBefore', 'moveAfter', 'delete']);
})();

ItemsListModel = null;

(function() {
  var callWithOrWithoutIds, sort;
  callWithOrWithoutIds = function() {
    var args, deferred, items, itemsList, itemsWithIds, itemsWithoutIds, mergeAndResolve, serverItems, uncompletedRequestsCount, withIdRequest, withoutIdRequest;
    itemsList = arguments[0], items = arguments[1], withIdRequest = arguments[2], withoutIdRequest = arguments[3], args = 5 <= arguments.length ? __slice.call(arguments, 4) : [];
    deferred = $.Deferred();
    uncompletedRequestsCount = 0;
    mergeAndResolve = function(res) {
      uncompletedRequestsCount--;
      itemsList._merge(res);
      if (!uncompletedRequestsCount) {
        return deferred.resolve(items);
      }
    };
    serverItems = _.map(items, function(i) {
      return i._toServerModel();
    });
    itemsWithIds = _.filter(serverItems, function(i) {
      return i.id != null;
    });
    itemsWithoutIds = _.filter(serverItems, function(i) {
      return i.id == null;
    });
    if (itemsWithIds.length && (withIdRequest != null)) {
      uncompletedRequestsCount++;
      withIdRequest.apply(null, [itemsList._collection, itemsWithIds].concat(__slice.call(args))).then(mergeAndResolve);
    }
    if (itemsWithoutIds.length && (withoutIdRequest != null)) {
      uncompletedRequestsCount++;
      withoutIdRequest.apply(null, [itemsList._collection, itemsWithoutIds].concat(__slice.call(args))).then(mergeAndResolve);
    }
    return deferred.promise();
  };
  sort = function(itemsList) {
    var sorted;
    sorted = _.sortBy(itemsList, 'sortOrder');
    itemsList.length = 0;
    return _.forEach(sorted, function(i) {
      return itemsList.push(i);
    });
  };
  ItemsListModel = (function(_super) {
    __extends(ItemsListModel, _super);

    ItemsListModel.prototype._collection = null;

    function ItemsListModel(_collection, items) {
      var remove,
        _this = this;
      this._collection = _collection;
      Item.on('construct', function(promise) {
        return promise.then(function(itemModel) {
          if (!_this._has(itemModel) && _this._isFromCurrentCollection(itemModel)) {
            return _this.push(itemModel);
          }
        });
      });
      remove = function(itemModel) {
        if (_this._isFromCurrentCollection(itemModel)) {
          return _.remove(_this, function(i) {
            return i.id === itemModel.id;
          });
        }
      };
      Item.on('delete', function(promise, event) {
        return promise.then(function() {
          return remove(event.model);
        });
      });
      ItemsList.on('delete', function(promise, event, items) {
        return promise.then(function() {
          return _.forEach(items || event.model, function(i) {
            return remove(i);
          });
        });
      });
      this.on('any', function(promise) {
        return promise.then(function() {
          return sort(_this);
        });
      });
      Item.on('any', function(promise) {
        return promise.then(function(itemModel) {
          if (_this._has(itemModel)) {
            return sort(_this);
          }
        });
      });
      if (items != null ? items.length : void 0) {
        this._merge(items);
      }
    }

    ItemsListModel.prototype._toServerModel = function() {
      return _.map(this, function(i) {
        return i._toServerModel();
      });
    };

    ItemsListModel.prototype._merge = function(serverItems) {
      var _this = this;
      return _.forEach(serverItems, function(itemData) {
        var foundItem;
        foundItem = _this._getIfHas(itemData);
        if (foundItem) {
          return foundItem._mergeProperties(itemData);
        } else {
          return new Item(_this._collection, itemData);
        }
      });
    };

    ItemsListModel.prototype._getIfHas = function(itemModel) {
      return _.find(this, function(i) {
        return i === itemModel || ((i.id != null) && i.id === itemModel.id);
      });
    };

    ItemsListModel.prototype._has = function(itemModel) {
      return !!this._getIfHas(itemModel);
    };

    ItemsListModel.prototype._isFromCurrentCollection = function(itemModel) {
      return ((itemModel != null ? itemModel._collection : void 0) != null) && (itemModel != null ? itemModel._collection : void 0) === this._collection;
    };

    ItemsListModel.prototype.save = function(items) {
      return callWithOrWithoutIds(this, items || this, itemsRequests.update, itemsRequests.createAsLast);
    };

    ItemsListModel.prototype.moveToStart = function(items) {
      return callWithOrWithoutIds(this, items, itemsRequests.moveToStart, itemsRequests.createAsFirst);
    };

    ItemsListModel.prototype.moveToEnd = function(items) {
      return callWithOrWithoutIds(this, items, itemsRequests.moveToEnd, itemsRequests.createAsLast);
    };

    ItemsListModel.prototype.moveBefore = function(items, beforeItemOrId) {
      return callWithOrWithoutIds(this, items, itemsRequests.moveBefore, itemsRequests.createBefore, beforeItemOrId);
    };

    ItemsListModel.prototype.moveAfter = function(items, afterItemOrId) {
      return callWithOrWithoutIds(this, items, itemsRequests.moveAfter, itemsRequests.createAfter, afterItemOrId);
    };

    ItemsListModel.prototype["delete"] = function(items) {
      return itemsRequests["delete"](this._collection, items || this);
    };

    return ItemsListModel;

  })(Array);
  return authorizeOnFail(ItemsListModel.prototype, ['save', 'moveToStart', 'moveToEnd', 'moveBefore', 'moveAfter', 'delete']);
})();

Events = (function() {
  /*
  * Add default events to subscribe or trigger
  *   event.someEvent(data) - trigger
  *   event.someEvent(function, scope) - subscribe
  * @param [methods] {object}
  * @param [eventsNames] [{string}]|{string}
  */

  function Events(methods, _eventsNames) {
    var trigger,
      _this = this;
    this._eventsNames = _eventsNames != null ? _eventsNames : [];
    if (typeof this._eventsNames === 'string') {
      this._eventsNames = [this._eventsNames];
    }
    this.eventHandlers = {};
    trigger = function() {
      return _this.trigger.apply(_this, arguments);
    };
    _.forEach(this._eventsNames, function(name) {
      var method;
      if (methods[name]) {
        method = methods[name];
        return methods[name] = function() {
          var args, promise;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          promise = method.apply(this, arguments);
          trigger.apply(null, [name, promise, this].concat(__slice.call(args)));
          return promise;
        };
      }
    });
  }

  /*
  * Event firer
  * @param eventName {string}
  * @param [promise] {promise}
  */


  Events.prototype.trigger = function() {
    var args, eventName, model, promise;
    eventName = arguments[0], promise = arguments[1], model = arguments[2], args = 4 <= arguments.length ? __slice.call(arguments, 3) : [];
    return _.forEach(this.eventHandlers[eventName] || [], function(handlerData) {
      var _ref;
      return (_ref = handlerData.listener).call.apply(_ref, [handlerData.scope, promise, {
        name: eventName,
        model: model
      }].concat(__slice.call(args)));
    });
  };

  /*
  * Event subscriber
  * @param eventNames [{string}]|{string}
  * @param listener {function}
  * @param [scope] {*}
  */


  Events.prototype.on = function(eventNames, listener, scope) {
    var _this = this;
    if (typeof eventNames === 'string') {
      eventNames = [eventNames];
    }
    if (eventNames.indexOf('any') >= 0) {
      eventNames = this._eventsNames;
    }
    return _.forEach(eventNames, function(name) {
      var _base;
      (_base = _this.eventHandlers)[name] || (_base[name] = []);
      return _this.eventHandlers[name].push({
        listener: listener,
        scope: scope || _this
      });
    });
  };

  return Events;

})();

Collection = null;

(function() {
  var anyModelEvents;
  Collection = (function(_super) {
    __extends(Collection, _super);

    function Collection() {
      var deferred, events;
      events = new Events(this, ['get', 'save', 'delete', 'publish']);
      this.on = function() {
        return events.on.apply(events, arguments);
      };
      this._trigger = function() {
        return events.trigger.apply(events, arguments);
      };
      deferred = $.Deferred();
      this._trigger('construct', deferred.promise());
      Collection._trigger('construct', deferred.promise());
      Collection.__super__.constructor.apply(this, arguments);
      deferred.resolve(this);
    }

    return Collection;

  })(CollectionModel);
  anyModelEvents = new Events(Collection.prototype, ['get', 'save', 'delete', 'publish']);
  Collection.on = function() {
    return anyModelEvents.on.apply(anyModelEvents, arguments);
  };
  return Collection._trigger = function() {
    return anyModelEvents.trigger.apply(anyModelEvents, arguments);
  };
})();

CollectionsList = null;

(function() {
  var anyModelEvents;
  CollectionsList = (function(_super) {
    __extends(CollectionsList, _super);

    function CollectionsList() {
      var events;
      events = new Events(this, ['getAll', 'get']);
      this.on = function() {
        return events.on.apply(events, arguments);
      };
      this._trigger = function() {
        return events.trigger.apply(events, arguments);
      };
      CollectionsList.__super__.constructor.apply(this, arguments);
    }

    return CollectionsList;

  })(CollectionsListModel);
  anyModelEvents = new Events(CollectionsList.prototype, ['getAll', 'get']);
  CollectionsList.on = function() {
    return anyModelEvents.on.apply(anyModelEvents, arguments);
  };
  return CollectionsList._trigger = function() {
    return anyModelEvents.trigger.apply(anyModelEvents, arguments);
  };
})();

Item = null;

(function() {
  var anyModelEvents;
  Item = (function(_super) {
    __extends(Item, _super);

    function Item() {
      var deferred, events;
      events = new Events(this, ['save', 'moveToStart', 'moveToEnd', 'moveBefore', 'moveAfter', 'delete']);
      this.on = function() {
        return events.on.apply(events, arguments);
      };
      this._trigger = function() {
        return events.trigger.apply(events, arguments);
      };
      deferred = $.Deferred();
      this._trigger('construct', deferred.promise());
      Item._trigger('construct', deferred.promise());
      Item.__super__.constructor.apply(this, arguments);
      deferred.resolve(this);
    }

    return Item;

  })(ItemModel);
  anyModelEvents = new Events(Item.prototype, ['save', 'moveToStart', 'moveToEnd', 'moveBefore', 'moveAfter', 'delete']);
  Item.on = function(name) {
    return anyModelEvents.on.apply(anyModelEvents, arguments);
  };
  return Item._trigger = function() {
    return anyModelEvents.trigger.apply(anyModelEvents, arguments);
  };
})();

ItemsList = null;

(function() {
  var anyModelEvents;
  ItemsList = (function(_super) {
    __extends(ItemsList, _super);

    function ItemsList() {
      var deferred, events;
      events = new Events(this, ['save', 'moveToStart', 'moveToEnd', 'moveBefore', 'moveAfter', 'delete']);
      this.on = function() {
        return events.on.apply(events, arguments);
      };
      this._trigger = function() {
        return events.trigger.apply(events, arguments);
      };
      deferred = $.Deferred();
      this._trigger('construct', deferred.promise());
      ItemsList._trigger('construct', deferred.promise());
      ItemsList.__super__.constructor.apply(this, arguments);
      deferred.resolve(this);
    }

    return ItemsList;

  })(ItemsListModel);
  anyModelEvents = new Events(ItemsList.prototype, ['save', 'moveToStart', 'moveToEnd', 'moveBefore', 'moveAfter', 'delete']);
  ItemsList.on = function() {
    return anyModelEvents.on.apply(anyModelEvents, arguments);
  };
  return ItemsList._trigger = function() {
    return anyModelEvents.trigger.apply(anyModelEvents, arguments);
  };
})();

initializeAngular = function($scope) {
  CollectionsList.on(['any'], function(promise) {
    return promise.always(function(data) {
      promise.always(function(data) {
        $scope.$apply();
        return data;
      });
      return data;
    });
  });
  Collection.on(['any'], function(promise) {
    return promise.always(function(data) {
      promise.always(function(data) {
        $scope.$apply();
        return data;
      });
      return data;
    });
  });
  ItemsList.on(['any'], function(promise) {
    return promise.always(function(data) {
      promise.always(function(data) {
        $scope.$apply();
        return data;
      });
      return data;
    });
  });
  return Item.on(['any'], function(promise) {
    return promise.always(function(data) {
      promise.always(function(data) {
        $scope.$apply();
        return data;
      });
      return data;
    });
  });
};

authorize = null;

logout = null;

(function() {
  var lastAuthData;
  lastAuthData = {
    type: 'wix',
    options: {}
  };
  authorize = function(type, options) {
    if (options == null) {
      options = {};
    }
    if (type != null) {
      lastAuthData.type = type;
      lastAuthData.options = options;
    }
    return authRequests[lastAuthData.type](lastAuthData.options);
  };
  return logout = function() {
    return authRequests.logout();
  };
})();

this.$cll = new CollectionsList();

this.$cll.authorize = authorize;

this.$cll.logout = logout;

this.$cll.initializeAngular = initializeAngular;

this.$cll.Item = Item;

this.$cll.ItemsList = ItemsList;

this.$cll.Collection = Collection;

this.$cll.CollectionsList = CollectionsList;

}).call(window);