<template>
  <h2>Đăng ký</h2>
  <Form @submit="submitContact" :validation-schema="contactFormSchema">
    <div class="form-group">
      <label for="uname">Tên</label>
      <Field
        name="uname"
        type="text"
        class="form-control"
        v-model="contactLocal.uname"
      />
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
      <ErrorMessage name="password" class="error-feedback" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary mr-3">Đăng ký</button>
      <router-link :to="{ name: 'login' }" class="btn btn-outline-secondary">
          Đăng nhập
      </router-link>
    </div>
  </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import AccountService from "../services/account.service.js";
import Swal from "sweetalert2";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
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
    };
  },
  methods: {
    async submitContact() {
      console.log(this.contactLocal);
      this.data = await AccountService.create(this.contactLocal);
      if (this.data) {
        console.log(this.data.data);
        Swal.fire({
          icon: "success",
          title: "Đã tạo tài khoản thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        this.$router.push({ name: "login" });
      }
    },
  },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
