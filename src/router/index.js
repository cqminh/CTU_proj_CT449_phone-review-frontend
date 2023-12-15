import { createWebHistory, createRouter } from "vue-router";
import ReviewPhone from "@/views/ReviewPhone.vue";
const routes = [
	{
		path: "/",
		name: "reviewphone",
		component: ReviewPhone,
	},
	{
		path: "/:pathMatch(.*)*",
		name: "notfound",
		component: () => import("@/views/NotFound.vue"),
	},
	{
		path: "/:accountID",
		name: "phoneown",
		component: () => import("@/views/PhoneOwn.vue"),
		props: true
	},
	{
		path: "/phone/:id",
		name: "phoneshow",
		component: () => import("@/views/PhoneShow.vue"),
		props: true // Truyền các biến trong $route.params vào làm props
	},
	{
		path: "/phone/edit/:id",
		name: "phone.edit",
		component: () => import("@/views/PhoneEdit.vue"),
		props: true // Truyền các biến trong $route.params vào làm props
	},
	{
		path: "/signup",
		name: "signup",
		component: () => import("@/views/Signup.vue"),
		props: true // Truyền các biến trong $route.params vào làm props
	},
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/Login.vue"),
		props: true // Truyền các biến trong $route.params vào làm props
	},
	{
		path: "/phone/add",
		name: "phone.add",
		component: () => import("@/views/ContactAdd.vue"),
	},
];
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});
export default router;