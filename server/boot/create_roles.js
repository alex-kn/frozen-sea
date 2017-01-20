/**
 * Created by Mathis on 16.01.2017.
 */

/**
module.exports = function(app) {
    var User = app.models.Subuser;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;

    //Make someone an admin
    Role.findOne({"name":"admin"}, function(err, adminRole){
        adminRole.principals.create({
            principalType: RoleMapping.USER,
            principalId: "587d04b244a58fec2404aff7" //Mathis
        }, function(err, principal) {
            if (err) throw err;
            console.log('Created principal:', principal);
        });
    });


};
*/