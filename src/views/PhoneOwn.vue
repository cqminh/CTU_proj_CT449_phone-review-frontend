<template>
  <div class="row">
    <div class="col-md-12">
      <InputSearch v-model="searchText" />
    </div>
    <div class="mt-3">
      <div v-if="activeContact">
        <h4>
          Chi tiết Liên hệ
          <i class="fas fa-address-card"></i>
        </h4>
      </div>
    </div>
    <div class="mt-3 col-12">
      <ContactList
        v-if="filteredContactsCount > 0"
        :contacts="filteredContacts"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Chưa có bài viết nào.</p>
    </div>
  </div>
</template>
<script>
import InputSearch from "@/components/InputSearch.vue";
import ContactList from "@/components/ContactList.vue";
import PhoneService from "@/services/phone.service";

import Swal from "sweetalert2";
export default {
  components: {
    InputSearch,
    ContactList,
  },
  data() {
    return {
      contacts: [],
      activeIndex: -1,
      searchText: "",
      isFavorite: false,
    };
  },
  watch: {
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
    contactStrings() {
      return this.contacts.map((contact) => {
        const { title, content } = contact;
        return [title, content].join("");
      });
    },
    // Trả về các contact có chứa thông tin cần tìm kiếm.
    filteredContacts() {
      if (!this.searchText) return this.contacts;
      return this.contacts.filter((_contact, index) =>
        this.contactStrings[index].toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
    activeContact() {
      if (this.activeIndex < 0) return null;
      return this.filteredContacts[this.activeIndex];
    },
    filteredContactsCount() {
      return this.filteredContacts.length;
    },
  },
  methods: {
    checkFavorite() {
      this.isFavorite = !this.isFavorite;
      console.log(this.isFavorite);
      this.refreshList();
    },
    async retrieveContacts() {
      if (this.isFavorite) {
        try {
          this.contacts = await PhoneService.getAllFavorite();
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const accid = JSON.parse(localStorage.getItem("account"))._id;
          this.contacts = await PhoneService.getOwn(accid);
        } catch (error) {
          console.log(error);
        }
      }
    },

    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
    },
    removeAllContacts() {
      Swal.fire({
        title: "Bạn có chắc sẽ xoá tất cả?",
        text: "Bạn không thể hoàn tác!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Tôi đồng ý!",
        cancelButtonText: "Huỷ bỏ",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            PhoneService.deleteAll();
            this.refreshList();
            Swal.fire({
              icon: "success",
              title: "Đã xoá tất cả liên hệ",
              showConfirmButton: false,
              timer: 1500,
            });
          } catch (error) {
            console.log(error);
          }
        }
      });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.page {
  text-align: left;
  /* max-width: 750px; */
}
</style>
