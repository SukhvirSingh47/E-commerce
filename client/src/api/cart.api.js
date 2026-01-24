import { http } from "./http";

export const getCart = () => http("/auth/cart");

export const addToCart = (productId, quantity = 1) =>
  http("/auth/cart", {
  method: "PUT",
  body: { productId, quantity: 1 }
});


export const deleteCartItem = (productId) =>
  http("/auth/del", {
    method: "DELETE",
    body: {productId}
  });
