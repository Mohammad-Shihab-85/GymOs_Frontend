import React, { useState } from 'react';
import './Login.css'; 

function Login() {
  // ১. ইনপুটের জন্য স্টেট
  const [memberID, setMemberID] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // লোডিং স্টেট

  // নতুন স্টেট: লগইন সফল হলে ইউজারের ডেটা রাখার জন্য
  const [loggedInUser, setLoggedInUser] = useState(null); 

  // ২. এপিআই ফেচ করার আসল ফাংশন
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://gymosbackend-production.up.railway.app/api/members/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memberID: memberID,
          accessCode: accessCode,
          password: password
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("লগইন সফল ভাই! ডাটাবেজের ডেটা নিচে দেখুন:", result);
        
        // 🎉 অ্যালার্ট বাদ দিয়ে স্টেট-এ ইউজারের নাম ও ডেটা সেভ করছি
        setLoggedInUser(result.data); 
      } else {
        console.log("সার্ভার থেকে এরর এসেছে:", result.message);
        alert(result.message || "লগইন ব্যর্থ হয়েছে!");
      }
    } catch (error) {
      console.error("সার্ভারে কানেক্ট হতে সমস্যা হচ্ছে:", error);
      alert("সার্ভার রেসপন্স করছে না। একটু পর আবার চেষ্টা করুন!");
    } finally {
      setLoading(false);
    }
  };

  // ৩. স্ক্রিনের ডিজাইন (UI)
  return (
    // রিঅ্যাক্ট-এ দুইবার className দেওয়া যাবে না, তাই দুইটাকে একসাথে জোড়া লাগিয়ে দিলাম ভাই
    <div className="login-container bg-black h-[100vh] text-white">
      <div className="gradient">
        
        {/* কন্ডিশনাল রেন্ডারিং: ইউজার যদি লগইন না থাকে তবে ফর্ম দেখাবে */}
        {!loggedInUser ? (
          <form onSubmit={handleLogin} className="login-form">
            <h2>Member Login</h2>
            <input
              type="text"
              placeholder="Member ID (101)"
              value={memberID}
              onChange={(e) => setMemberID(e.target.value)}
              required
              className="login-input text-white"
            />
            <input
              type="text"
              placeholder="Access Code"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              required
              className="login-input text-white"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input text-green-600"
            />

            <button type="submit" disabled={loading} className="login-button mt-[10px]">
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        ) : (
          /* 🎉 লগইন সফল হলে আপনার নিজের বানানো কাস্টম ড্যাশবোর্ড কার্ড বা div দেখাবে */
          <div className="success-container flex flex-col items-center justify-center p-[30px] border-2 border-green-500 rounded-[12px] bg-[#121212] max-w-[400px] mx-auto text-center animate-fade-in">
            <div className="w-[60px] h-[60px] bg-green-500 text-black text-[30px] rounded-full flex items-center justify-center mb-[15px] font-bold">
              ✓
            </div>
            <h2 className="text-[24px] text-green-400 font-bold mb-[10px]">Login Successful!</h2>
            <p className="text-[18px] text-gray-300">
              Welcome back, <span className="text-white font-semibold">{loggedInUser.memberName}</span>
            </p>
            <p className="text-[14px] text-gray-500 mt-[5px]">ID: {loggedInUser.memberID}</p>
            
            {/* ড্যাশবোর্ডে যাওয়ার জন্য একটা সাময়িক বাটন */}
            <button className="mt-[20px] bg-green-500 text-black px-[20px] py-[8px] rounded-[6px] font-bold hover:bg-green-600 transition-all">
              Lets Start
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;