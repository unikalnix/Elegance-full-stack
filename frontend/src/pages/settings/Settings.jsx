// Imports
import React, { useState } from "react";
import "./Settings.css";
import Breadcrumb from "../../components/ui/breadcrumb/Breadcrumb";
import { Bell, ShieldCheck, Trash, User } from "lucide-react";

// Component Function
const Settings = () => {
  // Declarations
  const [step, setStep] = useState(1);

  // Return Component
  return (
    <div className="settings">
      <Breadcrumb links={["home", "dashboard", "settings"]} />
      <h1 className="settings__title">Settings</h1>

      <div className="settings__menu">
        <h1
          onClick={() => setStep(1)}
          className={`settings__menu-item ${
            step === 1 && "settings__menu-item--active"
          }`}
        >
          <User /> Account
        </h1>
        <h1
          onClick={() => setStep(2)}
          className={`settings__menu-item ${
            step === 2 && "settings__menu-item--active"
          }`}
        >
          <ShieldCheck /> Security
        </h1>
        <h1
          onClick={() => setStep(3)}
          className={`settings__menu-item ${
            step === 3 && "settings__menu-item--active"
          }`}
        >
          <Bell /> Notifications
        </h1>
      </div>

      {/* Personal Information */}
      {step === 1 && (
        <div className="settings__section">
          <h1 className="settings__section-title">Personal Information</h1>
          <form className="settings__form">
            <div className="settings__form-group">
              <div className="settings__form-field">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" />
              </div>
              <div className="settings__form-field">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" />
              </div>
            </div>

            <div className="settings__form-group">
              <div className="settings__form-field">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" />
              </div>
              <div className="settings__form-field">
                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" />
              </div>
            </div>
            <input
              type="submit"
              value="Save Changes"
              className="settings__button"
            />
          </form>
          <hr />
          <h1 className="settings__danger-title">Danger Zone</h1>
          <p className="settings__danger-text">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <button className="settings__button--danger">
            <Trash /> Delete Account
          </button>
        </div>
      )}

      {/* Security */}
      {step === 2 && (
        <div className="settings__section">
          <h1 className="settings__section-title">Change Password</h1>
          <form className="settings__form-change-pass">
            <label htmlFor="currentPassword">Current Password</label>
            <input type="password" id="currentPassword" />
            <label htmlFor="newPassword">New Password</label>
            <input type="password" id="newPassword" />
            <label htmlFor="confirmNewPassword">Confirm New Password</label>
            <input type="password" id="confirmNewPassword" />

            <input
              type="submit"
              value="Update Password"
              className="settings__button"
            />
          </form>
        </div>
      )}

      {/* Notifications */}
      {step === 3 && (
        <div className="settings__section">
          <h1 className="settings__section-title">Email Notifications</h1>

          {["Email Notifications", "Order Updates", "Marketing Emails"].map(
            (title, index) => (
              <div className="settings__notification" key={index}>
                <div className="settings__notification-info">
                  <h1 className="settings__notification-title">{title}</h1>
                  <p className="settings__notification-text">
                    {title === "Email Notifications"
                      ? "Receive email notifications"
                      : title === "Order Updates"
                      ? "Receive updates about your orders"
                      : "Receive promotional emails and offers"}
                  </p>
                </div>
                <div className="settings__notification-toggle">Tick</div>
                <hr />
              </div>
            )
          )}

          <button className="settings__button-prefrences">
            Save Preferences
          </button>
        </div>
      )}
    </div>
  );
};

export default Settings;
