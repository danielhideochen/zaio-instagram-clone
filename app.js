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
            <p>${post.username}</p>
            <button onclick="showEditPostModal(${post.id})" >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
            </svg>
            </button>
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