<template>
  <div>
    <img height="150" alt="Vue logo" src="../assets/HotelKey.jpg" />
    <h3 class="text-center text-white pt-5">Login form</h3>
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-md-4">
          <div class="col-md-12">
            <form class="form" @submit.prevent="login">
              <h3 class="text-center text-info">Login</h3>
              <div class="form-group">
                <label for="username" class="text">Username</label><br />
                <input type="text" v-model="username" class="form-control" />
              </div>
              <div class="form-group">
                <label for="password" class="text">Password:</label><br />
                <input
                  type="password"
                  v-model="password"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="remember-me" class="text-info"
                  ><span>Remember me</span>
                  <span
                    ><input name="remember-me" type="checkbox" /></span></label
                ><br />
                <button class="btn btn-primary" type="submit">Log In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (this.username === "Altin Shaqiri" && this.password === "altin.2") {
        localStorage.setItem("username", this.username);
        localStorage.setItem("isLoggedIn", "true");

        this.$router.push("/dashboard");
      } else {
        alert("Kredencialet jane gabim! ");
      }
    },
  },
};
</script>

