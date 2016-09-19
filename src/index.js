import angular from 'angular'
import CacheFactory from '../node_modules/cachefactory/dist/cachefactory.es2015.js'

CacheFactory.utils.equals = angular.equals
CacheFactory.utils.isObject = angular.isObject
CacheFactory.utils.fromJson = angular.fromJson

function BinaryHeapProvider () {
  this.$get = function () { return CacheFactory.BinaryHeap }
}

function CacheFactoryProvider () {
  this.defaults = CacheFactory.defaults
  this.defaults.storagePrefix = 'angular-cache.caches.'

  this.$get = ['$q', function ($q) {
    CacheFactory.utils.Promise = $q
    var cacheFactory = new CacheFactory()
    Object.defineProperty(cacheFactory, 'defaults', {
      value: CacheFactory.defaults
    })
    return cacheFactory
  }]
}

angular.module('angular-cache', [])
  .provider('BinaryHeap', BinaryHeapProvider)
  .provider('CacheFactory', CacheFactoryProvider)

export default 'angular-cache'
