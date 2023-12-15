<template>
  <Form :validation-schema="contactFormSchema">
    <div class="form-group">
      <label for="title">Tiêu đề</label>
      <Field name="title" type="text" class="form-control" v-model="contactLocal.title" />
      <ErrorMessage name="title" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="imgs">Hình ảnh</label>
      <Field name="imgs" type="text" class="form-control" v-model="contactLocal.imgs" />
      <ErrorMessage name="imgs" class="error-feedback" />
      <p>
        <img width="200" class="pt-2" :src="contactLocal.imgs" alt="" srcset="" />
      </p>
    </div>
    <div class="form-group">
      <label for="link">Link sản phẩm</label>
      <Field name="link" type="text" class="form-control" v-model="contactLocal.link" />
      <ErrorMessage name="link" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="content">Nội dung bài viết</label>
      <Field
        name="content"
        type="text"
        class="form-control"
        v-model="contactLocal.content"
      />
      <ErrorMessage name="content" class="error-feedback" />
    </div>
    <div class="form-group">
      <button @click="submitContact" class="btn btn-primary">Lưu</button>
      <button
        v-if="contactLocal._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteContact"
      >
        Xóa
      </button>
    </div>
  </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:contact", "delete:contact"],
  props: {
    contact: { type: Object, required: true },
  },
  data() {
    const contactFormSchema = yup.object().shape({
      title: yup
        .string()
        .required("Tiêu đề phải có giá trị.")
        .min(2, "Tiêu đề ít nhất 2 ký tự."),
      link: yup
        .string()
        .min(2, "Link bài viết ít nhất 2 ký tự.")
        .required("Link bài viết phải có giá trị."),
      content: yup
        .string()
        .required("Nội dung phải có giá trị.")
        .min(2, "Nội dung phải ít nhất 2 ký tự."),
      imgs: yup
        .string()
        .min(2, "Link hình ảnh phải ít nhất 2 ký tự.")
        .required("Link hình ảnh phải có giá trị."),
    });
    return {
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // contactLocal để liên kết với các input trên form
      contactLocal: this.contact,
      contactFormSchema,
    };
  },
  methods: {
    submitContact() {
      this.$emit("submit:contact", this.contactLocal);
    },
    deleteContact() {
      this.$emit("delete:contact", this.contactLocal.id);
    },
  },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
