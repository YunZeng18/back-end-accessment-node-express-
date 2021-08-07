const axios = require('axios');
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 15 });

//simple caching
function getByTag(tag) {
    if (cache.has(tag)) return cache.get(tag);

    else {
        return axios.get(`https://api.hatchways.io/assessment/blog/posts?tag=${tag}`)
            .then(success => {
                cache.set(tag, success.data);
                return success.data;
            })
            .catch(err => err);
    }
}


function binarySortedSearch(items, value) {
    if (items.length == 0) return 0;
    let firstIndex = 0,
        lastIndex = items.length - 1,
        middleIndex = Math.floor((lastIndex + firstIndex) / 2);

    while (items[middleIndex].id != value && firstIndex < lastIndex) {
        if (value < items[middleIndex].id) {
            lastIndex = middleIndex - 1;

        }
        else if (value > items[middleIndex].id) {
            firstIndex = middleIndex + 1;

        }
        middleIndex = Math.floor((lastIndex + firstIndex) / 2);

        if (middleIndex < 0) {
            middleIndex = 0;
            break;
        }
        else if (middleIndex > items.length - 1) {
            middleIndex = item.length;
            break;
        }

    }

    //edge cases
    if (items[middleIndex].id == value) {
        return -1;
    } else if (value < items[0].id) {
        return 0;
    } else if (value > items[items.length - 1].id) {
        return items.length;
    }
    else if (value > items[middleIndex].id && value < items[middleIndex + 1].id) {
        return middleIndex + 1;
    }
    else if (value < items[middleIndex].id && value > items[middleIndex - 1].id)
        return middleIndex;
}

function getByTags(tags) {
    let resultsCombined = [];
    return Promise.all(tags.map(item => getByTag(item)))
        .then(results => {
            results.forEach(item => {
                item.posts.forEach(item => {
                    const index = binarySortedSearch(resultsCombined, item.id);//return -1 if it's has the same id, otherwise return index to insert at
                    if (index != -1) {
                        resultsCombined.splice(index, 0, item);
                    }
                })
            });
            return resultsCombined;
        })
        .catch(err => console.log(err));
}

module.exports = {
    getByTag, getByTags
}