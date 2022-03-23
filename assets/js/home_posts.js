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

        new PostComments(result.data.post._id);

        new ToggleLikes($('.like-button', newPost));
      },
      error: function (err) {
        notyError(err.responseText);
      },
    });
  });
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
    let postId = $(this).prop('id').split('-')[1];
    let deleteLink = $('.delete-post-button', $(this));
    deletePost(deleteLink);
    new PostComments(postId);
    new ToggleLikes($('.like-button', $(this)));
  });
};
createPost();
convertPostToAjax();
