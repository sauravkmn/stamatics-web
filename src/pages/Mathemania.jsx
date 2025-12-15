import React, { useState, useEffect } from "react";
import { GOOGLE_SCRIPT_URL } from "../config";

import "../styles/pages/mathemania.css"; // ← ONLY ADDITION

function Mathemania() {
  const [formData, setFormData] = useState({
    teamName: "", 
    institute: "", 
    teamLeader: "", 
    email: "", 
    contactNumber: "",
    member2Name: "", member2Email: "", 
    member3Name: "", member3Email: "", 
    member4Name: "", member4Email: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  // --- 1. FETCH ANNOUNCEMENT ON LOAD ---
  useEffect(() => {
    fetch(`${GOOGLE_SCRIPT_URL}?action=get_announcement`)
      .then(res => res.json())
      .then(data => { if (data.text) setAnnouncement(data.text); })
      .catch(err => console.error("Error fetching announcement:", err));
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // --- 2. SUBMIT FORM ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(formData)
      });

      alert("🎉 Registration Successful! We have received your details.");
      
      // Reset form
      setFormData({ 
        teamName: "", institute: "", teamLeader: "", email: "", contactNumber: "", 
        member2Name: "", member2Email: "", member3Name: "", member3Email: "", member4Name: "", member4Email: ""
      });
      
    } catch (error) {
      console.error("Submit error:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mathemania-page">
      <div className="mathemania-inner">
        {/* HEADER */}
        <header className="mathemania-header">
          <h1 className="mathemania-title">Mathemania</h1>
          
          {announcement && (
             <div style={styles.announcementBanner}>
               <strong>📢 UPDATE:</strong> {announcement}
             </div>
          )}

          <p className="mathemania-subtitle">
            The flagship mathematics contest of Stamatics, IIT Kanpur.
          </p>
        </header>

        {/* REGISTRATION CARD */}
        <div className="mathemania-card">
          <h2 className="mathemania-card-title">Registration Form</h2>
          <p className="mathemania-text">Group size limit: up to 4 members.</p>

          <form className="mathemania-form" onSubmit={handleSubmit}>
            
            {/* CORE DETAILS */}
            <div className="mathemania-field">
              <label>Team Name*</label>
              <input name="teamName" required value={formData.teamName} onChange={handleChange} placeholder="Enter unique team name" />
            </div>
            <div className="mathemania-field">
                <label>Institute*</label>
                <input name="institute" required value={formData.institute} onChange={handleChange} placeholder="College / School Name" />
            </div>
            <div className="mathemania-field">
                <label>Team Leader Name*</label>
                <input name="teamLeader" required value={formData.teamLeader} onChange={handleChange} />
            </div>
            <div className="mathemania-field">
                <label>Email*</label>
                <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="leader@example.com" />
            </div>
            <div className="mathemania-field">
                <label>Contact Number*</label>
                <input name="contactNumber" required value={formData.contactNumber} onChange={handleChange} placeholder="10-digit mobile number" />
            </div>

            {/* MEMBERS SECTION */}
            <div style={{marginTop: "20px", marginBottom: "10px"}}>
                <p className="mathemania-text" style={{fontStyle:"italic", color: "#94a3b8"}}>Additional Members (Optional)</p>
            </div>
            
            <div className="mathemania-field-group">
               <input name="member2Name" placeholder="Member 2 Name" value={formData.member2Name} onChange={handleChange} style={styles.fieldInput}/>
               <input name="member2Email" placeholder="Member 2 Email" value={formData.member2Email} onChange={handleChange} style={styles.fieldInput}/>
            </div>
            <div className="mathemania-field-group" style={{marginTop: "10px"}}>
               <input name="member3Name" placeholder="Member 3 Name" value={formData.member3Name} onChange={handleChange} style={styles.fieldInput}/>
               <input name="member3Email" placeholder="Member 3 Email" value={formData.member3Email} onChange={handleChange} style={styles.fieldInput}/>
            </div>
            <div className="mathemania-field-group" style={{marginTop: "10px"}}>
               <input name="member4Name" placeholder="Member 4 Name" value={formData.member4Name} onChange={handleChange} style={styles.fieldInput}/>
               <input name="member4Email" placeholder="Member 4 Email" value={formData.member4Email} onChange={handleChange} style={styles.fieldInput}/>
            </div>

            <button 
              type="submit" 
              className="mathemania-button" 
              disabled={submitting} 
              style={{marginTop: "20px", opacity: submitting ? 0.6 : 1}}
            >
              {submitting ? "Submitting..." : "Submit Registration"}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}

// Inline Styles
const styles = {
  announcementBanner: {
    background: "rgba(123, 75, 255, 0.15)",
    border: "1px solid #7b4bff",
    color: "#e0e7ff",
    padding: "16px 20px",
    borderRadius: "8px",
    marginBottom: "30px",
    fontSize: "1rem",
    lineHeight: "1.5",
    animation: "fadeIn 0.5s ease-in-out",
    boxShadow: "0 4px 12px rgba(123, 75, 255, 0.1)"
  },
  fieldInput: {
    flex: 1, 
    padding: "10px 12px", 
    background: "rgba(15, 23, 42, 0.95)", 
    border: "1px solid rgba(148, 163, 184, 0.3)", 
    borderRadius: "8px", 
    color: "white",
    fontSize: "0.95rem"
  }
};

export default Mathemania;
