var animals = ["Dog", "Cat", "Bird"];

var animal = $(this).attr("animals");

function clickHandler(event) {

  var animal = $(this).text()
  getGif(animal)


}

function addButton(animal) {

  var newButton = $("<button>");
  // Adding a class of movie-btn to our button
  newButton.addClass("movie-btn");
  // Adding a data-attribute
  newButton.attr("data-name", animal);
  // Providing the initial button text
  newButton.text(animal);
  // Adding the button to the buttons-view div
  $("#buttons-view").append(newButton);

  newButton.on("click", clickHandler)

}

$("#add-animal").on("click", function (event) {
  event.preventDefault();

  console.log("haha")
  // This line grabs the input from the textbox
  var animal = $("#animal-input").val().trim();

  // Adding movie from the textbox to our array
  animals.push(animal);

  addButton (animal) 


});


animals.forEach(addButton);

function getGif(animal) {

  // Constructing a queryURL using the animal name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";


  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After data comes back from the request
    .then(function (response) {
      console.log(queryURL);

      var results = response.data;
      console.log(results);

      for (var i = 0; i < results.length; i++) {

        var animalDiv = $("<div>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var animalImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        animalImage.attr("src", results[i].images.fixed_height.url);

        // Appending the paragraph and image tag to the animalDiv
        animalDiv.append(p);
        animalDiv.append(animalImage);

        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $("#gifs-appear-here").prepend(animalDiv);

      }


    })

}