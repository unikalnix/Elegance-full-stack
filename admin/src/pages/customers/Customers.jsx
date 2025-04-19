"use client"

import { useState } from "react"
import { Search, ArrowLeft, Eye } from 'lucide-react'
import "./Customers.css"

const Customers = () => {
  const [viewCustomer, setViewCustomer] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  // Sample customers data
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      orders: 5,
      totalSpent: 789.95,
      status: "Active",
      joinDate: "Jan 15, 2023",
      lastOrder: "May 12, 2023",
      address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "United States"
      },
      notes: "Prefers email communication. Interested in men's formal wear.",
      recentOrders: [
        { id: "#10001", date: "May 12, 2023", total: 219.98, status: "Delivered" }
      ]
    },
    {
      id: 2,
      name: "Emma Johnson",
      email: "emma.j@example.com",
      phone: "+1 (555) 987-6543",
      orders: 3,
      totalSpent: 459.97,
      status: "Active",
      joinDate: "Feb 3, 2023",
      lastOrder: "May 9, 2023",
      address: {
        street: "456 Park Ave",
        city: "Boston",
        state: "MA",
        zip: "02108",
        country: "United States"
      },
      notes: "Prefers phone calls. Interested in women's accessories.",
      recentOrders: [
        { id: "#10002", date: "May 9, 2023", total: 269.97, status: "Delivered" }
      ]
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.b@example.com",
      phone: "+1 (555) 456-7890",
      orders: 2,
      totalSpent: 219.98,
      status: "Active",
      joinDate: "Mar 10, 2023",
      lastOrder: "Apr 25, 2023",
      address: {
        street: "789 Oak St",
        city: "Chicago",
        state: "IL",
        zip: "60601",
        country: "United States"
      },
      notes: "Prefers SMS notifications. Interested in casual wear.",
      recentOrders: [
        { id: "#10003", date: "Apr 25, 2023", total: 49.99, status: "Cancelled" }
      ]
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.w@example.com",
      phone: "+1 (555) 234-5678",
      orders: 7,
      totalSpent: 1249.93,
      status: "Active",
      joinDate: "Dec 5, 2022",
      lastOrder: "Apr 15, 2023",
      address: {
        street: "321 Pine St",
        city: "San Francisco",
        state: "CA",
        zip: "94105",
        country: "United States"
      },
      notes: "VIP customer. Prefers email. Interested in premium products.",
      recentOrders: [
        { id: "#10004", date: "Apr 15, 2023", total: 359.96, status: "Delivered" }
      ]
    },
    {
      id: 5,
      name: "David Lee",
      email: "david.lee@example.com",
      phone: "+1 (555) 876-5432",
      orders: 1,
      totalSpent: 89.99,
      status: "Active",
      joinDate: "Mar 20, 2023",
      lastOrder: "Mar 28, 2023",
      address: {
        street: "555 Maple Ave",
        city: "Seattle",
        state: "WA",
        zip: "98101",
        country: "United States"
      },
      notes: "New customer. Prefers minimal communication.",
      recentOrders: [
        { id: "#10005", date: "Mar 28, 2023", total: 49.99, status: "Delivered" }
      ]
    }
  ])

  // Filter customers based on search term and status filter
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "" || customer.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleUpdateCustomer = (updatedCustomer) => {
    const updatedCustomers = customers.map((customer) => 
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    )
    setCustomers(updatedCustomers)
    setViewCustomer(updatedCustomer)
  }

  if (viewCustomer) {
    return (
      <CustomerDetails 
        customer={viewCustomer} 
        onBack={() => setViewCustomer(null)} 
        onUpdate={handleUpdateCustomer}
      />
    )
  }

  return (
    <div className="customers">
      <div className="customers__header">
        <h1 className="customers__title">Customers</h1>
      </div>

      <div className="customers__filters">
        <div className="customers__search">
          <Search size={18} className="customers__search-icon" />
          <input
            type="text"
            className="customers__search-input"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="customers__filter">
          <select
            className="customers__filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="customers__table-container">
        <table className="customers__table">
          <thead className="customers__table-head">
            <tr>
              <th className="customers__table-header">ID</th>
              <th className="customers__table-header">Name</th>
              <th className="customers__table-header">Email</th>
              <th className="customers__table-header">Orders</th>
              <th className="customers__table-header">Total Spent</th>
              <th className="customers__table-header">Status</th>
              <th className="customers__table-header">Actions</th>
            </tr>
          </thead>

          <tbody className="customers__table-body">
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <tr key={customer.id} className="customers__table-row">
                  <td className="customers__table-cell customers__id-cell">{customer.id}</td>
                  <td className="customers__table-cell customers__name-cell">{customer.name}</td>
                  <td className="customers__table-cell customers__email-cell">{customer.email}</td>
                  <td className="customers__table-cell customers__orders-cell">{customer.orders}</td>
                  <td className="customers__table-cell customers__spent-cell">${customer.totalSpent.toFixed(2)}</td>
                  <td className="customers__table-cell">
                    <span className={`customers__status-badge customers__status-badge--${customer.status.toLowerCase()}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="customers__table-cell customers__actions-cell">
                    <button
                      className="customers__action-button customers__action-button--view"
                      onClick={() => setViewCustomer(customer)}
                    >
                      <Eye size={16} />
                      <span className="customers__action-text">View</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="customers__table-row customers__table-row--empty">
                <td colSpan={7} className="customers__table-cell customers__table-cell--empty">
                  No customers found. Try adjusting your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const CustomerDetails = ({ customer, onBack, onUpdate }) => {
  const [formData, setFormData] = useState({ ...customer })
  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdate(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({ ...customer })
    setIsEditing(false)
  }

  return (
    <div className="customer-details">
      <div className="customer-details__header">
        <h2 className="customer-details__title">Customer: {customer.name}</h2>
        <button className="customer-details__back-button" onClick={onBack}>
          <ArrowLeft size={16} />
          <span>Back to Customers</span>
        </button>
      </div>

      <form className="customer-details__form" onSubmit={handleSubmit}>
        <div className="customer-details__section">
          <h3 className="customer-details__section-title">Personal Information</h3>
          <div className="customer-details__form-grid">
            <div className="customer-details__form-group">
              <label className="customer-details__label">Name</label>
              <input
                type="text"
                className="customer-details__input"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                required
              />
            </div>

            <div className="customer-details__form-group">
              <label className="customer-details__label">Email</label>
              <input
                type="email"
                className="customer-details__input"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                required
              />
            </div>

            <div className="customer-details__form-group">
              <label className="customer-details__label">Phone</label>
              <input
                type="text"
                className="customer-details__input"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="customer-details__form-group">
              <label className="customer-details__label">Status</label>
              <select
                className="customer-details__select"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                disabled={!isEditing}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="customer-details__section">
          <h3 className="customer-details__section-title">Address</h3>
          <div className="customer-details__form-grid">
            <div className="customer-details__form-group">
              <label className="customer-details__label">Street</label>
              <input
                type="text"
                className="customer-details__input"
                name="address.street"
                value={formData.address.street}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="customer-details__form-group">
              <label className="customer-details__label">City</label>
              <input
                type="text"
                className="customer-details__input"
                name="address.city"
                value={formData.address.city}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="customer-details__form-group">
              <label className="customer-details__label">State</label>
              <input
                type="text"
                className="customer-details__input"
                name="address.state"
                value={formData.address.state}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="customer-details__form-group">
              <label className="customer-details__label">ZIP Code</label>
              <input
                type="text"
                className="customer-details__input"
                name="address.zip"
                value={formData.address.zip}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="customer-details__form-group">
              <label className="customer-details__label">Country</label>
              <input
                type="text"
                className="customer-details__input"
                name="address.country"
                value={formData.address.country}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        <div className="customer-details__section">
          <h3 className="customer-details__section-title">Notes</h3>
          <div className="customer-details__form-group">
            <textarea
              className="customer-details__textarea"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows="4"
            ></textarea>
          </div>
        </div>

        <div className="customer-details__stats">
          <div className="customer-details__stat">
            <span className="customer-details__stat-label">Join Date</span>
            <span className="customer-details__stat-value">{customer.joinDate}</span>
          </div>
          <div className="customer-details__stat">
            <span className="customer-details__stat-label">Total Orders</span>
            <span className="customer-details__stat-value">{customer.orders}</span>
          </div>
          <div className="customer-details__stat">
            <span className="customer-details__stat-label">Total Spent</span>
            <span className="customer-details__stat-value">${customer.totalSpent.toFixed(2)}</span>
          </div>
          <div className="customer-details__stat">
            <span className="customer-details__stat-label">Last Order</span>
            <span className="customer-details__stat-value">{customer.lastOrder}</span>
          </div>
        </div>

        <div className="customer-details__recent-orders">
          <h3 className="customer-details__section-title">Recent Orders</h3>
          <div className="customer-details__table-container">
            <table className="customer-details__table">
              <thead className="customer-details__table-head">
                <tr>
                  <th className="customer-details__table-header">Order ID</th>
                  <th className="customer-details__table-header">Date</th>
                  <th className="customer-details__table-header">Total</th>
                  <th className="customer-details__table-header">Status</th>
                  <th className="customer-details__table-header">Actions</th>
                </tr>
              </thead>
              <tbody className="customer-details__table-body">
                {customer.recentOrders.map((order) => (
                  <tr key={order.id} className="customer-details__table-row">
                    <td className="customer-details__table-cell">{order.id}</td>
                    <td className="customer-details__table-cell">{order.date}</td>
                    <td className="customer-details__table-cell">${order.total.toFixed(2)}</td>
                    <td className="customer-details__table-cell">
                      <span className={`customer-details__status-badge customer-details__status-badge--${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="customer-details__table-cell">
                      <button className="customer-details__view-order-button">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="customer-details__actions">
          {isEditing ? (
            <>
              <button 
                type="button" 
                className="customer-details__cancel-button" 
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="customer-details__save-button"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button 
              type="button" 
              className="customer-details__edit-button" 
              onClick={() => setIsEditing(true)}
            >
              Edit Customer
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default Customers
