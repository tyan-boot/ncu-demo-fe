<template>
  <div class="grid-x">
    <div class="small-4 small-offset-4 cell">
      <form>
        <div class="form-icons">
          <h4> 登录/注册</h4>

          <div class="input-group">
            <span class="input-group-label">
              <i class="fa fa-user"></i>
            </span>
            <input id="name" class="input-group-field" type="text" placeholder="Name">
          </div>

          <div class="input-group">
            <span class="input-group-label">
              <i class="fa fa-key"></i>
            </span>
            <input id="password" class="input-group-field" type="password" placeholder="Password">
          </div>
        </div>

        <button class="button expanded" @click="register">Sign In</button>
        <button class="button expanded" @click="login">Login In</button>
      </form>
    </div>

  </div>
</template>


<script>
  import 'foundation-sites/dist/css/foundation.css'
  import 'font-awesome/css/font-awesome.css'
  import axios from 'axios'


  export default {
    data () {
      return {
        name: null,
        password: null
      }
    },

    mounted() {
      $(this.$el).foundation();
    },

    destroyed() {
    },

    methods: {
      register() {
        let username = $('#name').val();
        let password = $('#password').val();

        axios.post('/api/user/register', {
          "username": username,
          "password": password
        }).then((rep) => {
          if (rep.data.err === 0) {
            localStorage.setItem('token', rep.data.token);
            localStorage.setItem('uid', rep.data.uid);
            alert(rep.data.message);
            window.location.href = '/';
          } else {
            alert(rep.data.message);
          }
        }).catch((rep) => {
          console.log(rep)
        })
      },

      login() {
        let username = $('#name').val();
        let password = $('#password').val();
        axios.post('/api/user/token', {
          "username": username,
          "password": password
        }).then((rep) => {
          if (rep.data.err === 0) {
            localStorage.setItem('token', rep.data.token);
            localStorage.setItem('uid', rep.data.uid);
            alert(rep.data.message);
            window.location.href = '/';
          } else {
            alert(rep.data.message);
          }
        }).catch((rep) => {
          console.log(rep)
        })
      }
    }

  }
</script>

<style>

  form .form-icons {
    text-align: center;
  }

  form .form-icons h4 {
    margin-bottom: 1rem;
  }

  form .form-icons .input-group-label {
    background-color: #1779ba;
    border-color: #1779ba;
  }

  form .form-icons .input-group-field {
    border-color: #1779ba;
  }

  form .form-icons .fa {
    color: white;
    width: 1rem;
  }


</style>
