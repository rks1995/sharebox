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
          notySuccess(result.message);
          let post = result.data.post;
          let newPost = newPostDom(post);
          $('.post-list-container > ul').prepend(newPost);
          deletePost($('.delete-post-button', newPost));
          convertPostToAjax();
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

  // adding AJAX to all post if present already
  let convertPostToAjax = function () {
    $('.post-list-container > ul > li').each(function () {
      let self = this;

      let postId = $(this).prop('id').split('-')[1];
      let deleteLink = $('.delete-post-button', self);
      deletePost(deleteLink);
      new PostComments(postId);
    });
  };
  createPost();
  convertPostToAjax();
}
