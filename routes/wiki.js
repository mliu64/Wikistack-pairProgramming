const express = require("express")
const router = express.Router()
const {Page} = require("../models")
const {addPage} = require("../views")
const wikipage = require("../views/wikipage")
const main = require("../views/main")

// /wiki
router.get("/", async (req, res, next) => {
    const allPages = await Page.findAll()
    const page = main(Array.from(allPages))
    res.send(page)
})

// /wiki
router.post("/", async (req, res, next) => {
    const title = req.body.title
    const content = req.body.content
    const slug = req.body.slug
    
    try {
        
        const page = await Page.create({
            title: title,
            content: content,
            slug: slug
        })
        res.redirect(`/wiki/${page.slug}`)
    } catch(error) {next(error)}
})

// /wiki
router.get("/add", async (req, res, next) => {
    res.send(addPage())
    // try{
    // const page = await Page.create(addPage());
    // res.redirect(`/wiki/${page.slug}`);
    // } catch (error) {
    //     next(error)
    // }
})

router.get('/:slug', async (req, res, next) => {
    try {
    const slug = await Page.findOne({
        where: {
            slug:req.params.slug
        }
    })
    const page = wikipage(slug)
    res.send(page)
    } catch(error) {
        next(error)
    }
  });

module.exports = router;