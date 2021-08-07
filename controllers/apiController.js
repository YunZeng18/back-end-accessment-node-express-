const axios = require('axios');
const api = require('../models/apiModels');

function ping(_req, res) {
    res.status(200).json({ success: true });
}

//query with wrong fields names, null values are invalid.
async function getPosts(req, res) {
    if (!req.query.tags) res.status(400).json({ error: "Tags parameter is required" });
    else {

        const sortCriterias = ['id', 'reads', 'likes', 'popularity'],
            sortOrders = ['asc', 'desc'];
        let tags = [];
        req.query.tags.split(',').forEach(item => item ? tags.push(item) : undefined);

        let posts = await api.getByTags(tags);//default sorted by id and asc

        //***sort posts base on query***//
        if (!sortCriterias.includes(req.query.sortBy) && req.query.sortBy != undefined) {
            res.status(400).json({ error: "sortBy parameter is invalid" });
            return;//skip the last line res.json({ posts: posts });
        }

        else if (!sortOrders.includes(req.query.direction) && req.query.direction != undefined) {
            res.status(400).json({ error: "direction parameter is invalid" });
            return;//skip the last line res.json({ posts: posts });
        }

        else if (sortCriterias.includes(req.query.sortBy) && sortOrders.includes(req.query.direction)) {

            switch (req.query.direction) {
                case 'asc':
                    posts.sort((a, b) => a[req.query.sortBy] - b[req.query.sortBy]);
                    break;
                case 'desc':
                    posts.sort((a, b) => b[req.query.sortBy] - a[req.query.sortBy]);
                    break;
                default:
                    posts.sort((a, b) => a[req.query.sortBy] - b[req.query.sortBy])
                    break;
            }
        }
        else if (sortCriterias.includes(req.query.sortBy))
            posts.sort((a, b) => a[req.query.sortBy] - b[req.query.sortBy]);

        else if (sortOrders.includes(req.query.direction)) {
            switch (req.query.direction) {
                case 'asc':
                    posts.sort((a, b) => a.id - b.id);
                    break;
                case 'desc':
                    posts.sort((a, b) => b.id - a.id);
                    break;
                default:
                    posts.sort((a, b) => a.id - b.id);
                    break;
            }
        }
        /*end of posts  sort logic */


        res.json({ posts: posts });
    }

}




module.exports = {
    ping, getPosts
}