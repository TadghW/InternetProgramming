const commentSection = document.getElementById("comment-section");
const comments = [];
var totalLikes = 0;

function postComment(){
    
    //troubleshooting
    console.log("FUNCTION HATH BEEN SUMMONED");

    //create a post object with username, comment, and time values
    var username = document.getElementById("inputUsername").value;
    var content = document.getElementById("inputComment").value;
    var time = Date.now();

    var post = {handle:username, comment:content, postdate:time};

    //check that the username and comment fields are populated, if they are store the comment
    //if they're not then leave
    if(username && content) {
        console.log("comment found, function appeased");
        commentSection.innerHTML = "";
        comments.push(post);
    } else {
        console.log("no data, function hath withdrawn");
        return;
    }


    //on each valid update the comment section is cleared and repopulated with up-to-date timestamps
    //and the latest comment included 
    for(let i = 0; i < comments.length; i++) {
        
        let handle = comments[i].handle;
        let comment = comments[i].comment;
        let postdate = comments[i].postdate;
        let timeText;

        console.log("Creating comment... " + " " + handle + " " + comment + " " + postdate );

        if (postdate > (Date.now() - 60000)){
            timeText = " - posted 48s ago";
        } else if (postdate > (Date.now() - 36000000)) {
            timeText = " - posted 13m ago";
        } else if (postdate < (Date.now() - 36000000)) {
            timeText = " - posted about 2h ago";
        } else {
            timeText = " ERROR";
        }

        const newDiv = document.createElement("div");
        const likeButton = document.createElement("button");
        const userHandle = document.createTextNode("@" + handle + " commented: ");
        const commentContent = document.createTextNode(comment);
        const commentPostdate = document.createTextNode(timeText);
        newDiv.appendChild(userHandle);
        newDiv.appendChild(commentContent);
        newDiv.appendChild(commentPostdate);
        likeButton.setAttribute("onclick", "likeComment()");
        likeButton.setAttribute("class", "btn-secondary");
        likeButton.setAttribute("type", "button");
        likeButton.innerHTML = "Like";
        newDiv.appendChild(likeButton);
        commentSection.appendChild(newDiv);   
    }

    document.getElementById("inputUsername").value = '';
    document.getElementById("inputComment").value = '';
}

function likeComment(){
    alert("Comments have recieved " + ++totalLikes + " likes!");
}