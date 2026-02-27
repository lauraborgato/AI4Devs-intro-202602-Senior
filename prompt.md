# chatbot utilizado

[Claude]('https://claude.ai/')

# instructions

as an expert in web development and AI, you are tasked with creating a web page with JavaScript logic that reverses the order of a string.

# example

if I input AI4Devs, it should return sveD4IA.
if I input 123, it should return 321.
if I input hello, it should return olleh.
if input is empty, button should be disabled and the result div should be empty
if input is hello, i am a test, it should return tset a ma i ,olleh.

# rules
- Te development should be done using TDD so we need to write the tests first and then the code
- for tests we need to use jest
- crate a web page that has an input text field with a min length of 3 letters
- a button with the text reverse that will be enabled once more than or equal than 3 letters are in the input field and disabled otherwise
- once the button is clicked the string should be reversed and the result should be displayed in a div with the id result
- we need to have also a copy button that will copy the result to the clipboard
- once the copy button is clicked the result should be copied to the clipboard
- the html element should be styled with tailwind css in a modern style
- the javascript code should be in a file called script.js
- we need to develop this web page using best practices and a modern approach
- we need to use good coding practices and a modern approach
- the web page should be responsive and work on all devices
- we need to also add a readme file to explain how to check the solution
- and also how to run the tests