<script>
export default {
  data() {
    return {
      check: 1,
      sortedClass: "text-danger",
      isActiveAZ: false,
      isActiveFavorite: false,
    };
  },
  props: {
    contacts: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
    sortedArrayByName() {
      if (!this.isActiveAZ) {
        this.isActiveAZ = !this.isActiveAZ;
        return this.contacts.sort((a, b) => (a.name > b.name ? 1 : -1));
      } else {
        this.isActiveAZ = !this.isActiveAZ;
        return this.contacts.sort((a, b) => (a.name < b.name ? 1 : -1));
      }
    },
    sortedArrayByFavorite() {
      if (this.isActiveFavorite) {
        this.isActiveFavorite = !this.isActiveFavorite;
        return this.contacts.sort((a, b) => (a.favorite > b.favorite ? 1 : -1));
      } else {
        this.isActiveFavorite = !this.isActiveFavorite;
        return this.contacts.sort((a, b) => (a.favorite < b.favorite ? 1 : -1));
      }
    },

    goToPhoneShow(id) {
      this.$router.push({ name: "phoneshow", params: { id: id } });
    },
  },
};
</script>

<template>
  <div class="row">
    <div
      class="col-3"
      v-for="(contact, index) in contacts"
      :key="contact._id"
      :class="{ active: index === activeIndex }"
      @click="
        updateActiveIndex(index);
        goToPhoneShow(contact._id);
      "
    >
      <div class="d-flex flex-column phone-item">
        <p class="p-0 m-0 card-frame-img">
          <img
            :src="contact.imgs"
            class="card-img-top rounded p-0 m-0"
            :alt="contact.title"
            :title="contact.title"
          />
          <span
            class="hover-fast-view w-100 h-100 rounded d-none "
          >
          </span>
        </p>
        <div class="card-body pt-0">
          <span class="title-contact mb-2">{{ contact.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-group {
  overflow: auto;
  max-height: 350px;
}
.phone-item {
  margin-bottom: 30px;
  border-radius: 5px;
  padding-top: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  transition: transform linear 0.1s;
  will-change: transform;
}

.phone-item:hover {
  transform: translateY(-8px);
}
.card-img-top {
  max-height: 600px;
  /* max-width: 0px; */
}

.title-contact{
  font-size: 20px;
  font-weight: bold;
  line-height: 24px;
  height: 24px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>
