window.onload = function () {
  // ### makes querySelector easier to use ###
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) =>
    context.querySelectorAll(selector);

  // ### Product Page Header Updates ###
  const productPageHeader = $('h2');
  const productPageSubHeader = $('h2 + p');
  const categories = $$('.p-t-4 > a.s-text13');

  // all inputs
  const inputs = $$('input');

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

  // ### Event Listeners for Filter Options
  inputs.forEach((filterInput) =>
    filterInput.addEventListener('change', function inputChange(e) {
      const inputType = e.target.type;
      console.log('what type am i?', inputType);
      console.log('what is my value', e.target.value);
      switch (inputType) {
        case 'range':
          console.log('i am a range');
          break;
        case 'text':
          console.log('i am text');
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
      console.log('what am i sorting for', sortValue);
      switch (sortValue) {
        case 'Price: low to high':
          console.log('sorting price low to high');
          break;
        case 'Price: high to low':
          console.log('sorting price high to low');
          break;
        case '$0.00 - $50.00':
        case '$50.00 - $100.00':
        case '$100.00 - $150.00':
        case '$150.00 - $200.00':
        case '$200.00+':
          console.log('sorting by price');
          break;
        case 'Popularity':
        case 'Price':
        case 'Default Sorting':
          // not really option to sort by popularity in the JSON Data, so opting
          // to return the original list
          console.log('return original list');
          break;
        default:
          console.log('return original list');
      }
    })
  );

  // ### Event Listener to Change Category and Header
  categories.forEach((cat) =>
    cat.addEventListener('click', function updateHeader(e) {
      console.log('Changing the header');
      const titleChange = e.target.innerText;
      const all = `See ${titleChange} Our New Arrivals In The 2020 Collection!`;
      const others = `New Arrivals ${titleChange} Collection 2020`;
      productPageHeader.innerHTML = titleChange;

      titleChange === 'All'
        ? (productPageSubHeader.innerHTML = all)
        : (productPageSubHeader.innerHTML = others);
    })
  );
};
