export default function printMe() {
  let newnode = document.createElement("LI");
  let newListItem = document.createTextNode("Water");

  let some = document.getElementById("liby");
  some.appendChild(newListItem);
  // console.log('I get called from print.js!');
  console.log('Updating print.js...')
}
