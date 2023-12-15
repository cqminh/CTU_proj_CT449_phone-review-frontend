<template>
  <h2>Đăng nhập</h2>
  <Form @submit="submitContact" :validation-schema="contactFormSchema">
    <div class="form-group">
      <label for="uname">Tên</label>
      <Field name="uname" type="text" class="form-control" v-model="contactLocal.uname" />
      <span class="error-feedback">{{ data.wrongUsername }}</span>

      <ErrorMessage name="uname" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <Field
        name="password"
        type="password"
        class="form-control"
        v-model="contactLocal.password"
      />
      <span class="error-feedback">{{ data.wrongPassword }}</span>
      <ErrorMessage name="password" class="error-feedback" />
    </div>

    <div class="form-group">
      <button class="btn btn-primary mr-3">Đăng nhập</button>
      <router-link :to="{ name: 'signup' }" class="btn btn-outline-secondary">
          Đăng ký
      </router-link>
    </div>
  </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import AccountService from "../services/account.service.js";
import { useStore } from "@/stores/use-store";
import { storeToRefs } from "pinia";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const store = useStore();
    const contactFormSchema = yup.object().shape({
      uname: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      password: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
    });
    return {
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // contactLocal để liên kết với các input trên form
      contactLocal: {},
      contactFormSchema,
      data: {},
      ...storeToRefs(store),
    };
  },
  methods: {
    async submitContact() {
      // console.log(this.contactLocal);
      this.data = await AccountService.login(this.contactLocal);
      if (this.data) {
        // console.log(this.data);
        if (this.data.data) {
          localStorage.setItem("account", JSON.stringify(this.data.data));
          console.log(this.data.data);
          useStore().onAccount(this.data.data, true);
          this.$router.push({ name: "reviewphone" });
        }
      }
    },
  },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
