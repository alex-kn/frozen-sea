'use strict';


module.exports = function(Study) {


    Study.observe('before save', function checkAdvisorRights(ctx, next) {

        if(ctx.data) {
            if(ctx.data.approved == true) {

                //Check if admin, else reject change
                //console.log(ctx.req.accessToken.userId);
                //var Subuser = loopback.getModel('Subuser');
                //Subuser.getUsersByRole({id: userId, role:"advisor"});


            }
        }
        next();
    });
};
