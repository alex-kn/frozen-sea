// CommonJS package manager support
if (typeof module !== 'undefined' && typeof exports !== 'undefined' &&
  module.exports === exports) {
  // Export the *name* of this Angular module
  // Sample usage:
  //
  //   import lbServices from './lb-services';
  //   angular.module('app', [lbServices]);
  //
  module.exports = "lbServices";
}

(function(window, angular, undefined) {
  'use strict';

  var urlBase = "/api";
  var authHeader = 'authorization';

  function getHost(url) {
    var m = url.match(/^(?:https?:)?\/\/([^\/]+)/);
    return m ? m[1] : null;
  }

  var urlBaseHost = getHost(urlBase) || location.host;

/**
 * @ngdoc overview
 * @name lbServices
 * @module
 * @description
 *
 * The `lbServices` module provides services for interacting with
 * the models exposed by the LoopBack server via the REST API.
 *
 */
  var module = angular.module("lbServices", ['ngResource']);

/**
 * @ngdoc object
 * @name lbServices.User
 * @header lbServices.User
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `User` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "User",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/Users/:id",
          { 'id': '@id' },
          {

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__findById__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Find a related item by id for accessTokens.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for accessTokens
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$__findById__accessTokens": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Users/:id/accessTokens/:fk",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__destroyById__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Delete a related item by id for accessTokens.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for accessTokens
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "prototype$__destroyById__accessTokens": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Users/:id/accessTokens/:fk",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__updateById__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Update a related item by id for accessTokens.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for accessTokens
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$__updateById__accessTokens": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Users/:id/accessTokens/:fk",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__get__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Queries accessTokens of User.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `filter` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$__get__accessTokens": {
              isArray: true,
              url: urlBase + "/Users/:id/accessTokens",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__create__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Creates a new instance in accessTokens of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$__create__accessTokens": {
              url: urlBase + "/Users/:id/accessTokens",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__delete__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Deletes all accessTokens of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "prototype$__delete__accessTokens": {
              url: urlBase + "/Users/:id/accessTokens",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__count__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Counts accessTokens of User.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "prototype$__count__accessTokens": {
              url: urlBase + "/Users/:id/accessTokens/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#create
             * @methodOf lbServices.User
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/Users",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#createMany
             * @methodOf lbServices.User
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/Users",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#upsert
             * @methodOf lbServices.User
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "upsert": {
              url: urlBase + "/Users",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#replaceOrCreate
             * @methodOf lbServices.User
             *
             * @description
             *
             * Replace an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "replaceOrCreate": {
              url: urlBase + "/Users/replaceOrCreate",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#upsertWithWhere
             * @methodOf lbServices.User
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "upsertWithWhere": {
              url: urlBase + "/Users/upsertWithWhere",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#exists
             * @methodOf lbServices.User
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/Users/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#findById
             * @methodOf lbServices.User
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/Users/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#replaceById
             * @methodOf lbServices.User
             *
             * @description
             *
             * Replace attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "replaceById": {
              url: urlBase + "/Users/:id/replace",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#find
             * @methodOf lbServices.User
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/Users",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#findOne
             * @methodOf lbServices.User
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/Users/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#updateAll
             * @methodOf lbServices.User
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
            "updateAll": {
              url: urlBase + "/Users/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#deleteById
             * @methodOf lbServices.User
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/Users/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#count
             * @methodOf lbServices.User
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/Users/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$updateAttributes
             * @methodOf lbServices.User
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$updateAttributes": {
              url: urlBase + "/Users/:id",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#createChangeStream
             * @methodOf lbServices.User
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/Users/change-stream",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#login
             * @methodOf lbServices.User
             *
             * @description
             *
             * Login a user with username/email and password.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
             *   Default value: `user`.
             *
             *  - `rememberMe` - `boolean` - Whether the authentication credentials
             *     should be remembered in localStorage across app/browser restarts.
             *     Default: `true`.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The response body contains properties of the AccessToken created on login.
             * Depending on the value of `include` parameter, the body may contain additional properties:
             *   - `user` - `U+007BUserU+007D` - Data of the currently logged in user. (`include=user`)
             *
             */
            "login": {
              params: {
                include: 'user',
              },
              interceptor: {
                response: function(response) {
                  var accessToken = response.data;
                  LoopBackAuth.setUser(
                    accessToken.id, accessToken.userId, accessToken.user);
                  LoopBackAuth.rememberMe =
                    response.config.params.rememberMe !== false;
                  LoopBackAuth.save();
                  return response.resource;
                },
              },
              url: urlBase + "/Users/login",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#logout
             * @methodOf lbServices.User
             *
             * @description
             *
             * Logout a user with access token.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `access_token` – `{string}` - Do not supply this argument, it is automatically extracted from request headers.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "logout": {
              interceptor: {
                response: function(response) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return response.resource;
                },
                responseError: function(responseError) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return responseError.resource;
                },
              },
              url: urlBase + "/Users/logout",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#confirm
             * @methodOf lbServices.User
             *
             * @description
             *
             * Confirm a user registration with email verification token.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `uid` – `{string}` -
             *
             *  - `token` – `{string}` -
             *
             *  - `redirect` – `{string=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "confirm": {
              url: urlBase + "/Users/confirm",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#resetPassword
             * @methodOf lbServices.User
             *
             * @description
             *
             * Reset password for a user with email.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "resetPassword": {
              url: urlBase + "/Users/reset",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#getCurrent
             * @methodOf lbServices.User
             *
             * @description
             *
             * Get data of the currently logged user. Fail with HTTP result 401
             * when there is no user logged in.
             *
             * @param {function(Object,Object)=} successCb
             *    Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *    `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             */
            'getCurrent': {
              url: urlBase + "/Users" + '/:id',
              method: 'GET',
              params: {
                id: function() {
                  var id = LoopBackAuth.currentUserId;
                  if (id == null) id = '__anonymous__';
                  return id;
                },
              },
              interceptor: {
                response: function(response) {
                  LoopBackAuth.currentUserData = response.data;
                  return response.resource;
                },
                responseError: function(responseError) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return $q.reject(responseError);
                },
              },
              __isGetCurrentUser__: true,
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.User#patchOrCreate
             * @methodOf lbServices.User
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
        R["patchOrCreate"] = R["upsert"];

            /**
             * @ngdoc method
             * @name lbServices.User#updateOrCreate
             * @methodOf lbServices.User
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
        R["updateOrCreate"] = R["upsert"];

            /**
             * @ngdoc method
             * @name lbServices.User#patchOrCreateWithWhere
             * @methodOf lbServices.User
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
        R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

            /**
             * @ngdoc method
             * @name lbServices.User#update
             * @methodOf lbServices.User
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.User#destroyById
             * @methodOf lbServices.User
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.User#removeById
             * @methodOf lbServices.User
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.User#patchAttributes
             * @methodOf lbServices.User
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
        R["patchAttributes"] = R["prototype$updateAttributes"];

        /**
         * @ngdoc method
         * @name lbServices.User#getCachedCurrent
         * @methodOf lbServices.User
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.User#login} or
         * {@link lbServices.User#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A User instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name lbServices.User#isAuthenticated
         * @methodOf lbServices.User
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name lbServices.User#getCurrentId
         * @methodOf lbServices.User
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

        /**
        * @ngdoc property
        * @name lbServices.User#modelName
        * @propertyOf lbServices.User
        * @description
        * The name of the model represented by this $resource,
        * i.e. `User`.
        */
        R.modelName = "User";



        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Study
 * @header lbServices.Study
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Study` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Study",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/Studies/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use Study.dates.findById() instead.
            "prototype$__findById__dates": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Studies/:id/dates/:fk",
              method: "GET",
            },

            // INTERNAL. Use Study.dates.destroyById() instead.
            "prototype$__destroyById__dates": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Studies/:id/dates/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Study.dates.updateById() instead.
            "prototype$__updateById__dates": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Studies/:id/dates/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Study.participations.findById() instead.
            "prototype$__findById__participations": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Studies/:id/participations/:fk",
              method: "GET",
            },

            // INTERNAL. Use Study.participations.destroyById() instead.
            "prototype$__destroyById__participations": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Studies/:id/participations/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Study.participations.updateById() instead.
            "prototype$__updateById__participations": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Studies/:id/participations/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Study.advisors.findById() instead.
            "prototype$__findById__advisors": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Studies/:id/advisors/:fk",
              method: "GET",
            },

            // INTERNAL. Use Study.advisors.destroyById() instead.
            "prototype$__destroyById__advisors": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Studies/:id/advisors/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Study.advisors.updateById() instead.
            "prototype$__updateById__advisors": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Studies/:id/advisors/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Study.advisors.link() instead.
            "prototype$__link__advisors": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Studies/:id/advisors/rel/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Study.advisors.unlink() instead.
            "prototype$__unlink__advisors": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Studies/:id/advisors/rel/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Study.advisors.exists() instead.
            "prototype$__exists__advisors": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Studies/:id/advisors/rel/:fk",
              method: "HEAD",
            },

            // INTERNAL. Use Study.owner() instead.
            "prototype$__get__owner": {
              url: urlBase + "/Studies/:id/owner",
              method: "GET",
            },

            // INTERNAL. Use Study.dates() instead.
            "prototype$__get__dates": {
              isArray: true,
              url: urlBase + "/Studies/:id/dates",
              method: "GET",
            },

            // INTERNAL. Use Study.dates.create() instead.
            "prototype$__create__dates": {
              url: urlBase + "/Studies/:id/dates",
              method: "POST",
            },

            // INTERNAL. Use Study.dates.destroyAll() instead.
            "prototype$__delete__dates": {
              url: urlBase + "/Studies/:id/dates",
              method: "DELETE",
            },

            // INTERNAL. Use Study.dates.count() instead.
            "prototype$__count__dates": {
              url: urlBase + "/Studies/:id/dates/count",
              method: "GET",
            },

            // INTERNAL. Use Study.participations() instead.
            "prototype$__get__participations": {
              isArray: true,
              url: urlBase + "/Studies/:id/participations",
              method: "GET",
            },

            // INTERNAL. Use Study.participations.create() instead.
            "prototype$__create__participations": {
              url: urlBase + "/Studies/:id/participations",
              method: "POST",
            },

            // INTERNAL. Use Study.participations.destroyAll() instead.
            "prototype$__delete__participations": {
              url: urlBase + "/Studies/:id/participations",
              method: "DELETE",
            },

            // INTERNAL. Use Study.participations.count() instead.
            "prototype$__count__participations": {
              url: urlBase + "/Studies/:id/participations/count",
              method: "GET",
            },

            // INTERNAL. Use Study.advisors() instead.
            "prototype$__get__advisors": {
              isArray: true,
              url: urlBase + "/Studies/:id/advisors",
              method: "GET",
            },

            // INTERNAL. Use Study.advisors.create() instead.
            "prototype$__create__advisors": {
              url: urlBase + "/Studies/:id/advisors",
              method: "POST",
            },

            // INTERNAL. Use Study.advisors.destroyAll() instead.
            "prototype$__delete__advisors": {
              url: urlBase + "/Studies/:id/advisors",
              method: "DELETE",
            },

            // INTERNAL. Use Study.advisors.count() instead.
            "prototype$__count__advisors": {
              url: urlBase + "/Studies/:id/advisors/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Study#create
             * @methodOf lbServices.Study
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/Studies",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Study#createMany
             * @methodOf lbServices.Study
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/Studies",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Study#upsert
             * @methodOf lbServices.Study
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
            "upsert": {
              url: urlBase + "/Studies",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.Study#replaceOrCreate
             * @methodOf lbServices.Study
             *
             * @description
             *
             * Replace an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
            "replaceOrCreate": {
              url: urlBase + "/Studies/replaceOrCreate",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Study#upsertWithWhere
             * @methodOf lbServices.Study
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
            "upsertWithWhere": {
              url: urlBase + "/Studies/upsertWithWhere",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Study#exists
             * @methodOf lbServices.Study
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/Studies/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Study#findById
             * @methodOf lbServices.Study
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/Studies/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Study#replaceById
             * @methodOf lbServices.Study
             *
             * @description
             *
             * Replace attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
            "replaceById": {
              url: urlBase + "/Studies/:id/replace",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Study#find
             * @methodOf lbServices.Study
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/Studies",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Study#findOne
             * @methodOf lbServices.Study
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/Studies/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Study#updateAll
             * @methodOf lbServices.Study
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
            "updateAll": {
              url: urlBase + "/Studies/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Study#deleteById
             * @methodOf lbServices.Study
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/Studies/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Study#count
             * @methodOf lbServices.Study
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/Studies/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Study#prototype$updateAttributes
             * @methodOf lbServices.Study
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
            "prototype$updateAttributes": {
              url: urlBase + "/Studies/:id",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.Study#createChangeStream
             * @methodOf lbServices.Study
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/Studies/change-stream",
              method: "POST",
            },

            // INTERNAL. Use StudyDate.study() instead.
            "::get::StudyDate::study": {
              url: urlBase + "/StudyDates/:id/study",
              method: "GET",
            },

            // INTERNAL. Use Participation.study() instead.
            "::get::Participation::study": {
              url: urlBase + "/Participations/:id/study",
              method: "GET",
            },

            // INTERNAL. Use Subuser.created_studies.findById() instead.
            "::findById::Subuser::created_studies": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/created_studies/:fk",
              method: "GET",
            },

            // INTERNAL. Use Subuser.createManyd_studies.findById() instead.
            "::findById::Subuser::createManyd_studies": {
              isArray: true,
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/created_studies/:fk",
              method: "GET",
            },

            // INTERNAL. Use Subuser.created_studies.destroyById() instead.
            "::destroyById::Subuser::created_studies": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/created_studies/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Subuser.createManyd_studies.destroyById() instead.
            "::destroyById::Subuser::createManyd_studies": {
              isArray: true,
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/created_studies/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Subuser.created_studies.updateById() instead.
            "::updateById::Subuser::created_studies": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/created_studies/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Subuser.createManyd_studies.updateById() instead.
            "::updateById::Subuser::createManyd_studies": {
              isArray: true,
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/created_studies/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Subuser.supervised_studies.findById() instead.
            "::findById::Subuser::supervised_studies": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/supervised_studies/:fk",
              method: "GET",
            },

            // INTERNAL. Use Subuser.supervised_studies.destroyById() instead.
            "::destroyById::Subuser::supervised_studies": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/supervised_studies/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Subuser.supervised_studies.updateById() instead.
            "::updateById::Subuser::supervised_studies": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/supervised_studies/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Subuser.supervised_studies.link() instead.
            "::link::Subuser::supervised_studies": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/supervised_studies/rel/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Subuser.supervised_studies.unlink() instead.
            "::unlink::Subuser::supervised_studies": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/supervised_studies/rel/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Subuser.supervised_studies.exists() instead.
            "::exists::Subuser::supervised_studies": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/supervised_studies/rel/:fk",
              method: "HEAD",
            },

            // INTERNAL. Use Subuser.created_studies() instead.
            "::get::Subuser::created_studies": {
              isArray: true,
              url: urlBase + "/Subusers/:id/created_studies",
              method: "GET",
            },

            // INTERNAL. Use Subuser.createManyd_studies() instead.
            "::get::Subuser::createManyd_studies": {
              isArray: true,
              url: urlBase + "/Subusers/:id/created_studies",
              method: "GET",
            },

            // INTERNAL. Use Subuser.created_studies.create() instead.
            "::create::Subuser::created_studies": {
              url: urlBase + "/Subusers/:id/created_studies",
              method: "POST",
            },

            // INTERNAL. Use Subuser.createManyd_studies.create() instead.
            "::createMany::Subuser::created_studies": {
              isArray: true,
              url: urlBase + "/Subusers/:id/created_studies",
              method: "POST",
            },

            // INTERNAL. Use Subuser.created_studies.destroyAll() instead.
            "::delete::Subuser::created_studies": {
              url: urlBase + "/Subusers/:id/created_studies",
              method: "DELETE",
            },

            // INTERNAL. Use Subuser.createManyd_studies.destroyAll() instead.
            "::delete::Subuser::createManyd_studies": {
              isArray: true,
              url: urlBase + "/Subusers/:id/created_studies",
              method: "DELETE",
            },

            // INTERNAL. Use Subuser.created_studies.count() instead.
            "::count::Subuser::created_studies": {
              url: urlBase + "/Subusers/:id/created_studies/count",
              method: "GET",
            },

            // INTERNAL. Use Subuser.createManyd_studies.count() instead.
            "::count::Subuser::createManyd_studies": {
              isArray: true,
              url: urlBase + "/Subusers/:id/created_studies/count",
              method: "GET",
            },

            // INTERNAL. Use Subuser.supervised_studies() instead.
            "::get::Subuser::supervised_studies": {
              isArray: true,
              url: urlBase + "/Subusers/:id/supervised_studies",
              method: "GET",
            },

            // INTERNAL. Use Subuser.supervised_studies.create() instead.
            "::create::Subuser::supervised_studies": {
              url: urlBase + "/Subusers/:id/supervised_studies",
              method: "POST",
            },

            // INTERNAL. Use Subuser.supervised_studies.createMany() instead.
            "::createMany::Subuser::supervised_studies": {
              isArray: true,
              url: urlBase + "/Subusers/:id/supervised_studies",
              method: "POST",
            },

            // INTERNAL. Use Subuser.supervised_studies.destroyAll() instead.
            "::delete::Subuser::supervised_studies": {
              url: urlBase + "/Subusers/:id/supervised_studies",
              method: "DELETE",
            },

            // INTERNAL. Use Subuser.supervised_studies.count() instead.
            "::count::Subuser::supervised_studies": {
              url: urlBase + "/Subusers/:id/supervised_studies/count",
              method: "GET",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.Study#patchOrCreate
             * @methodOf lbServices.Study
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
        R["patchOrCreate"] = R["upsert"];

            /**
             * @ngdoc method
             * @name lbServices.Study#updateOrCreate
             * @methodOf lbServices.Study
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
        R["updateOrCreate"] = R["upsert"];

            /**
             * @ngdoc method
             * @name lbServices.Study#patchOrCreateWithWhere
             * @methodOf lbServices.Study
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
        R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

            /**
             * @ngdoc method
             * @name lbServices.Study#update
             * @methodOf lbServices.Study
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.Study#destroyById
             * @methodOf lbServices.Study
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Study#removeById
             * @methodOf lbServices.Study
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Study#patchAttributes
             * @methodOf lbServices.Study
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
        R["patchAttributes"] = R["prototype$updateAttributes"];


        /**
        * @ngdoc property
        * @name lbServices.Study#modelName
        * @propertyOf lbServices.Study
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Study`.
        */
        R.modelName = "Study";

    /**
     * @ngdoc object
     * @name lbServices.Study.dates
     * @header lbServices.Study.dates
     * @object
     * @description
     *
     * The object `Study.dates` groups methods
     * manipulating `StudyDate` instances related to `Study`.
     *
     * Call {@link lbServices.Study#dates Study.dates()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Study#dates
             * @methodOf lbServices.Study
             *
             * @description
             *
             * Queries dates of Study.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `filter` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
        R.dates = function() {
          var TargetResource = $injector.get("StudyDate");
          var action = TargetResource["::get::Study::dates"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Study.dates#count
             * @methodOf lbServices.Study.dates
             *
             * @description
             *
             * Counts dates of Study.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.dates.count = function() {
          var TargetResource = $injector.get("StudyDate");
          var action = TargetResource["::count::Study::dates"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Study.dates#create
             * @methodOf lbServices.Study.dates
             *
             * @description
             *
             * Creates a new instance in dates of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
        R.dates.create = function() {
          var TargetResource = $injector.get("StudyDate");
          var action = TargetResource["::create::Study::dates"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Study.dates#createMany
             * @methodOf lbServices.Study.dates
             *
             * @description
             *
             * Creates a new instance in dates of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
        R.dates.createMany = function() {
          var TargetResource = $injector.get("StudyDate");
          var action = TargetResource["::createMany::Study::dates"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Study.dates#destroyAll
             * @methodOf lbServices.Study.dates
             *
             * @description
             *
             * Deletes all dates of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.dates.destroyAll = function() {
          var TargetResource = $injector.get("StudyDate");
          var action = TargetResource["::delete::Study::dates"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Study.dates#destroyById
             * @methodOf lbServices.Study.dates
             *
             * @description
             *
             * Delete a related item by id for dates.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `fk` – `{*}` - Foreign key for dates
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.dates.destroyById = function() {
          var TargetResource = $injector.get("StudyDate");
          var action = TargetResource["::destroyById::Study::dates"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Study.dates#findById
             * @methodOf lbServices.Study.dates
             *
             * @description
             *
             * Find a related item by id for dates.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `fk` – `{*}` - Foreign key for dates
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
        R.dates.findById = function() {
          var TargetResource = $injector.get("StudyDate");
          var action = TargetResource["::findById::Study::dates"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Study.dates#updateById
             * @methodOf lbServices.Study.dates
             *
             * @description
             *
             * Update a related item by id for dates.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `fk` – `{*}` - Foreign key for dates
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
        R.dates.updateById = function() {
          var TargetResource = $injector.get("StudyDate");
          var action = TargetResource["::updateById::Study::dates"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Study.participations
     * @header lbServices.Study.participations
     * @object
     * @description
     *
     * The object `Study.participations` groups methods
     * manipulating `Participation` instances related to `Study`.
     *
     * Call {@link lbServices.Study#participations Study.participations()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Study#participations
             * @methodOf lbServices.Study
             *
             * @description
             *
             * Queries participations of Study.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `filter` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
        R.participations = function() {
          var TargetResource = $injector.get("Participation");
          var action = TargetResource["::get::Study::participations"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Study.participations#count
             * @methodOf lbServices.Study.participations
             *
             * @description
             *
             * Counts participations of Study.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.participations.count = function() {
          var TargetResource = $injector.get("Participation");
          var action = TargetResource["::count::Study::participations"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Study.participations#create
             * @methodOf lbServices.Study.participations
             *
             * @description
             *
             * Creates a new instance in participations of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
        R.participations.create = function() {
          var TargetResource = $injector.get("Participation");
          var action = TargetResource["::create::Study::participations"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Study.participations#createMany
             * @methodOf lbServices.Study.participations
             *
             * @description
             *
             * Creates a new instance in participations of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
        R.participations.createMany = function() {
          var TargetResource = $injector.get("Participation");
          var action = TargetResource["::createMany::Study::participations"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Study.participations#destroyAll
             * @methodOf lbServices.Study.participations
             *
             * @description
             *
             * Deletes all participations of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.participations.destroyAll = function() {
          var TargetResource = $injector.get("Participation");
          var action = TargetResource["::delete::Study::participations"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Study.participations#destroyById
             * @methodOf lbServices.Study.participations
             *
             * @description
             *
             * Delete a related item by id for participations.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `fk` – `{*}` - Foreign key for participations
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.participations.destroyById = function() {
          var TargetResource = $injector.get("Participation");
          var action = TargetResource["::destroyById::Study::participations"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Study.participations#findById
             * @methodOf lbServices.Study.participations
             *
             * @description
             *
             * Find a related item by id for participations.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `fk` – `{*}` - Foreign key for participations
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
        R.participations.findById = function() {
          var TargetResource = $injector.get("Participation");
          var action = TargetResource["::findById::Study::participations"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Study.participations#updateById
             * @methodOf lbServices.Study.participations
             *
             * @description
             *
             * Update a related item by id for participations.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `fk` – `{*}` - Foreign key for participations
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
        R.participations.updateById = function() {
          var TargetResource = $injector.get("Participation");
          var action = TargetResource["::updateById::Study::participations"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Study.advisors
     * @header lbServices.Study.advisors
     * @object
     * @description
     *
     * The object `Study.advisors` groups methods
     * manipulating `Subuser` instances related to `Study`.
     *
     * Call {@link lbServices.Study#advisors Study.advisors()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Study#advisors
             * @methodOf lbServices.Study
             *
             * @description
             *
             * Queries advisors of Study.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `filter` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
        R.advisors = function() {
          var TargetResource = $injector.get("Subuser");
          var action = TargetResource["::get::Study::advisors"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Study.advisors#count
             * @methodOf lbServices.Study.advisors
             *
             * @description
             *
             * Counts advisors of Study.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.advisors.count = function() {
          var TargetResource = $injector.get("Subuser");
          var action = TargetResource["::count::Study::advisors"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Study.advisors#create
             * @methodOf lbServices.Study.advisors
             *
             * @description
             *
             * Creates a new instance in advisors of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
        R.advisors.create = function() {
          var TargetResource = $injector.get("Subuser");
          var action = TargetResource["::create::Study::advisors"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Study.advisors#createMany
             * @methodOf lbServices.Study.advisors
             *
             * @description
             *
             * Creates a new instance in advisors of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
        R.advisors.createMany = function() {
          var TargetResource = $injector.get("Subuser");
          var action = TargetResource["::createMany::Study::advisors"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Study.advisors#destroyAll
             * @methodOf lbServices.Study.advisors
             *
             * @description
             *
             * Deletes all advisors of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.advisors.destroyAll = function() {
          var TargetResource = $injector.get("Subuser");
          var action = TargetResource["::delete::Study::advisors"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Study.advisors#destroyById
             * @methodOf lbServices.Study.advisors
             *
             * @description
             *
             * Delete a related item by id for advisors.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `fk` – `{*}` - Foreign key for advisors
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.advisors.destroyById = function() {
          var TargetResource = $injector.get("Subuser");
          var action = TargetResource["::destroyById::Study::advisors"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Study.advisors#exists
             * @methodOf lbServices.Study.advisors
             *
             * @description
             *
             * Check the existence of advisors relation to an item by id.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `fk` – `{*}` - Foreign key for advisors
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
        R.advisors.exists = function() {
          var TargetResource = $injector.get("Subuser");
          var action = TargetResource["::exists::Study::advisors"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Study.advisors#findById
             * @methodOf lbServices.Study.advisors
             *
             * @description
             *
             * Find a related item by id for advisors.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `fk` – `{*}` - Foreign key for advisors
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
        R.advisors.findById = function() {
          var TargetResource = $injector.get("Subuser");
          var action = TargetResource["::findById::Study::advisors"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Study.advisors#link
             * @methodOf lbServices.Study.advisors
             *
             * @description
             *
             * Add a related item by id for advisors.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `fk` – `{*}` - Foreign key for advisors
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
        R.advisors.link = function() {
          var TargetResource = $injector.get("Subuser");
          var action = TargetResource["::link::Study::advisors"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Study.advisors#unlink
             * @methodOf lbServices.Study.advisors
             *
             * @description
             *
             * Remove the advisors relation to an item by id.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `fk` – `{*}` - Foreign key for advisors
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.advisors.unlink = function() {
          var TargetResource = $injector.get("Subuser");
          var action = TargetResource["::unlink::Study::advisors"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Study.advisors#updateById
             * @methodOf lbServices.Study.advisors
             *
             * @description
             *
             * Update a related item by id for advisors.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `fk` – `{*}` - Foreign key for advisors
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
        R.advisors.updateById = function() {
          var TargetResource = $injector.get("Subuser");
          var action = TargetResource["::updateById::Study::advisors"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Study#owner
             * @methodOf lbServices.Study
             *
             * @description
             *
             * Fetches belongsTo relation owner.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `refresh` – `{boolean=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
        R.owner = function() {
          var TargetResource = $injector.get("Subuser");
          var action = TargetResource["::get::Study::owner"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.StudyDate
 * @header lbServices.StudyDate
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `StudyDate` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "StudyDate",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/StudyDates/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use StudyDate.study() instead.
            "prototype$__get__study": {
              url: urlBase + "/StudyDates/:id/study",
              method: "GET",
            },

            // INTERNAL. Use StudyDate.participations.findById() instead.
            "prototype$__findById__participations": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/StudyDates/:id/participations/:fk",
              method: "GET",
            },

            // INTERNAL. Use StudyDate.participations.destroyById() instead.
            "prototype$__destroyById__participations": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/StudyDates/:id/participations/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use StudyDate.participations.updateById() instead.
            "prototype$__updateById__participations": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/StudyDates/:id/participations/:fk",
              method: "PUT",
            },

            // INTERNAL. Use StudyDate.owner() instead.
            "prototype$__get__owner": {
              url: urlBase + "/StudyDates/:id/owner",
              method: "GET",
            },

            // INTERNAL. Use StudyDate.participations() instead.
            "prototype$__get__participations": {
              isArray: true,
              url: urlBase + "/StudyDates/:id/participations",
              method: "GET",
            },

            // INTERNAL. Use StudyDate.participations.create() instead.
            "prototype$__create__participations": {
              url: urlBase + "/StudyDates/:id/participations",
              method: "POST",
            },

            // INTERNAL. Use StudyDate.participations.destroyAll() instead.
            "prototype$__delete__participations": {
              url: urlBase + "/StudyDates/:id/participations",
              method: "DELETE",
            },

            // INTERNAL. Use StudyDate.participations.count() instead.
            "prototype$__count__participations": {
              url: urlBase + "/StudyDates/:id/participations/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.StudyDate#create
             * @methodOf lbServices.StudyDate
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/StudyDates",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.StudyDate#createMany
             * @methodOf lbServices.StudyDate
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/StudyDates",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.StudyDate#upsert
             * @methodOf lbServices.StudyDate
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
            "upsert": {
              url: urlBase + "/StudyDates",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.StudyDate#replaceOrCreate
             * @methodOf lbServices.StudyDate
             *
             * @description
             *
             * Replace an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
            "replaceOrCreate": {
              url: urlBase + "/StudyDates/replaceOrCreate",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.StudyDate#upsertWithWhere
             * @methodOf lbServices.StudyDate
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
            "upsertWithWhere": {
              url: urlBase + "/StudyDates/upsertWithWhere",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.StudyDate#exists
             * @methodOf lbServices.StudyDate
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/StudyDates/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.StudyDate#findById
             * @methodOf lbServices.StudyDate
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/StudyDates/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.StudyDate#replaceById
             * @methodOf lbServices.StudyDate
             *
             * @description
             *
             * Replace attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
            "replaceById": {
              url: urlBase + "/StudyDates/:id/replace",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.StudyDate#find
             * @methodOf lbServices.StudyDate
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/StudyDates",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.StudyDate#findOne
             * @methodOf lbServices.StudyDate
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/StudyDates/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.StudyDate#updateAll
             * @methodOf lbServices.StudyDate
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
            "updateAll": {
              url: urlBase + "/StudyDates/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.StudyDate#deleteById
             * @methodOf lbServices.StudyDate
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/StudyDates/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.StudyDate#count
             * @methodOf lbServices.StudyDate
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/StudyDates/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.StudyDate#prototype$updateAttributes
             * @methodOf lbServices.StudyDate
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
            "prototype$updateAttributes": {
              url: urlBase + "/StudyDates/:id",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.StudyDate#createChangeStream
             * @methodOf lbServices.StudyDate
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/StudyDates/change-stream",
              method: "POST",
            },

            // INTERNAL. Use Study.dates.findById() instead.
            "::findById::Study::dates": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Studies/:id/dates/:fk",
              method: "GET",
            },

            // INTERNAL. Use Study.dates.destroyById() instead.
            "::destroyById::Study::dates": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Studies/:id/dates/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Study.dates.updateById() instead.
            "::updateById::Study::dates": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Studies/:id/dates/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Study.dates() instead.
            "::get::Study::dates": {
              isArray: true,
              url: urlBase + "/Studies/:id/dates",
              method: "GET",
            },

            // INTERNAL. Use Study.dates.create() instead.
            "::create::Study::dates": {
              url: urlBase + "/Studies/:id/dates",
              method: "POST",
            },

            // INTERNAL. Use Study.dates.createMany() instead.
            "::createMany::Study::dates": {
              isArray: true,
              url: urlBase + "/Studies/:id/dates",
              method: "POST",
            },

            // INTERNAL. Use Study.dates.destroyAll() instead.
            "::delete::Study::dates": {
              url: urlBase + "/Studies/:id/dates",
              method: "DELETE",
            },

            // INTERNAL. Use Study.dates.count() instead.
            "::count::Study::dates": {
              url: urlBase + "/Studies/:id/dates/count",
              method: "GET",
            },

            // INTERNAL. Use Participation.studyDate() instead.
            "::get::Participation::studyDate": {
              url: urlBase + "/Participations/:id/studyDate",
              method: "GET",
            },

            // INTERNAL. Use Subuser.created_study_dates.findById() instead.
            "::findById::Subuser::created_study_dates": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/created_study_dates/:fk",
              method: "GET",
            },

            // INTERNAL. Use Subuser.createManyd_study_dates.findById() instead.
            "::findById::Subuser::createManyd_study_dates": {
              isArray: true,
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/created_study_dates/:fk",
              method: "GET",
            },

            // INTERNAL. Use Subuser.created_study_dates.destroyById() instead.
            "::destroyById::Subuser::created_study_dates": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/created_study_dates/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Subuser.createManyd_study_dates.destroyById() instead.
            "::destroyById::Subuser::createManyd_study_dates": {
              isArray: true,
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/created_study_dates/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Subuser.created_study_dates.updateById() instead.
            "::updateById::Subuser::created_study_dates": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/created_study_dates/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Subuser.createManyd_study_dates.updateById() instead.
            "::updateById::Subuser::createManyd_study_dates": {
              isArray: true,
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/created_study_dates/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Subuser.created_study_dates() instead.
            "::get::Subuser::created_study_dates": {
              isArray: true,
              url: urlBase + "/Subusers/:id/created_study_dates",
              method: "GET",
            },

            // INTERNAL. Use Subuser.createManyd_study_dates() instead.
            "::get::Subuser::createManyd_study_dates": {
              isArray: true,
              url: urlBase + "/Subusers/:id/created_study_dates",
              method: "GET",
            },

            // INTERNAL. Use Subuser.created_study_dates.create() instead.
            "::create::Subuser::created_study_dates": {
              url: urlBase + "/Subusers/:id/created_study_dates",
              method: "POST",
            },

            // INTERNAL. Use Subuser.createManyd_study_dates.create() instead.
            "::createMany::Subuser::created_study_dates": {
              isArray: true,
              url: urlBase + "/Subusers/:id/created_study_dates",
              method: "POST",
            },

            // INTERNAL. Use Subuser.created_study_dates.destroyAll() instead.
            "::delete::Subuser::created_study_dates": {
              url: urlBase + "/Subusers/:id/created_study_dates",
              method: "DELETE",
            },

            // INTERNAL. Use Subuser.createManyd_study_dates.destroyAll() instead.
            "::delete::Subuser::createManyd_study_dates": {
              isArray: true,
              url: urlBase + "/Subusers/:id/created_study_dates",
              method: "DELETE",
            },

            // INTERNAL. Use Subuser.created_study_dates.count() instead.
            "::count::Subuser::created_study_dates": {
              url: urlBase + "/Subusers/:id/created_study_dates/count",
              method: "GET",
            },

            // INTERNAL. Use Subuser.createManyd_study_dates.count() instead.
            "::count::Subuser::createManyd_study_dates": {
              isArray: true,
              url: urlBase + "/Subusers/:id/created_study_dates/count",
              method: "GET",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.StudyDate#patchOrCreate
             * @methodOf lbServices.StudyDate
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
        R["patchOrCreate"] = R["upsert"];

            /**
             * @ngdoc method
             * @name lbServices.StudyDate#updateOrCreate
             * @methodOf lbServices.StudyDate
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
        R["updateOrCreate"] = R["upsert"];

            /**
             * @ngdoc method
             * @name lbServices.StudyDate#patchOrCreateWithWhere
             * @methodOf lbServices.StudyDate
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
        R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

            /**
             * @ngdoc method
             * @name lbServices.StudyDate#update
             * @methodOf lbServices.StudyDate
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.StudyDate#destroyById
             * @methodOf lbServices.StudyDate
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.StudyDate#removeById
             * @methodOf lbServices.StudyDate
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.StudyDate#patchAttributes
             * @methodOf lbServices.StudyDate
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
        R["patchAttributes"] = R["prototype$updateAttributes"];


        /**
        * @ngdoc property
        * @name lbServices.StudyDate#modelName
        * @propertyOf lbServices.StudyDate
        * @description
        * The name of the model represented by this $resource,
        * i.e. `StudyDate`.
        */
        R.modelName = "StudyDate";


            /**
             * @ngdoc method
             * @name lbServices.StudyDate#study
             * @methodOf lbServices.StudyDate
             *
             * @description
             *
             * Fetches belongsTo relation study.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `refresh` – `{boolean=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
        R.study = function() {
          var TargetResource = $injector.get("Study");
          var action = TargetResource["::get::StudyDate::study"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.StudyDate.participations
     * @header lbServices.StudyDate.participations
     * @object
     * @description
     *
     * The object `StudyDate.participations` groups methods
     * manipulating `Participation` instances related to `StudyDate`.
     *
     * Call {@link lbServices.StudyDate#participations StudyDate.participations()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.StudyDate#participations
             * @methodOf lbServices.StudyDate
             *
             * @description
             *
             * Queries participations of StudyDate.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `filter` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
        R.participations = function() {
          var TargetResource = $injector.get("Participation");
          var action = TargetResource["::get::StudyDate::participations"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.StudyDate.participations#count
             * @methodOf lbServices.StudyDate.participations
             *
             * @description
             *
             * Counts participations of StudyDate.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.participations.count = function() {
          var TargetResource = $injector.get("Participation");
          var action = TargetResource["::count::StudyDate::participations"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.StudyDate.participations#create
             * @methodOf lbServices.StudyDate.participations
             *
             * @description
             *
             * Creates a new instance in participations of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
        R.participations.create = function() {
          var TargetResource = $injector.get("Participation");
          var action = TargetResource["::create::StudyDate::participations"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.StudyDate.participations#createMany
             * @methodOf lbServices.StudyDate.participations
             *
             * @description
             *
             * Creates a new instance in participations of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
        R.participations.createMany = function() {
          var TargetResource = $injector.get("Participation");
          var action = TargetResource["::createMany::StudyDate::participations"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.StudyDate.participations#destroyAll
             * @methodOf lbServices.StudyDate.participations
             *
             * @description
             *
             * Deletes all participations of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.participations.destroyAll = function() {
          var TargetResource = $injector.get("Participation");
          var action = TargetResource["::delete::StudyDate::participations"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.StudyDate.participations#destroyById
             * @methodOf lbServices.StudyDate.participations
             *
             * @description
             *
             * Delete a related item by id for participations.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `fk` – `{*}` - Foreign key for participations
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.participations.destroyById = function() {
          var TargetResource = $injector.get("Participation");
          var action = TargetResource["::destroyById::StudyDate::participations"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.StudyDate.participations#findById
             * @methodOf lbServices.StudyDate.participations
             *
             * @description
             *
             * Find a related item by id for participations.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `fk` – `{*}` - Foreign key for participations
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
        R.participations.findById = function() {
          var TargetResource = $injector.get("Participation");
          var action = TargetResource["::findById::StudyDate::participations"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.StudyDate.participations#updateById
             * @methodOf lbServices.StudyDate.participations
             *
             * @description
             *
             * Update a related item by id for participations.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `fk` – `{*}` - Foreign key for participations
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
        R.participations.updateById = function() {
          var TargetResource = $injector.get("Participation");
          var action = TargetResource["::updateById::StudyDate::participations"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.StudyDate#owner
             * @methodOf lbServices.StudyDate
             *
             * @description
             *
             * Fetches belongsTo relation owner.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `refresh` – `{boolean=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
        R.owner = function() {
          var TargetResource = $injector.get("Subuser");
          var action = TargetResource["::get::StudyDate::owner"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Participation
 * @header lbServices.Participation
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Participation` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Participation",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/Participations/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use Participation.study() instead.
            "prototype$__get__study": {
              url: urlBase + "/Participations/:id/study",
              method: "GET",
            },

            // INTERNAL. Use Participation.studyDate() instead.
            "prototype$__get__studyDate": {
              url: urlBase + "/Participations/:id/studyDate",
              method: "GET",
            },

            // INTERNAL. Use Participation.participant() instead.
            "prototype$__get__participant": {
              url: urlBase + "/Participations/:id/participant",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Participation#create
             * @methodOf lbServices.Participation
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/Participations",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Participation#createMany
             * @methodOf lbServices.Participation
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/Participations",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Participation#upsert
             * @methodOf lbServices.Participation
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
            "upsert": {
              url: urlBase + "/Participations",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.Participation#replaceOrCreate
             * @methodOf lbServices.Participation
             *
             * @description
             *
             * Replace an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
            "replaceOrCreate": {
              url: urlBase + "/Participations/replaceOrCreate",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Participation#upsertWithWhere
             * @methodOf lbServices.Participation
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
            "upsertWithWhere": {
              url: urlBase + "/Participations/upsertWithWhere",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Participation#exists
             * @methodOf lbServices.Participation
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/Participations/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Participation#findById
             * @methodOf lbServices.Participation
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/Participations/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Participation#replaceById
             * @methodOf lbServices.Participation
             *
             * @description
             *
             * Replace attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
            "replaceById": {
              url: urlBase + "/Participations/:id/replace",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Participation#find
             * @methodOf lbServices.Participation
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/Participations",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Participation#findOne
             * @methodOf lbServices.Participation
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/Participations/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Participation#updateAll
             * @methodOf lbServices.Participation
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
            "updateAll": {
              url: urlBase + "/Participations/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Participation#deleteById
             * @methodOf lbServices.Participation
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/Participations/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Participation#count
             * @methodOf lbServices.Participation
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/Participations/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Participation#prototype$updateAttributes
             * @methodOf lbServices.Participation
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
            "prototype$updateAttributes": {
              url: urlBase + "/Participations/:id",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.Participation#createChangeStream
             * @methodOf lbServices.Participation
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/Participations/change-stream",
              method: "POST",
            },

            // INTERNAL. Use Study.participations.findById() instead.
            "::findById::Study::participations": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Studies/:id/participations/:fk",
              method: "GET",
            },

            // INTERNAL. Use Study.participations.destroyById() instead.
            "::destroyById::Study::participations": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Studies/:id/participations/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Study.participations.updateById() instead.
            "::updateById::Study::participations": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Studies/:id/participations/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Study.participations() instead.
            "::get::Study::participations": {
              isArray: true,
              url: urlBase + "/Studies/:id/participations",
              method: "GET",
            },

            // INTERNAL. Use Study.participations.create() instead.
            "::create::Study::participations": {
              url: urlBase + "/Studies/:id/participations",
              method: "POST",
            },

            // INTERNAL. Use Study.participations.createMany() instead.
            "::createMany::Study::participations": {
              isArray: true,
              url: urlBase + "/Studies/:id/participations",
              method: "POST",
            },

            // INTERNAL. Use Study.participations.destroyAll() instead.
            "::delete::Study::participations": {
              url: urlBase + "/Studies/:id/participations",
              method: "DELETE",
            },

            // INTERNAL. Use Study.participations.count() instead.
            "::count::Study::participations": {
              url: urlBase + "/Studies/:id/participations/count",
              method: "GET",
            },

            // INTERNAL. Use StudyDate.participations.findById() instead.
            "::findById::StudyDate::participations": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/StudyDates/:id/participations/:fk",
              method: "GET",
            },

            // INTERNAL. Use StudyDate.participations.destroyById() instead.
            "::destroyById::StudyDate::participations": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/StudyDates/:id/participations/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use StudyDate.participations.updateById() instead.
            "::updateById::StudyDate::participations": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/StudyDates/:id/participations/:fk",
              method: "PUT",
            },

            // INTERNAL. Use StudyDate.participations() instead.
            "::get::StudyDate::participations": {
              isArray: true,
              url: urlBase + "/StudyDates/:id/participations",
              method: "GET",
            },

            // INTERNAL. Use StudyDate.participations.create() instead.
            "::create::StudyDate::participations": {
              url: urlBase + "/StudyDates/:id/participations",
              method: "POST",
            },

            // INTERNAL. Use StudyDate.participations.createMany() instead.
            "::createMany::StudyDate::participations": {
              isArray: true,
              url: urlBase + "/StudyDates/:id/participations",
              method: "POST",
            },

            // INTERNAL. Use StudyDate.participations.destroyAll() instead.
            "::delete::StudyDate::participations": {
              url: urlBase + "/StudyDates/:id/participations",
              method: "DELETE",
            },

            // INTERNAL. Use StudyDate.participations.count() instead.
            "::count::StudyDate::participations": {
              url: urlBase + "/StudyDates/:id/participations/count",
              method: "GET",
            },

            // INTERNAL. Use Subuser.participations.findById() instead.
            "::findById::Subuser::participations": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/participations/:fk",
              method: "GET",
            },

            // INTERNAL. Use Subuser.participations.destroyById() instead.
            "::destroyById::Subuser::participations": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/participations/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Subuser.participations.updateById() instead.
            "::updateById::Subuser::participations": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/participations/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Subuser.participations() instead.
            "::get::Subuser::participations": {
              isArray: true,
              url: urlBase + "/Subusers/:id/participations",
              method: "GET",
            },

            // INTERNAL. Use Subuser.participations.create() instead.
            "::create::Subuser::participations": {
              url: urlBase + "/Subusers/:id/participations",
              method: "POST",
            },

            // INTERNAL. Use Subuser.participations.createMany() instead.
            "::createMany::Subuser::participations": {
              isArray: true,
              url: urlBase + "/Subusers/:id/participations",
              method: "POST",
            },

            // INTERNAL. Use Subuser.participations.destroyAll() instead.
            "::delete::Subuser::participations": {
              url: urlBase + "/Subusers/:id/participations",
              method: "DELETE",
            },

            // INTERNAL. Use Subuser.participations.count() instead.
            "::count::Subuser::participations": {
              url: urlBase + "/Subusers/:id/participations/count",
              method: "GET",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.Participation#patchOrCreate
             * @methodOf lbServices.Participation
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
        R["patchOrCreate"] = R["upsert"];

            /**
             * @ngdoc method
             * @name lbServices.Participation#updateOrCreate
             * @methodOf lbServices.Participation
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
        R["updateOrCreate"] = R["upsert"];

            /**
             * @ngdoc method
             * @name lbServices.Participation#patchOrCreateWithWhere
             * @methodOf lbServices.Participation
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
        R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

            /**
             * @ngdoc method
             * @name lbServices.Participation#update
             * @methodOf lbServices.Participation
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.Participation#destroyById
             * @methodOf lbServices.Participation
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Participation#removeById
             * @methodOf lbServices.Participation
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Participation#patchAttributes
             * @methodOf lbServices.Participation
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
        R["patchAttributes"] = R["prototype$updateAttributes"];


        /**
        * @ngdoc property
        * @name lbServices.Participation#modelName
        * @propertyOf lbServices.Participation
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Participation`.
        */
        R.modelName = "Participation";


            /**
             * @ngdoc method
             * @name lbServices.Participation#study
             * @methodOf lbServices.Participation
             *
             * @description
             *
             * Fetches belongsTo relation study.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `refresh` – `{boolean=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
        R.study = function() {
          var TargetResource = $injector.get("Study");
          var action = TargetResource["::get::Participation::study"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Participation#studyDate
             * @methodOf lbServices.Participation
             *
             * @description
             *
             * Fetches belongsTo relation studyDate.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `refresh` – `{boolean=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
        R.studyDate = function() {
          var TargetResource = $injector.get("StudyDate");
          var action = TargetResource["::get::Participation::studyDate"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Participation#participant
             * @methodOf lbServices.Participation
             *
             * @description
             *
             * Fetches belongsTo relation participant.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `refresh` – `{boolean=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
        R.participant = function() {
          var TargetResource = $injector.get("Subuser");
          var action = TargetResource["::get::Participation::participant"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Subuser
 * @header lbServices.Subuser
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Subuser` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Subuser",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/Subusers/:id",
          { 'id': '@id' },
          {

            /**
             * @ngdoc method
             * @name lbServices.Subuser#prototype$__findById__accessTokens
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Find a related item by id for accessTokens.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for accessTokens
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
            "prototype$__findById__accessTokens": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/accessTokens/:fk",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Subuser#prototype$__destroyById__accessTokens
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Delete a related item by id for accessTokens.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for accessTokens
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "prototype$__destroyById__accessTokens": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/accessTokens/:fk",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Subuser#prototype$__updateById__accessTokens
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Update a related item by id for accessTokens.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for accessTokens
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
            "prototype$__updateById__accessTokens": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/accessTokens/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Subuser.created_studies.findById() instead.
            "prototype$__findById__created_studies": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/created_studies/:fk",
              method: "GET",
            },

            // INTERNAL. Use Subuser.created_studies.destroyById() instead.
            "prototype$__destroyById__created_studies": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/created_studies/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Subuser.created_studies.updateById() instead.
            "prototype$__updateById__created_studies": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/created_studies/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Subuser.created_study_dates.findById() instead.
            "prototype$__findById__created_study_dates": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/created_study_dates/:fk",
              method: "GET",
            },

            // INTERNAL. Use Subuser.created_study_dates.destroyById() instead.
            "prototype$__destroyById__created_study_dates": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/created_study_dates/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Subuser.created_study_dates.updateById() instead.
            "prototype$__updateById__created_study_dates": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/created_study_dates/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Subuser.participations.findById() instead.
            "prototype$__findById__participations": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/participations/:fk",
              method: "GET",
            },

            // INTERNAL. Use Subuser.participations.destroyById() instead.
            "prototype$__destroyById__participations": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/participations/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Subuser.participations.updateById() instead.
            "prototype$__updateById__participations": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/participations/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Subuser.supervised_studies.findById() instead.
            "prototype$__findById__supervised_studies": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/supervised_studies/:fk",
              method: "GET",
            },

            // INTERNAL. Use Subuser.supervised_studies.destroyById() instead.
            "prototype$__destroyById__supervised_studies": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/supervised_studies/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Subuser.supervised_studies.updateById() instead.
            "prototype$__updateById__supervised_studies": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/supervised_studies/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Subuser.supervised_studies.link() instead.
            "prototype$__link__supervised_studies": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/supervised_studies/rel/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Subuser.supervised_studies.unlink() instead.
            "prototype$__unlink__supervised_studies": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/supervised_studies/rel/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Subuser.supervised_studies.exists() instead.
            "prototype$__exists__supervised_studies": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Subusers/:id/supervised_studies/rel/:fk",
              method: "HEAD",
            },

            // INTERNAL. Use Subuser.preferences() instead.
            "prototype$__get__preferences": {
              url: urlBase + "/Subusers/:id/preferences",
              method: "GET",
            },

            // INTERNAL. Use Subuser.preferences.create() instead.
            "prototype$__create__preferences": {
              url: urlBase + "/Subusers/:id/preferences",
              method: "POST",
            },

            // INTERNAL. Use Subuser.preferences.update() instead.
            "prototype$__update__preferences": {
              url: urlBase + "/Subusers/:id/preferences",
              method: "PUT",
            },

            // INTERNAL. Use Subuser.preferences.destroy() instead.
            "prototype$__destroy__preferences": {
              url: urlBase + "/Subusers/:id/preferences",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Subuser#prototype$__get__accessTokens
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Queries accessTokens of Subuser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `filter` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
            "prototype$__get__accessTokens": {
              isArray: true,
              url: urlBase + "/Subusers/:id/accessTokens",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Subuser#prototype$__create__accessTokens
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Creates a new instance in accessTokens of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
            "prototype$__create__accessTokens": {
              url: urlBase + "/Subusers/:id/accessTokens",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Subuser#prototype$__delete__accessTokens
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Deletes all accessTokens of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "prototype$__delete__accessTokens": {
              url: urlBase + "/Subusers/:id/accessTokens",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Subuser#prototype$__count__accessTokens
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Counts accessTokens of Subuser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "prototype$__count__accessTokens": {
              url: urlBase + "/Subusers/:id/accessTokens/count",
              method: "GET",
            },

            // INTERNAL. Use Subuser.created_studies() instead.
            "prototype$__get__created_studies": {
              isArray: true,
              url: urlBase + "/Subusers/:id/created_studies",
              method: "GET",
            },

            // INTERNAL. Use Subuser.created_studies.create() instead.
            "prototype$__create__created_studies": {
              url: urlBase + "/Subusers/:id/created_studies",
              method: "POST",
            },

            // INTERNAL. Use Subuser.created_studies.destroyAll() instead.
            "prototype$__delete__created_studies": {
              url: urlBase + "/Subusers/:id/created_studies",
              method: "DELETE",
            },

            // INTERNAL. Use Subuser.created_studies.count() instead.
            "prototype$__count__created_studies": {
              url: urlBase + "/Subusers/:id/created_studies/count",
              method: "GET",
            },

            // INTERNAL. Use Subuser.created_study_dates() instead.
            "prototype$__get__created_study_dates": {
              isArray: true,
              url: urlBase + "/Subusers/:id/created_study_dates",
              method: "GET",
            },

            // INTERNAL. Use Subuser.created_study_dates.create() instead.
            "prototype$__create__created_study_dates": {
              url: urlBase + "/Subusers/:id/created_study_dates",
              method: "POST",
            },

            // INTERNAL. Use Subuser.created_study_dates.destroyAll() instead.
            "prototype$__delete__created_study_dates": {
              url: urlBase + "/Subusers/:id/created_study_dates",
              method: "DELETE",
            },

            // INTERNAL. Use Subuser.created_study_dates.count() instead.
            "prototype$__count__created_study_dates": {
              url: urlBase + "/Subusers/:id/created_study_dates/count",
              method: "GET",
            },

            // INTERNAL. Use Subuser.participations() instead.
            "prototype$__get__participations": {
              isArray: true,
              url: urlBase + "/Subusers/:id/participations",
              method: "GET",
            },

            // INTERNAL. Use Subuser.participations.create() instead.
            "prototype$__create__participations": {
              url: urlBase + "/Subusers/:id/participations",
              method: "POST",
            },

            // INTERNAL. Use Subuser.participations.destroyAll() instead.
            "prototype$__delete__participations": {
              url: urlBase + "/Subusers/:id/participations",
              method: "DELETE",
            },

            // INTERNAL. Use Subuser.participations.count() instead.
            "prototype$__count__participations": {
              url: urlBase + "/Subusers/:id/participations/count",
              method: "GET",
            },

            // INTERNAL. Use Subuser.supervised_studies() instead.
            "prototype$__get__supervised_studies": {
              isArray: true,
              url: urlBase + "/Subusers/:id/supervised_studies",
              method: "GET",
            },

            // INTERNAL. Use Subuser.supervised_studies.create() instead.
            "prototype$__create__supervised_studies": {
              url: urlBase + "/Subusers/:id/supervised_studies",
              method: "POST",
            },

            // INTERNAL. Use Subuser.supervised_studies.destroyAll() instead.
            "prototype$__delete__supervised_studies": {
              url: urlBase + "/Subusers/:id/supervised_studies",
              method: "DELETE",
            },

            // INTERNAL. Use Subuser.supervised_studies.count() instead.
            "prototype$__count__supervised_studies": {
              url: urlBase + "/Subusers/:id/supervised_studies/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Subuser#create
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/Subusers",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Subuser#createMany
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/Subusers",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Subuser#upsert
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
            "upsert": {
              url: urlBase + "/Subusers",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.Subuser#replaceOrCreate
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Replace an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
            "replaceOrCreate": {
              url: urlBase + "/Subusers/replaceOrCreate",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Subuser#upsertWithWhere
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
            "upsertWithWhere": {
              url: urlBase + "/Subusers/upsertWithWhere",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Subuser#exists
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/Subusers/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Subuser#findById
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/Subusers/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Subuser#replaceById
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Replace attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
            "replaceById": {
              url: urlBase + "/Subusers/:id/replace",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Subuser#find
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/Subusers",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Subuser#findOne
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/Subusers/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Subuser#updateAll
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
            "updateAll": {
              url: urlBase + "/Subusers/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Subuser#deleteById
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/Subusers/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Subuser#count
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/Subusers/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Subuser#prototype$updateAttributes
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
            "prototype$updateAttributes": {
              url: urlBase + "/Subusers/:id",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.Subuser#createChangeStream
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/Subusers/change-stream",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Subuser#login
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Login a user with username/email and password.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
             *   Default value: `user`.
             *
             *  - `rememberMe` - `boolean` - Whether the authentication credentials
             *     should be remembered in localStorage across app/browser restarts.
             *     Default: `true`.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The response body contains properties of the AccessToken created on login.
             * Depending on the value of `include` parameter, the body may contain additional properties:
             *   - `user` - `U+007BUserU+007D` - Data of the currently logged in user. (`include=user`)
             *
             */
            "login": {
              params: {
                include: 'user',
              },
              interceptor: {
                response: function(response) {
                  var accessToken = response.data;
                  LoopBackAuth.setUser(
                    accessToken.id, accessToken.userId, accessToken.user);
                  LoopBackAuth.rememberMe =
                    response.config.params.rememberMe !== false;
                  LoopBackAuth.save();
                  return response.resource;
                },
              },
              url: urlBase + "/Subusers/login",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Subuser#logout
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Logout a user with access token.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `access_token` – `{string}` - Do not supply this argument, it is automatically extracted from request headers.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "logout": {
              interceptor: {
                response: function(response) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return response.resource;
                },
                responseError: function(responseError) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return responseError.resource;
                },
              },
              url: urlBase + "/Subusers/logout",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Subuser#confirm
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Confirm a user registration with email verification token.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `uid` – `{string}` -
             *
             *  - `token` – `{string}` -
             *
             *  - `redirect` – `{string=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "confirm": {
              url: urlBase + "/Subusers/confirm",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Subuser#resetPassword
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Reset password for a user with email.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "resetPassword": {
              url: urlBase + "/Subusers/reset",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Subuser#sendEmail
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `id` – `{string}` -
             *
             *  - `to` – `{string}` -
             *
             *  - `from` – `{string}` -
             *
             *  - `subject` – `{string}` -
             *
             *  - `text` – `{string}` -
             *
             *  - `html` – `{string=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `mail` – `{object=}` -
             */
            "sendEmail": {
              url: urlBase + "/Subusers/:id/sendEmail",
              method: "POST",
            },

            // INTERNAL. Use Study.advisors.findById() instead.
            "::findById::Study::advisors": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Studies/:id/advisors/:fk",
              method: "GET",
            },

            // INTERNAL. Use Study.advisors.destroyById() instead.
            "::destroyById::Study::advisors": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Studies/:id/advisors/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Study.advisors.updateById() instead.
            "::updateById::Study::advisors": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Studies/:id/advisors/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Study.advisors.link() instead.
            "::link::Study::advisors": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Studies/:id/advisors/rel/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Study.advisors.unlink() instead.
            "::unlink::Study::advisors": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Studies/:id/advisors/rel/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Study.advisors.exists() instead.
            "::exists::Study::advisors": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Studies/:id/advisors/rel/:fk",
              method: "HEAD",
            },

            // INTERNAL. Use Study.owner() instead.
            "::get::Study::owner": {
              url: urlBase + "/Studies/:id/owner",
              method: "GET",
            },

            // INTERNAL. Use Study.advisors() instead.
            "::get::Study::advisors": {
              isArray: true,
              url: urlBase + "/Studies/:id/advisors",
              method: "GET",
            },

            // INTERNAL. Use Study.advisors.create() instead.
            "::create::Study::advisors": {
              url: urlBase + "/Studies/:id/advisors",
              method: "POST",
            },

            // INTERNAL. Use Study.advisors.createMany() instead.
            "::createMany::Study::advisors": {
              isArray: true,
              url: urlBase + "/Studies/:id/advisors",
              method: "POST",
            },

            // INTERNAL. Use Study.advisors.destroyAll() instead.
            "::delete::Study::advisors": {
              url: urlBase + "/Studies/:id/advisors",
              method: "DELETE",
            },

            // INTERNAL. Use Study.advisors.count() instead.
            "::count::Study::advisors": {
              url: urlBase + "/Studies/:id/advisors/count",
              method: "GET",
            },

            // INTERNAL. Use StudyDate.owner() instead.
            "::get::StudyDate::owner": {
              url: urlBase + "/StudyDates/:id/owner",
              method: "GET",
            },

            // INTERNAL. Use Participation.participant() instead.
            "::get::Participation::participant": {
              url: urlBase + "/Participations/:id/participant",
              method: "GET",
            },

            // INTERNAL. Use Preference.subuser() instead.
            "::get::Preference::subuser": {
              url: urlBase + "/Preferences/:id/subuser",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Subuser#getCurrent
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Get data of the currently logged user. Fail with HTTP result 401
             * when there is no user logged in.
             *
             * @param {function(Object,Object)=} successCb
             *    Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *    `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             */
            'getCurrent': {
              url: urlBase + "/Subusers" + '/:id',
              method: 'GET',
              params: {
                id: function() {
                  var id = LoopBackAuth.currentUserId;
                  if (id == null) id = '__anonymous__';
                  return id;
                },
              },
              interceptor: {
                response: function(response) {
                  LoopBackAuth.currentUserData = response.data;
                  return response.resource;
                },
                responseError: function(responseError) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return $q.reject(responseError);
                },
              },
              __isGetCurrentUser__: true,
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.Subuser#patchOrCreate
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
        R["patchOrCreate"] = R["upsert"];

            /**
             * @ngdoc method
             * @name lbServices.Subuser#updateOrCreate
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
        R["updateOrCreate"] = R["upsert"];

            /**
             * @ngdoc method
             * @name lbServices.Subuser#patchOrCreateWithWhere
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
        R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

            /**
             * @ngdoc method
             * @name lbServices.Subuser#update
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.Subuser#destroyById
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Subuser#removeById
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Subuser#patchAttributes
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
        R["patchAttributes"] = R["prototype$updateAttributes"];

        /**
         * @ngdoc method
         * @name lbServices.Subuser#getCachedCurrent
         * @methodOf lbServices.Subuser
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.Subuser#login} or
         * {@link lbServices.Subuser#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A Subuser instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name lbServices.Subuser#isAuthenticated
         * @methodOf lbServices.Subuser
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name lbServices.Subuser#getCurrentId
         * @methodOf lbServices.Subuser
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

        /**
        * @ngdoc property
        * @name lbServices.Subuser#modelName
        * @propertyOf lbServices.Subuser
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Subuser`.
        */
        R.modelName = "Subuser";

    /**
     * @ngdoc object
     * @name lbServices.Subuser.created_studies
     * @header lbServices.Subuser.created_studies
     * @object
     * @description
     *
     * The object `Subuser.created_studies` groups methods
     * manipulating `Study` instances related to `Subuser`.
     *
     * Call {@link lbServices.Subuser#created_studies Subuser.created_studies()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Subuser#createManyd_studies
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Queries created_studies of Subuser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `filter` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
        R.createManyd_studies = function() {
          var TargetResource = $injector.get("Study");
          var action = TargetResource["::get::Subuser::createManyd_studies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.createManyd_studies#count
             * @methodOf lbServices.Subuser.createManyd_studies
             *
             * @description
             *
             * Counts created_studies of Subuser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.createManyd_studies.count = function() {
          var TargetResource = $injector.get("Study");
          var action = TargetResource["::count::Subuser::createManyd_studies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.createManyd_studies#create
             * @methodOf lbServices.Subuser.createManyd_studies
             *
             * @description
             *
             * Creates a new instance in created_studies of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
        R.createManyd_studies.create = function() {
          var TargetResource = $injector.get("Study");
          var action = TargetResource["::createMany::Subuser::created_studies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.createManyd_studies#destroyAll
             * @methodOf lbServices.Subuser.createManyd_studies
             *
             * @description
             *
             * Deletes all created_studies of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.createManyd_studies.destroyAll = function() {
          var TargetResource = $injector.get("Study");
          var action = TargetResource["::delete::Subuser::createManyd_studies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.createManyd_studies#destroyById
             * @methodOf lbServices.Subuser.createManyd_studies
             *
             * @description
             *
             * Delete a related item by id for created_studies.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for created_studies
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.createManyd_studies.destroyById = function() {
          var TargetResource = $injector.get("Study");
          var action = TargetResource["::destroyById::Subuser::createManyd_studies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.createManyd_studies#findById
             * @methodOf lbServices.Subuser.createManyd_studies
             *
             * @description
             *
             * Find a related item by id for created_studies.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for created_studies
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
        R.createManyd_studies.findById = function() {
          var TargetResource = $injector.get("Study");
          var action = TargetResource["::findById::Subuser::createManyd_studies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.createManyd_studies#updateById
             * @methodOf lbServices.Subuser.createManyd_studies
             *
             * @description
             *
             * Update a related item by id for created_studies.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for created_studies
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
        R.createManyd_studies.updateById = function() {
          var TargetResource = $injector.get("Study");
          var action = TargetResource["::updateById::Subuser::createManyd_studies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser#created_studies
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Queries created_studies of Subuser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `filter` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
        R.created_studies = function() {
          var TargetResource = $injector.get("Study");
          var action = TargetResource["::get::Subuser::created_studies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.created_studies#count
             * @methodOf lbServices.Subuser.created_studies
             *
             * @description
             *
             * Counts created_studies of Subuser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.created_studies.count = function() {
          var TargetResource = $injector.get("Study");
          var action = TargetResource["::count::Subuser::created_studies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.created_studies#create
             * @methodOf lbServices.Subuser.created_studies
             *
             * @description
             *
             * Creates a new instance in created_studies of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
        R.created_studies.create = function() {
          var TargetResource = $injector.get("Study");
          var action = TargetResource["::create::Subuser::created_studies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.created_studies#destroyAll
             * @methodOf lbServices.Subuser.created_studies
             *
             * @description
             *
             * Deletes all created_studies of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.created_studies.destroyAll = function() {
          var TargetResource = $injector.get("Study");
          var action = TargetResource["::delete::Subuser::created_studies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.created_studies#destroyById
             * @methodOf lbServices.Subuser.created_studies
             *
             * @description
             *
             * Delete a related item by id for created_studies.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for created_studies
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.created_studies.destroyById = function() {
          var TargetResource = $injector.get("Study");
          var action = TargetResource["::destroyById::Subuser::created_studies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.created_studies#findById
             * @methodOf lbServices.Subuser.created_studies
             *
             * @description
             *
             * Find a related item by id for created_studies.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for created_studies
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
        R.created_studies.findById = function() {
          var TargetResource = $injector.get("Study");
          var action = TargetResource["::findById::Subuser::created_studies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.created_studies#updateById
             * @methodOf lbServices.Subuser.created_studies
             *
             * @description
             *
             * Update a related item by id for created_studies.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for created_studies
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
        R.created_studies.updateById = function() {
          var TargetResource = $injector.get("Study");
          var action = TargetResource["::updateById::Subuser::created_studies"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Subuser.created_study_dates
     * @header lbServices.Subuser.created_study_dates
     * @object
     * @description
     *
     * The object `Subuser.created_study_dates` groups methods
     * manipulating `StudyDate` instances related to `Subuser`.
     *
     * Call {@link lbServices.Subuser#created_study_dates Subuser.created_study_dates()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Subuser#createManyd_study_dates
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Queries created_study_dates of Subuser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `filter` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
        R.createManyd_study_dates = function() {
          var TargetResource = $injector.get("StudyDate");
          var action = TargetResource["::get::Subuser::createManyd_study_dates"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.createManyd_study_dates#count
             * @methodOf lbServices.Subuser.createManyd_study_dates
             *
             * @description
             *
             * Counts created_study_dates of Subuser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.createManyd_study_dates.count = function() {
          var TargetResource = $injector.get("StudyDate");
          var action = TargetResource["::count::Subuser::createManyd_study_dates"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.createManyd_study_dates#create
             * @methodOf lbServices.Subuser.createManyd_study_dates
             *
             * @description
             *
             * Creates a new instance in created_study_dates of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
        R.createManyd_study_dates.create = function() {
          var TargetResource = $injector.get("StudyDate");
          var action = TargetResource["::createMany::Subuser::created_study_dates"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.createManyd_study_dates#destroyAll
             * @methodOf lbServices.Subuser.createManyd_study_dates
             *
             * @description
             *
             * Deletes all created_study_dates of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.createManyd_study_dates.destroyAll = function() {
          var TargetResource = $injector.get("StudyDate");
          var action = TargetResource["::delete::Subuser::createManyd_study_dates"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.createManyd_study_dates#destroyById
             * @methodOf lbServices.Subuser.createManyd_study_dates
             *
             * @description
             *
             * Delete a related item by id for created_study_dates.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for created_study_dates
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.createManyd_study_dates.destroyById = function() {
          var TargetResource = $injector.get("StudyDate");
          var action = TargetResource["::destroyById::Subuser::createManyd_study_dates"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.createManyd_study_dates#findById
             * @methodOf lbServices.Subuser.createManyd_study_dates
             *
             * @description
             *
             * Find a related item by id for created_study_dates.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for created_study_dates
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
        R.createManyd_study_dates.findById = function() {
          var TargetResource = $injector.get("StudyDate");
          var action = TargetResource["::findById::Subuser::createManyd_study_dates"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.createManyd_study_dates#updateById
             * @methodOf lbServices.Subuser.createManyd_study_dates
             *
             * @description
             *
             * Update a related item by id for created_study_dates.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for created_study_dates
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
        R.createManyd_study_dates.updateById = function() {
          var TargetResource = $injector.get("StudyDate");
          var action = TargetResource["::updateById::Subuser::createManyd_study_dates"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser#created_study_dates
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Queries created_study_dates of Subuser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `filter` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
        R.created_study_dates = function() {
          var TargetResource = $injector.get("StudyDate");
          var action = TargetResource["::get::Subuser::created_study_dates"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.created_study_dates#count
             * @methodOf lbServices.Subuser.created_study_dates
             *
             * @description
             *
             * Counts created_study_dates of Subuser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.created_study_dates.count = function() {
          var TargetResource = $injector.get("StudyDate");
          var action = TargetResource["::count::Subuser::created_study_dates"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.created_study_dates#create
             * @methodOf lbServices.Subuser.created_study_dates
             *
             * @description
             *
             * Creates a new instance in created_study_dates of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
        R.created_study_dates.create = function() {
          var TargetResource = $injector.get("StudyDate");
          var action = TargetResource["::create::Subuser::created_study_dates"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.created_study_dates#destroyAll
             * @methodOf lbServices.Subuser.created_study_dates
             *
             * @description
             *
             * Deletes all created_study_dates of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.created_study_dates.destroyAll = function() {
          var TargetResource = $injector.get("StudyDate");
          var action = TargetResource["::delete::Subuser::created_study_dates"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.created_study_dates#destroyById
             * @methodOf lbServices.Subuser.created_study_dates
             *
             * @description
             *
             * Delete a related item by id for created_study_dates.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for created_study_dates
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.created_study_dates.destroyById = function() {
          var TargetResource = $injector.get("StudyDate");
          var action = TargetResource["::destroyById::Subuser::created_study_dates"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.created_study_dates#findById
             * @methodOf lbServices.Subuser.created_study_dates
             *
             * @description
             *
             * Find a related item by id for created_study_dates.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for created_study_dates
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
        R.created_study_dates.findById = function() {
          var TargetResource = $injector.get("StudyDate");
          var action = TargetResource["::findById::Subuser::created_study_dates"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.created_study_dates#updateById
             * @methodOf lbServices.Subuser.created_study_dates
             *
             * @description
             *
             * Update a related item by id for created_study_dates.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for created_study_dates
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `StudyDate` object.)
             * </em>
             */
        R.created_study_dates.updateById = function() {
          var TargetResource = $injector.get("StudyDate");
          var action = TargetResource["::updateById::Subuser::created_study_dates"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Subuser.participations
     * @header lbServices.Subuser.participations
     * @object
     * @description
     *
     * The object `Subuser.participations` groups methods
     * manipulating `Participation` instances related to `Subuser`.
     *
     * Call {@link lbServices.Subuser#participations Subuser.participations()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Subuser#participations
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Queries participations of Subuser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `filter` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
        R.participations = function() {
          var TargetResource = $injector.get("Participation");
          var action = TargetResource["::get::Subuser::participations"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.participations#count
             * @methodOf lbServices.Subuser.participations
             *
             * @description
             *
             * Counts participations of Subuser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.participations.count = function() {
          var TargetResource = $injector.get("Participation");
          var action = TargetResource["::count::Subuser::participations"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.participations#create
             * @methodOf lbServices.Subuser.participations
             *
             * @description
             *
             * Creates a new instance in participations of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
        R.participations.create = function() {
          var TargetResource = $injector.get("Participation");
          var action = TargetResource["::create::Subuser::participations"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.participations#createMany
             * @methodOf lbServices.Subuser.participations
             *
             * @description
             *
             * Creates a new instance in participations of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
        R.participations.createMany = function() {
          var TargetResource = $injector.get("Participation");
          var action = TargetResource["::createMany::Subuser::participations"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.participations#destroyAll
             * @methodOf lbServices.Subuser.participations
             *
             * @description
             *
             * Deletes all participations of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.participations.destroyAll = function() {
          var TargetResource = $injector.get("Participation");
          var action = TargetResource["::delete::Subuser::participations"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.participations#destroyById
             * @methodOf lbServices.Subuser.participations
             *
             * @description
             *
             * Delete a related item by id for participations.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for participations
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.participations.destroyById = function() {
          var TargetResource = $injector.get("Participation");
          var action = TargetResource["::destroyById::Subuser::participations"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.participations#findById
             * @methodOf lbServices.Subuser.participations
             *
             * @description
             *
             * Find a related item by id for participations.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for participations
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
        R.participations.findById = function() {
          var TargetResource = $injector.get("Participation");
          var action = TargetResource["::findById::Subuser::participations"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.participations#updateById
             * @methodOf lbServices.Subuser.participations
             *
             * @description
             *
             * Update a related item by id for participations.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for participations
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Participation` object.)
             * </em>
             */
        R.participations.updateById = function() {
          var TargetResource = $injector.get("Participation");
          var action = TargetResource["::updateById::Subuser::participations"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Subuser.supervised_studies
     * @header lbServices.Subuser.supervised_studies
     * @object
     * @description
     *
     * The object `Subuser.supervised_studies` groups methods
     * manipulating `Study` instances related to `Subuser`.
     *
     * Call {@link lbServices.Subuser#supervised_studies Subuser.supervised_studies()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Subuser#supervised_studies
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Queries supervised_studies of Subuser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `filter` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
        R.supervised_studies = function() {
          var TargetResource = $injector.get("Study");
          var action = TargetResource["::get::Subuser::supervised_studies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.supervised_studies#count
             * @methodOf lbServices.Subuser.supervised_studies
             *
             * @description
             *
             * Counts supervised_studies of Subuser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.supervised_studies.count = function() {
          var TargetResource = $injector.get("Study");
          var action = TargetResource["::count::Subuser::supervised_studies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.supervised_studies#create
             * @methodOf lbServices.Subuser.supervised_studies
             *
             * @description
             *
             * Creates a new instance in supervised_studies of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
        R.supervised_studies.create = function() {
          var TargetResource = $injector.get("Study");
          var action = TargetResource["::create::Subuser::supervised_studies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.supervised_studies#createMany
             * @methodOf lbServices.Subuser.supervised_studies
             *
             * @description
             *
             * Creates a new instance in supervised_studies of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
        R.supervised_studies.createMany = function() {
          var TargetResource = $injector.get("Study");
          var action = TargetResource["::createMany::Subuser::supervised_studies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.supervised_studies#destroyAll
             * @methodOf lbServices.Subuser.supervised_studies
             *
             * @description
             *
             * Deletes all supervised_studies of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.supervised_studies.destroyAll = function() {
          var TargetResource = $injector.get("Study");
          var action = TargetResource["::delete::Subuser::supervised_studies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.supervised_studies#destroyById
             * @methodOf lbServices.Subuser.supervised_studies
             *
             * @description
             *
             * Delete a related item by id for supervised_studies.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for supervised_studies
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.supervised_studies.destroyById = function() {
          var TargetResource = $injector.get("Study");
          var action = TargetResource["::destroyById::Subuser::supervised_studies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.supervised_studies#exists
             * @methodOf lbServices.Subuser.supervised_studies
             *
             * @description
             *
             * Check the existence of supervised_studies relation to an item by id.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for supervised_studies
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
        R.supervised_studies.exists = function() {
          var TargetResource = $injector.get("Study");
          var action = TargetResource["::exists::Subuser::supervised_studies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.supervised_studies#findById
             * @methodOf lbServices.Subuser.supervised_studies
             *
             * @description
             *
             * Find a related item by id for supervised_studies.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for supervised_studies
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
        R.supervised_studies.findById = function() {
          var TargetResource = $injector.get("Study");
          var action = TargetResource["::findById::Subuser::supervised_studies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.supervised_studies#link
             * @methodOf lbServices.Subuser.supervised_studies
             *
             * @description
             *
             * Add a related item by id for supervised_studies.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for supervised_studies
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
        R.supervised_studies.link = function() {
          var TargetResource = $injector.get("Study");
          var action = TargetResource["::link::Subuser::supervised_studies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.supervised_studies#unlink
             * @methodOf lbServices.Subuser.supervised_studies
             *
             * @description
             *
             * Remove the supervised_studies relation to an item by id.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for supervised_studies
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.supervised_studies.unlink = function() {
          var TargetResource = $injector.get("Study");
          var action = TargetResource["::unlink::Subuser::supervised_studies"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.supervised_studies#updateById
             * @methodOf lbServices.Subuser.supervised_studies
             *
             * @description
             *
             * Update a related item by id for supervised_studies.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for supervised_studies
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Study` object.)
             * </em>
             */
        R.supervised_studies.updateById = function() {
          var TargetResource = $injector.get("Study");
          var action = TargetResource["::updateById::Subuser::supervised_studies"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Subuser.preferences
     * @header lbServices.Subuser.preferences
     * @object
     * @description
     *
     * The object `Subuser.preferences` groups methods
     * manipulating `Preference` instances related to `Subuser`.
     *
     * Call {@link lbServices.Subuser#preferences Subuser.preferences()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Subuser#preferences
             * @methodOf lbServices.Subuser
             *
             * @description
             *
             * Fetches hasOne relation preferences.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `refresh` – `{boolean=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Preference` object.)
             * </em>
             */
        R.preferences = function() {
          var TargetResource = $injector.get("Preference");
          var action = TargetResource["::get::Subuser::preferences"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.preferences#create
             * @methodOf lbServices.Subuser.preferences
             *
             * @description
             *
             * Creates a new instance in preferences of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Preference` object.)
             * </em>
             */
        R.preferences.create = function() {
          var TargetResource = $injector.get("Preference");
          var action = TargetResource["::create::Subuser::preferences"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.preferences#createMany
             * @methodOf lbServices.Subuser.preferences
             *
             * @description
             *
             * Creates a new instance in preferences of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Preference` object.)
             * </em>
             */
        R.preferences.createMany = function() {
          var TargetResource = $injector.get("Preference");
          var action = TargetResource["::createMany::Subuser::preferences"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.preferences#destroy
             * @methodOf lbServices.Subuser.preferences
             *
             * @description
             *
             * Deletes preferences of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.preferences.destroy = function() {
          var TargetResource = $injector.get("Preference");
          var action = TargetResource["::destroy::Subuser::preferences"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Subuser.preferences#update
             * @methodOf lbServices.Subuser.preferences
             *
             * @description
             *
             * Update preferences of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Preference` object.)
             * </em>
             */
        R.preferences.update = function() {
          var TargetResource = $injector.get("Preference");
          var action = TargetResource["::update::Subuser::preferences"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Preference
 * @header lbServices.Preference
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Preference` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Preference",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/Preferences/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use Preference.subuser() instead.
            "prototype$__get__subuser": {
              url: urlBase + "/Preferences/:id/subuser",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Preference#create
             * @methodOf lbServices.Preference
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Preference` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/Preferences",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Preference#createMany
             * @methodOf lbServices.Preference
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Preference` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/Preferences",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Preference#upsert
             * @methodOf lbServices.Preference
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Preference` object.)
             * </em>
             */
            "upsert": {
              url: urlBase + "/Preferences",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.Preference#replaceOrCreate
             * @methodOf lbServices.Preference
             *
             * @description
             *
             * Replace an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Preference` object.)
             * </em>
             */
            "replaceOrCreate": {
              url: urlBase + "/Preferences/replaceOrCreate",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Preference#upsertWithWhere
             * @methodOf lbServices.Preference
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Preference` object.)
             * </em>
             */
            "upsertWithWhere": {
              url: urlBase + "/Preferences/upsertWithWhere",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Preference#exists
             * @methodOf lbServices.Preference
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/Preferences/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Preference#findById
             * @methodOf lbServices.Preference
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Preference` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/Preferences/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Preference#replaceById
             * @methodOf lbServices.Preference
             *
             * @description
             *
             * Replace attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Preference` object.)
             * </em>
             */
            "replaceById": {
              url: urlBase + "/Preferences/:id/replace",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Preference#find
             * @methodOf lbServices.Preference
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Preference` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/Preferences",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Preference#findOne
             * @methodOf lbServices.Preference
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Preference` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/Preferences/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Preference#updateAll
             * @methodOf lbServices.Preference
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
            "updateAll": {
              url: urlBase + "/Preferences/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Preference#deleteById
             * @methodOf lbServices.Preference
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Preference` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/Preferences/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Preference#count
             * @methodOf lbServices.Preference
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/Preferences/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Preference#prototype$updateAttributes
             * @methodOf lbServices.Preference
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Preference` object.)
             * </em>
             */
            "prototype$updateAttributes": {
              url: urlBase + "/Preferences/:id",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.Preference#createChangeStream
             * @methodOf lbServices.Preference
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/Preferences/change-stream",
              method: "POST",
            },

            // INTERNAL. Use Subuser.preferences() instead.
            "::get::Subuser::preferences": {
              url: urlBase + "/Subusers/:id/preferences",
              method: "GET",
            },

            // INTERNAL. Use Subuser.preferences.create() instead.
            "::create::Subuser::preferences": {
              url: urlBase + "/Subusers/:id/preferences",
              method: "POST",
            },

            // INTERNAL. Use Subuser.preferences.createMany() instead.
            "::createMany::Subuser::preferences": {
              isArray: true,
              url: urlBase + "/Subusers/:id/preferences",
              method: "POST",
            },

            // INTERNAL. Use Subuser.preferences.update() instead.
            "::update::Subuser::preferences": {
              url: urlBase + "/Subusers/:id/preferences",
              method: "PUT",
            },

            // INTERNAL. Use Subuser.preferences.destroy() instead.
            "::destroy::Subuser::preferences": {
              url: urlBase + "/Subusers/:id/preferences",
              method: "DELETE",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.Preference#patchOrCreate
             * @methodOf lbServices.Preference
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Preference` object.)
             * </em>
             */
        R["patchOrCreate"] = R["upsert"];

            /**
             * @ngdoc method
             * @name lbServices.Preference#updateOrCreate
             * @methodOf lbServices.Preference
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Preference` object.)
             * </em>
             */
        R["updateOrCreate"] = R["upsert"];

            /**
             * @ngdoc method
             * @name lbServices.Preference#patchOrCreateWithWhere
             * @methodOf lbServices.Preference
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Preference` object.)
             * </em>
             */
        R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

            /**
             * @ngdoc method
             * @name lbServices.Preference#update
             * @methodOf lbServices.Preference
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.Preference#destroyById
             * @methodOf lbServices.Preference
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Preference` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Preference#removeById
             * @methodOf lbServices.Preference
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Preference` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Preference#patchAttributes
             * @methodOf lbServices.Preference
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Preference` object.)
             * </em>
             */
        R["patchAttributes"] = R["prototype$updateAttributes"];


        /**
        * @ngdoc property
        * @name lbServices.Preference#modelName
        * @propertyOf lbServices.Preference
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Preference`.
        */
        R.modelName = "Preference";


            /**
             * @ngdoc method
             * @name lbServices.Preference#subuser
             * @methodOf lbServices.Preference
             *
             * @description
             *
             * Fetches belongsTo relation subuser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `refresh` – `{boolean=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Subuser` object.)
             * </em>
             */
        R.subuser = function() {
          var TargetResource = $injector.get("Subuser");
          var action = TargetResource["::get::Preference::subuser"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Email
 * @header lbServices.Email
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Email` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Email",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/Emails/:id",
          { 'id': '@id' },
          {
          }
        );




        /**
        * @ngdoc property
        * @name lbServices.Email#modelName
        * @propertyOf lbServices.Email
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Email`.
        */
        R.modelName = "Email";



        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.AdvisorDummy
 * @header lbServices.AdvisorDummy
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `AdvisorDummy` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "AdvisorDummy",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/AdvisorDummies/:id",
          { 'id': '@id' },
          {

            /**
             * @ngdoc method
             * @name lbServices.AdvisorDummy#create
             * @methodOf lbServices.AdvisorDummy
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `AdvisorDummy` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/AdvisorDummies",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.AdvisorDummy#createMany
             * @methodOf lbServices.AdvisorDummy
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `AdvisorDummy` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/AdvisorDummies",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.AdvisorDummy#upsert
             * @methodOf lbServices.AdvisorDummy
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `AdvisorDummy` object.)
             * </em>
             */
            "upsert": {
              url: urlBase + "/AdvisorDummies",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.AdvisorDummy#replaceOrCreate
             * @methodOf lbServices.AdvisorDummy
             *
             * @description
             *
             * Replace an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `AdvisorDummy` object.)
             * </em>
             */
            "replaceOrCreate": {
              url: urlBase + "/AdvisorDummies/replaceOrCreate",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.AdvisorDummy#upsertWithWhere
             * @methodOf lbServices.AdvisorDummy
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `AdvisorDummy` object.)
             * </em>
             */
            "upsertWithWhere": {
              url: urlBase + "/AdvisorDummies/upsertWithWhere",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.AdvisorDummy#exists
             * @methodOf lbServices.AdvisorDummy
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/AdvisorDummies/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.AdvisorDummy#findById
             * @methodOf lbServices.AdvisorDummy
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `AdvisorDummy` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/AdvisorDummies/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.AdvisorDummy#replaceById
             * @methodOf lbServices.AdvisorDummy
             *
             * @description
             *
             * Replace attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `AdvisorDummy` object.)
             * </em>
             */
            "replaceById": {
              url: urlBase + "/AdvisorDummies/:id/replace",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.AdvisorDummy#find
             * @methodOf lbServices.AdvisorDummy
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `AdvisorDummy` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/AdvisorDummies",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.AdvisorDummy#findOne
             * @methodOf lbServices.AdvisorDummy
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `AdvisorDummy` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/AdvisorDummies/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.AdvisorDummy#updateAll
             * @methodOf lbServices.AdvisorDummy
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
            "updateAll": {
              url: urlBase + "/AdvisorDummies/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.AdvisorDummy#deleteById
             * @methodOf lbServices.AdvisorDummy
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `AdvisorDummy` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/AdvisorDummies/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.AdvisorDummy#count
             * @methodOf lbServices.AdvisorDummy
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/AdvisorDummies/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.AdvisorDummy#prototype$updateAttributes
             * @methodOf lbServices.AdvisorDummy
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `AdvisorDummy` object.)
             * </em>
             */
            "prototype$updateAttributes": {
              url: urlBase + "/AdvisorDummies/:id",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.AdvisorDummy#createChangeStream
             * @methodOf lbServices.AdvisorDummy
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/AdvisorDummies/change-stream",
              method: "POST",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.AdvisorDummy#patchOrCreate
             * @methodOf lbServices.AdvisorDummy
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `AdvisorDummy` object.)
             * </em>
             */
        R["patchOrCreate"] = R["upsert"];

            /**
             * @ngdoc method
             * @name lbServices.AdvisorDummy#updateOrCreate
             * @methodOf lbServices.AdvisorDummy
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `AdvisorDummy` object.)
             * </em>
             */
        R["updateOrCreate"] = R["upsert"];

            /**
             * @ngdoc method
             * @name lbServices.AdvisorDummy#patchOrCreateWithWhere
             * @methodOf lbServices.AdvisorDummy
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `AdvisorDummy` object.)
             * </em>
             */
        R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

            /**
             * @ngdoc method
             * @name lbServices.AdvisorDummy#update
             * @methodOf lbServices.AdvisorDummy
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.AdvisorDummy#destroyById
             * @methodOf lbServices.AdvisorDummy
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `AdvisorDummy` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.AdvisorDummy#removeById
             * @methodOf lbServices.AdvisorDummy
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `AdvisorDummy` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.AdvisorDummy#patchAttributes
             * @methodOf lbServices.AdvisorDummy
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `AdvisorDummy` object.)
             * </em>
             */
        R["patchAttributes"] = R["prototype$updateAttributes"];


        /**
        * @ngdoc property
        * @name lbServices.AdvisorDummy#modelName
        * @propertyOf lbServices.AdvisorDummy
        * @description
        * The name of the model represented by this $resource,
        * i.e. `AdvisorDummy`.
        */
        R.modelName = "AdvisorDummy";



        return R;
      }]);


  module
  .factory('LoopBackAuth', function() {
    var props = ['accessTokenId', 'currentUserId', 'rememberMe'];
    var propsPrefix = '$LoopBack$';

    function LoopBackAuth() {
      var self = this;
      props.forEach(function(name) {
        self[name] = load(name);
      });
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.save = function() {
      var self = this;
      var storage = this.rememberMe ? localStorage : sessionStorage;
      props.forEach(function(name) {
        save(storage, name, self[name]);
      });
    };

    LoopBackAuth.prototype.setUser = function(accessTokenId, userId, userData) {
      this.accessTokenId = accessTokenId;
      this.currentUserId = userId;
      this.currentUserData = userData;
    };

    LoopBackAuth.prototype.clearUser = function() {
      this.accessTokenId = null;
      this.currentUserId = null;
      this.currentUserData = null;
    };

    LoopBackAuth.prototype.clearStorage = function() {
      props.forEach(function(name) {
        save(sessionStorage, name, null);
        save(localStorage, name, null);
      });
    };

    return new LoopBackAuth();

    // Note: LocalStorage converts the value to string
    // We are using empty string as a marker for null/undefined values.
    function save(storage, name, value) {
      try {
        var key = propsPrefix + name;
        if (value == null) value = '';
        storage[key] = value;
      } catch (err) {
        console.log('Cannot access local/session storage:', err);
      }
    }

    function load(name) {
      var key = propsPrefix + name;
      return localStorage[key] || sessionStorage[key] || null;
    }
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
  }])
  .factory('LoopBackAuthRequestInterceptor', ['$q', 'LoopBackAuth',
    function($q, LoopBackAuth) {
      return {
        'request': function(config) {
          // filter out external requests
          var host = getHost(config.url);
          if (host && host !== urlBaseHost) {
            return config;
          }

          if (LoopBackAuth.accessTokenId) {
            config.headers[authHeader] = LoopBackAuth.accessTokenId;
          } else if (config.__isGetCurrentUser__) {
            // Return a stub 401 error for User.getCurrent() when
            // there is no user logged in
            var res = {
              body: { error: { status: 401 }},
              status: 401,
              config: config,
              headers: function() { return undefined; },
            };
            return $q.reject(res);
          }
          return config || $q.when(config);
        },
      };
    }])

  /**
   * @ngdoc object
   * @name lbServices.LoopBackResourceProvider
   * @header lbServices.LoopBackResourceProvider
   * @description
   * Use `LoopBackResourceProvider` to change the global configuration
   * settings used by all models. Note that the provider is available
   * to Configuration Blocks only, see
   * {@link https://docs.angularjs.org/guide/module#module-loading-dependencies Module Loading & Dependencies}
   * for more details.
   *
   * ## Example
   *
   * ```js
   * angular.module('app')
   *  .config(function(LoopBackResourceProvider) {
   *     LoopBackResourceProvider.setAuthHeader('X-Access-Token');
   *  });
   * ```
   */
  .provider('LoopBackResource', function LoopBackResourceProvider() {
    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setAuthHeader
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} header The header name to use, e.g. `X-Access-Token`
     * @description
     * Configure the REST transport to use a different header for sending
     * the authentication token. It is sent in the `Authorization` header
     * by default.
     */
    this.setAuthHeader = function(header) {
      authHeader = header;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#getAuthHeader
     * @methodOf lbServices.LoopBackResourceProvider
     * @description
     * Get the header name that is used for sending the authentication token.
     */
    this.getAuthHeader = function() {
      return authHeader;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
     * @description
     * Change the URL of the REST API server. By default, the URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.setUrlBase = function(url) {
      urlBase = url;
      urlBaseHost = getHost(urlBase) || location.host;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#getUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @description
     * Get the URL of the REST API server. The URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.getUrlBase = function() {
      return urlBase;
    };

    this.$get = ['$resource', function($resource) {
      var LoopBackResource = function(url, params, actions) {
        var resource = $resource(url, params, actions);

        // Angular always calls POST on $save()
        // This hack is based on
        // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
        resource.prototype.$save = function(success, error) {
          // Fortunately, LoopBack provides a convenient `upsert` method
          // that exactly fits our needs.
          var result = resource.upsert.call(this, {}, this, success, error);
          return result.$promise || result;
        };
        return resource;
      };

      LoopBackResource.getUrlBase = function() {
        return urlBase;
      };

      LoopBackResource.getAuthHeader = function() {
        return authHeader;
      };

      return LoopBackResource;
    }];
  });
})(window, window.angular);
