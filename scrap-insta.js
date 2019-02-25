/**
 * @description Scrap Instagram
 */
const casper = require("casper").create();

/* Update it show more/less posts of web */
const MAX_SHOW_POSTS = 6;

function populateFollowerStats (metas, data) {
    for (index = 0; index < metas.length; index++) {
        const element = metas[index];
        if (element.attributes.name === 'description') {
            const regex = /(.*)Followers(.*)(\d*)Following/gm;
            const str = element.attributes.content
            var matches;

            while ((matches = regex.exec(str)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (matches.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
                
                // The result can be accessed through the `m`-variable.
                matches.forEach(function (match, groupIndex) {
                    if (groupIndex === 1) {
                        data.followerCount = match.trim().replace(',', '')
                    }
                    if (groupIndex === 2) {
                        data.followingCount = match.trim().replace(',', '')
                    }
                });
            }
        }
    }
}

function getPostId (input) {
    const regex = /p\/(.*)\//gm;
    var matches;
    var result = null;
    while ((matches = regex.exec(input)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (matches.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        
        // The result can be accessed through the `m`-variable.
        matches.forEach(function (match, groupIndex) {
            if (groupIndex === 1) {
                result = match;
            }
        });
    }
    return result;
}
casper.start(casper.cli.args[0], function() {
    const data = {
        name: this.fetchText(".rhpdm"),
        description: this.fetchText(".-vDIg span"),
        posts: []
    }
    const metas = this.getElementsInfo('meta');
    populateFollowerStats(metas, data) // Add follower counts in return object
    
    /* Every row contains 3 posts, so for 6 posts scrap on;y 2 rows */
    const articles = this.getElementsInfo('article div div div div.v1Nh3').slice(0, MAX_SHOW_POSTS); 
    var links = [];    
    for (index = 0; index < articles.length; index++) {
        const element = articles[index];
        const regex = /<a href="(.*)"><div class="eLAPa"/gm
        const str = element.html;
        var matches;
        while ((matches = regex.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (matches.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            
            matches.forEach(function (match, groupIndex) {
                if (groupIndex === 1) {
                    links.push('https://instagram.com' + match)
                }
            });
        }
    }
    /**
     * Iterate through links of posts and fetch caption
     * Image URL is link
     * Id is already scraped from profile page above
     */
    casper.each(links, function (self, link) {
        self.thenOpen(link, function () {
            const post = {};
            post.caption = this.fetchText('title');
            post.id = getPostId(link)
            post.img_url = link;
            data.posts.push(post)
        });
    });
    casper.wait(15000, function() {
        console.log(JSON.stringify(data));
        casper.exit(); // Exit the casper and stdout the data
    });
});

casper.run();
