const post = {
    username: "danielchen",
    imageLink: " ",
    caption: "this is a post",
    comments: [],
    likes: 0,
    shares: 0,
    isPublic: false
}

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


//spread and rest operators
var feed = []

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
    feed.push(newPost);
    //outputFeed(feed);
};

//read functionality
const outputFeed = (feed) => {
    const output = feed.map((p) => {
        console.log(outputPostStatus(p));
        return p;
    })
    console.log("NEW MAPPED ARRAY: ", output);
}

const updatePost = (id, newImageLink, newCaption) => {
    const updatedFeed = feed.map((post) => {
        if(post.id === id){
            post.imageLink = newImageLink;
            post.caption = newCaption;
        }
        return post;
    })
    feed = updatedFeed;
    
}

const deletePost = (id) => {
    const updatedFeed = feed.filter((post) => {
        if(post.id !== id){
            return post;
        }
    });
    feed = updatedFeed;
    outputFeed(feed);
}


createPost("https://travel.home.sndimg.com/content/dam/images/travel/fullset/2015/08/03/america-the-beautiful-ss/adirondack-park-new-york-state.jpg.rend.hgtvcom.616.462.suffix/1491580836599.jpeg", 
"so beautiful", 
"danniel_chenn");
createPost("https://travel.home.sndimg.com/content/dam/images/travel/fullset/2015/08/03/america-the-beautiful-ss/adirondack-park-new-york-state.jpg.rend.hgtvcom.616.462.suffix/1491580836599.jpeg", 
"yo", 
"cody");
createPost("https://travel.home.sndimg.com/content/dam/images/travel/fullset/2015/08/03/america-the-beautiful-ss/adirondack-park-new-york-state.jpg.rend.hgtvcom.616.462.suffix/1491580836599.jpeg", 
"hey", 
"derek");
createPost("https://travel.home.sndimg.com/content/dam/images/travel/fullset/2015/08/03/america-the-beautiful-ss/adirondack-park-new-york-state.jpg.rend.hgtvcom.616.462.suffix/1491580836599.jpeg", 
"mountains", 
"isaiah");
createPost("https://travel.home.sndimg.com/content/dam/images/travel/fullset/2015/08/03/america-the-beautiful-ss/adirondack-park-new-york-state.jpg.rend.hgtvcom.616.462.suffix/1491580836599.jpeg", 
"vacation", 
"johnny");

updatePost(2, "www.imageLink", "SpaceX next alnch soon!");
deletePost(4);
deletePost(0);