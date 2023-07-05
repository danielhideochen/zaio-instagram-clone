const post = {
    username: "danielchen",
    imageLink: " ",
    caption: "this is a post",
    comments: [],
    shares: 0,
    isPublic: false
}

if(post.isPublic){
    console.log("the post can be shared");
}else{
    console.log("the post cannot be shared");
}

//spread and rest operators
const posts = [post, {...post, username: "johndoe"}, {...post, username: "janedoe"} ]