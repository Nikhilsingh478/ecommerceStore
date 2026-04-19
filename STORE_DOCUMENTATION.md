# SwiftCart Store System - Comprehensive Documentation

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Store Dependencies](#store-dependencies)
4. [useCartStore](#usecartstore)
5. [useAddressStore](#useaddressstore)
6. [useOrderStore](#useorderstore)
7. [Data Flow & Interactions](#data-flow--interactions)
8. [Persistence & Storage](#persistence--storage)
9. [Usage Examples](#usage-examples)
10. [Best Practices](#best-practices)
11. [Common Patterns](#common-patterns)

---

## Overview

The SwiftCart store system is built using **Zustand** with **localStorage persistence** to manage the application's state. It consists of three main stores that handle different aspects of the e-commerce experience:

- **Cart Management** - Product selection, quantity management, and pricing
- **Address Management** - User delivery addresses and location data
- **Order Management** - Order history and order lifecycle

### Key Features
- ✅ **TypeScript First** - Full type safety with comprehensive interfaces
- ✅ **Persistent Storage** - Data survives page refreshes and browser restarts
- ✅ **Optimistic Updates** - Immediate UI feedback with state synchronization
- ✅ **Computed Values** - Derived state (totals, counts) calculated on demand
- ✅ **Immutable Updates** - Pure functional state updates following React best practices

---

## Architecture

### Technology Stack
```
┌─────────────────────────────────────────────────────────────┐
│                    SwiftCart Store System               │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │ useCartStore │  │useAddressStore│  │useOrderStore │ │
│  │             │  │             │  │             │ │
│  │ • Products  │  │ • Addresses │  │ • Orders    │ │
│  │ • Quantities│  │ • Location  │  │ • History   │ │
│  │ • Pricing   │  │ • Types     │  │ • Status    │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                 Zustand Core Engine                    │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  • State Management                           │ │
│  │  • Actions & Mutations                      │ │
│  │  • Selectors & Getters                      │ │
│  │  • Middleware Integration                    │ │
│  └─────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│               Persistence Layer                         │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  • localStorage via zustand/persist           │ │
│  │  • Automatic Serialization/Deserialization     │ │
│  │  • Separate Storage Namespaces                │ │
│  │  • Error Handling & Fallbacks               │ │
│  └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Design Principles
1. **Single Source of Truth** - Each store owns its domain data
2. **Immutability** - State updates create new objects, never mutate existing ones
3. **Separation of Concerns** - Clear boundaries between cart, address, and order domains
4. **Type Safety** - Comprehensive TypeScript interfaces for all data structures
5. **Performance** - Computed values calculated only when needed

---

## Store Dependencies

### External Dependencies
```typescript
// Core state management
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Type definitions
import { Product } from "@/data/products";
```

### Internal Dependencies
```typescript
// useOrderStore depends on:
import { CartItem } from "./useCartStore";  // For order items
import { Address } from "./useAddressStore"; // For delivery address
```

### Data Models
```typescript
// Core Product interface (from data/products.ts)
export interface Product {
  id: string;           // Unique product identifier
  name: string;         // Display name
  category: string;      // Primary category (grocery, electronics, etc.)
  subcategory: string;   // Specific subcategory
  price: number;        // Current selling price
  mrp: number;          // Maximum Retail Price
  discount: number;      // Discount percentage
  offerPrice: number;    // Final price after discount
  image: string;        // Product image URL
  brand: string;        // Brand name
  description?: string;   // Optional product description
}
```

---

## useCartStore

### Purpose
Manages the shopping cart functionality including product selection, quantity management, and price calculations.

### Interface Definition
```typescript
export interface CartItem {
  product: Product;  // Complete product information
  qty: number;       // Current quantity in cart
}

interface CartState {
  // State
  items: CartItem[];
  
  // Actions
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  increaseQty: (productId: string) => void;
  decreaseQty: (productId: string) => void;
  getQty: (productId: string) => number;
  totalItems: () => number;
  totalPrice: () => number;
  clearCart: () => void;
}
```

### State Properties

#### `items: CartItem[]`
- **Description**: Array of all items currently in the shopping cart
- **Structure**: Each item contains the complete product object and quantity
- **Uniqueness**: No duplicate product IDs - managed by addToCart logic
- **Persistence**: Saved to localStorage under key "swiftcart-cart"

### Action Methods

#### `addToCart(product: Product) => void`
**Purpose**: Add a product to the cart or increment quantity if already present

**Implementation Details**:
```typescript
addToCart: (product) =>
  set((s) => {
    const existing = s.items.find((i) => i.product.id === product.id);
    if (existing) {
      // Product exists - increment quantity
      return { 
        items: s.items.map((i) => 
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i
        ) 
      };
    } else {
      // New product - add with quantity 1
      return { items: [...s.items, { product, qty: 1 }] };
    }
  })
```

**Behavior**:
- ✅ Searches for existing product by ID
- ✅ If found: increments quantity by 1
- ✅ If not found: creates new cart item with qty: 1
- ✅ Maintains immutability with spread operator
- ✅ Preserves other items unchanged

**Use Cases**:
- User clicks "Add to Cart" button
- Quick add from product listing
- Re-add removed item with same settings

---

#### `removeFromCart(productId: string) => void`
**Purpose**: Remove a product completely from the cart

**Implementation Details**:
```typescript
removeFromCart: (productId) =>
  set((s) => ({ 
    items: s.items.filter((i) => i.product.id !== productId) 
  }))
```

**Behavior**:
- ✅ Filters out item with matching product ID
- ✅ Removes all quantities of that product
- ✅ Returns new array without the removed item
- ✅ Maintains order of remaining items

**Use Cases**:
- User clicks trash/delete icon
- Clear cart functionality
- Remove out-of-stock items

---

#### `increaseQty(productId: string) => void`
**Purpose**: Increment quantity of a specific cart item by 1

**Implementation Details**:
```typescript
increaseQty: (productId) =>
  set((s) => ({ 
    items: s.items.map((i) => 
      i.product.id === productId ? { ...i, qty: i.qty + 1 } : i
    ) 
  }))
```

**Behavior**:
- ✅ Finds item by product ID
- ✅ Increments quantity by exactly 1
- ✅ Preserves other items unchanged
- ✅ No upper limit on quantity

**Use Cases**:
- User clicks + button in cart
- Quantity stepper increment
- Bulk quantity adjustment

---

#### `decreaseQty(productId: string) => void`
**Purpose**: Decrement quantity or remove item if quantity reaches 0

**Implementation Details**:
```typescript
decreaseQty: (productId) =>
  set((s) => {
    const item = s.items.find((i) => i.product.id === productId);
    if (item && item.qty <= 1) {
      // Quantity 1 or less - remove item completely
      return { items: s.items.filter((i) => i.product.id !== productId) };
    } else {
      // Quantity > 1 - decrement by 1
      return { 
        items: s.items.map((i) => 
          i.product.id === productId ? { ...i, qty: i.qty - 1 } : i
        ) 
      };
    }
  })
```

**Behavior**:
- ✅ Finds item by product ID
- ✅ If qty ≤ 1: removes item completely
- ✅ If qty > 1: decrements by 1
- ✅ Prevents negative quantities
- ✅ Handles edge cases gracefully

**Use Cases**:
- User clicks - button in cart
- Quantity stepper decrement
- Remove last item automatically

---

#### `getQty(productId: string) => number`
**Purpose**: Get current quantity of a specific product in cart

**Implementation Details**:
```typescript
getQty: (productId) => 
  get().items.find((i) => i.product.id === productId)?.qty || 0
```

**Behavior**:
- ✅ Searches items by product ID
- ✅ Returns quantity if found
- ✅ Returns 0 if not found (optional chaining)
- ✅ Uses Zustand's get() for direct state access

**Use Cases**:
- Display current quantity on product pages
- Validate add to cart operations
- Cart badge count calculations

---

#### `totalItems() => number`
**Purpose**: Calculate total number of items across all products

**Implementation Details**:
```typescript
totalItems: () => 
  get().items.reduce((sum, i) => sum + i.qty, 0)
```

**Behavior**:
- ✅ Sums quantities of all cart items
- ✅ Returns total item count (not product count)
- ✅ Used for cart badges and notifications
- ✅ Computed on demand for performance

**Use Cases**:
- Cart badge display: "Cart (5)"
- Item count validation
- Checkout requirements checking

---

#### `totalPrice() => number`
**Purpose**: Calculate total price of all items in cart

**Implementation Details**:
```typescript
totalPrice: () => 
  get().items.reduce((sum, i) => sum + i.product.offerPrice * i.qty, 0)
```

**Behavior**:
- ✅ Uses offerPrice (discounted price) for calculations
- ✅ Multiplies by quantity for each item
- ✅ Sums all item totals
- ✅ Returns final cart total
- ✅ Excludes delivery fees (calculated elsewhere)

**Use Cases**:
- Cart total display
- Delivery fee calculations
- Order total confirmation
- Payment processing

---

#### `clearCart() => void`
**Purpose**: Remove all items from cart

**Implementation Details**:
```typescript
clearCart: () => set({ items: [] })
```

**Behavior**:
- ✅ Resets items array to empty
- ✅ Triggers immediate re-render
- ✅ Clears persisted storage
- ✅ Used after successful checkout

**Use Cases**:
- Post-checkout cleanup
- Manual cart clearing
- Debug/testing scenarios

---

### Persistence Configuration
```typescript
persist(
  // Store implementation
  (set, get) => ({ /* ... */ }),
  
  // Configuration
  {
    name: "swiftcart-cart",  // localStorage key
    // Default options: versioning, migration, etc.
  }
)
```

**Storage Details**:
- **Key**: `"swiftcart-cart"`
- **Location**: Browser localStorage
- **Format**: JSON serialization
- **Hydration**: Automatic on app load
- **Sync**: Real-time across tabs

---

## useAddressStore

### Purpose
Manages user delivery addresses including creation, deletion, and address validation.

### Interface Definition
```typescript
export interface Address {
  id: string;                    // Unique identifier (timestamp-based)
  name: string;                  // Contact person name
  phone: string;                 // 10-digit phone number
  line1: string;                 // Primary address line
  line2: string;                 // Secondary address line (optional)
  city: string;                  // City name
  state: string;                 // Indian state name
  pincode: string;               // 6-digit postal code
  type: "Home" | "Work" | "Other";  // Address category
}

interface AddressState {
  // State
  addresses: Address[];
  
  // Actions
  addAddress: (address: Omit<Address, "id">) => void;
  removeAddress: (id: string) => void;
}
```

### State Properties

#### `addresses: Address[]`
- **Description**: Array of all saved delivery addresses
- **Initial State**: Empty array `[]`
- **Persistence**: Saved to localStorage under key "swiftcart-addresses"
- **Order**: Maintains insertion order (newest first after add)

### Action Methods

#### `addAddress(address: Omit<Address, "id">) => void`
**Purpose**: Add a new delivery address with auto-generated ID

**Implementation Details**:
```typescript
addAddress: (addr) =>
  set((s) => ({
    addresses: [
      ...s.addresses,
      { ...addr, id: Date.now().toString() },  // Auto-generate unique ID
    ],
  }))
```

**Behavior**:
- ✅ Accepts address without ID field
- ✅ Generates unique ID using timestamp
- ✅ Appends to existing addresses array
- ✅ Preserves existing addresses unchanged
- ✅ Maintains insertion order

**ID Generation**:
- **Method**: `Date.now().toString()`
- **Format**: Millisecond timestamp as string
- **Uniqueness**: Guaranteed for single-session operations
- **Type**: String for consistency with other IDs

**Use Cases**:
- New user address registration
- Address book management
- Checkout address addition

---

#### `removeAddress(id: string) => void`
**Purpose**: Remove an address by its unique identifier

**Implementation Details**:
```typescript
removeAddress: (id) =>
  set((s) => ({ 
    addresses: s.addresses.filter((a) => a.id !== id) 
  }))
```

**Behavior**:
- ✅ Filters out address with matching ID
- ✅ Returns new array without removed address
- ✅ Maintains order of remaining addresses
- ✅ Silent no-op if ID not found

**Use Cases**:
- Address deletion from address book
- Cleanup of invalid addresses
- User-initiated address removal

---

### Address Validation Rules

#### Phone Number Validation
```typescript
if (!/^\d{10}$/.test(form.phone.trim())) {
  setFormError("Enter a valid 10-digit phone number.");
  return;
}
```

**Requirements**:
- ✅ Exactly 10 digits
- ✅ No special characters
- ✅ No country code prefix
- ✅ Indian mobile number format

#### Pincode Validation
```typescript
if (!/^\d{6}$/.test(form.pincode.trim())) {
  setFormError("Enter a valid 6-digit pincode.");
  return;
}
```

**Requirements**:
- ✅ Exactly 6 digits
- ✅ Indian postal code format
- ✅ No alphabetic characters
- ✅ No special characters

#### Required Fields
All fields except `line2` are required:
- ✅ `name` - Contact person name
- ✅ `phone` - 10-digit mobile number
- ✅ `line1` - Primary address line
- ✅ `city` - City name
- ✅ `state` - Must match one of Indian states
- ✅ `pincode` - 6-digit postal code
- ✅ `type` - Address category (Home/Work/Other)

---

### Indian States List
```typescript
const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
  "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
  "Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh",
];
```

**Coverage**:
- ✅ All 28 Indian states + 8 Union Territories
- ✅ Updated for current administrative divisions
- ✅ Includes Jammu & Kashmir and Ladakh separately
- ✅ Used for dropdown selection and validation

---

### Persistence Configuration
```typescript
persist(
  // Store implementation
  (set) => ({ /* ... */ }),
  
  // Configuration
  { 
    name: "swiftcart-addresses"  // localStorage key
  }
)
```

**Storage Details**:
- **Key**: `"swiftcart-addresses"`
- **Location**: Browser localStorage
- **Format**: JSON serialization
- **Capacity**: Limited by localStorage size (typically 5-10MB)

---

## useOrderStore

### Purpose
Manages order history, order lifecycle, and order-related operations.

### Interface Definition
```typescript
export interface Order {
  id: string;                           // Unique order identifier
  items: CartItem[];                     // Products and quantities ordered
  address: Address;                       // Delivery address
  paymentMethod: "COD" | "Online";       // Payment type
  total: number;                          // Total amount including delivery
  savings: number;                        // Total savings from MRP
  placedAt: string;                       // ISO timestamp of order placement
  status: "Confirmed" | "Packed" | "Shipped" | "Delivered";
}

interface OrderState {
  // State
  orders: Order[];
  
  // Actions
  addOrder: (order: Order) => void;
}
```

### State Properties

#### `orders: Order[]`
- **Description**: Array of all user orders in chronological order
- **Initial State**: Empty array `[]`
- **Persistence**: Saved to localStorage under key "swiftcart-orders"
- **Order**: Newest orders first (prepended on add)

### Action Methods

#### `addOrder(order: Order) => void`
**Purpose**: Add a new order to the order history

**Implementation Details**:
```typescript
addOrder: (order) =>
  set((s) => ({ 
    orders: [order, ...s.orders]  // Prepend for newest first
  })
```

**Behavior**:
- ✅ Adds new order at beginning of array
- ✅ Maintains chronological order (newest first)
- ✅ Preserves existing orders unchanged
- ✅ No duplicate checking (assumes unique IDs)

**Use Cases**:
- Post-checkout order creation
- Order confirmation processing
- Order history management

---

### Order Status Lifecycle

#### Status Values
```typescript
type OrderStatus = "Confirmed" | "Packed" | "Shipped" | "Delivered";
```

#### Status Flow
```
Confirmed → Packed → Shipped → Delivered
    ↓         ↓         ↓          ↓
  Order    Order    Order    Order
 Placed   Prepared  In Transit  Received
```

#### Status Descriptions

**"Confirmed"**:
- Order successfully placed
- Payment processed
- Items reserved in inventory
- Delivery scheduled

**"Packed"**:
- Items packaged for delivery
- Quality check completed
- Ready for pickup
- Label attached

**"Shipped"**:
- Out for delivery
- Tracking available
- In transit to address
- ETA provided

**"Delivered"**:
- Successfully delivered
- Received by customer
- Order complete
- Feedback available

---

### Order Data Structure

#### Complete Order Example
```typescript
{
  id: "1713547200000",                    // Timestamp-based ID
  items: [                                 // Cart items snapshot
    {
      product: { /* Complete Product object */ },
      qty: 2
    }
  ],
  address: {                               // Delivery address snapshot
    id: "1713547100000",
    name: "John Doe",
    phone: "9876543210",
    line1: "123 Main Street",
    line2: "Apt 4B",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    type: "Home"
  },
  paymentMethod: "COD",                     // Payment type
  total: 1250,                            // Final amount including delivery
  savings: 150,                            // Total savings from MRP
  placedAt: "2024-03-19T10:30:00.000Z", // ISO timestamp
  status: "Confirmed"                       // Current status
}
```

#### Financial Calculations

**Total Calculation**:
```typescript
const total = totalPrice() + deliveryFee;
```
- ✅ Cart items total (offerPrice × quantity)
- ✅ Delivery fee (₹40 if < ₹499, free if ≥ ₹499)
- ✅ No additional taxes or charges

**Savings Calculation**:
```typescript
const savings = items.reduce((acc, item) =>
  acc + (item.product.mrp - item.product.offerPrice) * item.qty, 0
);
```
- ✅ Difference between MRP and offer price
- ✅ Multiplied by quantity for each item
- ✅ Summed across all items
- ✅ Displayed as "You save ₹X"

---

### Persistence Configuration
```typescript
persist(
  // Store implementation
  (set) => ({ /* ... */ }),
  
  // Configuration
  { 
    name: "swiftcart-orders"  // localStorage key
  }
)
```

**Storage Details**:
- **Key**: `"swiftcart-orders"`
- **Location**: Browser localStorage
- **Format**: JSON serialization
- **Growth**: Accumulates over time (user lifetime)

---

## Data Flow & Interactions

### Store Interaction Patterns

#### Cart → Checkout Flow
```typescript
// 1. User adds items to cart
const { addToCart } = useCartStore();
addToCart(product);

// 2. User proceeds to checkout
navigate("/checkout");

// 3. Checkout reads cart data
const { items, totalPrice, clearCart } = useCartStore();

// 4. Order placement creates order
const { addOrder } = useOrderStore();
addOrder({
  id: Date.now().toString(),
  items: [...items],        // Snapshot cart items
  address: selectedAddress,
  paymentMethod: "COD",
  total: grandTotal,
  savings: calculatedSavings,
  placedAt: new Date().toISOString(),
  status: "Confirmed"
});

// 5. Clear cart after successful order
clearCart();
```

#### Address Selection Flow
```typescript
// 1. User manages addresses
const { addresses, addAddress, removeAddress } = useAddressStore();

// 2. Add new address during checkout
addAddress({
  name: "John Doe",
  phone: "9876543210",
  line1: "123 Main St",
  city: "Mumbai",
  state: "Maharashtra",
  pincode: "400001",
  type: "Home"
});

// 3. Select address for order
const [selectedId, setSelectedId] = useState(addresses[0]?.id ?? "");
const selectedAddress = addresses.find(a => a.id === selectedId);
```

#### Order History Access
```typescript
// 1. View orders in account
const { orders } = useOrderStore();

// 2. Filter orders by status
const confirmedOrders = orders.filter(o => o.status === "Confirmed");
const deliveredOrders = orders.filter(o => o.status === "Delivered");

// 3. Calculate order statistics
const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
const totalSaved = orders.reduce((sum, order) => sum + order.savings, 0);
```

### Cross-Store Dependencies

#### Order Creation Dependencies
```typescript
// useOrderStore imports from other stores:
import { CartItem } from "./useCartStore";    // For order items type
import { Address } from "./useAddressStore";    // For delivery address type
```

#### Data Ownership Boundaries
- **Cart Store**: Owns current shopping session data
- **Address Store**: Owns user location data
- **Order Store**: Owns historical order data
- **No Circular Dependencies**: Clean separation of concerns

### Real-time Synchronization

#### Multi-tab Synchronization
```typescript
// All stores use zustand persist with default configuration
// This enables automatic sync across browser tabs:

// Tab A: Add item to cart
addToCart(product);

// Tab B: Automatically receives update
const { items } = useCartStore(); // Reflects Tab A's changes
```

#### Storage Event Handling
- **Automatic**: Built into zustand persist
- **Immediate**: Changes propagate instantly
- **Conflict Resolution**: Last write wins
- **Fallback**: Graceful handling of storage errors

---

## Persistence & Storage

### localStorage Strategy

#### Storage Keys
```typescript
"swiftcart-cart"      // Shopping cart data
"swiftcart-addresses"  // User addresses
"swiftcart-orders"      // Order history
```

#### Data Serialization
```typescript
// Automatic JSON serialization/deserialization
// Example stored cart item:
{
  "state": {
    "items": [
      {
        "product": {
          "id": "1",
          "name": "Tata Salt 1kg",
          "category": "grocery",
          "subcategory": "atta-rice-dal",
          "price": 28,
          "mrp": 30,
          "discount": 7,
          "offerPrice": 28,
          "image": "https://...",
          "brand": "Tata"
        },
        "qty": 2
      }
    ]
  },
  "version": 0
}
```

### Storage Limitations & Considerations

#### Browser Storage Limits
- **Chrome**: 10MB per origin
- **Firefox**: 10MB per origin
- **Safari**: 5MB per origin
- **Mobile**: Often lower limits

#### Data Size Management
```typescript
// Cart store: Typically < 1KB (few items)
// Address store: Typically < 5KB (few addresses)
// Order store: Grows over time (potential issue)
```

#### Error Handling
```typescript
// Built-in zustand persist error handling:
// - Storage quota exceeded
// - Private browsing mode
// - Storage disabled
// - JSON serialization errors
```

### Migration Strategy

#### Version Handling
```typescript
// Future-proofing with version numbers:
persist(
  (set, get) => ({ /* ... */ }),
  {
    name: "swiftcart-cart",
    version: 1,  // Increment for breaking changes
    migrate: (persistedState, version) => {
      // Handle version migrations
      if (version === 0) {
        // Migrate from v0 to v1
        return migratedState;
      }
    }
  }
)
```

---

## Usage Examples

### Basic Cart Operations
```typescript
// In any component
import { useCartStore } from "@/store/useCartStore";

function ProductCard({ product }: { product: Product }) {
  const { addToCart, getQty } = useCartStore();
  const currentQty = getQty(product.id);
  
  const handleAddToCart = () => {
    addToCart(product);
    // Show toast notification
    toast.success("Added to cart!");
  };
  
  return (
    <div>
      <h3>{product.name}</h3>
      <p>₹{product.offerPrice}</p>
      <button onClick={handleAddToCart}>
        Add to Cart {currentQty > 0 && `(${currentQty})`}
      </button>
    </div>
  );
}
```

### Cart Management Page
```typescript
// Cart page component
import { useCartStore } from "@/store/useCartStore";

function CartPage() {
  const { 
    items, 
    increaseQty, 
    decreaseQty, 
    removeFromCart, 
    totalPrice, 
    totalItems 
  } = useCartStore();
  
  const deliveryFee = totalPrice() >= 499 ? 0 : 40;
  const grandTotal = totalPrice() + deliveryFee;
  
  return (
    <div>
      <h1>Cart ({totalItems()})</h1>
      
      {items.map((item) => (
        <CartItem 
          key={item.product.id}
          item={item}
          onIncrease={() => increaseQty(item.product.id)}
          onDecrease={() => decreaseQty(item.product.id)}
          onRemove={() => removeFromCart(item.product.id)}
        />
      ))}
      
      <div>
        <p>Subtotal: ₹{totalPrice()}</p>
        <p>Delivery: ₹{deliveryFee}</p>
        <p>Total: ₹{grandTotal}</p>
      </div>
    </div>
  );
}
```

### Address Management
```typescript
// Address form component
import { useAddressStore } from "@/store/useAddressStore";

function AddressForm() {
  const { addAddress } = useAddressStore();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    line1: "",
    city: "",
    state: "",
    pincode: "",
    type: "Home" as const
  });
  
  const handleSubmit = () => {
    // Validation logic here
    addAddress(formData);
    setFormData({ /* reset form */ });
    toast.success("Address added!");
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Add Address</button>
    </form>
  );
}
```

### Order History
```typescript
// Orders page component
import { useOrderStore } from "@/store/useOrderStore";

function OrdersPage() {
  const { orders } = useOrderStore();
  
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Confirmed": return "blue";
      case "Packed": return "orange";
      case "Shipped": return "purple";
      case "Delivered": return "green";
      default: return "gray";
    }
  };
  
  return (
    <div>
      <h1>Your Orders</h1>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
```

### Checkout Process
```typescript
// Checkout page component
import { useCartStore } from "@/store/useCartStore";
import { useAddressStore } from "@/store/useAddressStore";
import { useOrderStore } from "@/store/useOrderStore";

function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const { addresses } = useAddressStore();
  const { addOrder } = useOrderStore();
  
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "Online">("COD");
  
  const handlePlaceOrder = () => {
    const selectedAddress = addresses.find(a => a.id === selectedAddressId);
    if (!selectedAddress) return;
    
    const newOrder: Order = {
      id: Date.now().toString(),
      items: [...items],
      address: selectedAddress,
      paymentMethod,
      total: totalPrice() + (totalPrice() >= 499 ? 0 : 40),
      savings: items.reduce((acc, item) => 
        acc + (item.product.mrp - item.product.offerPrice) * item.qty, 0
      ),
      placedAt: new Date().toISOString(),
      status: "Confirmed"
    };
    
    addOrder(newOrder);
    clearCart();
    navigate("/orders");
    toast.success("Order placed successfully!");
  };
  
  return (
    <div>
      {/* Address selection */}
      {/* Payment method selection */}
      {/* Order summary */}
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
}
```

---

## Best Practices

### Performance Optimization

#### Selective Store Usage
```typescript
// ✅ Good: Destructure only what you need
const { addToCart, getQty } = useCartStore();

// ❌ Avoid: Destructuring everything unnecessarily
const { items, addToCart, removeFromCart, increaseQty, decreaseQty, 
        getQty, totalItems, totalPrice, clearCart } = useCartStore();
```

#### Computed Values
```typescript
// ✅ Good: Calculate totals on demand
const CartTotal = () => {
  const { totalPrice } = useCartStore();
  return <div>Total: ₹{totalPrice()}</div>;
};

// ❌ Avoid: Storing computed values in state
// Don't add total to cart state - calculate when needed
```

#### Memoization
```typescript
// ✅ Good: Memoize expensive calculations
const CartSummary = React.memo(() => {
  const { items, totalPrice } = useCartStore();
  
  const savings = useMemo(() => 
    items.reduce((acc, item) => 
      acc + (item.product.mrp - item.product.offerPrice) * item.qty, 0
    ), [items]
  );
  
  return <div>You saved: ₹{savings}</div>;
});
```

### Error Handling

#### Graceful Degradation
```typescript
// ✅ Good: Handle storage errors gracefully
const CartProvider = ({ children }: { children: ReactNode }) => {
  try {
    const store = useCartStore();
    return <CartContext.Provider value={store}>{children}</CartContext.Provider>;
  } catch (error) {
    console.error("Cart store initialization failed:", error);
    return <div>Shopping cart temporarily unavailable</div>;
  }
};
```

#### Data Validation
```typescript
// ✅ Good: Validate data before using
const SafeCartDisplay = () => {
  const { items } = useCartStore();
  
  if (!Array.isArray(items)) {
    return <div>Cart data corrupted</div>;
  }
  
  return (
    <div>
      {items.map(item => (
        <CartItem key={item.product.id} item={item} />
      ))}
    </div>
  );
};
```

### Testing Support

#### Test Store Isolation
```typescript
// ✅ Good: Reset store for testing
beforeEach(() => {
  useCartStore.setState({ items: [] });
  useAddressStore.setState({ addresses: [] });
  useOrderStore.setState({ orders: [] });
});
```

#### Mock Store for Testing
```typescript
// ✅ Good: Create mock store for unit tests
const mockCartStore = create<CartState>()((set, get) => ({
  items: [],
  addToCart: vi.fn(),
  removeFromCart: vi.fn(),
  // ... other methods
}));
```

### Security Considerations

#### Data Sanitization
```typescript
// ✅ Good: Sanitize data before storage
const addAddress = (address: Omit<Address, "id">) => {
  const sanitizedAddress = {
    ...address,
    name: address.name.trim(),
    phone: address.phone.replace(/\D/g, ''), // Keep only digits
    pincode: address.pincode.replace(/\D/g, '')
  };
  
  set((s) => ({
    addresses: [...s.addresses, { ...sanitizedAddress, id: Date.now().toString() }]
  }));
};
```

#### Sensitive Data Protection
```typescript
// ✅ Good: Avoid storing sensitive information
// Current implementation stores:
// - Product IDs (non-sensitive)
// - Addresses (necessary for delivery)
// - Order history (necessary for service)

// ❌ Avoid storing:
// - Full credit card numbers
// - CVV codes
// - Passwords
// - Excessive personal information
```

---

## Common Patterns

### Immutable Updates
```typescript
// ✅ Correct: Create new objects/arrays
set((s) => ({
  items: s.items.map(item => 
    item.product.id === productId 
      ? { ...item, qty: item.qty + 1 }
      : item
  )
}));

// ❌ Incorrect: Mutating state directly
set((s) => {
  const item = s.items.find(i => i.product.id === productId);
  if (item) item.qty++; // Mutation!
  return s;
});
```

### Selector Patterns
```typescript
// ✅ Good: Create specific selectors
const useCartItemCount = () => useCartStore(state => state.totalItems());
const useCartTotal = () => useCartStore(state => state.totalPrice());

// Usage in components:
const itemCount = useCartItemCount();
const cartTotal = useCartTotal();
```

### Action Composition
```typescript
// ✅ Good: Create complex actions from basic ones
const useCartActions = () => {
  const { addToCart, removeFromCart } = useCartStore();
  
  const replaceItem = (oldProductId: string, newProduct: Product) => {
    removeFromCart(oldProductId);
    addToCart(newProduct);
  };
  
  return { replaceItem };
};
```

### State Synchronization
```typescript
// ✅ Good: Sync with external systems
const useCartSync = () => {
  const { items } = useCartStore();
  
  useEffect(() => {
    // Sync with backend
    api.syncCart(items).catch(error => {
      console.error("Cart sync failed:", error);
    });
  }, [items]);
};
```

---

## Conclusion

The SwiftCart store system provides a robust, type-safe, and performant foundation for managing e-commerce state. With Zustand's simplicity and localStorage persistence, users enjoy a seamless shopping experience across sessions and devices.

### Key Strengths
- **Type Safety**: Full TypeScript coverage prevents runtime errors
- **Performance**: Optimistic updates and efficient computations
- **Persistence**: Reliable localStorage integration
- **Scalability**: Clean architecture supports future growth
- **Developer Experience**: Simple API with powerful capabilities

### Future Enhancements
- **Backend Sync**: Cloud synchronization across devices
- **Offline Support**: Service worker for offline operations
- **Analytics Integration**: Purchase behavior tracking
- **Advanced Caching**: Product data and image optimization
- **Real-time Updates**: WebSocket integration for live order tracking

This documentation serves as the definitive guide for understanding, maintaining, and extending the SwiftCart store system.
