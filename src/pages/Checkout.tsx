import { useState } from "react";
import { ArrowLeft, Plus, MapPin, CheckCircle, Smartphone, Banknote, Trash2, Home, Briefcase, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import { useAddressStore, Address } from "@/store/useAddressStore";
import { useOrderStore } from "@/store/useOrderStore";
import { formatPrice } from "@/utils/helpers";
import BottomNav from "@/components/BottomNav/BottomNav";

type Step = "address" | "payment";
type PaymentMethod = "COD" | "Online";

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
  "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
  "Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh",
];

const emptyForm = {
  name: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: "", type: "Home" as Address["type"],
};

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCartStore();
  const { addresses, addAddress, removeAddress } = useAddressStore();
  const { addOrder } = useOrderStore();

  const [step, setStep] = useState<Step>("address");
  const [selectedId, setSelectedId] = useState<string>(addresses[0]?.id ?? "");
  const [showForm, setShowForm] = useState(addresses.length === 0);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("COD");
  const [placing, setPlacing] = useState(false);
  const [done, setDone] = useState(false);

  const savings = items.reduce((acc, i) => acc + (i.product.mrp - i.product.offerPrice) * i.qty, 0);
  const total = totalPrice();
  const deliveryFee = total >= 499 ? 0 : 40;
  const grandTotal = total + deliveryFee;

  const handleAddAddress = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.line1.trim() || !form.city.trim() || !form.state || !form.pincode.trim()) {
      setFormError("Please fill all required fields.");
      return;
    }
    if (!/^\d{10}$/.test(form.phone.trim())) {
      setFormError("Enter a valid 10-digit phone number.");
      return;
    }
    if (!/^\d{6}$/.test(form.pincode.trim())) {
      setFormError("Enter a valid 6-digit pincode.");
      return;
    }
    setFormError("");
    addAddress(form);
    const newId = (Date.now()).toString();
    setSelectedId(newId);
    setShowForm(false);
    setForm(emptyForm);
  };

  const handlePlaceOrder = () => {
    const address = addresses.find((a) => a.id === selectedId);
    if (!address) return;
    setPlacing(true);
    setTimeout(() => {
      addOrder({
        id: Date.now().toString(),
        items: [...items],
        address,
        paymentMethod,
        total: grandTotal,
        savings,
        placedAt: new Date().toISOString(),
        status: "Confirmed",
      });
      clearCart();
      setPlacing(false);
      setDone(true);
      setTimeout(() => navigate("/orders"), 2800);
    }, 1500);
  };

  if (items.length === 0 && !done) {
    navigate("/cart");
    return null;
  }

  const TypeIcon = ({ type }: { type: Address["type"] }) => {
    if (type === "Home") return <Home className="h-3.5 w-3.5" />;
    if (type === "Work") return <Briefcase className="h-3.5 w-3.5" />;
    return <MoreHorizontal className="h-3.5 w-3.5" />;
  };

  return (
    <div className="flex min-h-screen flex-col bg-background pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
      {/* Header */}
      <div className="sticky top-0 z-40 flex items-center gap-3 bg-card/90 backdrop-blur-xl border-b border-border px-4 py-3.5">
        <button onClick={() => step === "payment" ? setStep("address") : navigate("/cart")}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary active:scale-90 transition-all">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div className="flex-1">
          <span className="text-[17px] font-semibold text-foreground">
            {step === "address" ? "Select Delivery Address" : "Payment"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground">
          <span className={step === "address" ? "text-foreground font-semibold" : ""}>Address</span>
          <span>›</span>
          <span className={step === "payment" ? "text-foreground font-semibold" : ""}>Payment</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-0 lg:gap-6 max-w-4xl mx-auto w-full px-0 lg:px-6 py-0 lg:py-8">
        {/* Main Content */}
        <div className="flex-1">

          {/* ── STEP 1: ADDRESS ── */}
          {step === "address" && (
            <div className="flex flex-col">
              {/* Saved Addresses */}
              {addresses.length > 0 && !showForm && (
                <div className="px-4 pt-4 lg:px-0 flex flex-col gap-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Saved Addresses</p>
                  {addresses.map((addr) => (
                    <button
                      key={addr.id}
                      onClick={() => setSelectedId(addr.id)}
                      className={`w-full text-left rounded-2xl border-2 p-4 transition-all ${
                        selectedId === addr.id
                          ? "border-foreground bg-secondary/50"
                          : "border-border bg-card hover:border-foreground/30"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            selectedId === addr.id ? "bg-foreground text-background" : "bg-secondary text-muted-foreground"
                          }`}>
                            <TypeIcon type={addr.type} />
                            {addr.type}
                          </div>
                          <span className="text-[13px] font-semibold text-foreground">{addr.name}</span>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); removeAddress(addr.id); if (selectedId === addr.id) setSelectedId(""); }}
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-red-500 transition-colors" />
                        </button>
                      </div>
                      <p className="text-[13px] text-foreground leading-relaxed">
                        {addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}, {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                      <p className="text-[12px] text-muted-foreground mt-1">{addr.phone}</p>
                    </button>
                  ))}

                  <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2.5 rounded-2xl border-2 border-dashed border-border px-4 py-3.5 text-[13px] font-medium text-muted-foreground hover:border-foreground/40 hover:text-foreground transition-all"
                  >
                    <Plus className="h-4 w-4" />
                    Add New Address
                  </button>

                  <button
                    onClick={() => { if (selectedId) setStep("payment"); }}
                    disabled={!selectedId}
                    className="mt-1 w-full rounded-2xl bg-foreground px-8 py-4 text-[15px] font-semibold text-background hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40 disabled:scale-100"
                  >
                    Deliver to this Address
                  </button>
                </div>
              )}

              {/* Add Address Form */}
              {(showForm || addresses.length === 0) && (
                <div className="px-4 pt-4 lg:px-0 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {addresses.length > 0 ? "Add New Address" : "Add Delivery Address"}
                    </p>
                    {addresses.length > 0 && (
                      <button onClick={() => { setShowForm(false); setFormError(""); setForm(emptyForm); }}
                        className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">
                        Cancel
                      </button>
                    )}
                  </div>

                  <div className="rounded-2xl border border-border bg-card p-4 flex flex-col gap-3">
                    {/* Address type */}
                    <div className="flex gap-2">
                      {(["Home", "Work", "Other"] as Address["type"][]).map((t) => (
                        <button
                          key={t}
                          onClick={() => setForm((f) => ({ ...f, type: t }))}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold border transition-all ${
                            form.type === t
                              ? "bg-foreground text-background border-foreground"
                              : "bg-secondary text-muted-foreground border-border hover:border-foreground/30"
                          }`}
                        >
                          <TypeIcon type={t} />
                          {t}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Full Name *</label>
                        <input
                          value={form.name}
                          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                          placeholder="Your name"
                          className="rounded-xl border border-border bg-background px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-foreground/50 transition-colors"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Phone *</label>
                        <input
                          value={form.phone}
                          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                          placeholder="10-digit number"
                          inputMode="numeric"
                          className="rounded-xl border border-border bg-background px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-foreground/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Address Line 1 *</label>
                      <input
                        value={form.line1}
                        onChange={(e) => setForm((f) => ({ ...f, line1: e.target.value }))}
                        placeholder="House No, Building, Street"
                        className="rounded-xl border border-border bg-background px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-foreground/50 transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Address Line 2</label>
                      <input
                        value={form.line2}
                        onChange={(e) => setForm((f) => ({ ...f, line2: e.target.value }))}
                        placeholder="Area, Colony, Landmark (optional)"
                        className="rounded-xl border border-border bg-background px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-foreground/50 transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">City *</label>
                        <input
                          value={form.city}
                          onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                          placeholder="City"
                          className="rounded-xl border border-border bg-background px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-foreground/50 transition-colors"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Pincode *</label>
                        <input
                          value={form.pincode}
                          onChange={(e) => setForm((f) => ({ ...f, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) }))}
                          placeholder="6-digit pincode"
                          inputMode="numeric"
                          className="rounded-xl border border-border bg-background px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-foreground/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">State *</label>
                      <select
                        value={form.state}
                        onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
                        className="rounded-xl border border-border bg-background px-3 py-2.5 text-[13px] text-foreground outline-none focus:border-foreground/50 transition-colors"
                      >
                        <option value="">Select State</option>
                        {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    {formError && (
                      <p className="text-[12px] font-medium text-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl px-3 py-2">{formError}</p>
                    )}

                    <button
                      onClick={handleAddAddress}
                      className="w-full rounded-xl bg-foreground px-8 py-3.5 text-[14px] font-semibold text-background hover:opacity-90 active:scale-[0.98] transition-all"
                    >
                      Save & Deliver Here
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── STEP 2: PAYMENT ── */}
          {step === "payment" && (
            <div className="px-4 pt-4 lg:px-0 flex flex-col gap-4">
              {/* Selected Address Summary */}
              {(() => {
                const addr = addresses.find((a) => a.id === selectedId);
                if (!addr) return null;
                return (
                  <div className="rounded-2xl border border-border bg-card p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-[13px] font-semibold text-foreground">Delivering to</span>
                      </div>
                      <button onClick={() => setStep("address")} className="text-[12px] font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                        Change
                      </button>
                    </div>
                    <p className="text-[13px] font-semibold text-foreground">{addr.name} · {addr.phone}</p>
                    <p className="text-[12px] text-muted-foreground mt-0.5 leading-relaxed">
                      {addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}, {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                  </div>
                );
              })()}

              {/* Payment Options */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Choose Payment Method</p>
                <div className="flex flex-col gap-3">
                  {/* COD */}
                  <button
                    onClick={() => setPaymentMethod("COD")}
                    className={`flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all ${
                      paymentMethod === "COD"
                        ? "border-foreground bg-secondary/50"
                        : "border-border bg-card hover:border-foreground/30"
                    }`}
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      paymentMethod === "COD" ? "bg-foreground" : "bg-secondary"
                    }`}>
                      <Banknote className={`h-5 w-5 ${paymentMethod === "COD" ? "text-background" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[14px] font-semibold text-foreground">Cash on Delivery</p>
                      <p className="text-[12px] text-muted-foreground mt-0.5">Pay when your order arrives</p>
                    </div>
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      paymentMethod === "COD" ? "border-foreground bg-foreground" : "border-border"
                    }`}>
                      {paymentMethod === "COD" && <div className="h-2 w-2 rounded-full bg-background" />}
                    </div>
                  </button>

                  {/* Online */}
                  <button
                    onClick={() => setPaymentMethod("Online")}
                    className={`flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all ${
                      paymentMethod === "Online"
                        ? "border-foreground bg-secondary/50"
                        : "border-border bg-card hover:border-foreground/30"
                    }`}
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      paymentMethod === "Online" ? "bg-foreground" : "bg-secondary"
                    }`}>
                      <Smartphone className={`h-5 w-5 ${paymentMethod === "Online" ? "text-background" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[14px] font-semibold text-foreground">Online Payment</p>
                      <p className="text-[12px] text-muted-foreground mt-0.5">UPI, Cards, Net Banking & Wallets</p>
                    </div>
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      paymentMethod === "Online" ? "border-foreground bg-foreground" : "border-border"
                    }`}>
                      {paymentMethod === "Online" && <div className="h-2 w-2 rounded-full bg-background" />}
                    </div>
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="rounded-2xl border border-border bg-card p-4 flex flex-col gap-2.5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Price Details</p>
                <div className="flex justify-between text-[13px] text-foreground">
                  <span>Price ({items.length} item{items.length > 1 ? "s" : ""})</span>
                  <span>{formatPrice(items.reduce((a, i) => a + i.product.mrp * i.qty, 0))}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-[13px] text-green-600 dark:text-green-400">
                    <span>Discount</span>
                    <span>- {formatPrice(savings)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[13px] text-foreground">
                  <span>Delivery Fee</span>
                  {deliveryFee === 0
                    ? <span className="text-green-600 dark:text-green-400 font-medium">FREE</span>
                    : <span>{formatPrice(deliveryFee)}</span>
                  }
                </div>
                <div className="border-t border-border my-1" />
                <div className="flex justify-between text-[15px] font-bold text-foreground">
                  <span>Total Amount</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
                {savings > 0 && (
                  <p className="text-[12px] font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-xl px-3 py-2 text-center">
                    You save {formatPrice(savings)} on this order!
                  </p>
                )}
              </div>

              {/* Place Order */}
              <button
                onClick={handlePlaceOrder}
                disabled={placing}
                className="w-full rounded-2xl bg-foreground px-8 py-4 text-[15px] font-semibold text-background hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:scale-100 flex items-center justify-center gap-2"
              >
                {placing ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-background/30 border-t-background" />
                ) : (
                  <>
                    {paymentMethod === "COD" ? <Banknote className="h-4 w-4" /> : <Smartphone className="h-4 w-4" />}
                    Place Order · {formatPrice(grandTotal)}
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* ── SIDEBAR: Order Summary (desktop) ── */}
        <div className="hidden lg:flex flex-col w-[340px] shrink-0">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-5 flex flex-col gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Order Summary</p>
            <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <div className="h-12 w-12 shrink-0 rounded-xl bg-background border border-border flex items-center justify-center overflow-hidden">
                    <img src={item.product.image} alt={item.product.name} className="h-10 w-10 object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-foreground line-clamp-2 leading-snug">{item.product.name}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Qty: {item.qty}</p>
                  </div>
                  <span className="text-[13px] font-semibold text-foreground shrink-0">{formatPrice(item.product.offerPrice * item.qty)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 flex flex-col gap-1.5">
              <div className="flex justify-between text-[13px] text-muted-foreground">
                <span>Subtotal</span><span>{formatPrice(total)}</span>
              </div>
              {deliveryFee > 0 && (
                <div className="flex justify-between text-[13px] text-muted-foreground">
                  <span>Delivery</span><span>{formatPrice(deliveryFee)}</span>
                </div>
              )}
              <div className="flex justify-between text-[15px] font-bold text-foreground mt-1">
                <span>Total</span><span>{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Order Summary (bottom fixed) */}
      <div className="lg:hidden sticky bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-40 mx-4 mb-2 rounded-2xl border border-border bg-card shadow-lg px-5 py-3 flex items-center justify-between">
        <div>
          <p className="text-[11px] text-muted-foreground">{items.length} item{items.length > 1 ? "s" : ""} · {deliveryFee === 0 ? "Free delivery" : `+${formatPrice(deliveryFee)} delivery`}</p>
          <p className="text-[18px] font-bold text-foreground">{formatPrice(grandTotal)}</p>
        </div>
        {savings > 0 && (
          <span className="text-[11px] font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-full">
            Save {formatPrice(savings)}
          </span>
        )}
      </div>

      {/* Success Overlay */}
      {done && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm animate-fade-in">
          <div className="flex flex-col items-center p-10 bg-card rounded-2xl border border-border shadow-[0_20px_60px_rgba(0,0,0,0.15)] animate-scale-in mx-6 text-center">
            <div className="h-20 w-20 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center mb-6">
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Order Placed!</h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-[220px]">
              {paymentMethod === "COD"
                ? "Pay cash when your order arrives."
                : "Payment confirmed. Your order is being prepared."}
            </p>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Checkout;
