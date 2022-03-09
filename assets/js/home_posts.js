{
  function notySuccess(msg) {
    new Noty({
      theme: 'relax',
      text: msg,
      type: 'success',
      layout: 'topCenter',
      timeout: '1500',
    }).show();
  }

  function notyError(msg) {
    new Noty({
      theme: 'relax',
      text: msg,
      type: 'error',
      layout: 'topCenter',
      timeout: '1500',
    }).show();
  }

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
          let post = result.data.post;
          let msg = result.message;
          notySuccess(msg);
          let newPost = newPostDom(post);
          $('.post-list-container > ul').prepend(newPost);
          deletePost($('.delete-post-button', newPost));
        },
        error: function (err) {
          notyError(err.responseText);
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
          notySuccess(result.message);
          $(`#post-${result.data.post_id}`).remove();
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  };

  let posts = $('.delete-post-button');
  for (let deleteBtn of posts) {
    deletePost(deleteBtn);
  }

  let createComment = () => {
    let commentForm = $('#comment-form');

    commentForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: 'post',
        url: '/comments/create',
        data: commentForm.serialize(),
        success: function (result) {
          let newComment = newCommentDom(result.data.comment);
          $('.comment-list > ul').prepend(newComment);
        },
        error: function (err) {
          console.log(err);
        },
      });
    });
  };

  let newCommentDom = (comment) => {
    return $(`<li id="comment-${comment._id}>
    <h3>
        <a class="delete-comment-button" href="/comments/deleteComment/${comment._id}">X</a>
         ${comment.content}
        <small style="color: red">
             ${comment.user.name}
        </small>
    </h3>
</li>`);
  };

  createComment();
  createPost();
}
