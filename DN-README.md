# Code Challenge

### E-Commerce Shopping...kind of

## To Run Application

- yarn install
- npm start
- navigate to http://localhost:3000/GetMany
- start shopping for nonsense?

## Coding Standards

- Clean code is the foundation to a maintainable and scalable codebase. I enjoy writing simple, human readable code that does not require too many comments.

- Per the instructions, focused mainly on creating 2 endpoints on the server, and also focusing on the filter/sorting logic on the product.html page. I found that there was little, if any need, to provide filtering abilities to the product-detail.html page given the JSON data we are consuming, offered no features that could tie into this page (size, color, etc.)

- I opted to go with Handlebars and serving up templated HTML for the following reasons:
  1. During our conversation you talked a lot about automating tasks...Handlebars offered a great option to have it automate placing the JSON data as needed.

  2. I thought about doing a React App for the front-end, but given the role is specifically for a Javascript developer, I felt you wanted to see knowledge of DOM manipulation by serving up templated HTML and doing the rest on the front end (afterall, that is what makes Javascript as powerful as it is).

- Server logic
  - Typically prefer to take the approach, depending on the backend design, of creating routers, and controllers specific to various endpoints. Since this only called for 2, pulling from the same data, opted to simply create one dataController to feed and return the responses to the front end. 
  - As mentioned in the comments, opted to cache the image number from the first time the server made a call to the JSONdata, and then following made a call to get each item's image. Felt this was a necessity to ensure the consistency across the user experience. Please note, that this cache is not persistent so will reset images with a restart to the server. 


## Misc.
- Consolidated the assets into the public folder to handle the requests accordingly. 
- Took the approach of functional programming, of building out functions that do one thing and do them well. 
- Could have gone more in-depth on other functionality (showing divs, etc.), but based on our converation of not spending too much time, and more importantly following the tasks being asked (filtering logic) opted to submit the code that is included. 


