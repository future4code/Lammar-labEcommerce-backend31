import app from "./app"
import getUsers from "./endpoints/getUsers"
import getProducts from "./endpoints/getProducts"
import userRegister from "./endpoints/userRegister"
import addProduct from "./endpoints/addProduct"
import purchaseRegister from "./endpoints/purchaseRegister"

app.get("/users", getUsers)
app.get("/products", getProducts)
app.post("/users", userRegister)
app.post("/products", addProduct)
app.post("/purchase", purchaseRegister)