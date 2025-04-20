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


export default Customers
