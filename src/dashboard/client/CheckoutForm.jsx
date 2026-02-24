import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { motion } from "motion/react";
import { CreditCard, Landmark, Globe } from "lucide-react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/LoadingSpinner";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { hireId } = useParams();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [cardError, setCardError] = useState("");

  const { data: freelancerData, isLoading } = useQuery({
    queryKey: ["hire-details", hireId],
    enabled: !!hireId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/hires/${hireId}`);
      return res.data;
    },
  });

  const bidAmount = freelancerData?.hireInfo?.bidAmount || 0;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    try {
      setLoading(true);

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      console.log("PaymentMethod:", paymentMethod);

      // 👉 Call backend here for real payment confirmation

      toast.success("Payment Successful 🎉");

      // ✅ CLEAR CARD INPUT
      card.clear();
      setCardError("");

    } catch (err) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="max-w-lg mx-auto mt-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-gray-200"
      >
        {/* Top Card Types */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-blue-600">
            <CreditCard size={20} />
            <span className="text-sm font-medium">Debit Card</span>
          </div>

          <div className="flex items-center gap-2 text-purple-600">
            <Landmark size={20} />
            <span className="text-sm font-medium">Credit Card</span>
          </div>

          <div className="flex items-center gap-2 text-indigo-600">
            <Globe size={20} />
            <span className="text-sm font-medium">Visa / International</span>
          </div>
        </div>

        {/* Stripe Card Element */}
        <form onSubmit={handleSubmit}>
          <div className="p-4 border border-gray-400 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition">
            <CardElement
              onChange={(event) => {
                if (event.error) {
                  setCardError(event.error.message);
                } else {
                  setCardError("");
                }
              }}
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#1f2937",
                    "::placeholder": {
                      color: "#9ca3af",
                    },
                  },
                  invalid: {
                    color: "#ef4444",
                  },
                },
              }}
            />
          </div>

          {/* Error message */}
          {cardError && (
            <p className="text-red-500 text-sm text-center pt-1">{cardError}</p>
          )}

          {/* Payment Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={!stripe || loading}
            className={`w-full py-3 mt-6 rounded-xl text-white font-semibold transition-all duration-300
            ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-linear-to-r from-blue-600 to-indigo-600 hover:shadow-xl"
              }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                Processing...
              </div>
            ) : (
              `Pay $${bidAmount}`
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default CheckoutForm;