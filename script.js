let posts = [ 
    {
        "name": "Dr. Feel Good",
        "time": "48 min ago",
        "imgProfil": "img/pexels-nikita-igonkin-15113670.jpg",
        "img": "img/pexels-colors-party.jpg",
        "likes": 4711,
        "description": "The Best Party in Leverkusen last Weekend!",
        "commentAuthor": 'Sarah_89',
        "commentInput": 'DA_Team',
        "emoji": 'img/heart-red.png',
        "comments": ['What a Party!'],
        "addedComment": [],
    },

    {
        "name": "DJ Max",
        "time": "2 hours ago",
        "imgProfil": "img/pexels-nikita-igonkin-15113670.jpg",
        "img": "img/party.jpg",
        "likes": 534,
        "description": "DJ Max @ Mix house Party",
        "commentAuthor": 'We <3 Techno',
        "commentInput": 'DA_Team',
        "emoji": 'img/beer.png',
        "comments": ['Love that beat!'],
        "addedComment": [],
    },

    {
        "name": "Serie A",
        "time": "4 hours ago",
        "imgProfil": "img/football.jpg",
        "img": "img/football.jpg",
        "likes": 8256,
        "description": "il calcio è di chi lo ama...",
        "commentAuthor": 'AS Roma',
        "commentInput": 'DA_Team',
        "emoji": 'img/football-emoji.png',
        "comments": ['Stile di vita!'],
        "addedComment": [],
    },

    {
        "name": "Bar Santa Domingo",
        "time": "31 min ago",
        "imgProfil": "img/ananas.jpg",
        "img": "img/ananas.jpg",
        "likes": 24,
        "description": "Best Coctails in Town",
        "commentAuthor": 'Fred 82',
        "commentInput": 'DA_Team',
        "emoji": 'img/cheers.png',
        "comments": ['Pineapple life!'],
        "addedComment": [],
    },

    {
        "name": "Tierheim Köln",
        "time": "8 hours ago",
        "imgProfil": "img/dogs.jpg",
        "img": "img/dogs.jpg",
        "likes": 1024,
        "description": "Guten Morgen...",
        "commentAuthor": 'Anna Lena 86',
        "commentInput": 'DA_Team',
        "emoji": 'img/paws.png',
        "comments": ['So suuuussss'],
        "addedComment": [],
    },
   
]

function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < posts.length; i++) {
        load(i);
        const post = posts[i];

        content.innerHTML += returnHTML(i, post);
        showComment(i);
    }
}

function returnHTML(i, post) {
    return ` 
    <div class="content">
        <div class="post">
            <div class="postsHeader">
                <div class="postsHeaderLeft">
                   <img src="${post['imgProfil']}" alt="story" class="postsImgHeader pointer">
                    <h2 class="postsName pointer">${post['name']}</h2>
                    <p class="timePost">• ${post['time']}</p>
                </div>
                <div class="postsHeaderRight">
                    <span class="pointer">• • •</span>
                </div>
            </div>
                <img src="${post['img']}" alt="Part" class="postsImg pointer" ondblclick="likePost(${i})">
            <div class="likeCommentShareSave">
                <div class="likeCommentShare">
                    <img class="likeShareImg pointer" id="heart${i}" src="img/heart.png" alt="Like" onclick="likePost(${i})">
                    <a href="#inputComment"><img class="likeShareImg pointer" src="img/chat.png" alt="Comment"></a> 
                    <img class="likeShareImg pointer" src="img/send.png" alt="Share">
                </div>
                <div class="save">
                    <img class="likeShareImg pointer" id="save${i}" src="img/save-instagram.png" alt="Save" onclick="savePost(${i})">
                </div>
            </div>
                <div class="likes"><span id="likes${i}" class="description paddingLeft bold">${post['likes']} </span><span id="likesText"> <b>likes</b></span><br></div>
                <div class="description paddingLeft">
                    <span class="description"><b>${post['name']}:</b> ${post['description']}</span>
                </div>
                <span class="allComments paddingLeft description pointer">View all comments...</span>
            
            <div class="comment">
                <span class="commentPosts paddingLeft"><b>${post['commentAuthor']}:</b></span>
                <span class="commentPosts paddingLeft" id="newComments${i}"> ${post['comments']}</span>
                <img src="${post['emoji']}" alt="hearth" class="likeShareImg">
            </div>
            <div id="commentsContainer${i}" class="comments">
            </div>
            <div class="addComment paddingLeft">
                <input id="inputComment${i}" class="inputComment" type="text" placeholder="Leave a comment..." required>
                <button class="btnComment pointer" onclick="addComment(${i})" type="submit">Post</button>
            </div>
        </div>
    </div>

            `;
}

function likePost(i) {
    var image = document.getElementById(`heart${i}`);
    var originalImg = "img/heart.png";
    var newImg = "img/heart-red.png";

    if (image.getAttribute("src") === originalImg) {
        image.setAttribute("src", newImg);
        document.getElementById(`likes${i}`).innerHTML = posts[i]['likes'] + 1;
    } else {
        image.setAttribute("src", originalImg);
        document.getElementById(`likes${i}`).innerHTML = posts[i]['likes'];
    }
}

function savePost(i) {
    var image = document.getElementById(`save${i}`);
    var originalImg = "img/save-instagram.png";
    var newImg = "img/save-yellow.png";

    if (image.getAttribute("src") === originalImg) {
        image.setAttribute("src", newImg);
    } else {
        image.setAttribute("src", originalImg);
    }
}

function addComment(k) {
    var input = document.getElementById(`inputComment${k}`);
    posts[k]['addedComment'].push(input.value);
    input.value = '';

    showComment(k);
    save(k);
    load(k);
}

function showComment(index) {
    let comments = document.getElementById(`commentsContainer${index}`);
    comments.innerHTML = '';
        
        for (let j = 0; j < posts[index]['addedComment'].length; j++) {
            const comment = posts[index][`addedComment`][j];   
            comments.innerHTML += `<div class="comment">                
                <span class="commentPosts paddingLeft"><b>DA_Team:</b></span>
                <span class="commentPosts paddingLeft"> ${comment}</span>
            </div>`;
        }
}

function save(i) {
    let saveCommentAstext = JSON.stringify(posts[i]['addedComment']);
    localStorage.setItem(`comment${i}`, saveCommentAstext);
}

function load(i) {
    let saveCommentAstext = localStorage.getItem(`comment${i}`);
    if (saveCommentAstext) {
        posts[i]['addedComment'] = JSON.parse(saveCommentAstext);
    }
}