<template>
  <div class="grid-container">
    <div class="grid-x">
      <div class="cell">
        <section class="block-list block-list-padded">
          <header>Comments</header>
          <ul>
            <li v-for="comment in comments">
              <div>
                <p class="list-header">{{ comment.title }}</p>
                <p class="list-subheader dark">{{ comment.content }}</p>
              </div>
              <div>
                <button class="button alert" @click="delete_comment(comment.id)" v-if="comment.user.id == get_uid()">删除</button>
                <span>{{ comment.user.name }}</span>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>

    <div class="grid-x comment-form">
      <div class="cell">
        <form action="">
          <div class="grid-container">
            <div class="grid-x grid-padding-x">
              <div class="cell">
                <div class="form-floating-label">
                  <input id="title" type="text">
                  <label for="title">Title</label>
                </div>
              </div>

              <div class="cell">
                <div class="form-floating-label">
                  <textarea name="content" id="content" cols="30" rows="10" placeholder="Content"></textarea>
                  <label for="content"></label>
                </div>
              </div>

              <div class="cell">
                <button type="button" class="button success expanded" @click="submit_comment">提交</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
  import 'foundation-sites/dist/css/foundation.css'
  import axios from 'axios'

  export default {
    data() {
      return {
        comments: [],
        total: 0,
        offset: 0,
        limit: 20,
        uid: localStorage.getItem('uid')
      }
    },

    mounted() {
      this.fetch_comments(0, 10000);
    },
    watch: {
      '$route': 'fetch_comments'
    },

    methods: {
      get_uid () {
        return localStorage.getItem('uid');
      },
      fetch_comments(offset, limit){
        axios.get('/api/comment?offset=' + offset + '&limit=' + limit, {
          headers: {
            "Authorization": localStorage.getItem('token')
          }
        }).then((rep) => {
          if (rep.data.err === 0) {
            this.comments = rep.data.comments;
            this.total = rep.data.total;
          }
        }).catch((rep) => {
          if (rep.response.status === 401) {
            this.$router.push({path: 'signin'});
          }
        })
      },

      submit_comment() {
        let title = $('#title').val();
        let content = $('#content').val();

        axios.post('/api/comment', {
          "title": title,
          "content": content
        }, {
          headers: {
            "Authorization": localStorage.getItem('token')
          }
        }).then((rep) => {
          console.log(rep);
          if (rep.data.err === 0) {
            this.comments.push(rep.data.comment);
            alert("succeed")
          } else {
          }
        }).catch((rep) => {
          console.log(rep);
        })
      },

      delete_comment(id) {
        axios.delete('/api/comment/' + id, {
          headers: {
            "Authorization": localStorage.getItem('token')
          }
        })
          .then((rep) => {
            if (rep.data.err === 0) {
              alert(rep.data.message);
              window.location.href = '/';
            }else {
              alert(rep.data.message);
            }
          }).catch((err) => {
            alert(err.response.data.message);
        })
      }
    }
  }
</script>


<style>
  .comment-form {
    margin-top: 4rem;
  }

  .form-floating-label {
    position: relative;

  }

  .form-floating-label [type='text'],
  .form-floating-label [type='password'],
  .form-floating-label [type='date'],
  .form-floating-label [type='datetime'],
  .form-floating-label [type='datetime-local'],
  .form-floating-label [type='month'],
  .form-floating-label [type='week'],
  .form-floating-label [type='email'],
  .form-floating-label [type='number'],
  .form-floating-label [type='search'],
  .form-floating-label [type='tel'],
  .form-floating-label [type='time'],
  .form-floating-label [type='url'],
  .form-floating-label [type='color'],
  .form-floating-label textarea {
    margin-bottom: 0;
    color: #8a8a8a;
    font-size: 18px;
    font-weight: 300;
    padding: 30px 1rem 1rem 25px;
  }

  .form-floating-label label {
    color: #cacaca;
    font-size: 18px;
    position: absolute;
    pointer-events: none;
    left: 25px;
    bottom: 0;
    transition: all 0.2s ease-in;
    font-weight: 300;
  }

  .form-floating-label textarea ~ label {
    top: 20px;
    font-size: 18px;
    font-weight: 300;
  }

  .form-floating-label input:focus ~ label,
  .form-floating-label input:disabled[value] ~ label,
  .form-floating-label.has-value input ~ label {
    top: 0;
    font-size: 14px;
    color: dodgerblue;
    font-weight: 400;
  }

  .form-floating-label textarea:focus ~ label,
  .form-floating-label.has-value textarea ~ label {
    top: 0;
    font-size: 14px;
    color: dodgerblue;
    font-weight: 400;
  }

  .block-list {
    width: 100%;
    line-height: 1;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background: #fefefe;
  }

  .block-list a {
    width: 100%;
    padding-top: 1rem;
    padding-bottom: 1rem;
    color: #1779ba;
  }

  .block-list, .block-list ul {
    list-style-type: none;
  }

  .block-list ul {
    margin-left: 0;
    margin-bottom: 0;
  }

  .block-list ul li {
    min-height: 4.0625rem;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .block-list li {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }

  .block-list li p {
    margin: 0;
  }

  .block-list.block-list-padded p {
    margin-left: 0;
  }

  .block-list header {
    padding-left: 0.75rem;
    padding-bottom: 0.5rem;
    height: 45px;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: flex-end;
    -ms-flex-align: end;
    align-items: flex-end;
    cursor: default;
    background-color: #e6e6e6;
    font-weight: bold;
    text-align: left;
    text-transform: uppercase;
  }

  .block-list li {
    position: relative;
    border-bottom: 1px solid #e6e6e6;
  }

  .block-list li:first-child {
    border-top: none;
  }

  .block-list li > a,
  .block-list li > span,
  .block-list li > label {
    margin-bottom: 0;
  }

  .block-list li p {
    margin-bottom: 0;
  }

  .block-list li > span {
    cursor: default;
  }

  .block-list li > a, .block-list li > label {
    cursor: pointer;
  }

  .block-list li p {
    margin-left: 0.5rem;
  }

</style>
