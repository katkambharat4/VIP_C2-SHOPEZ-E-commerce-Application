
import axios from "axios";
import { getToken } from "./auth";




const API = axios.create({
  baseURL: "http://localhost:5000/api",
});
API.interceptors.request.use((req) => {
  const token = getToken();

  console.log("Request URL:", req.baseURL + req.url);
  console.log("Token:", token);

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});
export const getProducts = () => 
  API.get("/products");
export const addToCart = (product) =>
  API.post("/cart", {
    productId: product._id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: 1,
  });
export const getCart = () =>
  API.get("/cart");
export const removeFromCart = (id) =>
  API.delete(`/cart/${id}`);
export const increaseQty = (id) =>
  API.put(`/cart/increase/${id}`);
export const decreaseQty = (id) =>
  API.put(`/cart/decrease/${id}`);
export const placeOrder = (products, totalPrice) =>
  API.post("/orders", {
    products,
    totalPrice,
  });
export const getOrders = () =>
  API.get("/orders");
export const getMyProfile = () =>
  API.get("/users/me");
export const createOrder = (amount) =>
  API.post("/orders/create-order", {
    amount,
  });

  export const updateOrderStatus = (id, status) =>
  API.put(`/orders/${id}/status`, {
    status,
  });

export default API;