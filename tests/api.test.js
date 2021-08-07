
const supertest = require("supertest");
const createServer = require("../server");
const app = createServer.createServer();

test('GET  api/ping',
    async () => {
        await supertest(app)
            .get('/api/ping').expect(200)
            .then(res => expect(res.body.success).toBe(true))
    }
)

test('GET api/posts?tags=politics,tech',
    async () => {
        await supertest(app)
            .get('/api/posts?tags=politics,tech')
            .expect(200)
            .then(res => {
                expect(Array.isArray(res.body.posts)).toBeTruthy();
                expect(res.body.posts).toBeTruthy();
                const { id, author, authorId, likes, popularity, reads, tags } = res.body.posts[0];
                expect(id).toBeTruthy();
                expect(author).toBeTruthy();
                expect(authorId).toBeTruthy();
                expect(likes).toBeTruthy();
                expect(popularity).toBeTruthy();
                expect(reads).toBeTruthy();
                expect(Array.isArray(tags)).toBeTruthy();
                expect(id < res.body.posts[res.body.posts.length - 1].id).toBeTruthy();
            })
    }
)


test('GET api/posts?tags=politics,tech&direction=desc',
    async () => {
        await supertest(app)
            .get('/api/posts?tags=politics,tech&direction=desc')
            .expect(200)
            .then(res => {
                expect(Array.isArray(res.body.posts)).toBeTruthy();
                expect(res.body.posts).toBeTruthy();
                const { id, author, authorId, likes, popularity, reads, tags } = res.body.posts[0];
                expect(id).toBeTruthy();
                expect(author).toBeTruthy();
                expect(authorId).toBeTruthy();
                expect(likes).toBeTruthy();
                expect(popularity).toBeTruthy();
                expect(reads).toBeTruthy();
                expect(Array.isArray(tags)).toBeTruthy();
                expect(id > res.body.posts[res.body.posts.length - 1].id).toBeTruthy();
            })
    }
)
test('GET api/posts?tags=politics,tech,health&sortBy=reads',
    async () => {
        await supertest(app)
            .get('/api/posts?tags=politics,tech,health&sortBy=reads')
            .expect(200)
            .then(res => {
                expect(Array.isArray(res.body.posts)).toBeTruthy();
                expect(res.body.posts).toBeTruthy();
                const { id, author, authorId, likes, popularity, reads, tags } = res.body.posts[0];
                expect(id).toBeTruthy();
                expect(author).toBeTruthy();
                expect(authorId).toBeTruthy();
                expect(likes).toBeTruthy();
                expect(popularity).toBeTruthy();
                expect(reads).toBeTruthy();
                expect(Array.isArray(tags)).toBeTruthy();
                expect(reads < res.body.posts[res.body.posts.length - 1].reads).toBeTruthy();
            })
    }
)

test('GET api/posts?tags=politics,tech,health&direction=desc&sortBy=popularity',
    async () => {
        await supertest(app)
            .get('/api/posts?tags=politics,tech,health&direction=desc&sortBy=popularity')
            .expect(200)
            .then(res => {
                expect(Array.isArray(res.body.posts)).toBeTruthy();
                expect(res.body.posts).toBeTruthy();
                const { id, author, authorId, likes, popularity, reads, tags } = res.body.posts[0];
                expect(id).toBeTruthy();
                expect(author).toBeTruthy();
                expect(authorId).toBeTruthy();
                expect(likes).toBeTruthy();
                expect(popularity).toBeTruthy();
                expect(reads).toBeTruthy();
                expect(Array.isArray(tags)).toBeTruthy();
                expect(popularity > res.body.posts[res.body.posts.length - 1].popularity).toBeTruthy();
            })
    }
)
test('GET api/posts?tags=politics,tech,health&direction=desc&sortBy=popularity',
    async () => {
        await supertest(app)
            .get('/api/posts?tags=politics,tech,health&direction=desc&sortBy=popularity')
            .expect(200)
            .then(res => {
                expect(Array.isArray(res.body.posts)).toBeTruthy();
                expect(res.body.posts).toBeTruthy();
                const { id, author, authorId, likes, popularity, reads, tags } = res.body.posts[0];
                expect(id).toBeTruthy();
                expect(author).toBeTruthy();
                expect(authorId).toBeTruthy();
                expect(likes).toBeTruthy();
                expect(popularity).toBeTruthy();
                expect(reads).toBeTruthy();
                expect(Array.isArray(tags)).toBeTruthy();
                expect(popularity > res.body.posts[res.body.posts.length - 1].popularity).toBeTruthy();
            })
    }
)

test('GET api/posts?tags=,,politics,,,tech,,',
    async () => {
        await supertest(app)
            .get('/api/posts?tags=,,politics,,,tech,,')
            .expect(200)
            .then(res => {
                expect(Array.isArray(res.body.posts)).toBeTruthy();
                expect(res.body.posts).toBeTruthy();
                const { id, author, authorId, likes, popularity, reads, tags } = res.body.posts[0];
                expect(id).toBeTruthy();
                expect(author).toBeTruthy();
                expect(authorId).toBeTruthy();
                expect(likes).toBeTruthy();
                expect(popularity).toBeTruthy();
                expect(reads).toBeTruthy();
                expect(Array.isArray(tags)).toBeTruthy();
                expect(id < res.body.posts[res.body.posts.length - 1].id).toBeTruthy();
            })
    }
)

test('GET api/posts?rad=@!%23&ad=&tags=politics,tech,tech,random',
    async () => {
        await supertest(app)
            .get('/api/posts?rad=@!%23&ad=&tags=politics,tech,tech,random')
            .expect(200)
            .then(res => {
                expect(Array.isArray(res.body.posts)).toBeTruthy();
                expect(res.body.posts).toBeTruthy();
                const { id, author, authorId, likes, popularity, reads, tags } = res.body.posts[0];
                expect(id).toBeTruthy();
                expect(author).toBeTruthy();
                expect(authorId).toBeTruthy();
                expect(likes).toBeTruthy();
                expect(popularity).toBeTruthy();
                expect(reads).toBeTruthy();
                expect(Array.isArray(tags)).toBeTruthy();
                expect(id < res.body.posts[res.body.posts.length - 1].id).toBeTruthy();
            })
    }
)

test('GET api/posts?tags=politics,tech,health&direction=desc&sortBy=',
    async () => {
        await supertest(app)
            .get('/api/posts?tags=politics,tech,health&direction=desc&sortBy=')
            .expect(400)
            .then(res => {
                expect(res.body.error).toBeTruthy();
            })
    }
)

test('GET api/posts?tags=politics,tech,health&direction=&sortBy=',
    async () => {
        await supertest(app)
            .get('/api/posts?tags=politics,tech,health&direction=desc&sortBy=')
            .expect(400)
            .then(res => {
                expect(res.body.error).toBeTruthy();
            })
    }
)

test('GET api/posts?tags=&direction=desc&sortBy=',
    async () => {
        await supertest(app)
            .get('/api/posts?tags=&direction=desc&sortBy=')
            .expect(400)
            .then(res => {
                expect(res.body.error).toBeTruthy();
            })
    }
)

test('GET api/posts?tags=random',
    async () => {
        await supertest(app)
            .get('/api/posts?tags=random')
            .expect(200)
            .then(res => {
                expect(Array.isArray(res.body.posts)).toBeTruthy();
                expect(res.body.posts.length).toBe(0);
            })
    }
)

test('GET api/posts',
    async () => {
        await supertest(app)
            .get('/api/posts')
            .expect(400)
            .then(res => {
                expect(res.body.error).toBeTruthy();
            })
    }
)