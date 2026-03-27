import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

// 🔥 Platforms with URLs - Add more as needed
const platforms = [
  {
    name: "Netflix",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    url: "https://www.netflix.com"
  },
  {
    name: "Spotify",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
    url: "https://www.spotify.com"
  },
  {
    name: "Amazon Prime Video",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png",
    url: "https://www.primevideo.com"
  },
  {
    name: "Disney+ Hotstar",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Disney%2B_Hotstar_logo.svg",
    url: "https://www.hotstar.com"
  },
  {
    name: "Apple Music",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Apple_Music_icon.svg",
    url: "https://music.apple.com"
  },
  {
    name: "HBO Max",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg",
    url: "https://www.hbomax.com"
  },
  {
    name: "YouTube Premium",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/YouTube_TV.svg",
    url: "https://www.youtube.com/premium"
  },
  {
    name: "Microsoft Game Pass",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Xbox_Game_Pass_Logo.svg",
    url: "https://gamepass.com"
  }
];

function Subscriptions() {
  const [subs, setSubs] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  // 📥 Fetch subscriptions
  const fetchSubs = async () => {
    try {
      if (!user || !user.id) return;
      const res = await axios.get(`http://localhost:5000/api/subscriptions?userId=${user.id}`);
      console.log("📥 Fetched subscriptions:", res.data); // DEBUG - Shows all subs with URLs
      setSubs(res.data);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      alert("Failed to load subscriptions");
    }
  };

  useEffect(() => {
    fetchSubs();
  }, []);

  // ➕ Add Subscription with URL
  const addSub = async () => {
    if (!selectedPlatform || !date) {
      alert("❌ Please select platform and date");
      return;
    }

    const subData = {
      userId: user.id,
      name: selectedPlatform.name,
      price: 100,
      renewalDate: date,
      image: selectedPlatform.image,
      url: selectedPlatform.url   // ✅ IMPORTANT - Send URL
    };

    console.log("📤 Sending subscription data:", subData); // DEBUG

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/subscriptions", subData);
      console.log("✅ Backend response:", response.data); // DEBUG

      alert("✅ Subscription added!");
      setSelectedPlatform(null);
      setDate("");
      fetchSubs();
    } catch (error) {
      console.error("❌ Error adding subscription:", error);
      alert("❌ Failed to add subscription");
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete Subscription
  const deleteSub = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/subscriptions/${id}`);
      alert("✅ Deleted successfully!");
      fetchSubs();
    } catch (error) {
      console.error("Error deleting subscription:", error);
      alert("❌ Failed to delete subscription");
    }
  };

  // 🔢 Calculate days left until renewal
  const getDaysLeft = (date) => {
    if (!date) return "No date";

    const today = new Date();
    const renewal = new Date(date);

    const diff = Math.ceil((renewal - today) / (1000 * 60 * 60 * 24));

    if (diff < 0) return "🔴 Expired";
    if (diff === 0) return "🟡 Today";
    if (diff <= 3) return `🟠 ${diff} days left`;

    return `🟢 ${diff} days left`;
  };

  return (
    <div className="main">

      {/* 📂 Sidebar Navigation */}
      <div className="sidebar">
        <h2>🎬 SubTracker</h2>
        <ul>
          <li onClick={() => window.location.href="/dashboard"}>📊 Dashboard</li>
          <li onClick={() => window.location.href="/subscriptions"}>🎯 Subscriptions</li>
          <li onClick={() => setShowProfile(true)} style={{ cursor: "pointer" }}>👤 Profile</li>
          <li onClick={() => {
            localStorage.clear();
            window.location.href="/";
          }}>🔓 Logout</li>
        </ul>
      </div>

      {/* Profile Modal */}
      {showProfile && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: '#1e1e1e', padding: '30px', borderRadius: '15px', width: '350px', textAlign: 'center', color: '#fff', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
            <h2 style={{ marginBottom: '20px', color: '#00c49f' }}>User Profile</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Total Subs:</strong> {subs.length}</p>
              <p><strong>Monthly Cost:</strong> ₹{subs.reduce((sum, s) => sum + Number(s.price), 0)}</p>
            </div>
            <button className="btn" style={{ marginTop: '25px', width: '100%', background: '#ff4d4d' }} onClick={() => setShowProfile(false)}>Close</button>
          </div>
        </div>
      )}

      {/* 📝 Main Content */}
      <div className="content">

        <h2>🎯 My Subscriptions</h2>

        {/* ➕ Add Subscription Form */}
        <div className="form">
          <select 
            onChange={(e) => {
              const p = platforms.find(pl => pl.name === e.target.value);
              setSelectedPlatform(p);
            }}
            value={selectedPlatform?.name || ""}
          >
            <option value="">Select Platform</option>
            {platforms.map((p, i) => (
              <option key={i} value={p.name}>{p.name}</option>
            ))}
          </select>

          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)} 
            placeholder="Renewal Date"
          />

          <button 
            className="btn" 
            onClick={addSub}
            disabled={loading}
          >
            {loading ? "Adding..." : "➕ Add"}
          </button>
        </div>

        {/* 📋 Subscription Cards Grid */}
        <div className="grid">
          {subs.length === 0 ? (
            <p style={{ color: "#888", gridColumn: "1 / -1" }}>
              No subscriptions yet. Add one to get started! 🚀
            </p>
          ) : (
            subs.map((s) => {
              // 🔍 Always get URL from platforms list by name
              const platformData = platforms.find(p => p.name === s.name);
              const finalUrl = s.url || platformData?.url;
              
              return (
              <div
                className="sub-card"
                key={s._id}
                onClick={() => {
                  console.log("════════════════════════════════════════════════");
                  console.log("🖱️ CARD CLICKED!");
                  console.log("Subscription Name:", s.name);
                  console.log("URL from DB:", s.url);
                  console.log("URL from platforms list:", platformData?.url);
                  console.log("Final URL to open:", finalUrl);
                  console.log("════════════════════════════════════════════════");
                  
                  if (finalUrl && finalUrl.trim()) {
                    console.log("✅ OPENING:", finalUrl);
                    window.open(finalUrl, "_blank");
                  } else {
                    console.error("❌ NO URL AVAILABLE FOR:", s.name);
                    alert(`❌ Platform URL not available for ${s.name}. Try adding it again.`);
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                {/* Platform Image */}
                <img src={s.image} alt={s.name} />

                {/* Platform Name */}
                <h4>{s.name}</h4>

                {/* Price */}
                <p className="price">₹{s.price}/month</p>

                {/* Days Until Renewal */}
                <p className="renewal">{getDaysLeft(s.renewalDate)}</p>

                {/* Delete Button with stopPropagation */}
                <button
                  className="btn btn-delete"
                  onClick={(e) => {
                    e.stopPropagation();   // ✅ PREVENT CARD CLICK
                    deleteSub(s._id);
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            );
            })
          )}
        </div>

      </div>
    </div>
  );
}

export default Subscriptions;