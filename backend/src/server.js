const express = require('express');
import { MongoClient } from 'mongodb';
const app = express();
app.use(express.json());

const articleInfo = {
    'learn-react': { upvotes: 0, comments: [] },
    'learn-node': { upvotes: 0, comments: [] },
    'my-thoughts-on-resume': { upvotes: 0, comments: [] },
};

const startServer = async () => {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('react-blog');


    app.get('/api/articles/:name', async (req, res) => {

        const { name } = req.params;
        //  const {paraName} = req.query;
        const info = await db.collection('articles').findOne({ name });
        // const info = articleInfo[name];
        if (info) {
            res.json(info);
        }
        else {
            res.sendStatus(404);
        }
    });

    app.post('/api/articles/:name/upvotes', async (req, res) => {

        const { name } = req.params;

        await db.collection('articles').updateOne(
            { name },
            { $inc: { upvotes: 1 } },
        )

        const updatedArticleInfo = await db.collection('articles').findOne({ name });
        res.send(updatedArticleInfo);
        // articleInfo[name].upvotes += 1;
        // res.send(articleInfo[name]);
    });

    app.post('/api/articles/:name/comments', async(req, res) => {
        const { text, postedBy } = req.body;
        const { name } = req.params;
        // articleInfo[name].comments.push({ text, postedBy });
        await db.collection('articles').updateOne(
            {name},
            { $push: { comments: {text,postedBy} } },
        )

        const updatedArticleInfo = await db.collection('articles').findOne({name});
        // res.send(articleInfo[name].comments);
        res.send(updatedArticleInfo);

    });
    app.listen(8000, () => console.log("listieong at 8000"));
}

startServer();



// app.listen(8000, () => console.log("listieong at 8000"));
