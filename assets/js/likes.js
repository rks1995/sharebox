class ToggleLikes {
  constructor(likeBtn) {
    this.likeBtn = likeBtn;
    this.toggleLikes();
  }

  toggleLikes() {
    let pSelf = this;
    console.log(this.likeBtn);
    this.likeBtn.click(function (e) {
      e.preventDefault();
      let self = this;
      $.ajax({
        type: 'post',
        url: $(self).attr('href'),
      })
        .done(function (result) {
          let likesCount = parseInt($(self).attr('data-likes'));
          console.log(likesCount);
          if (!result.data.isLiked) {
            likesCount++;
          } else {
            likesCount--;
          }
          $(self).attr('data-likes', likesCount);
          $(self).html(`${likesCount} Likes`);
        })
        .fail(function (err) {
          console.log(err);
        });
    });
  }
}
