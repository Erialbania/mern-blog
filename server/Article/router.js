const express = require("express");
const router = express.Router();
const Article = require("./article.model");

router.get("/:articleId", (request, response) => {
  Article.findById(request.params.articleId, (error, article) => {
    if (error) {
      console.log(error);
      response.status(400).json(error);
    } else {
      if (!article) {
        response.sendStatus(410);
      } else {
        response.status(200).json(article);
      }
    }
  });
});

router.post("/", (request, response) => {
  const article = new Article(request.body);
  article
    .save()
    .then(() => response.json(article))
    .catch((e) => console.log(e));
});

module.exports = router;
