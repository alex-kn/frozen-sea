# Deployment
When deploying the project to a new server you need to follow these steps:  
1. Install node and npm.  
2. Perform "npm install" in the parent directory as well as in the "client" directory.  
3. If "bower install" is not performed automatically by "npm install" you need to perform this command in both folders too.  
4. Change the API URL in the *client/app/app.config.js* inside

```
LoopBackResourceProvider.setUrlBase('http://localhost:3000/api') 
```   
to the the new API URL.  
5. Edit *common/models/Subuser.js* :  
    5.1.Change the options object in the 

```
Subuser.afterRemote('create', function (context, Subuser, next))
```      
function.  
Set options.host to your hostadress (in our deployed version 'frozen-sea.herokuapp.com'):  
Set options.port to 80.  

    5.2. Change the options object in the Subuser.on('resetPasswordRequest', function (info) function: 
    
Set options.host to your hostadress (in our deployed version 'frozen-sea.herokuapp.com').  
Set options.port to 80.  

# Changing the datasource
1. You need to change the *\server\datasources.json* file to point to the new database.  
2. You need to create (e.g. copy) the following roles in the database, inside a collection named "Role":   

```json
{
    "_id": {
         "$oid": "58bc4281b4660d0d66daeb90"
    },
    "name": "advisor",
    "created": {
        "$date": "2017-03-05T16:53:21.425Z"
    },
    "modified": {
        "$date": "2017-03-05T16:53:21.425Z"
    }
}

```

AND  

```json
{
    "_id": {
        "$oid": "58bc42e50435dc1f661f62ec"
    },
    "name": "admin",
    "created": {
        "$date": "2017-03-05T16:55:00.962Z"
    },
    "modified": {
        "$date": "2017-03-05T16:55:00.962Z"
    }
}  
```

3. You need at least one admin account. First register a new account and then create a collection named "RoleMapping". Elevate the account to admin by adding

```json
 {
    "_id": {
        "$oid": "58c89db9bdc0119431742940"
    },
    "principalType": "USER",
    "principalId": "58b5be7e6efdc2e829839ac5",
    "roleId": {
        "$oid": "58bc42e50435dc1f661f62ec"
    }
}  
```
where principalId is the id of your new admin account, roldeId is the id of the role and id is a random new id for the RoleMapping instance.  
The calculation of experiment hours is tied to the Subuser, Preference and Participation objects, so all three need to be migrated if no experiment hours should be lost.
 
# Changing the website email-adresss
You need to change the *\server\datasources.json* file to point to the new email account.
Additionally you need to change all mentions of the old email in all the localization files. Best you perform a complete replace-all refactor over the whole project.

# API Reference
A complete API Reference is provided by navigating to *https://#path-to-website#/explorer*
To do so, you first you need to change *\server\component-config.json* from

```json
{
    "loopback-component-explorer": null
}  
```

 to 
 
 
```json
{
    "loopback-component-explorer": {
        "mountPath": "/explorer"
    }
} 
```
    
For retrieving experiment hours of one student, call https://#path-to-api#/Subusers/getVpsByMat/:mat    
For retrieving experiment hours of all students, call https://#path-to-api#/Subusers/getAllVps  



In the original version #path-to-website# resolves to *https://frozen-sea.herokuapp.com* and #path-to-api# to *https://frozen-sea.herokuapp.com/api*.

# Contributors
The website was designed and built by Alexander Knittel, Fabian Plett, Jan Mayer and Mathis Gales, with the help and supervision of Juliane Franze and Tobias Seitz
For more information or help, please contact: mathis.gales@gmail.com.