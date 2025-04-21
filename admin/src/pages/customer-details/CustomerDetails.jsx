import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import axios from 'axios'
import './CustomerDetails.css'

const CustomerDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [customerData, setCustomerData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCustomerDetails()
  }, [id])

  const fetchCustomerDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/admin/customer/${id}`, {
        withCredentials: true
      })
      if (response.data.success) {
        setCustomerData(response.data.customerDetails)
      } else {
        throw new Error(response.data.message || 'Failed to fetch customer details')
      }
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleBack = () => {
    navigate('/customers')
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!customerData) return <div>No customer data found</div>

  return (
    <div className="customer-details">
      <div className="customer-details__header">
        <h2 className="customer-details__title">Customer: {customerData.customerName}</h2>
        <button className="customer-details__back-button" onClick={handleBack}>
          <ArrowLeft size={16} />
          <span>Back to Customers</span>
        </button>
      </div>

      <div className="customer-details__stats">
        <div className="customer-details__stat">
          <span className="customer-details__stat-label">Join Date</span>
          <span className="customer-details__stat-value">
            {new Date(customerData.joinDate).toLocaleDateString()}
          </span>
        </div>
        <div className="customer-details__stat">
          <span className="customer-details__stat-label">Total Orders</span>
          <span className="customer-details__stat-value">{customerData.totalOrders}</span>
        </div>
        <div className="customer-details__stat">
          <span className="customer-details__stat-label">Total Spent</span>
          <span className="customer-details__stat-value">${customerData.totalSpent.toFixed(2)}</span>
        </div>
        {customerData.lastOrder && (
          <div className="customer-details__stat">
            <span className="customer-details__stat-label">Most Recent Order</span>
            <span className="customer-details__stat-value">
              {customerData.lastOrder.orderNo}
            </span>
          </div>
        )}
      </div>

      {/* All Orders Section */}
      {customerData.orders && customerData.orders.length > 0 && (
        <div className="customer-details__section">
          <h3 className="customer-details__section-title">Order History</h3>
          <div className="customer-details__orders-list">
            {customerData.orders.map((order) => (
              <div key={order.orderId} className="customer-details__order-card">
                <div className="customer-details__order-header">
                  <h4>Order #{order.orderId}</h4>
                  <span className={`customer-details__order-status customer-details__order-status--${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
                <div className="customer-details__order-details">
                  <p>Date: {order.date}</p>
                  <p>Items: {order.items}</p>
                  <p>Total: ${order.total.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Latest Order Details Section */}
      {customerData.lastOrder && (
        <div className="customer-details__section">
          <h3 className="customer-details__section-title">Latest Order Details</h3>
          <div className="customer-details__order-info">
            <p>Order Number: {customerData.lastOrder.orderNo}</p>
            <p>Status: {customerData.lastOrder.status}</p>
            <p>Total: ${customerData.lastOrder.orderTotal.toFixed(2)}</p>
            <p>Estimated Delivery: {customerData.lastOrder.estimatedDelivery}</p>
            
            <h4>Shipping Details</h4>
            <p>{customerData.lastOrder.shippingDetails.firstName} {customerData.lastOrder.shippingDetails.lastName}</p>
            <p>{customerData.lastOrder.shippingDetails.email}</p>
            <p>{customerData.lastOrder.shippingDetails.address}</p>
            <p>{customerData.lastOrder.shippingDetails.country}</p>

            <h4>Payment Method</h4>
            <p>Card: {customerData.lastOrder.paymentMethod.cardNo}</p>

            <h4>Order Items</h4>
            {customerData.lastOrder.items.map((item, index) => (
              <div key={item._id} className="customer-details__order-item">
                <img src={item.image} alt={item.title} className="customer-details__item-image" />
                <div className="customer-details__item-details">
                  <p>{item.title}</p>
                  <p>Color: {item.color.join(', ')}</p>
                  <p>Size: {item.size.join(', ')}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total: ${item.totalPrice}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomerDetails