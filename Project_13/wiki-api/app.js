const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


// Database
mongoose.connect('mongodb://localhost:27017/wikiDB');
const articleSchema = {
    title: String,
    content: String
};
const ArticleModel = mongoose.model('Article', articleSchema);


app.route('/articles')
    .get(async (req, res) => { // Get all articles
        const articles = await ArticleModel.find();
        articles.forEach(article => {
            console.log(article);
        });

        res.render('articles', articles);
    })
    .post(async (req, res) => {            // Create new article
        const title = req.body.title;
        const content = req.body.content;
    
        const newArticle = new ArticleModel({
            title,
            content
        });
    
        try {
            await newArticle.save();
    
            console.log('Article saved');
        } catch (error) {
            res.status(500).send(error);
        }
    
        res.redirect('/articles');
    })
    .delete((req, res) => {                // Article to delete
        const articlesToDelete = req.body.articlesToDelete;
    
        ArticleModel.deleteMany(
            {
                _id: { 
                    $in: articlesToDelete 
                }
            }, 
            (err) => {
                if(err) {
                    res.send(err);
                } else {
                    console.log('Deleted articles specified');
                }
        });
    });

app.router('/articles/:articleTitle')
    .get(async (req, res) => {
        const articleTitle = req.params.articleTitle;
        
        try {
            const article = await ArticleModel.findOne({title: articleTitle});
            res.render('articles', article);
        } catch (error) {
            res.render('error', error);
        }
        res.render
    })
    .delete(async (req, res) => {
        const articleTitle = req.params.articleTitle;

        try {
            await ArticleModel.deleteOne({title: articleTitle});

            res.redirect('articles');
        } catch (error) {
            res.render('error', error);
        }
    })
    .put(async (req, res) => {       // Edit existing article
        const articleTitle = req.params.articleTitle;
        const title = req.body.title;
        const articleContent = req.body.content;

        try {
            const article = await ArticleModel
                                .update(
                                    {title: articleTitle}, 
                                    {title, content: articleContent}, 
                                    {overwrite: true});

            console.log(article);
            res.redirect('articles');
        } catch (error) {
            res.render('error', error);
        }
    })
    .patch((req, res) => {
        const articleTitle = req.params.articleTitle;

        try {
            const article = await ArticleModel
                                .update(
                                    {title: articleTitle}, 
                                    {
                                        $set: req.body
                                    }, 
                                    {new: true});

            console.log(article);
            res.redirect('articles');
        } catch (error) {
            res.render('error', error);
        }
    })


let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('listening on port ' + port);
});