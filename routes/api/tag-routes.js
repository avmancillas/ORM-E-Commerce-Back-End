const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags
  // be sure to include its associated Product data

router.get('/', async (req, res) => {
  try {
  
  const tagData = await Tag.findAll({
    include:{
      model:Product,
      attributes:['product_name','price','stock','category_id']
    }
  })
  res.status(200).json(tagData)
  }catch(err){
    res.status(500).json(err);
  }
});
// find a single tag by its `id`
  // be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try {
  
  const tagData = await Tag.findByPk(req.params.id,{
    
    include:{
      model:Product,
      attributes:['product_name','price','stock','category_id']
    }
  })
  res.status(200).json(tagData)
  }catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try{
  // create a new tag
  const tagData = await Tag.create({
    tag_name:req.body.tag_name
  })
  res.status(200).json(tagData)
  }catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try{
  // update a tag's name by its `id` value
  const tagData = await Tag.update(req.body,{
    where:{
      id: req.params.id
    },
   
  })
  res.status(200).json(tagData)
  }catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try{
  // delete on tag by its `id` value
  const tagData = await Tag.destroy({
    where:{
      id: req.params.id
    }
    
   
  })
  res.status(200).json(tagData)
  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
