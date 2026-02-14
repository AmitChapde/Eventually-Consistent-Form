import { useState, useRef } from "react";
import mockApi from "../api/mockApi";
import "./UserForm.css";

const MAX_RETRIES = 3;

function UserForm() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [items, setItems] = useState([]);

  const emailRef = useRef(null);

  const updateItem = (id, updates) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    );
  };

  const submitRequest = async (id, attempt = 1) => {
    try {
      await mockApi();
      updateItem(id, { status: "success" });
    } catch (e) {
      if (e.status === 503 && attempt < MAX_RETRIES) {
        updateItem(id, { status: "retrying", attempts: attempt + 1 });

        setTimeout(() => submitRequest(id, attempt + 1), 1500);
      } else {
        updateItem(id, { status: "failed" });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !amount) return;

    const exists = items.some((item) => item.email === email);

    if (exists) {
      alert("This email entry already exists");
      return;
    }

    const id = crypto.randomUUID();

    const newItem = {
      id,
      email,
      amount: Number(amount),
      status: "pending",
      attempts: 1,
    };

    setItems((prev) => [newItem, ...prev]);
    submitRequest(id);

    setEmail("");
    setAmount("");
    emailRef.current?.focus();
  };

  const renderStatus = (item) => {
    if (item.status === "pending") return "Pending";
    if (item.status === "retrying")
      return `Retrying (${item.attempts}/${MAX_RETRIES})`;
    if (item.status === "success") return "Success";
    if (item.status === "failed") return "Failed";
    return "";
  };

  return (
    <div className="container">
      <h2>Eventually Consistent Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>

      {items.map((item) => (
        <div key={item.id} className="card">
          <div>
            <strong>
              {item.email}: ₹{item.amount}
            </strong>
          </div>
          <div className="status">{renderStatus(item)}</div>
        </div>
      ))}
    </div>
  );
}

export default UserForm;
