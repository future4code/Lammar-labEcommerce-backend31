import app from "./app"
import addProduct from "./endpoints/addProduct"
import getUsers from "./endpoints/getUsers"
import userRegister from "./endpoints/userRegister"

app.get("/users", getUsers)
app.post("/users", userRegister)
app.post("/products", addProduct)