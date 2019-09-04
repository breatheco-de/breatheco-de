var ghpages = require('gh-pages');
var Console = require('bc-console');

ghpages.publish('public', function(err) {
    if(err){
        console.error(err);
        Console.error("There was an error publishing your website");
        return;
    } 
    //https://<github_user>.github.io/<repository-name>
    Console.success(`Your website has been deployed successfully`);
});