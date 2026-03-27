import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import "./Dashboard.css";
// 🔥 Platforms with images + plans
const platforms = [
  {
    name: "Netflix",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    plans: [
      { type: "Mobile", price: 149 },
      { type: "Basic", price: 199 },
      { type: "Standard", price: 499 },
      { type: "Premium", price: 649 }
    ]
  },
  {
    name: "Amazon Prime Video",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png",
    plans: [
      { type: "Monthly", price: 299 },
      { type: "Yearly", price: 1499 }
    ]
  },
  {
    name: "Disney+ Hotstar",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Disney%2B_Hotstar_logo.svg",
    plans: [
      { type: "Mobile", price: 499 },
      { type: "Super", price: 899 },
      { type: "Premium", price: 1499 }
    ]
  },
  {
    name: "Spotify",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
    plans: [
      { type: "Free", price: 0 },
      { type: "Individual", price: 119 },
      { type: "Family", price: 179 }
    ]
  },
  {
    name: "YouTube Premium",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Premium_logo.svg",
    plans: [
      { type: "Individual", price: 129 },
      { type: "Family", price: 189 },
      { type: "Student", price: 79 }
    ]
  },
  {
    name: "Apple Music",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Apple_Music_icon.svg",
    plans: [
      { type: "Individual", price: 99 },
      { type: "Family", price: 149 }
    ]
  },
  {
    name: "JioCinema",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1b/JioCinema_logo.svg",
    plans: [
      { type: "Free", price: 0 },
      { type: "Premium", price: 999 }
    ]
  },
  {
    name: "ZEE5",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3e/ZEE5_logo.svg",
    plans: [
      { type: "Monthly", price: 199 },
      { type: "Yearly", price: 999 }
    ]
  },
  {
    name: "SonyLIV",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/36/SonyLIV_logo.svg",
    plans: [
      { type: "Monthly", price: 299 },
      { type: "Yearly", price: 999 }
    ]
  },
  {
    name: "Aha",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Aha_OTT_Logo.svg",
    plans: [
      { type: "Monthly", price: 199 },
      { type: "Yearly", price: 699 }
    ]
  },
  {
    name: "Sun NXT",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Sun_NXT_logo.svg",
    plans: [
      { type: "Monthly", price: 50 },
      { type: "Yearly", price: 480 }
    ]
  },
  {
    name: "Voot",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Voot_logo.svg",
    plans: [
      { type: "Monthly", price: 99 },
      { type: "Yearly", price: 499 }
    ]
  },
  {
    name: "MX Player",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/05/MX_Player_Logo.png",
    plans: [
      { type: "Free", price: 0 },
      { type: "Premium", price: 299 }
    ]
  },
  {
    name: "HBO Max",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg",
    plans: [
      { type: "Monthly", price: 799 },
      { type: "Yearly", price: 6999 }
    ]
  },
  {
    name: "Crunchyroll",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Crunchyroll_Logo.svg",
    plans: [
      { type: "Fan", price: 79 },
      { type: "Mega Fan", price: 99 }
    ]
  },
  {
    name: "Discovery+",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Discovery_Plus_logo.svg",
    plans: [
      { type: "Monthly", price: 199 },
      { type: "Yearly", price: 999 }
    ]
  },
  {
    name: "Canva",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg",
    plans: [
      { type: "Free", price: 0 },
      { type: "Pro", price: 499 }
    ]
  },
  {
    name: "Microsoft 365",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    plans: [
      { type: "Personal", price: 4899 },
      { type: "Family", price: 6199 }
    ]
  },
  {
    name: "Google One",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Google_One_logo.svg",
    plans: [
      { type: "Basic", price: 130 },
      { type: "Standard", price: 210 }
    ]
  },
  {
    name: "Adobe Creative Cloud",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/70/Adobe_Creative_Cloud_logo.svg",
    plans: [
      { type: "Single App", price: 1675 },
      { type: "All Apps", price: 4230 }
    ]
  }
];

function Dashboard() {
  const [subs, setSubs] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [date, setDate] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchSubs = async () => {
    if (!user || !user.id) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/subscriptions?userId=${user.id}`);
      setSubs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSubs();
  }, []);

  // 🔥 Total
  const totalAmount = subs.reduce((sum, s) => sum + Number(s.price), 0);

  // 🔥 Days left
  const getDaysLeft = (date) => {
    if (!date) return "No date";

    const today = new Date();
    const renewal = new Date(date);

    if (isNaN(renewal)) return "Invalid Date";

    const diff = Math.ceil((renewal - today) / (1000 * 60 * 60 * 24));

    if (diff < 0) return "Expired";
    if (diff === 0) return "Today";

    return diff + " days left";
  };

  const urlMap = {
    "Netflix": "https://www.netflix.com",
    "Spotify": "https://www.spotify.com",
    "Amazon Prime Video": "https://www.primevideo.com",
    "Disney+ Hotstar": "https://www.hotstar.com",
    "Apple Music": "https://music.apple.com",
    "HBO Max": "https://www.hbomax.com",
    "YouTube Premium": "https://www.youtube.com/premium",
    "Microsoft Game Pass": "https://gamepass.com",
    "JioCinema": "https://www.jiocinema.com",
    "ZEE5": "https://www.zee5.com",
    "SonyLIV": "https://www.sonyliv.com",
    "Aha": "https://www.aha.video",
    "Sun NXT": "https://www.sunnxt.com",
    "Voot": "https://www.voot.com",
    "MX Player": "https://www.mxplayer.in",
    "Crunchyroll": "https://www.crunchyroll.com",
    "Discovery+": "https://www.discoveryplus.in",
    "Canva": "https://www.canva.com",
    "Microsoft 365": "https://www.microsoft.com/en-in/microsoft-365",
    "Google One": "https://one.google.com",
    "Adobe Creative Cloud": "https://www.adobe.com/in/creativecloud.html"
  };

  // 🔥 Add
  const addSub = async () => {
    if (!selectedPlatform || !selectedPlan || !date) {
      alert("Select all fields");
      return;
    }

    await axios.post("http://localhost:5000/api/subscriptions", {
      userId: user.id,
      name: selectedPlatform.name,
      planType: selectedPlan.type,
      price: selectedPlan.price,
      renewalDate: date,
      image: selectedPlatform.image,
      url: urlMap[selectedPlatform.name]
    });

    setSelectedPlatform(null);
    setSelectedPlan(null);
    setDate("");

    fetchSubs();
  };

  // 🔥 Delete
  const deleteSub = async (id) => {
    await axios.delete(`http://localhost:5000/api/subscriptions/${id}`);
    fetchSubs();
  };

  // 🔥 Chart Data Generation
  const chartData = subs.reduce((acc, sub) => {
    const existing = acc.find((item) => item.name === sub.name);
    if (existing) {
      existing.value += Number(sub.price);
    } else {
      acc.push({ name: sub.name, value: Number(sub.price) });
    }
    return acc;
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF19A3', '#19FFA3', '#FF4500', '#2E8B57', '#4682B4'];

  return (
    <div className="main">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>SubTracker</h2>
        <ul>
          <li onClick={() => window.location.href="/dashboard"} style={{ cursor: "pointer" }}>Dashboard</li>
          <li onClick={() => window.location.href="/subscriptions"} style={{ cursor: "pointer" }}>Subscriptions</li>
          <li onClick={() => setShowProfile(true)} style={{ cursor: "pointer" }}>Profile</li>
          <li onClick={() => {
            localStorage.clear();
            window.location.href="/";
          }} style={{ cursor: "pointer" }}>Logout</li>
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
              <p><strong>Monthly Cost:</strong> ₹{totalAmount}</p>
            </div>
            <button className="btn" style={{ marginTop: '25px', width: '100%', background: '#ff4d4d' }} onClick={() => setShowProfile(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="content">

        <div className="header">
          <h2>Welcome, {user?.name}</h2>
        </div>

        {/* Summary */}
        <div className="summary">
          <div className="card">
            <h3>Total Subscriptions</h3>
            <p>{subs.length}</p>
          </div>

          <div className="card">
            <h3>Total Cost</h3>
            <p>₹{totalAmount}</p>
          </div>
        </div>

        {/* 📊 Charts Section */}
        {subs.length > 0 && (
          <div className="charts-container" style={{ width: '100%', height: 350, background: '#1e1e1e', borderRadius: '15px', padding: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ marginBottom: '10px' }}>Cost Breakdown by Platform</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Form */}
        <div className="form">

          <select
            onChange={(e) => {
              const selected = platforms.find(p => p.name === e.target.value);
              setSelectedPlatform(selected);
              setSelectedPlan(null);
            }}
          >
            <option value="">Select Platform</option>
            {platforms.map((p, i) => (
              <option key={i} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>

          {selectedPlatform && (
            <select
              onChange={(e) => {
                const plan = selectedPlatform.plans.find(pl => pl.type === e.target.value);
                setSelectedPlan(plan);
              }}
            >
              <option value="">Select Plan</option>
              {selectedPlatform.plans.map((plan, i) => (
                <option key={i} value={plan.type}>
                  {plan.type} - ₹{plan.price}
                </option>
              ))}
            </select>
          )}

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button className="btn" onClick={addSub}>
            Add
          </button>
        </div>

        {/* Cards */}
        <div className="grid">
          {subs.map((s) => {
            const status = getDaysLeft(s.renewalDate);

            return (
              <div 
                className="sub-card" 
                key={s._id}
                onClick={() => {
                  const finalUrl = s.url || urlMap[s.name];
                  if (finalUrl) window.open(finalUrl, "_blank");
                  else alert("URL not found for " + s.name);
                }}
                style={{ cursor: "pointer" }}
              >

                <img src={s.image} alt={s.name} />

                <h4>{s.name}</h4>
                <p>{s.planType}</p>
                <p>₹{s.price}</p>

                <p className={
                  status === "Expired"
                    ? "red"
                    : status === "Today"
                    ? "orange"
                    : "green"
                }>
                  {status}
                </p>

                <button className="btn" onClick={(e) => { e.stopPropagation(); deleteSub(s._id); }}>
                  Delete
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;