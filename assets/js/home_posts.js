{
  //method to submit form-data to new post using AJAX
  let createPost = () => {
    let feedPostForm = $('#feed-posts');

    feedPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: 'post',
        url: '/post/create-post',
        data: feedPostForm.serialize(),
        success: function (result) {
          let newPost = newPostDom(result.data.post);
          $('.post-list-container > ul').prepend(newPost);
          deletePost($('.delete-post-button', newPost));
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  };

  //method to display post in dom;
  let newPostDom = (post) => {
    return $(`<li id="post-${post._id}">
    <h1>
        <a class="delete-post-button" href="/post/deletePost/${post._id}">X</a>
        
        ${post.content}
        <small style="color: purple">
              ${post.user.name}
        </small>

    </h1>
    
        <form action="/comments/create" method="post">
            <input type="text" name="content" placeholder="comments...">
            <input type="hidden" name="post" value=" ${post._id}">
            <input type="submit" value="comment">
        </form>
     
            <div class="comment-list">
                <ul>
                </ul>
            </div>
</li>`);
  };

  let deletePost = (deleteLink) => {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: 'get',
        url: $(deleteLink).prop('href'),
        success: function (result) {
          $(`#post-${result.data.post_id}`).remove();
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  };
  createPost();
}
