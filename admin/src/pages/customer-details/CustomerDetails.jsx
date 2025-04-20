import './CustomerDetails.css'

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

export default CustomerDetails;