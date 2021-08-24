Odin Project -
Using constructors to add new book entries to a library <br />
Click for [live demo](https://alexwardill.github.io/op_ibrary/)

# Learning outcomes
* Familiarity with basics of objects, defining constructor functions and methods.
* Styling a form with bootstrap.
* Familiarity with Git, developing new features in "develop", "cardDesign" branches before merging with main.
* Handling empty inputs - red styling + warning message, not rendering empty inputs.
* LocalStorage - setItem(), removeItem()

# Criticism
* Code layout feels inefficient
    * Lots of Private functions...not really sure if this is good/necessary in this case?
    * Splitting form data into an object (for passing through functions and localStorage), and HTML (for rendering and manipulating the cards) makes state management difficult. (as far as I'm aware)
    * Styling is ad hoc and not reusable or responsive, e.g location of remove button done by eyeballing it with percentages of a card (whose height is not always fixed!!!)

----

### TODO:
#### FUNCTIONALITY
* Toggling Complete/Incomplete updates localStorage. 
    * (I feel like this might might be a bit tricky with just vanilla?...or I'm just being lazy)
    * **Issue** - Toggling Complete/Incomplete only manipulates the HTML and not the state of the object it pertains to.


#### STYLE
* Side Scrolling div for Book overflow
