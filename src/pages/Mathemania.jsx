// src/pages/Mathemania.jsx
import React, { useState } from "react";

function Mathemania() {
  const [formData, setFormData] = useState({
    teamName: "",
    institute: "",
    teamLeader: "",
    email: "",
    contactNumber: "",
    member2Name: "",
    member2Email: "",
    member3Name: "",
    member3Email: "",
    member4Name: "",
    member4Email: ""
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    // Team name validation (Roman characters, digits, spaces, underscores)
    const teamNamePattern = /^[A-Za-z0-9_ ]+$/;
    if (!teamNamePattern.test(formData.teamName.trim())) {
      alert(
        "Team name can only contain letters, numbers, spaces, and underscores. No emojis or special symbols."
      );
      return;
    }

    setSubmitting(true);

    const GOOGLE_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbyBmUZF4zRc1Ja8lqr0mF4kDmSO-ObQLRtmwCMObAdYHlKwzvcYYU4jz3x5IYT6T5-_PQ/exec";

    try {
      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      // Try to parse JSON response from Apps Script
      let data;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok || !data || data.result !== "success") {
        alert(
          (data && data.error) ||
            "There was a problem submitting your registration. Please try again."
        );
        return;
      }

      alert("Registration submitted! Your response has been recorded.");

      // Reset form
      setFormData({
        teamName: "",
        institute: "",
        teamLeader: "",
        email: "",
        contactNumber: "",
        member2Name: "",
        member2Email: "",
        member3Name: "",
        member3Email: "",
        member4Name: "",
        member4Email: ""
      });
    } catch (error) {
      console.error("Mathemania submit error:", error);
      alert(
        "An error occurred while submitting your registration. Please try again later."
      );
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
          <p className="mathemania-subtitle">
            The flagship mathematics contest of Stamatics, IIT Kanpur –
            combining creativity, rigor, and problem-solving under one banner.
          </p>
        </header>

        <div className="mathemania-grid">
          {/* LEFT: EVENT OVERVIEW + KEY INFO + PAST PAPERS LINE */}
          <div className="mathemania-card">
            <h2 className="mathemania-card-title">Event Overview</h2>
            <p className="mathemania-text">
              Mathemania is a multi-round competition that tests conceptual
              understanding, speed, and creativity in mathematics and related
              problem-solving. It is open to students across batches and
              disciplines at IIT Kanpur.
            </p>
            <ul className="mathemania-list">
              <li>Individual and team-based rounds</li>
              <li>Mixture of proof, puzzle, and numerical problems</li>
              <li>Designed and curated by Stamatics members</li>
            </ul>

            <h2 className="mathemania-card-title mathemania-subheading">
              Key Information
            </h2>
            <div className="mathemania-info-list">
              <div className="mathemania-info-item">
                <span className="mathemania-info-label">Format</span>
                <span className="mathemania-info-value">
                  Written + Interactive Rounds
                </span>
              </div>
              <div className="mathemania-info-item">
                <span className="mathemania-info-label">Level</span>
                <span className="mathemania-info-value">
                  Undergraduate &amp; Postgraduate
                </span>
              </div>
              <div className="mathemania-info-item">
                <span className="mathemania-info-label">Category</span>
                <span className="mathemania-info-value">
                  Problem Solving &amp; Math Contest
                </span>
              </div>
            </div>

            <p className="mathemania-text mathemania-past-line">
              Past papers and resources will be made available on the Stamatics
              website ahead of the contest.
            </p>
          </div>

          {/* RIGHT: REGISTRATION FORM (looks unchanged) */}
          <div className="mathemania-card">
            <h2 className="mathemania-card-title">
              Mathemania Registration Form
            </h2>
            <p className="mathemania-text">
              Group size limit: up to 4 members.
              <br />
              <span className="mathemania-note">
                Team name should contain only Roman characters, digits, spaces,
                and underscores (no emojis or special symbols).
              </span>
            </p>

            <form className="mathemania-form" onSubmit={handleSubmit}>
              {/* TEAM NAME (required) */}
              <div className="mathemania-field">
                <label htmlFor="teamName">
                  Team Name<span className="required-star">*</span>
                </label>
                <input
                  id="teamName"
                  name="teamName"
                  type="text"
                  required
                  pattern="[A-Za-z0-9_ ]+"
                  title="Use letters, numbers, spaces, and underscores only."
                  placeholder="Enter team name"
                  value={formData.teamName}
                  onChange={handleChange}
                />
              </div>

              {/* INSTITUTE (required) */}
              <div className="mathemania-field">
                <label htmlFor="institute">
                  Institute<span className="required-star">*</span>
                </label>
                <input
                  id="institute"
                  name="institute"
                  type="text"
                  required
                  placeholder="Enter institute name"
                  value={formData.institute}
                  onChange={handleChange}
                />
              </div>

              {/* TEAM LEADER (required) */}
              <div className="mathemania-field">
                <label htmlFor="teamLeader">
                  Team Leader<span className="required-star">*</span>
                </label>
                <input
                  id="teamLeader"
                  name="teamLeader"
                  type="text"
                  required
                  placeholder="Full name of team leader"
                  value={formData.teamLeader}
                  onChange={handleChange}
                />
              </div>

              {/* EMAIL (required) */}
              <div className="mathemania-field">
                <label htmlFor="leaderEmail">
                  Email<span className="required-star">*</span>
                </label>
                <input
                  id="leaderEmail"
                  name="email"
                  type="email"
                  required
                  placeholder="leader@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* CONTACT NUMBER (required) */}
              <div className="mathemania-field">
                <label htmlFor="contactNumber">
                  Contact Number<span className="required-star">*</span>
                </label>
                <input
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  required
                  placeholder="10-digit phone number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
              </div>

              {/* TEAM MEMBER 2 */}
              <div className="mathemania-field-group">
                <div className="mathemania-field">
                  <label htmlFor="member2">Team Member 2</label>
                  <input
                    id="member2"
                    name="member2Name"
                    type="text"
                    placeholder="Name (optional)"
                    value={formData.member2Name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mathemania-field">
                  <label htmlFor="member2Email">Email</label>
                  <input
                    id="member2Email"
                    name="member2Email"
                    type="email"
                    placeholder="member2@example.com"
                    value={formData.member2Email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* TEAM MEMBER 3 */}
              <div className="mathemania-field-group">
                <div className="mathemania-field">
                  <label htmlFor="member3">Team Member 3</label>
                  <input
                    id="member3"
                    name="member3Name"
                    type="text"
                    placeholder="Name (optional)"
                    value={formData.member3Name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mathemania-field">
                  <label htmlFor="member3Email">Email</label>
                  <input
                    id="member3Email"
                    name="member3Email"
                    type="email"
                    placeholder="member3@example.com"
                    value={formData.member3Email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* TEAM MEMBER 4 */}
              <div className="mathemania-field-group">
                <div className="mathemania-field">
                  <label htmlFor="member4">Team Member 4</label>
                  <input
                    id="member4"
                    name="member4Name"
                    type="text"
                    placeholder="Name (optional)"
                    value={formData.member4Name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mathemania-field">
                  <label htmlFor="member4Email">Email</label>
                  <input
                    id="member4Email"
                    name="member4Email"
                    type="email"
                    placeholder="member4@example.com"
                    value={formData.member4Email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <p className="mathemania-text mathemania-footnote">
                Fields marked with <span className="required-star">*</span> are
                compulsory. Group size limit is up to 4 members.
              </p>

              <button
                type="submit"
                className="mathemania-button"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Registration"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Mathemania;
