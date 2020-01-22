const key = "AIzaSyARwZWN09vjiNYQqNWN_nxxSoDn1BXzLtA"
var nextPage;
var prevPage;
var titulo;

function submitForm(){
    let form = $("#search");
    $(form).on('submit', (event)=>{
        event.preventDefault();
        
        
        if(!($("#titulo").val()=="")){
            titulo = $("#titulo").val();
            search(titulo, "");
            $("#titulo").val("");           
        }
    });

}

function search(title, page){
    let url = "https://www.googleapis.com/youtube/v3/search?"+"key="+key+"&q="+title+"&part=snippet&maxResults=10"+page;

            $.ajax({
                method: "GET",
                url: url,
               
                dataType: "json",
                success: function (responseJSON){
                    nextPage = responseJSON.nextPageToken;
                    prevPage = responseJSON.prevPageToken;
                    displayResults(responseJSON);
                },
                error: function(err){
                    console.log(err);
                }
            })
}


function displayResults(responseJSON){
    let results = $("#results");
    $('#b').empty();
    $(results).empty();
    for(let i=0;i<10;i++){
        let item = document.createElement('div');
        item.setAttribute('class', 'item');
        let thumb = document.createElement("img");
        thumb.setAttribute("src", responseJSON.items[i].snippet.thumbnails.default.url);
        let link = document.createElement('a');
        link.setAttribute("href", "https://www.youtube.com/watch?v="+responseJSON.items[i].id.videoId);
        link.setAttribute("target", "_blank");
        $(link).append(thumb);
        let title = document.createElement("a");
        
        $(title).text(responseJSON.items[i].snippet.title);
       
        title.setAttribute("href", "https://www.youtube.com/watch?v="+responseJSON.items[i].id.videoId);
        title.setAttribute("target", "_blank");
        $(item).append(link,title);
        $(results).append(item);
    
    }
    let next = document.createElement('button');
    next.setAttribute('id', 'next');
    let prev = document.createElement('button');
    prev.setAttribute('id', 'prev');
    $(next).text('Next');
    $(prev).text('Previous');
    $('#b').append(prev, next);
    
    console.log(responseJSON);
    
}


function move(){
    $('#b').on('click', 'button', function (event){
        if($(this).attr('id')=="next"){
            
            if(nextPage){
                search(titulo, '&pageToken='+nextPage);
            }
        }else{
            if(prevPage){
                search(titulo, '&pageToken='+prevPage);
            }
        }
    });
}

function init(){
    submitForm();
    move();
}


init();