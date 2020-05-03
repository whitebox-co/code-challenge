window.onload = function () {
  // ### makes querySelector easier to use ###
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) =>
    context.querySelectorAll(selector);

  // ### Product Page Header Updates ###
  const productPageHeader = $('h2');
  const productPageSubHeader = $('h2 + p');
  const categories = $$('.p-t-4 > a.s-text13');

  // ### Item Related
  const itemListContainer = $('div.row div.row');
  const itemsShowing = $('div.flex-w > span');
  let allListNodes = [];

  // all filter inputs
  const inputs = $$('input');

  // ### Price Filter Specific
  const lowerRange = $('#value-lower');
  const upperRange = $('#value-upper');
  const priceFilterButton = $('.w-size11 > button');

  // all sortingOptions
  const sortingOptions = $$('[name="sorting"]');

  // color sorting (if applicable?)
  const colorsSelected = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
  };

  // ### Function that removes list items to re-append on filter/sort
  function updateList(list) {
    const length = list.length;
    const itemsShown = `Showing 1 - ${length} of ${length} results`;
    const noResults = `Showing 0 - 0 of 0 results`;
    itemListContainer.innerHTML = null;
    list.forEach((item) => itemListContainer.append(item));
    itemsShowing.innerHTML = list.length ? itemsShown : noResults;
  }

  function filterByName(str) {
    const allNodes = allListNodes.map((node) => node.cloneNode(true));
    const itemsMatchingSearch = [];
    allListNodes.forEach((item) => {
      const name = item
        .querySelector('.block2-name')
        .innerText.trim()
        .toLowerCase();
      if (name.indexOf(str.toLowerCase()) !== -1) {
        itemsMatchingSearch.push(item);
      }
    });
    updateList(itemsMatchingSearch);
    allListNodes = allNodes;
  }

  function priceFilter(e = null, lower = null, upper = null) {
    const allNodes = allListNodes.map((node) => node.cloneNode(true));
    const upperCost = e === null ? upper : +upperRange.innerText;
    const lowerCost = e === null ? lower : +lowerRange.innerText;

    const itemsInRange = [];

    allListNodes.forEach((item) => {
      const price = +item.querySelector('span').innerText.trim().slice(2);
      if (lowerCost <= price && upperCost >= price) {
        itemsInRange.push(item);
      }
    });
    updateList(itemsInRange);
    allListNodes = allNodes;
  }

  function grabPricesFromString(str) {
    return str.split('-').map((num) => +num.trim().slice(1));
  }

  // ### Event Listeners for Filter Options
  inputs.forEach((filterInput) =>
    filterInput.addEventListener('change', function inputChange(e) {
      const inputType = e.target.type;
      switch (inputType) {
        case 'range':
          // creates a $20 range for the side filter option
          const lower = e.target.value * 2;
          const upper = lower + 20;
          lowerRange.innerHTML = lower;
          upperRange.innerHTML = upper;
          break;
        case 'text':
          filterByName(e.target.value);
          e.target.value = '';
          break;
        case 'checkbox':
          const last = e.target.name.length - 1;
          const colorNum = +e.target.name[last];
          colorsSelected[colorNum]
            ? (colorsSelected[colorNum] = false)
            : (colorsSelected[colorNum] = true);
          break;
        default:
          console.error('Unexpected input type');
      }
    })
  );

  // ### Event Listeners for Sorting Options
  sortingOptions.forEach((option) =>
    option.addEventListener('change', function sortingChange(e) {
      const sortValue = e.target.value;
      let itemList = [...allListNodes];

      switch (sortValue) {
        case 'Price: low to high':
          itemList = itemList.sort(function (a, b) {
            const costA = +a.querySelector('span').innerText.slice(2);
            const costB = +b.querySelector('span').innerText.slice(2);
            return costA - costB;
          });
          updateList(itemList);
          break;
        case 'Price: high to low':
          itemList = itemList.sort(function (a, b) {
            const costA = +a.querySelector('span').innerText.slice(2);
            const costB = +b.querySelector('span').innerText.slice(2);
            return costB - costA;
          });
          updateList(itemList);
          break;
        case '$0.00 - $50.00':
        case '$50.00 - $100.00':
        case '$100.00 - $150.00':
        case '$150.00 - $200.00':
        case '$200.00+':
          const ranges = grabPricesFromString(sortValue);
          priceFilter(null, ranges[0], ranges[1]);
          break;
        case 'Popularity':
        case 'Price':
        case 'Default Sorting':
          // not really option to sort by popularity in the JSON Data, so opting
          // to return the original list
          updateList(allListNodes);
          break;
        default:
          updateList(allListNodes);
      }
    })
  );

  // ### Event Listener to Change Category and Header
  categories.forEach((cat) =>
    cat.addEventListener('click', function updateHeader(e) {
      const titleChange = e.target.innerText;
      const all = `See ${titleChange} Our New Arrivals In The 2020 Collection!`;
      const others = `New Arrivals ${titleChange} Collection 2020`;
      productPageHeader.innerHTML = titleChange;

      titleChange === 'All'
        ? (productPageSubHeader.innerHTML = all)
        : (productPageSubHeader.innerHTML = others);
    })
  );

  // ###  filtering by price range ###
  priceFilterButton.addEventListener('click', priceFilter);

  // build list of nodes that can be reused without making server call
  function buildNodeListArray() {
    Array.from(itemListContainer.children).forEach((child) =>
      allListNodes.push(child)
    );
  }
  buildNodeListArray();
};
