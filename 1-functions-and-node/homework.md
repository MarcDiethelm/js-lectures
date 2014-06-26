Homework
========

- Recapitulate: functions and Node.js theory.
- Finish and understand exercises from lecture.
- Build a little web server that can serve a `index.html` at `/`, `subpage.html` at `/subpage` and can serve `.css` and `.js` files from a `/assets` folder.  
  Hints:
  - Google Search is your most important skill.
  - To work with the request url you will probably need some [String functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/prototype#Methods).
  - Splitting a string into an array [`string.split()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) and then accessing parts of the array can be an easy way to get substrings.
  - One way to look if a certain text is part of a longer text is  [`string.indexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf).
 - You will have to [send the correct mime types](http://nodejs.org/api/http.html#http_response_writehead_statuscode_reasonphrase_headers).
  - Comment your code.
- Bonus exercise: try to refactor the node exercise 3: use less anonymous inline callbacks, make it flat, comment your code
