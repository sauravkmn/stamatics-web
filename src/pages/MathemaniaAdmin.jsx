import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MathemaniaAdmin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Mock data for display
  const [registrations, setRegistrations] = useState([
    { team: "Euler's Minions", leader: "Saurav Kumar", email: "s@test.com", inst: "IITK", status: "Paid" },
    { team: "Limit Breakers", leader: "Ananya Gupta", email: "a@test.com", inst: "IITB", status: "Pending" },
  ]);

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) navigate("/admin");
  }, [navigate]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Mathemania Admin</h1>
          <button onClick={() => navigate("/admin/dashboard")} style={styles.backBtn}>← Dashboard</button>
        </div>

        {/* CONTROLS SECTION */}
        <div style={styles.controlsGrid}>
          {/* Upload Card */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Upload Materials</h3>
            <p style={styles.cardDesc}>Question papers & solutions (PDF)</p>
            <div style={styles.fileWrapper}>
              <input type="file" style={styles.fileInput} />
            </div>
            <button style={styles.actionBtn}>Upload to Drive</button>
          </div>

          {/* Announcement Card */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Announcements</h3>
            <p style={styles.cardDesc}>Update the event page marquee</p>
            <textarea 
              style={styles.textArea} 
              placeholder="Type update here..." 
            />
            <button style={styles.actionBtn}>Publish Update</button>
          </div>
        </div>

        {/* TABLE SECTION */}
        <div style={styles.tableCard}>
          <div style={styles.tableHeader}>
            <h3 style={styles.cardTitle}>Registrations</h3>
            <button style={styles.refreshBtn}>↻ Refresh</button>
          </div>
          
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.thRow}>
                  <th style={styles.th}>Team Name</th>
                  <th style={styles.th}>Leader</th>
                  <th style={styles.th}>Institute</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((row, idx) => (
                  <tr key={idx} style={idx % 2 === 0 ? styles.trEven : styles.trOdd}>
                    <td style={styles.tdBold}>{row.team}</td>
                    <td style={styles.td}>{row.leader}</td>
                    <td style={styles.td}>{row.inst}</td>
                    <td style={styles.td}>
                      <span style={row.status === "Paid" ? styles.badgeGreen : styles.badgeYellow}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#020617", paddingTop: "100px", paddingBottom: "50px", color: "white" },
  container: { maxWidth: "1100px", margin: "0 auto", padding: "0 24px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" },
  title: { fontSize: "2rem", fontWeight: "700" },
  backBtn: { background: "none", border: "1px solid #334155", color: "#94a3b8", padding: "8px 16px", borderRadius: "8px", cursor: "pointer" },
  
  controlsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "30px" },
  card: { background: "rgba(30, 41, 59, 0.4)", border: "1px solid #334155", borderRadius: "12px", padding: "24px" },
  cardTitle: { fontSize: "1.2rem", fontWeight: "600", marginBottom: "8px" },
  cardDesc: { color: "#94a3b8", fontSize: "0.9rem", marginBottom: "16px" },
  
  textArea: { width: "100%", background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "12px", color: "white", minHeight: "80px", marginBottom: "12px" },
  fileWrapper: { marginBottom: "16px" },
  fileInput: { color: "#94a3b8", fontSize: "0.9rem" },
  
  actionBtn: { background: "#7b4bff", color: "white", border: "none", padding: "10px 20px", borderRadius: "6px", fontWeight: "600", cursor: "pointer" },
  
  tableCard: { background: "rgba(30, 41, 59, 0.4)", border: "1px solid #334155", borderRadius: "12px", overflow: "hidden" },
  tableHeader: { padding: "20px", borderBottom: "1px solid #334155", display: "flex", justifyContent: "space-between" },
  refreshBtn: { background: "none", color: "#7b4bff", border: "none", cursor: "pointer", fontWeight: "600" },
  
  tableWrapper: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" },
  thRow: { background: "#0f172a", textAlign: "left" },
  th: { padding: "16px", color: "#94a3b8", fontWeight: "600", textTransform: "uppercase", fontSize: "0.8rem" },
  trEven: { background: "rgba(30, 41, 59, 0.3)" },
  trOdd: { background: "transparent" },
  td: { padding: "16px", color: "#cbd5e1", borderBottom: "1px solid #1e293b" },
  tdBold: { padding: "16px", color: "white", fontWeight: "600", borderBottom: "1px solid #1e293b" },
  
  badgeGreen: { background: "rgba(34, 197, 94, 0.2)", color: "#4ade80", padding: "4px 8px", borderRadius: "4px", fontSize: "0.8rem", fontWeight: "600" },
  badgeYellow: { background: "rgba(234, 179, 8, 0.2)", color: "#facc15", padding: "4px 8px", borderRadius: "4px", fontSize: "0.8rem", fontWeight: "600" },
};