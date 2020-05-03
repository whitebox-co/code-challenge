const Handlebars = require('handlebars');
const fetch = require('node-fetch');
const {
  retrieveOne,
  retrieveItems,
  retrieveOthers,
} = require('./../utils/cache');
const allItemsPage = require('./../templates/product.html.js');
const oneItemPage = require('./../templates/product-detail.html.js');
const JSONitemsURL = 'https://next.json-generator.com/api/json/get/EkzBIUWNL';

const getMany = async (req, res, next) => {
  try {
    const response = await fetch(JSONitemsURL);
    const initialItems = await response.json();
    const items = await Promise.all(
      initialItems.map((item) => retrieveItems(item))
    );
    const inputs = { items };
    const itemsTemplate = Handlebars.compile(allItemsPage);
    const rendered = itemsTemplate(inputs);
    return res.status(200).send(rendered);
  } catch (e) {
    console.error('Error grabbing multiple items');
    return next(e);
  }
};

const getSingle = (req, res) => {
  const { guid } = req.params;
  const selectedItem = retrieveOne(guid);
  const relatedItems = retrieveOthers(selectedItem);
  const inputs = { selectedItem, relatedItems };
  const itemAndOthersTemplate = Handlebars.compile(oneItemPage);
  const rendered = itemAndOthersTemplate(inputs);
  return res.status(200).send(rendered);
};

const dataController = {
  getSingle,
  getMany,
};

module.exports = dataController;
