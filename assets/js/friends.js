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

  function addFriend() {
    let addFriendButton = $('.add-friend');

    addFriendButton.click(function (e) {
      e.preventDefault();

      $.ajax({
        type: 'post',
        url: $(addFriendButton).prop('href'),
        data: $(addFriendButton).serialize(),
      })
        .done(function (result) {
          notySuccess('Added friend successfully!');
        })
        .fail(function (err) {
          notySuccess('Error in adding friend :(');
        });
    });
  }

  function removeFriend() {
    let removeFriendButton = $('.remove-friend-button');

    console.log(removeFriendButton);
    removeFriendButton.click(function (e) {
      e.preventDefault();

      $.ajax({
        type: 'get',
        url: $(removeFriendButton).prop('href'),
        data: $(removeFriendButton).serialize(),
      })
        .done(function (result) {
          $(document).ajaxStop(function () {
            setTimeout(() => {
              window.location.reload();
            }, 500);
            notySuccess('removed friend successfully!');
          });
        })
        .fail(function (err) {
          notySuccess('Error in removing friend :(');
        });
    });
  }

  function showFriendsDom() {}

  addFriend();
  removeFriend();
}
