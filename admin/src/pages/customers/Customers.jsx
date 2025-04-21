import { useState, useEffect } from "react"
import { Search, Eye } from 'lucide-react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./Customers.css"

const Customers = () => {
  const navigate = useNavigate()
  const [customers, setCustomers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/admin/customers/list' ,{withCredentials:true})
      if (response.data.success) {
        setCustomers(response.data.data)
      } else {
        throw new Error(response.data.message || 'Failed to fetch customers')
      }
      setLoading(false)
    } catch (err) {
      setError(err.message || 'An error occurred while fetching customers')
      setLoading(false)
    }
  }

  // Filter customers based on search term and status filter
  // Update the filter function to use correct property names
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      (customer?.cname?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (customer?.cemail?.toLowerCase() || '').includes(searchTerm.toLowerCase())

    // Since all customers are active, only show them when "Active" or "All Status" is selected
    const matchesStatus = statusFilter === "" || statusFilter === "Active"

    return matchesSearch && matchesStatus
  })

  const handleViewCustomer = (customerId) => {
    navigate(`/customer-details/${customerId}`)
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

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
              filteredCustomers.map((customer, index) => (
                <tr key={index} className="customers__table-row">
                  <td className="customers__table-cell customers__id-cell">{index + 1}</td>
                  <td className="customers__table-cell customers__name-cell">{customer?.cname || 'N/A'}</td>
                  <td className="customers__table-cell customers__email-cell">{customer?.cemail || 'N/A'}</td>
                  <td className="customers__table-cell customers__orders-cell">{customer?.ordersLength || 0}</td>
                  <td className="customers__table-cell customers__spent-cell">
                    ${(customer?.totalSpent || 0).toFixed(2)}
                  </td>
                  <td className="customers__table-cell">
                    <span className="customers__status-badge customers__status-badge--active">
                      Active
                    </span>
                  </td>
                  <td className="customers__table-cell customers__actions-cell">
                    <button
                      className="customers__action-button customers__action-button--view"
                      onClick={() => handleViewCustomer(customer._id)}
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
