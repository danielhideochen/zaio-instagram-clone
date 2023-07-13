const searchInput = document.querySelector(".search-input");
const postsDiv = document.querySelector(".posts");

const usernameInput = document.querySelector("#username");
const imageLinkInput = document.querySelector("#imagelink");
const captionInput = document.querySelector("#caption");
const createPostBtn = document.querySelector("#create-post-btn");
const editPostBtn = document.querySelector("#edit-post-btn");
const logoutBtn = document.querySelector("#logout-btn")
const deletePostBtn = document.querySelector("#delete-post-btn")
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
    deletePostBtn.style.display = "none";
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
logoutBtn.addEventListener("click", () => {
    handleLogout();
});

deletePostBtn.addEventListener("click", () => {
    console.log("delete post button clicked");
    deletePostFromFirebase();
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
var feed = [];
var isEditMode = false;
var postToEditId = null;


const uploadPostToFirebase = (post) => {
    db.collection("posts").doc(post.id + "").set(post).then(() => {
        console.log("POST UPLOADED TO FIREBASE")
    }).catch((error) => {
        console.log("ERROR", error);
    });
};

//accessing data from firebase, the posts that we have created, displaying them
const getPostsFromFirebase = () => {
    const postsRef = db.collection("posts");
    postsRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            feed.push(doc.data());
            outputFeed();
        })
    });
};

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
    uploadPostToFirebase(newPost);
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
            <img class="profile-pic" alt="imharjotsingh's profile picture" data-testid="user-avatar"
                            draggable="false" src="assets/danielpfp.png" />
            <p class="post-username">${post.username}</p>
            <button onclick="showEditPostModal(${post.id})" >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
            </svg>
            </button>
        </div>
        <div class="post-image">
            <img src="${post.imageLink}" alt="">
        </div>
        <div class="footer-icons">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
        <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
        </svg>
        </div>
        <div>
            <p class="likes">25 likes</p>
        </div>
        <div class="caption">
            <p class="caption-user">${post.username}</p> <p>${post.caption}</p>
        </div>
        <div>
            <input class="add-comment" type="text" placeholder="Add a comment...">
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
    uploadPostToFirebase(feed[id]);
    outputFeed();
    
}

const deletePost = (id) => {
    const updatedFeed = feed.filter((post) => post.id !== id);
    feed = updatedFeed;
    outputFeed();
};

const deletePostFromFirebase = () => {
    const postToDelete = feed[postToEditId];
    db.collection("posts")
    .doc(postToDelete.id.toString())
    .delete()
    .then(() => {
        console.log("Post deleted from Firebase");
        deletePost(postToEditId);
    })
    .catch((error) => {
        console.log("Error deleting post from Firebase: ", error);
    });
};


const showEditPostModal = (id) => {
    postToEditId = id;
    isEditMode = true;
    deletePostBtn.style.display = "block";
    createPostBtn.style.display = "none";
    editPostBtn.style.display = "block";
    const postToEdit = feed[id];
    console.log("postToEdit", postToEdit);
    usernameInput.value = postToEdit.username;
    imageLinkInput.value = postToEdit.imageLink;
    captionInput.value = postToEdit.caption;
    modal.show();
}

outputFeed();
getPostsFromFirebase();