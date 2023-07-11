const searchInput = document.querySelector(".search-input");
const postsDiv = document.querySelector(".posts");

const usernameInput = document.querySelector("#username");
const imageLinkInput = document.querySelector("#imagelink");
const captionInput = document.querySelector("#caption");
const createPostBtn = document.querySelector("#create-post-btn");
const editPostBtn = document.querySelector("#edit-post-btn");
editPostBtn.style.display = "none";

const editBtn = document.querySelector("#edit-btn");

//access bootstrap functions to programatically use modals within my javascript
const modal = new bootstrap.Modal(document.getElementById('modal'));
const showCreateModal = document.querySelector("#show-create-modal");

//event listeners
searchInput.addEventListener("click", () => {
    console.log(searchInput.value);
})

createPostBtn.addEventListener("click", () => {
    console.log("create post btn clicked");
    createPost(imageLinkInput.value, captionInput.value, usernameInput.value);
})

//we not have access to these functions
showCreateModal.addEventListener("click", () => {
    isEditMode = false;
    createPostBtn.style.display = "block";
    editPostBtn.style.display = "none";
    usernameInput.value = "";
    imageLinkInput.value = "";
    captionInput.value = "";
    modal.show();
});
editPostBtn.addEventListener("click", () => {
    console.log("edit post btn clicked");
    updatePost(postToEditId, imageLinkInput.value, captionInput.value);
    modal.hide();
});



const outputPostStatus = (post) => {
    const output = `
    POST INFO:
    ID: ${post.id}
    Username: ${post.username}
    Image Link: ${post.imageLink}
    Caption: ${post.caption}
    `;
    return output;
  };


//global variables
var feed = [
    {
    id: 0,
    username: "danielchen",
    imageLink: "https://travel.home.sndimg.com/content/dam/images/travel/fullset/2015/08/03/america-the-beautiful-ss/adirondack-park-new-york-state.jpg.rend.hgtvcom.616.462.suffix/1491580836599.jpeg",
    caption: "so beautiful",
    likes: 0,
    comments: [],
    shares: 0,
    isPublic: true,
    createdAt: new Date(),
    
},
];

var isEditMode = false;
var postToEditId = null;

    //create functionality
const createPost = (imageLink, caption, username) => {
    const newPost = {
        id: feed.length,
        username: username,
        imageLink: imageLink,
        caption: caption,
        likes: 0,
        comments: [],
        shares: 0,
        isPublic: true,
        createdAt: new Date(),
        
    }
    console.log("FEED", feed);
    feed.push(newPost);
    outputFeed();
    modal.hide();
};

//read functionality
const outputFeed = () => {
    const updatedFeed = feed.map((post) => {
        return `
        <div class="post-box">

        <div class="post-header">
            <p>${post.username}</p>
            <button class="btn btn-sm btn-primary" onclick="showEditPostModal(${post.id})" >Edit</button>
        </div>
        <div class="post-image">
            <img src="${post.imageLink}" alt="">
        </div>
        <div class="caption">
            <p>${post.caption}</p>
        </div>
        </div>
        `;
    });
    postsDiv.innerHTML = updatedFeed.join(" ");
};

const updatePost = (id, newImageLink, newCaption) => {
    const updatedFeed = feed.map((post) => {
        if(post.id === id){
            post.imageLink = newImageLink;
            post.caption = newCaption;
        }
        return post;
    })
    feed = updatedFeed;
    outputFeed();
    
}

const deletePost = (id) => {
    const updatedFeed = feed.filter((post) => {
        if(post.id !== id){
            return post;
        }
    });
    feed = updatedFeed;
    // outputFeed(feed);
}

const showEditPostModal = (id) => {
    postToEditId = id;
    isEditMode = true;
    createPostBtn.style.display = "none";
    editPostBtn.style.display = "block";
    const postToEdit = feed[id];
    console.log("postToEdit", postToEdit);
    usernameInput.value = postToEdit.username;
    imageLinkInput.value = postToEdit.imageLink;
    captionInput.value = postToEdit.caption;
    modal.show();
}


// createPost("https://travel.home.sndimg.com/content/dam/images/travel/fullset/2015/08/03/america-the-beautiful-ss/adirondack-park-new-york-state.jpg.rend.hgtvcom.616.462.suffix/1491580836599.jpeg", 
// "so beautiful", 
// "danniel_chenn");
// createPost("https://travel.home.sndimg.com/content/dam/images/travel/fullset/2015/08/03/america-the-beautiful-ss/adirondack-park-new-york-state.jpg.rend.hgtvcom.616.462.suffix/1491580836599.jpeg", 
// "yo", 
// "cody");
// createPost("https://travel.home.sndimg.com/content/dam/images/travel/fullset/2015/08/03/america-the-beautiful-ss/adirondack-park-new-york-state.jpg.rend.hgtvcom.616.462.suffix/1491580836599.jpeg", 
// "hey", 
// "derek");
// createPost("https://travel.home.sndimg.com/content/dam/images/travel/fullset/2015/08/03/america-the-beautiful-ss/adirondack-park-new-york-state.jpg.rend.hgtvcom.616.462.suffix/1491580836599.jpeg", 
// "mountains", 
// "isaiah");
// createPost("https://travel.home.sndimg.com/content/dam/images/travel/fullset/2015/08/03/america-the-beautiful-ss/adirondack-park-new-york-state.jpg.rend.hgtvcom.616.462.suffix/1491580836599.jpeg", 
// "vacation", 
// "johnny");

// updatePost(2, "www.imageLink", "SpaceX next alnch soon!");
// deletePost(4);
// deletePost(0);

outputFeed();