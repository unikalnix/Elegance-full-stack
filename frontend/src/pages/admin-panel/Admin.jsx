import { useState } from "react"
import "./Admin.css"

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [products, setProducts] = useState([
    {
      id: 1,
      type: "regular",
      title: "Premium Cotton Shirt",
      description:
        "Our finest cotton shirt crafted from the finest Egyptian cotton, offering exceptional comfort and durability.",
      price: "89.99",
      originalPrice: "89.99",
      images: ["shirt-front.jpg", "shirt-back.jpg"],
      color: {
        white: "#FFFFFF",
        black: "#000000",
        blue: "#0000FF",
      },
      size: ["S", "M", "L", "XL", "XXL"],
      isFeatured: true,
      isOnSale: false,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-28%20024636-OnRLmnplfwPWUqUoxHACvHeDCS9O0p.png",
      discountPercentage: 0,
      category: "men",
      inStock: true,
      details: "Made from 100% premium Egyptian cotton, Classic fit, Button-down collar",
      sizing: "Regular fit",
      care: "Machine washable",
      isNeww: false,
    },
    {
      id: 2,
      type: "sale",
      title: "Designer Slim Fit Jeans",
      description: "Modern slim fit jeans with premium denim quality.",
      price: "129.99",
      originalPrice: "159.99",
      images: ["jeans-front.jpg", "jeans-back.jpg"],
      color: {
        blue: "#0000FF",
      },
      size: ["28", "30", "32", "34", "36"],
      isFeatured: true,
      isOnSale: true,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-28%20024636-OnRLmnplfwPWUqUoxHACvHeDCS9O0p.png",
      discountPercentage: 18,
      category: "men",
      inStock: true,
      details: "Premium denim, Slim fit, Five pockets",
      sizing: "Slim fit, order one size up for comfort",
      care: "Machine wash cold, tumble dry low",
      isNeww: false,
    },
    {
      id: 3,
      type: "new",
      title: "Cashmere Scarf",
      description: "Luxurious cashmere scarf for ultimate comfort and style.",
      price: "49.99",
      originalPrice: "49.99",
      images: ["scarf-front.jpg", "scarf-detail.jpg"],
      color: {
        blue: "#87CEEB",
        beige: "#F5F5DC",
        gray: "#808080",
      },
      size: ["One Size"],
      isFeatured: false,
      isOnSale: false,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-28%20024636-OnRLmnplfwPWUqUoxHACvHeDCS9O0p.png",
      discountPercentage: 0,
      category: "accessories",
      inStock: true,
      details: "100% cashmere, Soft and warm",
      sizing: "One size fits all",
      care: "Dry clean only",
      isNeww: true,
    },
  ])

  // After the state declarations, add these new states for viewing order and customer details
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  // Add more detailed mock data for orders
  const [orders, setOrders] = useState([
    {
      id: "#10001",
      customer: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      date: "May 12, 2023",
      items: [
        {
          id: 1,
          name: "Premium Cotton Shirt",
          color: "White",
          size: "M",
          price: 89.99,
          quantity: 1,
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-28%20024636-OnRLmnplfwPWUqUoxHACvHeDCS9O0p.png",
        },
        {
          id: 2,
          name: "Designer Slim Fit Jeans",
          color: "Blue",
          size: "32",
          price: 129.99,
          quantity: 1,
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-28%20024636-OnRLmnplfwPWUqUoxHACvHeDCS9O0p.png",
        },
      ],
      total: 219.98,
      subtotal: 219.98,
      shipping: 9.99,
      tax: 18.7,
      grandTotal: 248.67,
      status: "Delivered",
      shippingAddress: {
        name: "John Smith",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "United States",
      },
      billingAddress: {
        name: "John Smith",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "United States",
      },
      payment: {
        method: "Credit Card",
        cardNumber: "**** **** **** 4321",
        expiry: "05/25",
      },
      timeline: [
        { status: "Order Placed", date: "May 12, 2023", time: "10:23 AM" },
        { status: "Processing", date: "May 12, 2023", time: "2:45 PM" },
        { status: "Shipped", date: "May 13, 2023", time: "9:30 AM" },
        { status: "Delivered", date: "May 15, 2023", time: "3:15 PM" },
      ],
    },
    {
      id: "#10002",
      customer: "Emma Johnson",
      email: "emma.j@example.com",
      phone: "+1 (555) 987-6543",
      date: "May 9, 2023",
      items: [
        {
          id: 1,
          name: "Premium Cotton Shirt",
          color: "Black",
          size: "S",
          price: 89.99,
          quantity: 1,
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-28%20024636-OnRLmnplfwPWUqUoxHACvHeDCS9O0p.png",
        },
        {
          id: 3,
          name: "Cashmere Scarf",
          color: "Blue",
          size: "One Size",
          price: 49.99,
          quantity: 1,
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-28%20024636-OnRLmnplfwPWUqUoxHACvHeDCS9O0p.png",
        },
        {
          id: 2,
          name: "Designer Slim Fit Jeans",
          color: "Blue",
          size: "28",
          price: 129.99,
          quantity: 1,
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-28%20024636-OnRLmnplfwPWUqUoxHACvHeDCS9O0p.png",
        },
      ],
      total: 269.97,
      subtotal: 269.97,
      shipping: 9.99,
      tax: 22.95,
      grandTotal: 302.91,
      status: "Delivered",
      shippingAddress: {
        name: "Emma Johnson",
        street: "456 Park Ave",
        city: "Boston",
        state: "MA",
        zip: "02108",
        country: "United States",
      },
      billingAddress: {
        name: "Emma Johnson",
        street: "456 Park Ave",
        city: "Boston",
        state: "MA",
        zip: "02108",
        country: "United States",
      },
      payment: {
        method: "Credit Card",
        cardNumber: "**** **** **** 8765",
        expiry: "09/24",
      },
      timeline: [
        { status: "Order Placed", date: "May 9, 2023", time: "11:45 AM" },
        { status: "Processing", date: "May 9, 2023", time: "3:30 PM" },
        { status: "Shipped", date: "May 10, 2023", time: "10:15 AM" },
        { status: "Delivered", date: "May 12, 2023", time: "2:20 PM" },
      ],
    },
    {
      id: "#10003",
      customer: "Michael Brown",
      email: "michael.b@example.com",
      phone: "+1 (555) 456-7890",
      date: "Apr 25, 2023",
      items: [
        {
          id: 3,
          name: "Cashmere Scarf",
          color: "Gray",
          size: "One Size",
          price: 49.99,
          quantity: 1,
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-28%20024636-OnRLmnplfwPWUqUoxHACvHeDCS9O0p.png",
        },
      ],
      total: 49.99,
      subtotal: 49.99,
      shipping: 5.99,
      tax: 4.5,
      grandTotal: 60.48,
      status: "Cancelled",
      shippingAddress: {
        name: "Michael Brown",
        street: "789 Oak St",
        city: "Chicago",
        state: "IL",
        zip: "60601",
        country: "United States",
      },
      billingAddress: {
        name: "Michael Brown",
        street: "789 Oak St",
        city: "Chicago",
        state: "IL",
        zip: "60601",
        country: "United States",
      },
      payment: {
        method: "PayPal",
        email: "michael.b@example.com",
      },
      timeline: [
        { status: "Order Placed", date: "Apr 25, 2023", time: "9:15 AM" },
        { status: "Processing", date: "Apr 25, 2023", time: "11:30 AM" },
        { status: "Cancelled", date: "Apr 25, 2023", time: "4:45 PM" },
      ],
    },
    {
      id: "#10004",
      customer: "Sarah Wilson",
      email: "sarah.w@example.com",
      phone: "+1 (555) 234-5678",
      date: "Apr 15, 2023",
      items: [
        {
          id: 1,
          name: "Premium Cotton Shirt",
          color: "White",
          size: "L",
          price: 89.99,
          quantity: 2,
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-28%20024636-OnRLmnplfwPWUqUoxHACvHeDCS9O0p.png",
        },
        {
          id: 2,
          name: "Designer Slim Fit Jeans",
          color: "Blue",
          size: "30",
          price: 129.99,
          quantity: 1,
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-28%20024636-OnRLmnplfwPWUqUoxHACvHeDCS9O0p.png",
        },
        {
          id: 3,
          name: "Cashmere Scarf",
          color: "Beige",
          size: "One Size",
          price: 49.99,
          quantity: 1,
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-28%20024636-OnRLmnplfwPWUqUoxHACvHeDCS9O0p.png",
        },
      ],
      total: 359.96,
      subtotal: 359.96,
      shipping: 9.99,
      tax: 30.6,
      grandTotal: 400.55,
      status: "Delivered",
      shippingAddress: {
        name: "Sarah Wilson",
        street: "321 Pine St",
        city: "San Francisco",
        state: "CA",
        zip: "94105",
        country: "United States",
      },
      billingAddress: {
        name: "Sarah Wilson",
        street: "321 Pine St",
        city: "San Francisco",
        state: "CA",
        zip: "94105",
        country: "United States",
      },
      payment: {
        method: "Credit Card",
        cardNumber: "**** **** **** 9876",
        expiry: "12/24",
      },
      timeline: [
        { status: "Order Placed", date: "Apr 15, 2023", time: "2:30 PM" },
        { status: "Processing", date: "Apr 15, 2023", time: "4:45 PM" },
        { status: "Shipped", date: "Apr 16, 2023", time: "11:20 AM" },
        { status: "Delivered", date: "Apr 18, 2023", time: "1:15 PM" },
      ],
    },
    {
      id: "#10005",
      customer: "David Lee",
      email: "david.lee@example.com",
      phone: "+1 (555) 876-5432",
      date: "Mar 28, 2023",
      items: [
        {
          id: 3,
          name: "Cashmere Scarf",
          color: "Gray",
          size: "One Size",
          price: 49.99,
          quantity: 1,
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-28%20024636-OnRLmnplfwPWUqUoxHACvHeDCS9O0p.png",
        },
      ],
      total: 49.99,
      subtotal: 49.99,
      shipping: 5.99,
      tax: 4.5,
      grandTotal: 60.48,
      status: "Delivered",
      shippingAddress: {
        name: "David Lee",
        street: "555 Maple Ave",
        city: "Seattle",
        state: "WA",
        zip: "98101",
        country: "United States",
      },
      billingAddress: {
        name: "David Lee",
        street: "555 Maple Ave",
        city: "Seattle",
        state: "WA",
        zip: "98101",
        country: "United States",
      },
      payment: {
        method: "Credit Card",
        cardNumber: "**** **** **** 5432",
        expiry: "08/25",
      },
      timeline: [
        { status: "Order Placed", date: "Mar 28, 2023", time: "10:45 AM" },
        { status: "Processing", date: "Mar 28, 2023", time: "1:30 PM" },
        { status: "Shipped", date: "Mar 29, 2023", time: "9:15 AM" },
        { status: "Delivered", date: "Mar 31, 2023", time: "2:45 PM" },
      ],
    },
  ])

  // Add more detailed mock data for customers
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "United States",
      },
      orders: 5,
      spent: 789.95,
      joinDate: "Jan 15, 2023",
      lastOrder: "May 12, 2023",
      status: "Active",
      notes: "Prefers email communication. Interested in men's formal wear.",
    },
    {
      id: 2,
      name: "Emma Johnson",
      email: "emma.j@example.com",
      phone: "+1 (555) 987-6543",
      address: {
        street: "456 Park Ave",
        city: "Boston",
        state: "MA",
        zip: "02108",
        country: "United States",
      },
      orders: 3,
      spent: 459.97,
      joinDate: "Feb 3, 2023",
      lastOrder: "May 9, 2023",
      status: "Active",
      notes: "Prefers phone calls. Interested in women's accessories.",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.b@example.com",
      phone: "+1 (555) 456-7890",
      address: {
        street: "789 Oak St",
        city: "Chicago",
        state: "IL",
        zip: "60601",
        country: "United States",
      },
      orders: 2,
      spent: 219.98,
      joinDate: "Mar 10, 2023",
      lastOrder: "Apr 25, 2023",
      status: "Active",
      notes: "Prefers SMS notifications. Interested in casual wear.",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.w@example.com",
      phone: "+1 (555) 234-5678",
      address: {
        street: "321 Pine St",
        city: "San Francisco",
        state: "CA",
        zip: "94105",
        country: "United States",
      },
      orders: 7,
      spent: 1249.93,
      joinDate: "Dec 5, 2022",
      lastOrder: "Apr 15, 2023",
      status: "Active",
      notes: "VIP customer. Prefers email. Interested in premium products.",
    },
    {
      id: 5,
      name: "David Lee",
      email: "david.lee@example.com",
      phone: "+1 (555) 876-5432",
      address: {
        street: "555 Maple Ave",
        city: "Seattle",
        state: "WA",
        zip: "98101",
        country: "United States",
      },
      orders: 1,
      spent: 89.99,
      joinDate: "Mar 20, 2023",
      lastOrder: "Mar 28, 2023",
      status: "Active",
      notes: "New customer. Prefers minimal communication.",
    },
  ])

  // Add a function to handle viewing order details
  const handleViewOrder = (orderId) => {
    const order = orders.find((order) => order.id === orderId)
    setSelectedOrder(order)
  }

  // Add a function to handle viewing customer details
  const handleViewCustomer = (customerId) => {
    const customer = customers.find((customer) => customer.id === customerId)
    setSelectedCustomer(customer)
  }

  // Add a function to handle updating order status
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        return {
          ...order,
          status: newStatus,
          timeline: [
            ...order.timeline,
            {
              status: newStatus,
              date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
              time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true }),
            },
          ],
        }
      }
      return order
    })

    setOrders(updatedOrders)
    setSelectedOrder(updatedOrders.find((order) => order.id === orderId))
  }

  // Add a function to handle updating customer information
  const handleUpdateCustomer = (e) => {
    e.preventDefault()

    const updatedCustomers = customers.map((customer) => {
      if (customer.id === selectedCustomer.id) {
        return selectedCustomer
      }
      return customer
    })

    setCustomers(updatedCustomers)
    setSelectedCustomer(null)
  }

  // Add a function to handle customer input changes
  const handleCustomerInputChange = (e) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setSelectedCustomer({
        ...selectedCustomer,
        [parent]: {
          ...selectedCustomer[parent],
          [child]: value,
        },
      })
    } else {
      setSelectedCustomer({
        ...selectedCustomer,
        [name]: value,
      })
    }
  }

  const [newProduct, setNewProduct] = useState({
    type: "regular",
    title: "",
    description: "",
    price: "",
    originalPrice: "",
    images: [],
    color: {},
    size: [],
    isFeatured: false,
    isOnSale: false,
    image: "",
    discountPercentage: 0,
    category: "men",
    inStock: true,
    details: "",
    sizing: "",
    care: "",
    isNeww: false,
  })

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [isEditingProduct, setIsEditingProduct] = useState(false)
  const [colorName, setColorName] = useState("")
  const [colorValue, setColorValue] = useState("#000000")
  const [sizeValue, setSizeValue] = useState("")

  // Dashboard stats
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0)
  const totalOrders = orders.length
  const totalProducts = products.length
  const totalCustomers = customers.length

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === "checkbox") {
      setNewProduct({ ...newProduct, [name]: checked })
    } else {
      setNewProduct({ ...newProduct, [name]: value })
    }
  }

  const handleAddColor = () => {
    if (colorName && colorValue) {
      setNewProduct({
        ...newProduct,
        color: { ...newProduct.color, [colorName]: colorValue },
      })
      setColorName("")
      setColorValue("#000000")
    }
  }

  const handleRemoveColor = (colorToRemove) => {
    const updatedColors = { ...newProduct.color }
    delete updatedColors[colorToRemove]
    setNewProduct({ ...newProduct, color: updatedColors })
  }

  const handleAddSize = () => {
    if (sizeValue && !newProduct.size.includes(sizeValue)) {
      setNewProduct({
        ...newProduct,
        size: [...newProduct.size, sizeValue],
      })
      setSizeValue("")
    }
  }

  const handleRemoveSize = (sizeToRemove) => {
    setNewProduct({
      ...newProduct,
      size: newProduct.size.filter((size) => size !== sizeToRemove),
    })
  }

  const handleAddImage = (e) => {
    if (e.target.value) {
      setNewProduct({
        ...newProduct,
        images: [...newProduct.images, e.target.value],
        image: newProduct.image || e.target.value, // Set main image if not already set
      })
      e.target.value = ""
    }
  }

  const handleRemoveImage = (imageToRemove) => {
    setNewProduct({
      ...newProduct,
      images: newProduct.images.filter((image) => image !== imageToRemove),
    })
  }

  const handleAddProduct = (e) => {
    e.preventDefault()

    // Validate form
    if (!newProduct.title || !newProduct.price || !newProduct.category) {
      alert("Please fill in all required fields")
      return
    }

    const productToAdd = {
      ...newProduct,
      id: products.length + 1,
      originalPrice: newProduct.isOnSale ? newProduct.originalPrice : newProduct.price,
    }

    setProducts([...products, productToAdd])
    setIsAddingProduct(false)
    setNewProduct({
      type: "regular",
      title: "",
      description: "",
      price: "",
      originalPrice: "",
      images: [],
      color: {},
      size: [],
      isFeatured: false,
      isOnSale: false,
      image: "",
      discountPercentage: 0,
      category: "men",
      inStock: true,
      details: "",
      sizing: "",
      care: "",
      isNeww: false,
    })
  }

  const handleEditProduct = (product) => {
    setSelectedProduct(product)
    setNewProduct(product)
    setIsEditingProduct(true)
  }

  const handleUpdateProduct = (e) => {
    e.preventDefault()

    const updatedProducts = products.map((product) => (product.id === selectedProduct.id ? newProduct : product))

    setProducts(updatedProducts)
    setIsEditingProduct(false)
    setSelectedProduct(null)
    setNewProduct({
      type: "regular",
      title: "",
      description: "",
      price: "",
      originalPrice: "",
      images: [],
      color: {},
      size: [],
      isFeatured: false,
      isOnSale: false,
      image: "",
      discountPercentage: 0,
      category: "men",
      inStock: true,
      details: "",
      sizing: "",
      care: "",
      isNeww: false,
    })
  }

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== productId))
    }
  }

  const renderDashboard = () => (
    <div className="admin-dashboard">
      <h2>Dashboard</h2>

      <div className="admin-stats">
        <div className="admin-stat-card">
          <div className="admin-stat-icon admin-stat-icon-sales">$</div>
          <div className="admin-stat-content">
            <h3>${totalSales.toFixed(2)}</h3>
            <p>Total Sales</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon admin-stat-icon-orders">O</div>
          <div className="admin-stat-content">
            <h3>{totalOrders}</h3>
            <p>Total Orders</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon admin-stat-icon-products">P</div>
          <div className="admin-stat-content">
            <h3>{totalProducts}</h3>
            <p>Products</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon admin-stat-icon-customers">C</div>
          <div className="admin-stat-content">
            <h3>{totalCustomers}</h3>
            <p>Customers</p>
          </div>
        </div>
      </div>

      <div className="admin-recent-section">
        <div className="admin-recent-orders">
          <div className="admin-section-header">
            <h3>Recent Orders</h3>
            <button onClick={() => setActiveTab("orders")}>View All</button>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.date}</td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>
                    <span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderProductForm = () => (
    <div className="admin-product-form">
      <div className="admin-section-header">
        <h3>{isEditingProduct ? "Edit Product" : "Add New Product"}</h3>
        <button
          className="admin-button-secondary"
          onClick={() => {
            setIsAddingProduct(false)
            setIsEditingProduct(false)
          }}
        >
          Cancel
        </button>
      </div>

      <form onSubmit={isEditingProduct ? handleUpdateProduct : handleAddProduct}>
        <div className="admin-form-grid">
          <div className="admin-form-column">
            <div className="admin-form-group">
              <label>Product Type</label>
              <select name="type" value={newProduct.type} onChange={handleInputChange}>
                <option value="regular">Regular</option>
                <option value="sale">Sale</option>
                <option value="new">New</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label>Title*</label>
              <input type="text" name="title" value={newProduct.title} onChange={handleInputChange} required />
            </div>

            <div className="admin-form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                rows="4"
              ></textarea>
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label>Price*</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  step="0.01"
                  required
                />
              </div>

              {newProduct.isOnSale && (
                <div className="admin-form-group">
                  <label>Original Price</label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={newProduct.originalPrice}
                    onChange={handleInputChange}
                    step="0.01"
                  />
                </div>
              )}
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label>Category*</label>
                <select name="category" value={newProduct.category} onChange={handleInputChange} required>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label>Discount Percentage</label>
                <input
                  type="number"
                  name="discountPercentage"
                  value={newProduct.discountPercentage}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label>Details</label>
              <textarea name="details" value={newProduct.details} onChange={handleInputChange} rows="3"></textarea>
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label>Sizing</label>
                <input type="text" name="sizing" value={newProduct.sizing} onChange={handleInputChange} />
              </div>

              <div className="admin-form-group">
                <label>Care</label>
                <input type="text" name="care" value={newProduct.care} onChange={handleInputChange} />
              </div>
            </div>
          </div>

          <div className="admin-form-column">
            <div className="admin-form-group">
              <label>Main Image URL</label>
              <input type="text" name="image" value={newProduct.image} onChange={handleInputChange} />
              {newProduct.image && (
                <div className="admin-image-preview">
                  <img src={newProduct.image || "/placeholder.svg"} alt="Main product" />
                </div>
              )}
            </div>

            <div className="admin-form-group">
              <label>Additional Images</label>
              <div className="admin-input-with-button">
                <input type="text" id="imageUrl" placeholder="Enter image URL" />
                <button type="button" onClick={(e) => handleAddImage(e)}>
                  Add
                </button>
              </div>

              <div className="admin-images-list">
                {newProduct.images.map((image, index) => (
                  <div key={index} className="admin-image-item">
                    <span>{image}</span>
                    <button type="button" onClick={() => handleRemoveImage(image)}>
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-form-group">
              <label>Colors</label>
              <div className="admin-input-with-button">
                <input
                  type="text"
                  value={colorName}
                  onChange={(e) => setColorName(e.target.value)}
                  placeholder="Color name (e.g. red)"
                />
                <input type="color" value={colorValue} onChange={(e) => setColorValue(e.target.value)} />
                <button type="button" onClick={handleAddColor}>
                  Add
                </button>
              </div>

              <div className="admin-colors-list">
                {Object.entries(newProduct.color).map(([name, value]) => (
                  <div key={name} className="admin-color-item">
                    <span style={{ backgroundColor: value }} className="admin-color-swatch"></span>
                    <span>{name}</span>
                    <button type="button" onClick={() => handleRemoveColor(name)}>
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-form-group">
              <label>Sizes</label>
              <div className="admin-input-with-button">
                <input
                  type="text"
                  value={sizeValue}
                  onChange={(e) => setSizeValue(e.target.value)}
                  placeholder="Size (e.g. S, M, L, XL)"
                />
                <button type="button" onClick={handleAddSize}>
                  Add
                </button>
              </div>

              <div className="admin-sizes-list">
                {newProduct.size.map((size, index) => (
                  <div key={index} className="admin-size-item">
                    <span>{size}</span>
                    <button type="button" onClick={() => handleRemoveSize(size)}>
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-form-checkboxes">
              <div className="admin-form-checkbox">
                <input
                  type="checkbox"
                  id="inStock"
                  name="inStock"
                  checked={newProduct.inStock}
                  onChange={handleInputChange}
                />
                <label htmlFor="inStock">In Stock</label>
              </div>

              <div className="admin-form-checkbox">
                <input
                  type="checkbox"
                  id="isFeatured"
                  name="isFeatured"
                  checked={newProduct.isFeatured}
                  onChange={handleInputChange}
                />
                <label htmlFor="isFeatured">Featured</label>
              </div>

              <div className="admin-form-checkbox">
                <input
                  type="checkbox"
                  id="isOnSale"
                  name="isOnSale"
                  checked={newProduct.isOnSale}
                  onChange={handleInputChange}
                />
                <label htmlFor="isOnSale">On Sale</label>
              </div>

              <div className="admin-form-checkbox">
                <input
                  type="checkbox"
                  id="isNeww"
                  name="isNeww"
                  checked={newProduct.isNeww}
                  onChange={handleInputChange}
                />
                <label htmlFor="isNeww">New Arrival</label>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-form-actions">
          <button
            type="button"
            className="admin-button-secondary"
            onClick={() => {
              setIsAddingProduct(false)
              setIsEditingProduct(false)
            }}
          >
            Cancel
          </button>
          <button type="submit" className="admin-button-primary">
            {isEditingProduct ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  )

  const renderProducts = () => (
    <div className="admin-products">
      {isAddingProduct || isEditingProduct ? (
        renderProductForm()
      ) : (
        <>
          <div className="admin-section-header">
            <h2>Products</h2>
            <button className="admin-button-primary" onClick={() => setIsAddingProduct(true)}>
              Add New Product
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      <div className="admin-product-image">
                        {product.image ? (
                          <img src={product.image || "/placeholder.svg"} alt={product.title} />
                        ) : (
                          <div className="admin-no-image">No Image</div>
                        )}
                      </div>
                    </td>
                    <td>{product.title}</td>
                    <td>{product.category}</td>
                    <td>${product.price}</td>
                    <td>
                      <span className={`status-badge ${product.inStock ? "status-delivered" : "status-cancelled"}`}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button
                          className="admin-action-button admin-edit-button"
                          onClick={() => handleEditProduct(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="admin-action-button admin-delete-button"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )

  // Replace the renderOrders function with this enhanced version
  const renderOrders = () => (
    <div className="admin-orders">
      {selectedOrder ? (
        <div className="admin-order-detail">
          <div className="admin-section-header">
            <h2>Order {selectedOrder.id}</h2>
            <button className="admin-button-secondary" onClick={() => setSelectedOrder(null)}>
              Back to Orders
            </button>
          </div>

          <div className="admin-order-meta">
            <div className="admin-order-meta-item">
              <span className="admin-order-meta-label">Date:</span>
              <span>{selectedOrder.date}</span>
            </div>
            <div className="admin-order-meta-item">
              <span className="admin-order-meta-label">Customer:</span>
              <span>{selectedOrder.customer}</span>
            </div>
            <div className="admin-order-meta-item">
              <span className="admin-order-meta-label">Status:</span>
              <span className={`status-badge status-${selectedOrder.status.toLowerCase()}`}>
                {selectedOrder.status}
              </span>
            </div>
          </div>

          <div className="admin-order-update">
            <h3>Update Status</h3>
            <div className="admin-order-update-controls">
              <select id="orderStatus" defaultValue={selectedOrder.status}>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button
                className="admin-button-primary"
                onClick={() => handleUpdateOrderStatus(selectedOrder.id, document.getElementById("orderStatus").value)}
              >
                Update
              </button>
            </div>
          </div>

          <div className="admin-order-timeline">
            <h3>Order Timeline</h3>
            <div className="admin-timeline">
              {selectedOrder.timeline.map((event, index) => (
                <div key={index} className="admin-timeline-item">
                  <div className="admin-timeline-marker"></div>
                  <div className="admin-timeline-content">
                    <div className="admin-timeline-status">{event.status}</div>
                    <div className="admin-timeline-date">
                      {event.date} at {event.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-order-items">
            <h3>Order Items</h3>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="admin-order-product">
                          <div className="admin-product-image">
                            <img src={item.image || "/placeholder.svg"} alt={item.name} />
                          </div>
                          <div className="admin-product-details">
                            <div className="admin-product-name">{item.name}</div>
                            <div className="admin-product-variant">
                              Color: {item.color}, Size: {item.size}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>{item.quantity}</td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="admin-order-sections">
            <div className="admin-order-section">
              <h3>Customer Information</h3>
              <div className="admin-order-info-grid">
                <div className="admin-order-info-section">
                  <h4>Contact Information</h4>
                  <p>
                    {selectedOrder.customer}
                    <br />
                    {selectedOrder.email}
                    <br />
                    {selectedOrder.phone}
                  </p>
                </div>

                <div className="admin-order-info-section">
                  <h4>Shipping Address</h4>
                  <p>
                    {selectedOrder.shippingAddress.name}
                    <br />
                    {selectedOrder.shippingAddress.street}
                    <br />
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}{" "}
                    {selectedOrder.shippingAddress.zip}
                    <br />
                    {selectedOrder.shippingAddress.country}
                  </p>
                </div>

                <div className="admin-order-info-section">
                  <h4>Billing Address</h4>
                  <p>
                    {selectedOrder.billingAddress.name}
                    <br />
                    {selectedOrder.billingAddress.street}
                    <br />
                    {selectedOrder.billingAddress.city}, {selectedOrder.billingAddress.state}{" "}
                    {selectedOrder.billingAddress.zip}
                    <br />
                    {selectedOrder.billingAddress.country}
                  </p>
                </div>

                <div className="admin-order-info-section">
                  <h4>Payment Information</h4>
                  <p>
                    {selectedOrder.payment.method}
                    <br />
                    {selectedOrder.payment.cardNumber ? (
                      <>
                        {selectedOrder.payment.cardNumber}
                        <br />
                        Exp: {selectedOrder.payment.expiry}
                      </>
                    ) : (
                      selectedOrder.payment.email
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="admin-order-section">
              <h3>Order Summary</h3>
              <div className="admin-order-summary">
                <div className="admin-order-summary-row">
                  <span>Subtotal</span>
                  <span>${selectedOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="admin-order-summary-row">
                  <span>Shipping</span>
                  <span>${selectedOrder.shipping.toFixed(2)}</span>
                </div>
                <div className="admin-order-summary-row">
                  <span>Tax</span>
                  <span>${selectedOrder.tax.toFixed(2)}</span>
                </div>
                <div className="admin-order-summary-row admin-order-summary-total">
                  <span>Total</span>
                  <span>${selectedOrder.grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="admin-order-actions">
            <button className="admin-button-secondary">Download Invoice</button>
            <button className="admin-button-secondary">Print Order</button>
          </div>
        </div>
      ) : (
        <>
          <div className="admin-section-header">
            <h2>Orders</h2>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.date}</td>
                    <td>{order.items.length}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button
                          className="admin-action-button admin-view-button"
                          onClick={() => handleViewOrder(order.id)}
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )

  // Replace the renderCustomers function with this enhanced version
  const renderCustomers = () => (
    <div className="admin-customers">
      {selectedCustomer ? (
        <div className="admin-customer-detail">
          <div className="admin-section-header">
            <h2>Customer: {selectedCustomer.name}</h2>
            <button className="admin-button-secondary" onClick={() => setSelectedCustomer(null)}>
              Back to Customers
            </button>
          </div>

          <form onSubmit={handleUpdateCustomer}>
            <div className="admin-customer-sections">
              <div className="admin-customer-section">
                <h3>Personal Information</h3>
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={selectedCustomer.name} onChange={handleCustomerInputChange} />
                  </div>
                  <div className="admin-form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={selectedCustomer.email}
                      onChange={handleCustomerInputChange}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={selectedCustomer.phone}
                      onChange={handleCustomerInputChange}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Status</label>
                    <select name="status" value={selectedCustomer.status} onChange={handleCustomerInputChange}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="admin-customer-section">
                <h3>Address</h3>
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Street</label>
                    <input
                      type="text"
                      name="address.street"
                      value={selectedCustomer.address.street}
                      onChange={handleCustomerInputChange}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="address.city"
                      value={selectedCustomer.address.city}
                      onChange={handleCustomerInputChange}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>State</label>
                    <input
                      type="text"
                      name="address.state"
                      value={selectedCustomer.address.state}
                      onChange={handleCustomerInputChange}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>ZIP Code</label>
                    <input
                      type="text"
                      name="address.zip"
                      value={selectedCustomer.address.zip}
                      onChange={handleCustomerInputChange}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Country</label>
                    <input
                      type="text"
                      name="address.country"
                      value={selectedCustomer.address.country}
                      onChange={handleCustomerInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="admin-customer-section">
                <h3>Notes</h3>
                <div className="admin-form-group">
                  <textarea
                    name="notes"
                    value={selectedCustomer.notes}
                    onChange={handleCustomerInputChange}
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="admin-customer-stats">
              <div className="admin-customer-stat">
                <span className="admin-customer-stat-label">Join Date</span>
                <span className="admin-customer-stat-value">{selectedCustomer.joinDate}</span>
              </div>
              <div className="admin-customer-stat">
                <span className="admin-customer-stat-label">Total Orders</span>
                <span className="admin-customer-stat-value">{selectedCustomer.orders}</span>
              </div>
              <div className="admin-customer-stat">
                <span className="admin-customer-stat-label">Total Spent</span>
                <span className="admin-customer-stat-value">${selectedCustomer.spent.toFixed(2)}</span>
              </div>
              <div className="admin-customer-stat">
                <span className="admin-customer-stat-label">Last Order</span>
                <span className="admin-customer-stat-value">{selectedCustomer.lastOrder}</span>
              </div>
            </div>

            <div className="admin-customer-orders">
              <h3>Recent Orders</h3>
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders
                      .filter((order) => order.customer === selectedCustomer.name)
                      .map((order) => (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td>{order.date}</td>
                          <td>${order.total.toFixed(2)}</td>
                          <td>
                            <span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span>
                          </td>
                          <td>
                            <div className="admin-actions">
                              <button
                                className="admin-action-button admin-view-button"
                                onClick={() => handleViewOrder(order.id)}
                              >
                                View
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="admin-form-actions">
              <button type="button" className="admin-button-secondary" onClick={() => setSelectedCustomer(null)}>
                Cancel
              </button>
              <button type="submit" className="admin-button-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className="admin-section-header">
            <h2>Customers</h2>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Orders</th>
                  <th>Total Spent</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.orders}</td>
                    <td>${customer.spent.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge status-${customer.status.toLowerCase()}`}>{customer.status}</span>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button
                          className="admin-action-button admin-view-button"
                          onClick={() => handleViewCustomer(customer.id)}
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard()
      case "products":
        return renderProducts()
      case "orders":
        return renderOrders()
      case "customers":
        return renderCustomers()
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h1>Elegance</h1>
          <span className="admin-badge">Admin</span>
        </div>

        <ul className="admin-menu">
          <li className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>
            Dashboard
          </li>
          <li className={activeTab === "products" ? "active" : ""} onClick={() => setActiveTab("products")}>
            Products
          </li>
          <li className={activeTab === "orders" ? "active" : ""} onClick={() => setActiveTab("orders")}>
            Orders
          </li>
          <li className={activeTab === "customers" ? "active" : ""} onClick={() => setActiveTab("customers")}>
            Customers
          </li>
        </ul>

        <div className="admin-user">
          <div className="admin-user-avatar"></div>
          <div className="admin-user-info">
            <h3>Admin User</h3>
            <p>Administrator</p>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <header className="admin-header">
          <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
          <div className="admin-header-actions">
            <button className="admin-notification-button">
              <span className="admin-notification-badge">3</span>
            </button>
            <button className="admin-logout-button">Logout</button>
          </div>
        </header>

        <main className="admin-main">{renderContent()}</main>
      </div>
    </div>
  )
}

export default Admin
