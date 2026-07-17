import React, { useEffect, useState } from "react";
import { getMyProfile } from "../api/api";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const { data } = await getMyProfile();
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Profile 👤</h1>

      {!user ? (
        <p>Loading...</p>
      ) : (
        <div
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            width: "300px",
          }}
        >
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      )}
    </div>
  );
}

export default Profile;