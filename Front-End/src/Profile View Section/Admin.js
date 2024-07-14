import React, { useState, useEffect } from "react";
import { Table, Button, Nav, Card } from "react-bootstrap";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("adApproval");
  const [headerText, setHeaderText] = useState("Ad Approval");
  const [ads, setAds] = useState([]); // Define the 'ads' state
  const [users, setUsers] = useState([]); // Define the 'users' state

  // Fetch pending ads
  useEffect(() => {
    // Fetch pending approval ads from your backend API here.
    // Replace the URL with the actual API endpoint.
    fetch("http://localhost:5000/approval")
      .then((response) => response.json())
      .then((data) => {
        setAds(data); // Update the ads state with the fetched data.
      })
      .catch((error) => {
        console.error("Error fetching ads data:", error);
      });

    // Fetch users or any other data you need from your backend API here.
    // Replace the URL with the actual API endpoint.
    fetch("http://localhost:5000/api/all_users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data); // Update the users state with the fetched data.
      })
      .catch((error) => {
        console.error("Error fetching users data:", error);
      });
  }, []); // The empty dependency array ensures this effect runs once on component mount.

  const handleTabClick = (tab, header) => {
    setActiveTab(tab);
    setHeaderText(header);
  };

  const deleteAd = (adId) => {
    // Send a DELETE request to the server to delete the ad with the specified adId
    fetch(`http://localhost:5000/delete/${adId}`, {
      method: "DELETE", // Use the DELETE HTTP method
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          // If the backend responds with a message indicating success
          console.log(data.message);
          // Remove the deleted ad from the local state
          const updatedAds = ads.filter((ad) => ad.id !== adId);
          setAds(updatedAds);
        } else {
          console.error("Error deleting ad:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error deleting ad:", error);
      });
  };
  

  const approveAd = (adId) => {
    fetch(`http://localhost:5000/approve/${adId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          // If the backend responds with a message indicating success
          console.log(data.message);
          // Update the local state to mark the ad as approved
          const updatedAds = ads.map((ad) => {
            if (ad.id === adId) {
              return { ...ad, status: "Approved" };
            }
            return ad;
          });
          setAds(updatedAds);
        } else {
          console.error("Error approving ad:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error approving ad:", error);
      });
  };

  return (
    <div
      className="container mt-5 col-md-7 pro_view"
      style={{ marginBottom: 268 }}
    >
      <div className="row" style={{ marginTop: 100 }}>
        <div className="col-md-3">
          {/* Admin Sidebar */}
          <div className="list-group" style={{ fontSize: 12 }}>
            <Nav.Link
              href="#"
              className={`list-group-item list-group-item-action ${
                activeTab === "adApproval" ? "active" : ""
              }`}
              onClick={() => handleTabClick("adApproval", "Ad Approval")}
            >
              Ad Approval
            </Nav.Link>
            <Nav.Link
              href="#"
              className={`list-group-item list-group-item-action ${
                activeTab === "userControl" ? "active" : ""
              }`}
              onClick={() => handleTabClick("userControl", "User Control")}
            >
              User Control
            </Nav.Link>
            {/* Add more sections as needed */}
          </div>
        </div>
        <div className="col-md-9 content_profile" style={{ fontSize: 12 }}>
          {/* Admin Content */}
          <Card>
            <Card.Header>
              <h5>{headerText}</h5>
            </Card.Header>
            <Card.Body>
              {activeTab === "adApproval" && (
                <>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th>Delete</th>{" "}
                        {/* Add a new column for the delete button */}
                      </tr>
                    </thead>
                    <tbody>
                      {ads.map((ad) => (
                        <tr key={ad.id}>
                          <td>{ad.id}</td>
                          <td>{ad.title}</td>
                          <td>{ad.status}</td>
                          <td>
                            {ad.status === "pending_approval" && (
                              <Button
                                variant="success"
                                style={{ fontSize: 10 }}
                                onClick={() => approveAd(ad.id)}
                              >
                                Approve
                              </Button>
                            )}
                          </td>
                          <td>
                            <Button
                              variant="danger"
                              style={{ fontSize: 10 }}
                              onClick={() => deleteAd(ad.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}

              {activeTab === "userControl" && (
                <>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.f_name}</td>
                          <td>{user.email}</td>
                          <td>
                            <Button style={{ fontSize: 10 }} variant="danger">
                              Ban
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}

              {/* Add more sections as needed */}
            </Card.Body>
          </Card>

          {/* Other sections go here */}
          {/* ... */}
        </div>
      </div>
    </div>
  );
};

export default Admin;
