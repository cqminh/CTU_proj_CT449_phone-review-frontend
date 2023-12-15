<script>
import PhoneService from "@/services/phone.service";

export default {
  props: {
    id: String,
  },
  data() {
    return {
      phone: {},
      isAuthor: false,
    };
  },

  methods: {
    async getReviewPhone() {
      this.phone = await PhoneService.get(this.id);
      console.log(this.phone);
      if (
        typeof localStorage.getItem("account") != undefined &&
        $cookies.isKey("token")
      ) {
        if (
          this.phone.accountID ==
          JSON.parse(localStorage.getItem("account"))._id
        ) {
          this.isAuthor = true;
        }
      }
    },
  },
  mounted() {
    this.getReviewPhone();
  },
};
</script>

<template>
  <div>
    <div class="p-1">
      <p class="display-4">
        <strong>
          {{ phone.title }}
        </strong>
      </p>
    </div>

    <div class="row">
      <div class="p-1 col">
        <img :src="phone.imgs" alt="" />
      </div>
      <div class="p-1 col d-flex flex-column justify-content-between">
        <div>{{ phone.content }}</div>

        <div class="p-1">
          <strong>Link sản phẩm: </strong>
          <a :href="phone.link">{{ phone.link }}</a>
        </div>
      </div>
    </div>
  </div>

  <div class="d-flex flex-column align-items-center my-5">
    <router-link
      v-if="isAuthor"
      :to="{
        name: 'phone.edit',
        params: { id: this.id },
      }"
    >
      <button class="btn btn-warning">
        <i class="fas fa-edit"></i> Hiệu chỉnh
      </button>
    </router-link>
  </div>
</template>