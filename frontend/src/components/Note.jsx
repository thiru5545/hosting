import React from "react";

const DeliveryNote = () => {
    return (
        <div className="delivery-note-container" style={styles.container}>
            <h2 style={styles.heading}>Note:</h2>
            <p style={styles.paragraph}>
                Delivery is expected within 14-21 days, but we aim to deliver sooner. Pre-order now to guarantee availability, and we'll ensure it reaches you as quickly as possible!
            </p>
        </div>
    );
};

// Optional inline styling
const styles = {
    container: {
        backgroundColor: "#f8f9fa",
        padding: "20px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        maxWidth: "600px",
        margin: "20px auto",
    },
    heading: {
        fontSize: "1.5rem",
        color: "#343a40",
        marginBottom: "10px",
    },
    paragraph: {
        fontSize: "1rem",
        color: "#495057",
        lineHeight: "1.5",
    },
};

export default DeliveryNote;
