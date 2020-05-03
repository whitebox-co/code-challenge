window.onload = function () {
  // ### makes querySelector easier to use ###
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) =>
    context.querySelectorAll(selector);

  // ### Product Page Header Updates ###
  const productPageHeader = $('h2');
  const productPageSubHeader = $('h2 + p');
  const categories = $$('.p-t-4 > a.s-text13');

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
