const fs = require("fs"); // need filesystem to read myTodos.json and write on it
const rawData = fs.readFileSync("myTodos.json"); // this will give the myTodos(in a Buffer)
const myTodos = JSON.parse(rawData); // this will change bufferdata to ASCII text(javascript can read)
const path = process.argv[2] || "myTodos.json";
const readline = require("readline"); // add readline module
const rl = readline.createInterface({
  // creates interface
  // The output stream is used to print prompts for user input that arrives on,
  // and is read from, the input stream.
  input: process.stdin, // gives single input readable stream
  output: process.stdout // gives single output writable stream
  // in node >.load todoCLI.js it will prevent double typing h -> hh(x)
});

const toDoMenu = options => {
  const caseIgnoreOptions = options.toLowerCase(); // incase of user input is in capital letter
  // (v) View
  // View function will show the List which contains all the todos
  // if list is empty it will mention user that the list is empty
  // if list isn't empty it will show the list in format:
  // index [ ] title
  // if completed: true will be [✓] if false will be [ ]
  if (caseIgnoreOptions === "v") {
    console.log(""); // added to make \n btw
    if (myTodos.length === 0) {
      console.log("\nList is empty...");
      // to comeout from the rl.question added toDoMenu as a callback
      rl.question(
        "\n(v) View • (n) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit\n>",
        toDoMenu
      );
    } else {
      // if list is not empty
      for (let i = 0; i < myTodos.length; i++) {
        // for all element in myTodos.json array(loaded as myTodos)
        if (myTodos[i].completed === true) {
          // if completed: true
          console.log(`${i} [✓] ${myTodos[i].title}`);
        } else {
          // if completed: false
          console.log(`${i} [ ] ${myTodos[i].title}`);
        }
      }
    }
    rl.question(
      "\n(v) View • (n) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit\n>",
      toDoMenu
    );

    // (n) New
    // New function will add a new todo to the List
    // will be added as an object in the array
    // myTodos = [{completed: , title: }]
  } else if (caseIgnoreOptions === "n") {
    rl.question("\nWhat\n>", todo => {
      myTodos.push({
        completed: false, // when add todo its added as incompleted
        title: todo // User input for What? will go into here
      });
      rl.question(
        "\n(v) View • (n) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit\n>",
        toDoMenu
      );
    });

    // (cX) Complete
    // Complete will change completed: false => completed: true
    // if it is already marked as completed: true will change to completed: false which is incomplete
    // to receive input cX(c + number of index from the List)
    // caseIgnoreOptions.slice = "X"
    // parseInt(caseIgnoreOptions.slice(1)) = X
    // if X is only composed with integer "X" == X
    // if not parseInt value will be different and send it to invalid input statement
  } else if (
    caseIgnoreOptions.length > 1 &&
    caseIgnoreOptions[0] === "c" &&
    caseIgnoreOptions.slice(1) == parseInt(caseIgnoreOptions.slice(1))
  ) {
    const X = parseInt(caseIgnoreOptions.slice(1));
    if (X < myTodos.length && myTodos[X].completed === false) {
      // if incompleted
      myTodos[X].completed = true; // change to completed
      console.log(`\nCompleted "${myTodos[X].title}"`);
    } else if (X < myTodos.length && myTodos[X].completed === true) {
      // if completed
      myTodos[X].completed = false; // change to incompleted
      console.log(`\nIncompleted "${myTodos[X].title}"`);
    } else {
      // if X is not in the index of myTodos
      console.log(`\nEnd Index of Your TodoList is ${myTodos.length - 1}`);
    }
    rl.question(
      "\n(v) View • (n) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit\n>",
      toDoMenu
    );

    // (dX) Delete
    // Delete will have similar concept with Complete
    // but it will delete the todo from the list
  } else if (
    caseIgnoreOptions.length > 1 &&
    caseIgnoreOptions[0] === "d" &&
    caseIgnoreOptions.slice(1) == parseInt(caseIgnoreOptions.slice(1))
  ) {
    const X = parseInt(caseIgnoreOptions.slice(1));
    if (X < myTodos.length && myTodos) {
      console.log(`\nDeleted "${myTodos[X].title}"`);
      myTodos.splice(X, 1); // will delete index of X from the list
    } else if (myTodos.length === 0) {
      console.log("\nList is empty..."); // if the list is empty it will
    } else {
      console.log(`\nEnd Index of Your TodoList is ${myTodos.length - 1}`); // if X is not in the index of myTodos
    }
    rl.question(
      "\n(v) View • (n) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit\n>",
      toDoMenu
    );

    // (s) Save
    // Save function will have 2 options
    // if the path is not given it will save to myTodos.json
    // if the path is given it will save to that path
  } else if (caseIgnoreOptions === "s") {
    if (path === "myTodos.json") {
      // default setting
      rl.question("\nWhere?\n>", () => {
        fs.writeFileSync(path, JSON.stringify(myTodos));
        console.log(`\nList saved to myTodos.json`);
        rl.question(
          "\n(v) View • (n) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit\n>",
          toDoMenu
        );
      });
      rl.write("myTodos.json"); // will autofill to show the directory
    } else {
      // if the path is given
      rl.question(`\nWhere? (${path})\n>`, function(input) {
        input = input || path;
        fs.writeFileSync(path, JSON.stringify(myTodos));
        console.log(`\nList saved to ${input}`);
        rl.question(
          "\n(v) View • (n) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit\n>",
          toDoMenu
        );
      });
    }

    // (q) Quit
    // Quit function will close the todoCLI.js with greeting message
  } else if (caseIgnoreOptions === "q") {
    console.log("See you soon! 😄");
    rl.close();

    // if user input is rather than the given command
    // todoCLI.js will mention user command + todo bar
    // so user can see the mistake they made
  } else {
    rl.question(
      `\nYour command "${options}" is not valid\n(v) View • (n) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit\n>`,
      toDoMenu
    );
  }
};

// This will initiate todoCLI.js
rl.question(
  "\nWelcome to Todo CLI!\n--------------------\n(v) View • (n) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit\n>",
  toDoMenu
);
