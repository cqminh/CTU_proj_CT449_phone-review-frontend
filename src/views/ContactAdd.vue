<template>
  <div v-if="contact" class="page">
    <h4>Thêm bài viết</h4>
    <PhoneForm :contact="contact" @submit:contact="addContact" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import PhoneForm from "@/components/PhoneForm.vue";
import PhoneService from "@/services/phone.service";
import Swal from "sweetalert2";
export default {
  components: {
    PhoneForm,
  },

  data() {
    return {
      contact: {},
      message: "",
      phone: {},
    };
  },
  methods: {
    async addContact(data) {
      try {
        data.token = $cookies.get("token");
        this.phone = await PhoneService.create(data);
        console.log(this.phone);
        Swal.fire({
          icon: "success",
          title: "Review phone đã được tạo",
          showConfirmButton: false,
          timer: 1500,
        });
        // this.$router.push({ name: "reviewphone" });
      } catch (error) {
        console.log(error);
      }
    },
    denyAccess() {
      if (localStorage.getItem("account") == null && $cookies.isKey("token") == false) {
        console.log("khong");
        this.$router.push({ name: "reviewphone" });
      } else {
        console.log("co");
      }
    },
  },
  mounted() {
    this.denyAccess();
  },
};
</script>
