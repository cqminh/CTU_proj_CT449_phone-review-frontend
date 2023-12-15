<template>
  <div v-if="contact" class="page">
    <h4>Hiệu chỉnh Bài viết</h4>
    <PhoneForm
      :contact="contact"
      @submit:contact="updatePhone"
      @delete:contact="deleteContact"
    />
  </div>
</template>

<script>
import PhoneForm from "@/components/PhoneForm.vue";
import PhoneService from "@/services/phone.service";
import Swal from "sweetalert2";
import { useStore } from "@/stores/use-store";
import { storeToRefs } from "pinia";
export default {
  components: {
    PhoneForm,
  },
  props: {
    id: { type: String, required: true },
  },
  setup() {
    const store = useStore();
    return {
      ...storeToRefs(store),
    };
  },
  data() {
    return {
      contact: null,
    };
  },
  methods: {
    async getContact(id) {
      try {
        this.contact = await PhoneService.get(id);
        console.log(this.contact);
        if (this.contact.accountID != JSON.parse(localStorage.getItem("account"))._id) {
          this.$router.push({ name: "reviewphone" });
        }
      } catch (error) {
        console.log(error);
        // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    async updatePhone(data) {
      if (
        typeof localStorage.getItem("account") != undefined &&
        $cookies.isKey("token")
      ) {
        try {
          const dataUpdate = await PhoneService.update(this.contact._id, data);
          if (dataUpdate._id) {
            Swal.fire({
              icon: "success",
              title: "Bài viết được cập nhật thành công.",
              showConfirmButton: false,
              timer: 1500,
            });
            this.$router.push({
              name: "phoneshow",
              params: { id: dataUpdate._id },
            });
            console.log(data);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$router.push({ name: "reviewphone" });
      }
    },
    deleteContact() {
      if (
        typeof localStorage.getItem("account") != undefined &&
        $cookies.isKey("token")
      ) {
        Swal.fire({
          title: "Bạn có chắc muốn xoá?",
          text: "Chúng sẽ bị xoá vĩnh viễn!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Tôi muốn xoá!",
          cancelButtonText: "Huỷ bỏ",
        }).then((result) => {
          if (result.isConfirmed) {
            try {
              PhoneService.delete(this.contact._id);
              this.$router.push({ name: "reviewphone" });
              Swal.fire({
                icon: "success",
                title: "Bài viết đã được xoá",
                showConfirmButton: false,
                timer: 1500,
              });
            } catch (error) {
              console.log(error);
            }
          }
        });
      } else {
        this.$router.push({ name: "reviewphone" });
        Swal.fire({
          icon: "error",
          title: "CÚT.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    denyAccess() {
      if (localStorage.getItem("account") == null && $cookies.isKey("token") == false) {
        // console.log("khong");
        this.$router.push({ name: "reviewphone" });
      } else {
        // console.log("co");
      }
    },
  },
  created() {
    this.getContact(this.id);
    this.message = "";
    this.denyAccess();
  },
};
</script>
