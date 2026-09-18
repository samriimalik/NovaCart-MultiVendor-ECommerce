import heroImage from "./images/hero.jpeg";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import { api, setAuthToken } from "./services/api";
import bagImage from "./images/bag.jpeg";
import lampImage from "./images/lamp.jpeg";
import headphonesImage from "./images/headphones.jpeg";
import sneakersImage from "./images/sneakers.jpeg";
import smartwatchImage from "./images/smartwatch.jpeg";
import makeupKitImage from "./images/makeupkit.jpeg";
import lipstickImage from "./images/lipstick.jpeg";
import foundationImage from "./images/foundation.jpeg";
import iphone17Image from "./images/iphone17.jpeg";
import catToyImage from "./images/cattoy.jpeg";
/* =========================
   NAVBAR
========================= */
function Nav({ cartCount }) {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setAuthToken(null);

    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container">

        <Link
          to="/"
          className="navbar-brand fw-bold fs-3"
        >
          NovaCart
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="mainNavbar"
        >

          <ul className="navbar-nav mx-auto gap-lg-2">

            <li className="nav-item">
              <Link
                to="/"
                className="nav-link"
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/shop"
                className="nav-link"
              >
                Shop
              </Link>
            </li>

            {user?.role === "customer" && (
              <li className="nav-item">
                <Link
                  to="/my-orders"
                  className="nav-link"
                >
                  My Orders
                </Link>
              </li>
            )}

            {user?.role === "vendor" && (
              <li className="nav-item">
                <Link
                  to="/vendor"
                  className="nav-link"
                >
                  Vendor Dashboard
                </Link>
              </li>
            )}

            {user?.role === "admin" && (
              <li className="nav-item">
                <Link
                  to="/admin"
                  className="nav-link"
                >
                  Admin Dashboard
                </Link>
              </li>
            )}

          </ul>

          <div className="d-flex align-items-center gap-2">

            <Link
              to="/cart"
              className="btn btn-outline-dark"
            >
              🛒 Cart ({cartCount})
            </Link>

            {user ? (
              <>
                <span className="small text-muted d-none d-lg-inline">
                  Hi, {user.name}
                </span>

                <button
                  className="btn btn-dark"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="btn btn-dark"
              >
                Login
              </Link>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
}


/* =========================
   PRODUCT CARD
========================= */

const productImages = {
  "Aesthetic Shoulder Bag": bagImage,
   "Smart Desk Lamp": lampImage,
  "Everyday Runner Sneakers": sneakersImage,
   "Aero Wireless Headphones": headphonesImage,
  "Smart Watch": smartwatchImage,
  "Rose Glow Makeup Kit": makeupKitImage,
  "Velvet Matte Lipstick": lipstickImage,
"Glow Beauty Foundation": foundationImage,
"iPhone 17": iphone17Image,
"Interactive Cat Toy": catToyImage,
};


function ProductCard({ p, addToCart }) {
const image =
  productImages[p.name] ||
  p.image ||
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80";
  

  return (
    <div className="col-md-6 col-lg-3">

      <div className="product-card">

        <div className="product-img">

          <img
            src={image}
            alt={p.name}
          />

          <span>{p.category}</span>

          <button
            onClick={() => addToCart(p)}
            title="Add to cart"
          >
            <i className="bi bi-plus-lg"></i>
          </button>

        </div>

        <div className="pt-3">

          <div className="d-flex justify-content-between gap-2">

            <h5>{p.name}</h5>

            <strong>
              ${Number(p.price).toFixed(2)}
            </strong>

          </div>

          <small className="text-muted">
            {p.vendor?.name || "NovaCart Seller"}
          </small>

        </div>

      </div>

    </div>
  );
}


/* =========================
   HOME
========================= */

function Home({
  products,
  loading,
  error,
  addToCart
}) {

  return (
    <>

      <section className="hero">

        <div className="container">

          <div className="hero-card">

            <div className="hero-copy">

              <div className="eyebrow">
                THE NEW WAY TO SHOP
              </div>

              <h1>
                One cart.
                <br />
                <em>Many worlds.</em>
              </h1>

              <p>
                Discover independent brands, standout products,
                and everyday essentials — all in one beautifully
                simple marketplace.
              </p>

              <div className="d-flex gap-3">

                <a
                  href="#products"
                  className="btn btn-dark btn-lg rounded-pill px-4"
                >
                  Explore products
                  <i className="bi bi-arrow-right ms-2"></i>
                </a>

                <Link
                  to="/vendor"
                  className="btn btn-light btn-lg rounded-pill px-4"
                >
                  Sell on NovaCart
                </Link>

              </div>

            </div>

            <div className="hero-art">

              <div className="floating-badge">
                <i className="bi bi-stars"></i>
                Curated for you
              </div>

              <img
                src={heroImage}
                alt="NovaCart"
              />

            </div>

          </div>

        </div>

      </section>


      <section
        className="container py-5"
        id="products"
      >

        <div className="section-head">

          <div>

            <div className="eyebrow">
              CURATED MARKETPLACE
            </div>

            <h2>
              Made to be <em>discovered.</em>
            </h2>

          </div>

          <Link
            to="/shop"
            className="text-dark fw-semibold"
          >
            View all
            <i className="bi bi-arrow-up-right"></i>
          </Link>

        </div>


        {loading && (
          <div className="text-center py-5">

            <div className="spinner-border"></div>

            <p className="mt-3 text-muted">
              Loading products...
            </p>

          </div>
        )}


        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}


        {!loading && !error && (
          <div className="row g-4">

            {products.slice(0, 4).map((p) => (

              <ProductCard
                key={p._id}
                p={p}
                addToCart={addToCart}
              />

            ))}

          </div>
        )}

      </section>


      <section className="container pb-5">

        <div className="trust-row">

          <div>
            <i className="bi bi-truck"></i>
            <strong>Fast delivery</strong>
            <small>From trusted sellers</small>
          </div>

          <div>
            <i className="bi bi-shield-check"></i>
            <strong>Secure checkout</strong>
            <small>Protected payments</small>
          </div>

          <div>
            <i className="bi bi-arrow-repeat"></i>
            <strong>Easy returns</strong>
            <small>30-day peace of mind</small>
          </div>

          <div>
            <i className="bi bi-shop"></i>
            <strong>Real sellers</strong>
            <small>Independent businesses</small>
          </div>

        </div>

      </section>

    </>
  );
}


/* =========================
   SHOP
========================= */

function Shop({
  products,
  loading,
  error,
  addToCart
}) {

  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Home",
    "Beauty"
  ];

  const filteredProducts =
    category === "All"
      ? products
      : products.filter(
          (p) => p.category === category
        );

  return (
    <div className="container py-5">

      <div className="eyebrow">
        ALL PRODUCTS
      </div>

      <h1 className="display-5 fw-bold mb-4">
        Shop the marketplace.
      </h1>

      <div className="chip-row mb-4">

        {categories.map((x) => (

          <button
            key={x}
            onClick={() => setCategory(x)}
            className={
              "chip " +
              (category === x ? "active" : "")
            }
          >
            {x}
          </button>

        ))}

      </div>


      {loading && (
        <div className="text-center py-5">

          <div className="spinner-border"></div>

          <p className="mt-3 text-muted">
            Loading products...
          </p>

        </div>
      )}


      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}


      {!loading && !error && (
        <div className="row g-4">

          {filteredProducts.map((p) => (

            <ProductCard
              key={p._id}
              p={p}
              addToCart={addToCart}
            />

          ))}

        </div>
      )}


      {!loading &&
        !error &&
        filteredProducts.length === 0 && (

          <div className="empty">

            <h3>
              No products found
            </h3>

            <p className="text-muted">
              No products are available in this category.
            </p>

          </div>

        )}

    </div>
  );
}


/* =========================
   CART
========================= */

function Cart({ cart }) {

  const total = cart.reduce(
    (sum, p) => sum + Number(p.price),
    0
  );

  return (
    <div className="container py-5">

      <div className="eyebrow">
        YOUR BAG
      </div>

      <h1 className="display-6 fw-bold mb-4">
        Shopping cart
      </h1>


      {!cart.length ? (

        <div className="empty">

          <i className="bi bi-bag"></i>

          <h3>
            Your cart is empty
          </h3>

          <Link
            to="/shop"
            className="btn btn-dark rounded-pill"
          >
            Start shopping
          </Link>

        </div>

      ) : (

        <div className="row g-4">

          <div className="col-lg-8">

            {cart.map((p, i) => (

              <div
                className="cart-item"
                key={i}
              >

                <img
                  src={
                    p.image ||
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"
                  }
                  alt={p.name}
                />

                <div className="flex-grow-1">

                  <h5>{p.name}</h5>

                  <small>
                    {p.vendor?.name ||
                      "NovaCart Seller"}
                  </small>

                </div>

                <strong>
                  ${Number(p.price).toFixed(2)}
                </strong>

              </div>

            ))}

          </div>


          <div className="col-lg-4">

            <div className="summary">

              <h4>
                Order summary
              </h4>

              <div>
                <span>Subtotal</span>
                <b>
                  ${total.toFixed(2)}
                </b>
              </div>

              <div>
                <span>Delivery</span>
                <b>Free</b>
              </div>

              <hr />

              <div className="fs-5">

                <span>Total</span>

                <b>
                  ${total.toFixed(2)}
                </b>

              </div>

              <Link
                to="/checkout"
                className="btn btn-dark w-100 rounded-pill mt-3"
              >
                Continue to checkout
              </Link>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


/* =========================
   LOGIN
========================= */

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const response = await api.post(
        "/auth/login",
        {
          email,
          password
        }
      );

      const { token, user } =
        response.data;

      localStorage.setItem(
        "token",
        token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      setAuthToken(token);


      if (user.role === "admin") {

        navigate("/admin");

      } else if (user.role === "vendor") {

        navigate("/vendor");

      } else {

        navigate("/");

      }

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Login failed. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };


  return (
    <div className="auth-wrap">

      <div className="auth-card">

        <div className="brand mb-4">

          <span className="brand-mark">
            N
          </span>

          Nova<span>Cart</span>

        </div>


        <div className="eyebrow">
          WELCOME BACK
        </div>

        <h2>
          Sign in to your account
        </h2>

        <p className="text-muted">
          Access your orders, wishlist and seller tools.
        </p>


        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}


        <form onSubmit={handleLogin}>

          <input
            className="form-control mb-3"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />


          <input
            className="form-control mb-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />


          <button
            type="submit"
            className="btn btn-dark w-100 rounded-pill py-3"
            disabled={loading}
          >

            {loading
              ? "Signing in..."
              : "Sign in"}

          </button>

        </form>


        <p className="small text-muted mt-3 text-center">
          Secure login powered by NovaCart API.
        </p>

      </div>

    </div>
  );
}


/* =========================
   CHECKOUT
========================= */

function Checkout() {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login first.");
      return;
    }

    if (!address || !city) {
      setError("Please enter your address and city.");
      return;
    }

    try {
      setLoading(true);

      setAuthToken(token);

      const shippingAddress = `${address}, ${city}`;

      const response = await api.post("/orders/checkout", {
        shippingAddress,
        paymentMethod
      });

      setMessage(
        response.data.message || "Order placed successfully!"
      );

      setAddress("");
      setCity("");

      setTimeout(() => {
        navigate("/cart");
      }, 1500);

    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAuthToken(null);

        setError("Your login session expired. Please login again.");
        return;
      }

      setError(
        error.response?.data?.message ||
        "Unable to place order."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">

      <div className="eyebrow">
        CHECKOUT
      </div>

      <h1 className="display-6 fw-bold mb-4">
        Complete your order.
      </h1>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {message && (
        <div className="alert alert-success">
          {message}
        </div>
      )}

      <form onSubmit={handlePlaceOrder}>

        <div className="row g-4">

          <div className="col-lg-7">

            <div className="checkout-card">

              <h4>
                Delivery details
              </h4>

              <div className="row g-3">

                <div className="col-12">

                  <input
                    className="form-control"
                    placeholder="Address"
                    value={address}
                    onChange={(e) =>
                      setAddress(e.target.value)
                    }
                    required
                  />

                </div>

                <div className="col-md-6">

                  <input
                    className="form-control"
                    placeholder="City"
                    value={city}
                    onChange={(e) =>
                      setCity(e.target.value)
                    }
                    required
                  />

                </div>

              </div>

              <h4 className="mt-4">
                Payment
              </h4>

              <div className="payment-box">

                <i className="bi bi-credit-card"></i>

                <select
                  className="form-select"
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                >
                  <option value="COD">
                    Cash on Delivery
                  </option>

                  <option value="Card">
                    Card
                  </option>
                </select>

              </div>

            </div>

          </div>

          <div className="col-lg-5">

            <div className="summary">

              <h4>
                Ready to place your order?
              </h4>

              <p className="text-muted">
                Your order will be saved securely in NovaCart.
              </p>

              <button
                type="submit"
                className="btn btn-dark w-100 rounded-pill py-3"
                disabled={loading}
              >
                {loading
                  ? "Placing order..."
                  : "Place order"}
              </button>

            </div>

          </div>

        </div>

      </form>

    </div>
  );
}
function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login first.");
          setLoading(false);
          return;
        }

        setAuthToken(token);

        const response = await api.get("/orders/my-orders");

        setOrders(response.data.orders || []);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
          "Unable to load your orders."
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border"></div>
        <p className="mt-3 text-muted">
          Loading your orders...
        </p>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="eyebrow">
        MY ORDERS
      </div>

      <h1 className="display-6 fw-bold mb-4">
        Your orders.
      </h1>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {!error && orders.length === 0 && (
        <div className="empty">
          <i className="bi bi-box-seam"></i>

          <h3>
            No orders yet
          </h3>

          <Link
            to="/shop"
            className="btn btn-dark rounded-pill"
          >
            Start shopping
          </Link>
        </div>
      )}

      {orders.map((order) => (
        <div
          className="dashboard-card mb-4"
          key={order._id}
        >

          <div className="d-flex justify-content-between flex-wrap gap-2">

            <div>
              <small className="text-muted">
                Order ID
              </small>

              <h6 className="mb-0">
                {order._id}
              </h6>
            </div>

            <div>
              <small className="text-muted">
                Status
              </small>

              <div className="fw-bold">
                {order.status}
              </div>
            </div>

            <div>
              <small className="text-muted">
                Payment
              </small>

              <div className="fw-bold">
                {order.paymentMethod}
              </div>
            </div>

          </div>

          <hr />

          {order.items.map((item, index) => (
            <div
              className="d-flex justify-content-between py-2"
              key={index}
            >
              <span>
                {item.name} × {item.quantity}
              </span>

              <strong>
                ${(item.price * item.quantity).toFixed(2)}
              </strong>
            </div>
          ))}

          <hr />

          <div className="d-flex justify-content-between">
            <strong>Total</strong>

            <strong>
              ${Number(order.totalAmount).toFixed(2)}
            </strong>
          </div>

          <small className="text-muted d-block mt-2">
            Delivery: {order.shippingAddress}
          </small>

        </div>
      ))}

    </div>
  );
}
function Admin() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      setLoading(true);
      setError("");

      const [usersRes, productsRes, ordersRes] =
        await Promise.all([
          api.get("/admin/users"),
          api.get("/admin/products"),
          api.get("/admin/orders")
        ]);

      setUsers(usersRes.data.users || []);
      setProducts(productsRes.data.products || []);
      setOrders(ordersRes.data.orders || []);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to load admin dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      setError("");
      setMessage("");

      const response = await api.put(
        `/admin/orders/${orderId}/status`,
        { status }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? response.data.order
            : order
        )
      );

      setMessage("Order status updated successfully!");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to update order status"
      );
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary"></div>

        <p className="mt-3">
          Loading admin dashboard...
        </p>
      </div>
    );
  }

  const vendors = users.filter(
    (user) => user.role === "vendor"
  );

  const customers = users.filter(
    (user) => user.role === "customer"
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  );

  return (
    <div className="container py-5">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h1 className="fw-bold mb-1">
            Admin Dashboard
          </h1>

          <p className="text-muted mb-0">
            Manage NovaCart marketplace
          </p>
        </div>

        <span className="badge bg-dark px-3 py-2">
          Administrator
        </span>

      </div>

      {/* ALERTS */}
      {message && (
        <div className="alert alert-success">
          {message}
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* STATS */}
      <div className="row g-4 mb-5">

        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-1">
                Total Users
              </p>

              <h2 className="fw-bold">
                {users.length}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-1">
                Vendors
              </p>

              <h2 className="fw-bold">
                {vendors.length}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-1">
                Products
              </p>

              <h2 className="fw-bold">
                {products.length}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-1">
                Orders
              </p>

              <h2 className="fw-bold">
                {orders.length}
              </h2>
            </div>
          </div>
        </div>

      </div>

      {/* USERS */}
      <div className="card border-0 shadow-sm mb-5">

        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <h3 className="fw-bold mb-0">
              Users Management
            </h3>

            <span className="badge bg-primary">
              {users.length} Users
            </span>

          </div>

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created</th>
                </tr>
              </thead>

              <tbody>

                {users.map((user) => (

                  <tr key={user._id}>

                    <td className="fw-semibold">
                      {user.name}
                    </td>

                    <td>
                      {user.email}
                    </td>

                    <td>

                      <span
                        className={`badge ${
                          user.role === "admin"
                            ? "bg-danger"
                            : user.role === "vendor"
                            ? "bg-warning text-dark"
                            : "bg-primary"
                        }`}
                      >
                        {user.role}
                      </span>

                    </td>

                    <td>
                      {user.createdAt
                        ? new Date(
                            user.createdAt
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>
      </div>

      {/* PRODUCTS */}
      <div className="card border-0 shadow-sm mb-5">

        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <h3 className="fw-bold mb-0">
              Products Management
            </h3>

            <span className="badge bg-success">
              {products.length} Products
            </span>

          </div>

          {products.length === 0 ? (

            <div className="alert alert-light border">
              No products found.
            </div>

          ) : (

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-dark">

                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Vendor</th>
                  </tr>

                </thead>

                <tbody>

                  {products.map((product) => (

                    <tr key={product._id}>

                      <td className="fw-semibold">
                        {product.name}
                      </td>

                      <td>
                        {product.category}
                      </td>

                      <td>
                        Rs. {product.price}
                      </td>

                      <td>
                        {product.stock}
                      </td>

                      <td>
                        {product.vendor?.name ||
                          "Unknown"}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>
      </div>

      {/* ORDERS */}
      <div className="card border-0 shadow-sm mb-5">

        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <h3 className="fw-bold mb-0">
              Orders Management
            </h3>

            <span className="badge bg-info text-dark">
              {orders.length} Orders
            </span>

          </div>

          {orders.length === 0 ? (

            <div className="alert alert-light border">
              No orders found.
            </div>

          ) : (

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-dark">

                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Update</th>
                  </tr>

                </thead>

                <tbody>

                  {orders.map((order) => (

                    <tr key={order._id}>

                      <td>
                        <small>
                          {order._id}
                        </small>
                      </td>

                      <td>
                        {order.customer?.name ||
                          order.user?.name ||
                          "Customer"}
                      </td>

                      <td>
                        Rs. {order.total}
                      </td>

                      <td>
                        <span className="badge bg-secondary">
                          {order.status}
                        </span>
                      </td>

                      <td>

                        <select
                          className="form-select form-select-sm"
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(
                              order._id,
                              e.target.value
                            )
                          }
                        >

                          <option value="pending">
                            Pending
                          </option>

                          <option value="confirmed">
                            Confirmed
                          </option>

                          <option value="shipped">
                            Shipped
                          </option>

                          <option value="delivered">
                            Delivered
                          </option>

                          <option value="cancelled">
                            Cancelled
                          </option>

                        </select>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>
      </div>

      {/* MARKETPLACE SUMMARY */}
      <div className="card border-0 shadow-sm">

        <div className="card-body p-4">

          <h3 className="fw-bold mb-4">
            Marketplace Summary
          </h3>

          <div className="row g-4">

            <div className="col-md-4">
              <div className="p-4 bg-light rounded">
                <h5 className="fw-bold">
                  Customers
                </h5>

                <h2>
                  {customers.length}
                </h2>

                <p className="text-muted mb-0">
                  Registered customers
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 bg-light rounded">
                <h5 className="fw-bold">
                  Vendors
                </h5>

                <h2>
                  {vendors.length}
                </h2>

                <p className="text-muted mb-0">
                  Active marketplace vendors
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 bg-light rounded">
                <h5 className="fw-bold">
                  Pending Orders
                </h5>

                <h2>
                  {pendingOrders.length}
                </h2>

                <p className="text-muted mb-0">
                  Orders awaiting processing
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
/* =========================
   VENDOR
========================= */

function Vendor() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [editingProduct, setEditingProduct] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: ""
  });

  const currentUser = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  useEffect(() => {
    if (!currentUser || currentUser.role !== "vendor") {
      navigate("/login");
      return;
    }

    loadVendorData();
  }, []);

  const loadVendorData = async () => {
    try {
      setLoading(true);
      setError("");

      const [productsResponse, ordersResponse] = await Promise.all([
        api.get("/products"),
        api.get("/orders/vendor-orders")
      ]);

      setProducts(productsResponse.data.products || []);
      setOrders(ordersResponse.data.orders || []);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Failed to load vendor dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  const myProducts = products.filter(
    (product) =>
      product.vendor &&
      product.vendor._id?.toString() === currentUser?.id?.toString()
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
      stock: ""
    });

    setEditingProduct(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");

      const productData = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        image: form.image,
        stock: Number(form.stock)
      };

      if (editingProduct) {
        const response = await api.put(
          `/products/${editingProduct._id}`,
          productData
        );

        setProducts((prev) =>
          prev.map((product) =>
            product._id === editingProduct._id
              ? response.data.product
              : product
          )
        );

        setMessage("Product updated successfully!");
      } else {
        const response = await api.post(
          "/products",
          productData
        );

        setProducts((prev) => [
          response.data.product,
          ...prev
        ]);

        setMessage("Product added successfully!");
      }

      resetForm();
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);

    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      category: product.category || "",
      image: product.image || "",
      stock: product.stock || ""
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setError("");
      setMessage("");

      await api.delete(`/products/${productId}`);

      setProducts((prev) =>
        prev.filter(
          (product) => product._id !== productId
        )
      );

      setMessage("Product deleted successfully!");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to delete product"
      );
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      setError("");
      setMessage("");

      const response = await api.put(
        `/orders/${orderId}/status`,
        { status }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? response.data.order
            : order
        )
      );

      setMessage("Order status updated successfully!");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to update order status"
      );
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary"></div>
        <p className="mt-3">Loading vendor dashboard...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold mb-1">
            Vendor Dashboard
          </h1>

          <p className="text-muted mb-0">
            Welcome, {currentUser?.name}
          </p>
        </div>

        <span className="badge bg-dark px-3 py-2">
          Vendor
        </span>
      </div>

      {/* MESSAGE */}
      {message && (
        <div className="alert alert-success">
          {message}
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* STATS */}
      <div className="row g-4 mb-5">

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-1">
                My Products
              </p>

              <h2 className="fw-bold">
                {myProducts.length}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-1">
                Vendor Orders
              </p>

              <h2 className="fw-bold">
                {orders.length}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-1">
                Pending Orders
              </p>

              <h2 className="fw-bold">
                {
                  orders.filter(
                    (order) => order.status === "pending"
                  ).length
                }
              </h2>
            </div>
          </div>
        </div>

      </div>

      {/* ADD / UPDATE PRODUCT */}
      <div className="card border-0 shadow-sm mb-5">

        <div className="card-body p-4">

          <h3 className="fw-bold mb-4">
            {editingProduct
              ? "Update Product"
              : "Add New Product"}
          </h3>

          <form onSubmit={handleSubmit}>

            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label">
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  className="form-control"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Enter category"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  className="form-control"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  min="0"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  className="form-control"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="Enter stock quantity"
                  min="0"
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label">
                  Image URL
                </label>

                <input
                  type="text"
                  name="image"
                  className="form-control"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                />
              </div>

              <div className="col-12">
                <label className="form-label">
                  Description
                </label>

                <textarea
                  name="description"
                  className="form-control"
                  rows="4"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Enter product description"
                  required
                ></textarea>
              </div>

              <div className="col-12">

                <button
                  type="submit"
                  className="btn btn-dark me-2"
                >
                  {editingProduct
                    ? "Update Product"
                    : "Add Product"}
                </button>

                {editingProduct && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={resetForm}
                  >
                    Cancel Edit
                  </button>
                )}

              </div>

            </div>

          </form>

        </div>
      </div>

      {/* MY PRODUCTS */}
      <div className="mb-5">

        <div className="d-flex justify-content-between align-items-center mb-3">

          <h3 className="fw-bold mb-0">
            My Products
          </h3>

          <span className="badge bg-primary">
            {myProducts.length} Products
          </span>

        </div>

        {myProducts.length === 0 ? (
          <div className="alert alert-light border">
            You haven't added any products yet.
          </div>
        ) : (
          <div className="row g-4">

            {myProducts.map((product) => (

              <div
                className="col-md-6 col-lg-4"
                key={product._id}
              >

                <div className="card h-100 border-0 shadow-sm">

                  {product.image && (
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.name}
                      style={{
                        height: "220px",
                        objectFit: "cover"
                      }}
                    />
                  )}

                  <div className="card-body">

                    <h5 className="fw-bold">
                      {product.name}
                    </h5>

                    <p className="text-muted small">
                      {product.description}
                    </p>

                    <div className="d-flex justify-content-between mb-3">

                      <strong>
                        Rs. {product.price}
                      </strong>

                      <span className="badge bg-light text-dark">
                        Stock: {product.stock}
                      </span>

                    </div>

                    <div className="d-flex gap-2">

                      <button
                        className="btn btn-outline-primary btn-sm flex-grow-1"
                        onClick={() =>
                          handleEdit(product)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-outline-danger btn-sm flex-grow-1"
                        onClick={() =>
                          handleDelete(product._id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

      {/* VENDOR ORDERS */}
      <div>

        <h3 className="fw-bold mb-3">
          Vendor Orders
        </h3>

        {orders.length === 0 ? (
          <div className="alert alert-light border">
            No orders found for your products.
          </div>
        ) : (

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-dark">

                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Update</th>
                </tr>

              </thead>

              <tbody>

                {orders.map((order) => (

                  <tr key={order._id}>

                    <td>
                      <small>
                        {order._id}
                      </small>
                    </td>

                    <td>
                      {order.customer?.name ||
                        order.user?.name ||
                        "Customer"}
                    </td>

                    <td>
                      Rs. {order.total}
                    </td>

                    <td>
                      <span className="badge bg-secondary">
                        {order.status}
                      </span>
                    </td>

                    <td>

                      <select
                        className="form-select form-select-sm"
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(
                            order._id,
                            e.target.value
                          )
                        }
                      >

                        <option value="pending">
                          Pending
                        </option>

                        <option value="confirmed">
                          Confirmed
                        </option>

                        <option value="shipped">
                          Shipped
                        </option>

                        <option value="delivered">
                          Delivered
                        </option>

                        <option value="cancelled">
                          Cancelled
                        </option>

                      </select>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

/* =========================
   STAT
========================= */

function Stat({
  title,
  value,
  icon
}) {

  return (
    <div className="col-md-6 col-lg-3">

      <div className="stat">

        <i
          className={
            "bi " + icon
          }
        ></i>

        <small>
          {title}
        </small>

        <h3>
          {value}
        </h3>

      </div>

    </div>
  );
}


/* =========================
   MAIN APP
========================= */

export default function App() {

  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  /* =========================
     LOAD SAVED LOGIN TOKEN
  ========================= */

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      setAuthToken(token);
    }

  }, []);


  /* =========================
     LOAD CART FROM DATABASE
  ========================= */

  useEffect(() => {

    const loadCart = async () => {

      try {

        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        setAuthToken(token);

        const response = await api.get("/cart");

        const items = response.data.cart?.items || [];

        const cartProducts = items.flatMap((item) =>
          item.product
            ? Array(item.quantity).fill(item.product)
            : []
        );

        setCart(cartProducts);

      } catch (error) {

        console.error("Cart loading error:", error);

        if (error.response?.status === 401) {

          localStorage.removeItem("token");

          localStorage.removeItem("user");

          setAuthToken(null);

          setCart([]);

        }

      }

    };

    loadCart();

  }, []);


  /* =========================
     LOAD PRODUCTS
  ========================= */

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response = await api.get("/products");

        setProducts(
          response.data.products || []
        );

      } catch (error) {

        console.error(error);

        setError(
          "Unable to load products from NovaCart API."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, []);


  /* =========================
     ADD TO CART
  ========================= */

  const addToCart = async (product) => {

    try {

      const token = localStorage.getItem("token");

      if (!token) {

        alert(
          "Please login first to add products to cart."
        );

        return;

      }

      setAuthToken(token);

      await api.post(
        "/cart/add",
        {
          productId: product._id,
          quantity: 1
        }
      );


      /* DATABASE CART SUCCESSFULLY UPDATED */

      setCart((currentCart) => [
        ...currentCart,
        product
      ]);


      alert(
        "Product added to cart successfully!"
      );


    } catch (error) {

      console.error(error);


      /* TOKEN EXPIRED */

      if (error.response?.status === 401) {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setAuthToken(null);

        setCart([]);

        alert(
          "Your login session expired. Please login again."
        );

        return;

      }


      alert(
        error.response?.data?.message ||
        "Unable to add product to cart."
      );

    }

  };


  /* =========================
     MAIN APP
  ========================= */

  return (

    <BrowserRouter>

      <Nav
        cartCount={cart.length}
      />


      <Routes>


        {/* HOME */}

        <Route
          path="/"
          element={
            <Home
              products={products}
              loading={loading}
              error={error}
              addToCart={addToCart}
            />
          }
        />


        {/* SHOP */}

        <Route
          path="/shop"
          element={
            <Shop
              products={products}
              loading={loading}
              error={error}
              addToCart={addToCart}
            />
          }
        />


        {/* CART */}

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
            />
          }
        />


        {/* CHECKOUT */}

        <Route
          path="/checkout"
          element={
            <Checkout />
          }
        />


        {/* MY ORDERS */}

        <Route
          path="/my-orders"
          element={
            <MyOrders />
          }
        />


        {/* LOGIN */}

        <Route
          path="/login"
          element={
            <Login />
          }
        />


        {/* VENDOR DASHBOARD */}

        <Route
          path="/vendor"
          element={
            <Vendor />
          }
        />


        {/* ADMIN DASHBOARD */}

        <Route
          path="/admin"
          element={
            <Admin />
          }
        />


      </Routes>


      {/* FOOTER */}

      <footer>

        <div className="container d-flex flex-wrap justify-content-between gap-3">

          <div className="brand">
            Nova<span>Cart</span>
          </div>

          <small>
            © 2026 NovaCart · Capstone Project
          </small>

          <small>
            Built with React · Express · MongoDB
          </small>

        </div>

      </footer>


    </BrowserRouter>

  );

}