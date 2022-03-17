class PostComments {
  constructor(postId) {
    this.postId = postId;
    this.postContainer = $(`#post-${postId}`);
    this.commentForm = $(`#post-${postId}-comment-form`);
    this.createComment(postId);

    let self = this;
    //make Ajax request to all existing comments
    $('.delete-comment-button', this.postContainer).each(function () {
      self.deleteComment($(this));
    });
  }

  notySuccess(msg) {
    new Noty({
      theme: 'relax',
      text: msg,
      type: 'success',
      layout: 'topCenter',
      timeout: '1500',
    }).show();
  }

  notyError(msg) {
    new Noty({
      theme: 'relax',
      text: msg,
      type: 'error',
      layout: 'topCenter',
      timeout: '1500',
    }).show();
  }

  createComment(postId) {
    let pSelf = this;
    this.commentForm.submit(function (e) {
      e.preventDefault();
      let self = this;
      $.ajax({
        type: 'post',
        url: '/comments/create',
        data: $(self).serialize(),
        success: function (result) {
          let newComment = pSelf.newCommentDom(result.data.comment);
          $(`#post-comments-${postId}`).prepend(newComment);
          pSelf.deleteComment($('.delete-comment-button', newComment));

          new ToggleLikes($('.like-button', newComment));
          notySuccess('Comment Published');
        },
        error: function (err) {
          console.log(err);
        },
      });
    });
  }

  deleteComment(deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();
      $.ajax({
        type: 'get',
        url: $(deleteLink).prop('href'),
        success: function (result) {
          let comment = $(`#comment-${result.data.comment_id}`);
          comment.remove();
          notySuccess('Comment Deleted!');
        },
      });
    });
  }

  newCommentDom = (comment) => {
    return $(`<li id="comment-${comment._id}">
    <h3>
      <small>  
        <a class="delete-comment-button" href="/comments/deleteComment/${comment._id}">X</a>
      </small>
      ${comment.content}
      <small style="color: red">
          ${comment.user.name}
      </small>
      <br>
      <small>          
        <a class="like-button" data-likes="0" href="/likes/togglelikes/?id=${comment._id}&type=Comment">
            0 Likes
        </a>
      </small> 
    </h3>
</li>`);
  };
}
