/**
 * Created by Mathis on 16.01.2017.

module.exports = function(app) {
    var User = app.models.Subuser;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;

    User.create([
        {username: 'Horst Advisor', email: 'horst@advisor.com', password: '1337'},
    ], function(err, users) {

        //create the admin role
        Role.create({
            name: 'admin'
        }, function(err, role) {

            //make bob an admin
            role.principals.create({
                principalType: RoleMapping.USER,
                principalId: users[0].id
            }, function(err, principal) {
                console.log(principal)
            });
        });
    });

   Make someone an admin
    Role.findOne({"id":"58b80d70519f98c82286fd01"}, function(err, adminRole){
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
