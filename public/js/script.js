
//alert('js file found');

//Generate a random image for the user card for each round

var marvelImg = ["captaina.jpg","captainm.jpg","spiderman.jpg","hulk.jpg","ironman.jpg","thor.jpg", "blackwidow.jpg", "drstrange.jpg", "wanda.jpg", "gamora.jpg", "quill.jpg", "fury.jpg"];
var startGame = document.getElementById("getCard")

startGame.addEventListener("click", getCard);
function getCard(){
    var random = Math.random() * (marvelImg.length);
    random = Math.floor(random);
    document.getElementById("card").innerHTML = "<h3> Your card is: </h3> <img src='/images/"+marvelImg[random]+"'/>";

}

//Display all card options to each user
var i;
for(i=0; i< marvelImg.length; i++){
    document.getElementById("displayAllCards").innerHTML += "<img class='marvelImg'src='/images/"+marvelImg[i]+"'/>";

}

// Hide an image when a user clicks on it
var marvelArray = document.getElementsByClassName('marvelImg');
for (i=0; i < marvelArray.length; i++){

    marvelArray[i].addEventListener("click", function(){
      this.classList.add("hide");
    })

}



var username = "Anonymous";
$(function(){
	var socket = io();

	//==== EVENT LISTENERS ====
	// Login Listener
	$('#usernamebtn').click(function(){
		socket.emit('add username', $('#username').val());
		username = $('#username').val(); // Need to set the username here in order to use it later down.
	});

	//Send Message Listener

	$('form').submit(function(e){
		e.preventDefault();
		var sendValues = {};
		// create an object to send multiple values
		sendValues.user = username;
		sendValues.message = $('#txt_msg').val();
		socket.emit('send msg', sendValues);
		$('#txt_msg').val('');
		return false;
	});

	// End Chat Listener
	$('#quitbtn').click(function(){
		socket.emit('end chat', username);
		$('#username').val("YOU HAVE LEFT THE CHAT");
		socket.disconnect();
	});

  //End Game Listener
  $('#youwin').click(function(){
    var sendValues = {};
    sendValues.user = username;
		sendValues.message = 'You guessed right, you won';
    socket.emit('you win', sendValues);
    $('#winner').val("The other user guessed right first! They won the game.")
  });

  //New Game Listener
  $('#getCard').click(function(){
    var empty = "";
    socket.emit('new game', empty);
  });


	//SOCKET LISTENERS

	// Add new users the the users ul
	socket.on('add username', function(usernm){

		$('#users-list').append($('<li>').text(usernm));

	});

// Add new message to the chat
	socket.on('send msg', function(values){

		var usermsg = values.user + " said: " + values.message;
		$('#messages').append($('<li>').text(usermsg));
		return false;
	});

  //send winner message
  socket.on('you win', function(winner){

    var winmsg = winner.user + " said: " + winner.message;

    $('#messages').append($('<li>').text(winmsg));

    return false;
  });

  //clear messages for new game
  socket.on('new game', function(empty){
    $('#messages').html("");
    $('#winner').val("");
    return false;
  })

//disconnect from chat
	socket.on('end chat', function(enduser){
		var leftchat = enduser + " has left the chat";
		$('#users').append($('<li>').text(leftchat));
	});






});// end iffe
