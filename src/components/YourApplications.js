// src/components/YourApplications.js
import React, { useEffect, useState } from 'react';
import './YourApplications.css';
import { useUser } from '../context/UserContext';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

function YourApplications() {
    const { userDetails } = useUser();
    const ownerEmail = userDetails?.email || "Email not available";

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDialog, setShowDialog] = useState(false); // State to show/hide dialog
    const [selectedRole, setSelectedRole] = useState(''); // State to store the selected role

    // Function to fetch applications from Firestore
    const fetchApplicationsFromFirestore = async () => {
        try {
            const db = getFirestore();
            const acceptRejectRef = collection(db, "accept_reject");
            const q = query(acceptRejectRef, where("applicantEmail", "==", ownerEmail));

            const querySnapshot = await getDocs(q);
            const fetchedApplications = querySnapshot.docs.map(doc => {
                const status = doc.data().status || 'No Status';
                return {
                    id: doc.id,
                    title: doc.data().projectTitle || 'No Title',
                    company: doc.data().role || 'No Role',
                    date: doc.data().appliedDate?.toDate?.().toLocaleDateString() || "Date not available",
                    status,
                    statusClass: (status.toLowerCase() === 'accepted' || status.toLowerCase() === 'accept') ? 'accepted' : 
                                 (status.toLowerCase() === 'rejected' || status.toLowerCase() === 'reject') ? 'rejected' : '',
                    logoUrl: 'https://via.placeholder.com/40?text=' + (doc.data().role?.charAt(0) || 'A'),
                };
            });

            setApplications(fetchedApplications);
        } catch (error) {
            console.error("Error fetching applications:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch applications on component mount
    useEffect(() => {
        if (ownerEmail) {
            fetchApplicationsFromFirestore();
        }
    }, [ownerEmail]);

    // Handle dialog open when "Accepted" status is clicked
    const handleStatusClick = (status, role) => {
        if (status.toLowerCase() === 'accepted' || status.toLowerCase() === 'accept') {
            setSelectedRole(role); // Set role for dialog
            setShowDialog(true); // Show dialog
        }
    };

    // Handle dialog close
    const closeDialog = () => {
        setShowDialog(false);
    };

    if (loading) {
        return <div>Loading applications...</div>;
    }

    return (
        <div className="yourApplications">
            <div className="owner-email">
                <strong>Owner Email:</strong> {ownerEmail}
            </div>

            {applications.length > 0 ? (
                applications.map((app) => (
                    <div className="application-card" key={app.id}>
                        <div className="application-info">
                            <img src={app.logoUrl} alt={`${app.company} logo`} className="company-logo" />
                            <div>
                                <h4>{app.title}</h4>
                                <p>{app.company}</p>
                                <small>Applied on {app.date}</small>
                            </div>
                        </div>
                        <div
                            className={`status ${app.statusClass}`}
                            onClick={() => handleStatusClick(app.status, app.company)}
                        >
                            {app.status}
                        </div>
                    </div>
                ))
            ) : (
                <p>No applications found for this email.</p>
            )}

            {/* Dialog Component */}
            {showDialog && (
                <div className="dialog-overlay">
                    <div className="dialog-box">
                        <p>You have been selected for the role of {selectedRole}.</p>
                        <button onClick={closeDialog}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default YourApplications;
