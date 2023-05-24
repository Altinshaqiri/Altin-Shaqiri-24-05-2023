<template>
  <header>
    <div class="col d-flex justify-content-between">
      <img src="../../assets/sis.png" width="300px" />

      <a href="#" class="btn h-100 btn-lg">
        <div class="d-flex align-self-center">
          <div class="d-block m-2">
            <span class="glyphicon glyphicon-user"
              ><i style="font-size: xx-large" class="bi bi-person-fill"></i
            ></span>
          </div>
          <div class="d-block">
            <p class="m-0">{{ username }}</p>
            <a class="d-flex" @click="logout">Logout</a>
          </div>
        </div>
      </a>
    </div>
  </header>
</template>

<script>
export default {
  name: "Headers",
  data() {
    return {
      username: '',
    };
  },
  mounted() {
    // Merrni emrin e përdoruesit nga localStorage pasi të keni bërë login
    this.username = localStorage.getItem('username');
  },
  methods: {
    logout() {
      alert('You loged out')
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");

      this.$router.push("/");
    },
    

  },
};
</script>
