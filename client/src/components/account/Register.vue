<template>
  <div class="container h-100 d-flex justify-content-center">
    <div class="login-form m-auto">
      <form @submit.prevent="registerSubmit">
        <h2 class="text-center">Register</h2>
        <div class="form-group">
          <input
            type="text"
            class="form-control shadow-none"
            placeholder="Username"
            required="required"
            v-model="username"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control shadow-none"
            placeholder="Password"
            required="required"
            v-model="password"
          />
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-dark btn-block">Register</button>
        </div>
        <router-link to="/login">Login</router-link>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-form {
  width: 340px;
}
.login-form form {
  margin-bottom: 15px;
  background: #f7f7f7;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 30px;
}
.login-form h2 {
  margin: 0 0 15px;
}
.form-control,
.btn {
  min-height: 38px;
  border-radius: 2px;
}
.btn {
  font-size: 15px;
  font-weight: bold;
}
</style>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },

  methods: {
    ...mapActions(['doRegister']),
    async registerSubmit() {
      await this.doRegister({
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>