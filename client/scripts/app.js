var groups = [];
var numOfTeams = 0;

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function appendPeople(array) {
    while(array.length > 0) {
        for(var i = 0; i < numOfTeams; i++) {
            if(array.length > 0) {
                $("div[data-index=" + (i + 1) + "]").append("<li class='randomList list-group-item list-group-item-success'>" + array.shift() + "</li>");
                $("div[data-index=" + (i + 1) + "] li").last().hide().delay(300 * i).fadeIn(3000);
            }
        }
    }
}


$(document).ready(function () {

    for(var i = 2; i <= 11; i++) {
        var $button = $('<button class="numberButton" data-index=' + i + '>' + i  + '</button>');
        //$button.data('index', i);
        console.log($button);
        $('.buttons').append($button);
    }
        $('.buttons').append('</br><button class="assignButton">Generate Groups</button>');

    $('body').on('click', '.numberButton', function(){
        numOfTeams = $(this).data('index');
        $('.numberButton').addClass('glow');
        console.log(numOfTeams);
        return numOfTeams;
    });

    $('body').on('click', '.assignButton', function(){
        var random = Math.floor(Math.random()* groups.length);
        var numPerTeam = parseInt(groups.length / numOfTeams);
        console.log(numPerTeam);

        for(var i = 1; i <= numOfTeams; i++){
            $('.randomGroups').append('<div class="group col-md-3 col-lg-3" data-index=' + i + '>' + '<h2>Group ' + i + '</h2></div>');
        }
            shuffle(groups);
            appendPeople(groups);

    });

    $.ajax({
        type: "GET",
        url: "/data",
        success: function(data){
            console.log(data);
            $.each(data, function(){
                groups.push(this.name);
            });
            console.log(groups);
        }
    });
});