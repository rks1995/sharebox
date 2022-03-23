let newPostDom=t=>$(`<li id="post-${t._id}">
    <h1>
      <small>
        <a class="delete-post-button" href="/post/deletePost/${t._id}">X</a>
      </small>
        ${t.content}
        <small style="color: purple">
              ${t.user.name}
        </small>
        <br>
      <small>             
        <a class="like-button" data-likes="0" href="/likes/togglelikes/?id=${t._id}&type=Post">
            0 Likes
        </a>                    
      </small>
    </h1>
    
        <form action="/comments/create" id="post-${t._id}-comment-form" method="post">
            <input type="text" name="content" placeholder="comments...">
            <input type="hidden" name="post" value="${t._id}">
            <input type="submit" value="comment">
        </form>
     
            <div class="comment-list">
                <ul id="post-comments-${t._id}">
                </ul>
            </div>
</li>`);