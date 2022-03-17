//method to display post in dom;
let newPostDom = (post) => {
  return $(`<li id="post-${post._id}">
    <h1>
      <small>
        <a class="delete-post-button" href="/post/deletePost/${post._id}">X</a>
      </small>
        ${post.content}
        <small style="color: purple">
              ${post.user.name}
        </small>
        <br>
      <small>             
        <a class="like-button" data-likes="0" href="/likes/togglelikes/?id=${post._id}&type=Post">
            0 Likes
        </a>                    
      </small>
    </h1>
    
        <form action="/comments/create" id="post-${post._id}-comment-form" method="post">
            <input type="text" name="content" placeholder="comments...">
            <input type="hidden" name="post" value="${post._id}">
            <input type="submit" value="comment">
        </form>
     
            <div class="comment-list">
                <ul id="post-comments-${post._id}">
                </ul>
            </div>
</li>`);
};
