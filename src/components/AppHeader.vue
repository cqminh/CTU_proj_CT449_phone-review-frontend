<template>
  <nav class="navbar navbar-expand d-flex">
    <a href="/" class="navbar-brand">Review Phone</a>
    <div class="navbar-nav">
      <li class="nav-item d-flex justify-content-between w-100">
        <div v-if="isAccount" class="btn-username">
          <button class="btn text-light">
            {{ account.uname }}
            <i class="fa-solid fa-caret-down"></i>
          </button>
          <ul class="dropdown-appheader">
            <li class="pl-3 p-2 text-dark dropdown-item" @click="goToOwner">
              <i class="fa-solid fa-user"></i>
              Trang cá nhân
            </li>
            <li
              class="pl-3 p-2 text-success dropdown-item"
              @click="goToAddContact"
            >
              <i class="fas fa-plus"></i> Thêm mới
            </li>
            <li class="pl-3 p-2 text-danger dropdown-item" @click="logout()">
              <i class="fa-solid fa-right-from-bracket"></i> Đăng xuất
            </li>
          </ul>
        </div>
        <router-link v-else :to="{ name: 'login' }" class="nav-link">
          Đăng nhập
          <i class="fa-solid fa-user"></i>
        </router-link>
      </li>
    </div>
  </nav>
</template>
<script>
import { useStore } from "@/stores/use-store";
import { storeToRefs } from "pinia";
export default {
  setup() {
    const store = useStore();
    return {
      ...storeToRefs(store),
    };
  },

  methods: {
    getAccount() {
      if (
        typeof localStorage.getItem("account") != undefined &&
        $cookies.isKey("token")
      ) {
        this.isAccount = true;
        this.account = JSON.parse(localStorage.getItem("account"));
        // console.log(JSON.parse(localStorage.getItem('account')))
        // console.log($cookies.isKey('token'))
      } else {
        this.isAccount = false;
      }
      console.log(typeof this.isAccount);
    },
    logout() {
      if ($cookies.isKey("token")) {
        $cookies.remove("token");
      }
      if (typeof localStorage.removeItem("account") != undefined) {
        localStorage.removeItem("account");
      }
      useStore().onLogout();
    },
    goToAddContact() {
      this.$router.push({ name: "phone.add" });
    },
    goToOwner() {
      const accid = JSON.parse(localStorage.getItem("account"))._id
      console.log(accid);
      this.$router.push({
        name: "phoneown",
        params: { accountID: accid },
      });
    },
  },
  mounted() {
    this.getAccount();
  },
};
</script>

<style scoped>
.btn-username {
  position: relative;
}

.nav-link {
  cursor: pointer;
}
.dropdown-appheader {
  display: none;
  position: absolute;
  list-style: none;
  z-index: 10;
  min-width: 200px;
  background-color: white;
  padding: 0;
  margin: 0;
  right: 0;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0px 0px 3px 3px #eeeeee;
}

.btn-username:hover .dropdown-appheader {
  display: block;
}

.navbar {
  background-image: linear-gradient(to right, #0D3566, #1EBAA9);
  display: flex;
  justify-content: space-between;
}

.navbar-brand {
  color: #ffffff;
  font-weight: 600;
}

.nav-link {
  color: #ffffff;
}
</style>
