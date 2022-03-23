class PostComments{constructor(e){this.postId=e,this.postContainer=$("#post-"+e),this.commentForm=$(`#post-${e}-comment-form`),this.createComment(e);let t=this;$(".delete-comment-button",this.postContainer).each(function(){t.deleteComment($(this))})}notySuccess(e){new Noty({theme:"relax",text:e,type:"success",layout:"topCenter",timeout:"1500"}).show()}notyError(e){new Noty({theme:"relax",text:e,type:"error",layout:"topCenter",timeout:"1500"}).show()}createComment(t){let o=this;this.commentForm.submit(function(e){e.preventDefault();$.ajax({type:"post",url:"/comments/create",data:$(this).serialize(),success:function(e){e=o.newCommentDom(e.data.comment);$("#post-comments-"+t).prepend(e),o.deleteComment($(".delete-comment-button",e)),new ToggleLikes($(".like-button",e)),notySuccess("Comment Published")},error:function(e){console.log(e)}})})}deleteComment(t){$(t).click(function(e){e.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:function(e){let t=$("#comment-"+e.data.comment_id);t.remove(),notySuccess("Comment Deleted!")}})})}newCommentDom=e=>$(`<li id="comment-${e._id}">
    <h3>
      <small>  
        <a class="delete-comment-button" href="/comments/deleteComment/${e._id}">X</a>
      </small>
      ${e.content}
      <small style="color: red">
          ${e.user.name}
      </small>
      <br>
      <small>          
        <a class="like-button" data-likes="0" href="/likes/togglelikes/?id=${e._id}&type=Comment">
            0 Likes
        </a>
      </small> 
    </h3>
</li>`)}