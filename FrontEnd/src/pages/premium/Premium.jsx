import { CheckCircle, Fastfood, AccessTime } from "@mui/icons-material";
import { Button } from "@mui/material";
import "./premium.scss";
import { useMembershipStore } from "../../store/useMembershipStore";
import { useUserStore } from "../../store/useUserStore";
export default function Premium() {
  const { user } = useUserStore();
  const { addMembership, loading } = useMembershipStore();

  const handleSelectPlan = (planType) => {
    if (!user) return alert("Please login first!");
    addMembership(user.id, planType); 
  };

  return (
    <div className="premium-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Unlock Premium Access</h1>
          <p>
            Experience the finest meals, faster deliveries, and exclusive offers. 
            Unlock a whole new level of dining with our Premium Membership.
          </p>
          <div className="cta-btn">Become a Premium Member</div>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose Premium?</h2>
        <div className="features-cards">
          <div className="feature-card">
            <CheckCircle className="feature-icon" />
            <h3>Exclusive Menus</h3>
            <p>Access to premium, handpicked meals from top chefs.</p>
          </div>
          <div className="feature-card">
            <Fastfood className="feature-icon" />
            <h3>Fresh Ingredients</h3>
            <p>Only the finest ingredients used for every meal.</p>
          </div>
          <div className="feature-card">
            <AccessTime className="feature-icon" />
            <h3>Priority Delivery</h3>
            <p>Faster deliveries — hot meals delivered right to you.</p>
          </div>
        </div>
      </section>

      <section className="pricing-section">
        <h2>Choose Your Plan</h2>
        <div className="pricing-cards">
          <div className="pricing-card">
            <h3>Basic Plan</h3>
            <p>Standard access to meals with regular delivery times.</p>
            <p className="price">₹700 / month</p>
            <Button
              variant="outlined"
              className="plan-btn-1"
              onClick={() => handleSelectPlan("basic")}
              disabled={loading}
            >
              Select Plan
            </Button>
          </div>

          <div className="pricing-card premium">
            <h3>Long Term Plan</h3>
            <p>Exclusive meals, faster delivery, and personalized service.</p>
            <p className="price">₹2000 / 3 months</p>
            <Button
              variant="outlined"
              className="plan-btn-2"
              onClick={() => handleSelectPlan("long-term")}
              disabled={loading}
            >
              Select Plan
            </Button>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Take Your Dining to the Next Level?</h2>
        <p>Join our premium community for exclusive meals and faster delivery.</p>
      </section>
    </div>
  );
}

