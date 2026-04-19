# Technical Documentation: Frontend Architecture & Backend Integration Blueprint

## 1. OVERVIEW

This application is a React + TypeScript Progressive Web App (PWA) designed for an e-commerce ecosystem. The application acts strictly as a UI consumption wrapper mapped to a Spring Boot backend, meaning it assumes zero local database truth and fetches all data remotely.

### Key Features:
*   **Authentication**: Hard-gated UI demanding login via `emailId` and `password` payload. Unauthenticated users cannot view products or their cart.
*   **Sequential Product Discovery**: Fetches primary categories, iterating through subcategories to retrieve nested products matching the UI presentation requirements.
*   **Real-time Cart**: Fully server-synced cart operations requiring interaction with nested `subProduct` elements alongside mapped `cartId`.
*   **Order & Address Pipeline**: Checkouts demand backend-approved IDs for cart contexts and addresses before placing payloads asynchronously.

---

## 2. ARCHITECTURE

The repository architecture reflects a separation of concerns aimed at isolating HTTP operations (Services) from business mapping logic (Hooks) and rendering logic (Components).

*   **`src/services/`**: Low-level API bindings (using Axios adapters). Responsibilities include routing URLs, wrapping headers locally, intercepting response faults manually, and terminating unauthenticated requests proactively.
*   **`src/hooks/`**: Medium-level data aggregation wrappers. Houses in-memory proxy singletons mirroring a central Context store, iterating API payloads, and remapping mismatched backend responses natively. 
*   **`src/components/`**: Reusable generic units (Header, BottomNav, ProductCard). Read implicitly strictly from hook caches.
*   **`src/pages/`**: Primary page routers (ProductListing, ProductDetail, Checkout) defining macro layout sequences and routing rules.
*   **`src/config/api.ts`**: Static endpoint mappings for base paths spanning over backend services.

---

## 3. DATA FLOW

1.  **Products**: 
    Products are aggregated through a multi-tier pipeline upon initial layout construction: Let Primary Category `/primarycategories` resolve ➜ Iteratively spawn `/subcategories` arrays off primary IDs ➜ Iteratively spawn `/product` lists off subcategory IDs ➜ Remap properties in `useProducts.ts` ➜ Cache into `cachedProducts` array in memory.
2.  **Cart**: 
    The layout dictates cart presence via `useCart()`. Hook queries `GET /viewcart` dynamically. Changes dispatch linearly. E.g., Adding item invokes `POST /addtocart` followed strictly by a refetch to resync the cache via `refreshCart()`. 
3.  **Address**: 
    Checkout relies on a pre-fetched `GET /address` block cached actively inside `useAddresses`. Manipulations execute POST/DELETE requests, instantly refetching the layout list afterward to bind a selected UI address node uniquely to its backend `id`.
4.  **Orders**: 
    A user places an order triggering `POST /order` appended exclusively via previously extracted `cartId` and user-toggled `addressId`. Active state resets upon a successful confirmation flag. 

---

## 4. STATE MANAGEMENT

*   **Zustand removal**: The UI has completely excised external global state libraries natively (e.g., Zustand) within the core commerce modules (orders, address, cart, products). 
*   **In-Memory Proxy Singletons**: Shared memory buffers are maintained locally traversing across React lifecycles. (e.g., `let globalCartItems = []`, `let cachedProducts = []`). 
*   **Observer Listeners**: Components consuming mapped lists synchronize seamlessly via an internally maintained pub-sub loop (`let listeners = []`). Execution of `refreshCart()` pushes new states directly into every active React listener identically to a Context Provider but scoped specifically inside hooks.
*   **Backend as State**: The application trusts the server completely. Local mutations do not optimistic-render. Local hooks await server responses before triggering an update listener sequence. 

---

## 5. API INTEGRATION

Central Client configured via `src/services/apiClient.ts` globally appends `emailId` and `password` on every request via `localStorage` retrieval. Returns `403` forcefully reroute window location to `/login`.

### **Auth Guard `checkAuth()`**
Present internally within all service fetch layers:
*   Immediately throws `Error("Unauthorized")` and redirects if local storage misses credentials. No API is triggered if failed. 

### **Login**
*   **Endpoint**: `POST /login`
*   **Headers**: None inherently beyond basic JSON wrapper.
*   **Request Body**: `{ emailId, password }`
*   **Action**: Pushes keys tightly into local storage. 

### **Products Collection**
*   **Endpoint 1**: `GET /primarycategory`
    *   **Response mapping**: Uses `primaryCategoryId`, `primaryCategoryName`. 
*   **Endpoint 2**: `GET /subcategories`
    *   **Headers**: `primaryCategoryId`
    *   **Response mapping**: Uses `subCategoryId`, `subCategoryName`. 
*   **Endpoint 3**: `GET /product`
    *   **Headers**: `subCategoryId`, `pageNumber`
*   **Endpoint 4**: `GET /productimage` (Not an API call but direct string mapping on components).
    *   **Params**: `?productImageId=ID`

### **Cart Management**
*   **Endpoint 1**: `POST /addtocart`
    *   **Request Body**: `{ subProduct: { id: ID }, quantity: number }`
*   **Endpoint 2**: `GET /viewcart`
    *   **Response List**: List of structures defining `subProduct`, bounded by `cart.id`.
*   **Endpoint 3**: `DELETE /removefromcart`
    *   **Headers**: `subProductId`

### **Address Management**
*   **Endpoint 1**: `GET /address`
*   **Endpoint 2**: `POST /address`, `PUT /address`
    *   **Request Body**: Address JSON definitions (`street`, `city`, `zipCode` etc.).
*   **Endpoint 3**: `DELETE /address`
    *   **Headers**: `addressId`

### **Order Execution**
*   **Endpoint 1**: `POST /order`
    *   **Headers**: `cartId`, `addressId`
    *   **Request Body**: `{ paymentMethod: string, totalAmount: number }`
*   **Endpoint 2**: `GET /order`
    *   **Response Structure**: Iterative objects exposing `status`, `orderDate`, and nested recursive `orderItems | items` bound tightly to `subProduct` elements.

---

## 6. COMPONENT RESPONSIBILITIES

### **ProductListing & ProductDetail**
*   **Renders**: Grid-lists grids representing mapped catalogues and isolated descriptive instances.
*   **Data Input**: Connects to `useProducts()` retrieving mapped representations matching `id`, `offerPrice`, and explicit remote image paths.
*   **Actions**: Filter logic loops local client-side memory against pre-cached items resolving immediate responses upon queries. Triggers `<ProductCard/>` rendering.

### **ProductCard**
*   **Renders**: A singular retail tile wrapper.
*   **Data Input**: Consumes static `<Product/>` properties (prop-drilled) alongside deep-referencing `useCart().getQty(id)` dynamically calculating visual representation variants ("Add to Cart" vs "+/-" spinner block).
*   **Actions**: Dispatches directly isolated logic sequentially binding to `addToCart`, `increaseQty`, and `decreaseQty`.

### **Cart & Header**
*   **Renders**: Summary wrappers indicating transactional weight.
*   **Data Input**: `useCart()` singleton logic exposing `totalItems()` evaluating strictly active synced volumes.
*   **Actions**: `Header.tsx` links user routes while highlighting cart counts responsively.

### **Checkout**
*   **Renders**: Payment and operational address validation UI sequences.
*   **Data Input**: Actively extracts `cartId` dynamically assigned via the overarching cart observer array. Polls `useAddresses()` array mapping user properties natively.
*   **Actions**: Throttles operations ensuring validity over `addressId` and `cartId`. Connects with `orderService.ts` to dispatch. Resets application vectors post-success utilizing `clearCart()`.

### **Orders**
*   **Renders**: Purchase histories structured horizontally.
*   **Data Input**: Pulls deeply fetched array elements mapping nested arrays directly to visually identical subcomponents imitating typical items arrays. 

---

## 7. USER FLOWS

### **Browsing**
1. User logs in. Hooks validate local storage keys.
2. App routes logic to the home layout.
3. `useProducts.ts` mounts internally executing an aggressive nested pipeline. Queries execute serially downloading all primary > subcategory > products.
4. Mapped lists route directly inside variables matching exactly the UI rendering tree (`name`, `price`, `image` with explicit API bindings).
5. User navigates. Client-side mapping performs searching dynamically bypassing deep requests post-initial-load.

### **Add to Cart**
1. User clicks Add to Cart. Component pulls explicit `product.id`. 
2. `useCart().addToCart(id, 1)` activates HTTP logic. payload constructs `{ subProduct: {id}, quantity: 1 }`.
3. Server commits to save. UI does NOT update optimally. 
4. Hook strictly waits for the resolution. Hook triggers `refreshCart()`.
5. Application queries `GET /viewcart`. Result maps internal identifiers. Singletons mutate array contents. Component hooks forcefully sync interface quantities reflecting numbers.

### **Checkout / Order Placement**
1. Client routes to `/checkout`. `useAddresses` and `useCart` parallel fetch ensuring data exists natively. 
2. User selects an address wrapper extracting backend specific property `id` ➜ assigned to `selectedId`.
3. User selects 'Place Order'.
4. Logic filters deeply bound arrays securing the absolute literal `cartId` binding.
5. Execution checks null bindings sequentially stopping operations if variables disconnect. 
6. `POST /order` dispatched transmitting `cartId` and `addressId` internally via HTTP Headers.
7. Upon successful 200/201 response, UI blocks, hooks terminate cart arrays explicitly, and users divert automatically over to completion screens. 

---

## 8. DATA MODELS (FRONTEND MAPPED)

### **Product Model (Mapped specifically for UI structure)**
```typescript
{
  id: string; // extracted heavily prioritizing subProductId -> id
  name: string; // extracted from productName
  price: number; // mapped back precisely against sellingPrice
  mrp: number; // matched explicitly avoiding discount gaps
  offerPrice: number; 
  image: string; // dynamically constructed using helper string literal
  brand: string; 
  category: string; // injected globally leveraging overarching tier parent iterations
  subcategory: string; // injected natively alongside category looping
}
```

### **CartItem**
```typescript
{
  product: Product; // Deeply structured mapped node containing id representing subProduct 
  qty: number; // Explicit user quantity mapping exactly against 'quantity' payload
  cartId: string; // Essential mapping isolated primarily on top tier elements extracting literal definitions for header wrapping.
}
```

### **Order**
```typescript
{
  id: string; 
  placedAt: string; // Extracts orderDate or natively generates ISO variables
  status: string; 
  paymentMethod: string; 
  total: number;
  savings: number; // Assumed mapped natively equal to 0 by default. 
  address: {
      name: string; // Maps fullName or assumes generic Fallback
      line1: string; // Assumes street layout schemas
      line2: string;
      city: string;
      state: string;
      pincode: string; // Generically maps zipCode wrappers. 
  };
  items: CartItem[]; // Native array nesting leveraging subProduct logic sequences identical recursively via Cart routines. 
}
```

---

## 9. DEPENDENCIES ON BACKEND

The Frontend relies on strict compliance with the following behaviors:

*   **Absolute Header Requirements**: ALL APIs MUST process incoming validation accepting explicit `emailId` and `password` payload mappings tightly checking string variables natively without typical token wrappers.
*   **SubProduct Exclusivity**: Cart mechanics strictly operate around mapping payloads defined locally inside bounded containers explicitly structured against `{ subProduct: { id: x } }`. Generic Product payloads will structurally fail. 
*   **Image Serving Consistency**: Relying internally on string templates explicitly routing toward `http://localhost:8080/ecommerce/productimage?productImageId=ID`. Missing array schemas natively crash logic (`productImageList?.[0]?.id`). 
*   **Header Wrapping Identifiers**: Checkout orders explicitly target API endpoints checking for uniquely attached identifiers isolated completely on headers (`cartId` & `addressId`).

---

## 10. LIMITATIONS / ASSUMPTIONS

*   **Sequential Bottlenecking**: Constructing product catalogs demands executing serial loops scaling logarithmically. Large catalogs involving hundreds of categories/subcategories will execute catastrophic load volumes generating severe blocking mechanisms. This assumes smaller active catalog deployments implicitly.  
*   **Session State Fragmentation**: Since `checkAuth` redirects natively, user credentials bypassing caching mechanics implicitly reboot app interfaces natively executing logic loss if user navigates back implicitly dynamically. 
*   **Quantity Logic Deductions**: Decrementing cart elements operates entirely under the explicit assumption that triggering an integer of `-1` against an overarching `POST /addtocart` mechanism actively deducts metrics via backend arithmetic processing operations natively bypassing DELETE variables explicitly targeting item reductions locally.
*   **Error Masking**: Active implementations hide network failures natively returning silent `console.error` logs masking transaction faults actively without displaying operational flags visually if variables crash unexpectedly structurally mapping mismatches.

---

## 11. AUTHENTICATION FLOWS (DETAILED)

### **Login Process**
```typescript
// Login sequence in Login.tsx
const handleLogin = async () => {
  try {
    const response = await apiClient.post('/login', { emailId, password });
    // Backend MUST return user object with emailId
    localStorage.setItem('emailId', emailId);
    localStorage.setItem('password', password);
    localStorage.setItem('user', JSON.stringify(response.data));
    navigate('/');
  } catch (error) {
    // Frontend expects error.message from backend
    setError(error.message || 'Login failed');
  }
};
```

**Backend Requirements:**
- **POST /login** must accept `{ emailId: string, password: string }`
- **Success Response**: User object with at least `{ emailId: string }`
- **Error Response**: `{ message: string }` with appropriate HTTP status codes
- **403 Handling**: Automatic redirect to `/login` on any 403 response

### **Authentication Guard Implementation**
```typescript
// Used in all service files
const checkAuth = () => {
  if (!localStorage.getItem("emailId")) {
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }
};
```

**Critical Backend Dependencies:**
- ALL protected endpoints MUST validate `emailId` and `password` headers
- Headers are sent as: `{ "emailId": "user@example.com", "password": "plainpassword" }`
- Backend must authenticate these credentials on every request
- Invalid credentials MUST return 403 status code

---

## 12. DETAILED API RESPONSE STRUCTURES

### **Product API Responses**

**GET /primarycategory Response:**
```typescript
{
  primaryCategoryId: string;
  primaryCategoryName: string;
}[]
```

**GET /subcategories Response:**
```typescript
{
  subCategoryId: string;
  subCategoryName: string;
  primaryCategoryId: string;
}[]
```

**GET /product Response:**
```typescript
{
  subProductId: string;
  productName: string;
  sellingPrice: number;
  brand: {
    brandName: string;
  };
  productImageList: {
    id: string;
    // potentially more image properties
  }[];
}[]
```

### **Cart API Responses**

**GET /viewcart Response:**
```typescript
{
  cart: {
    id: string; // cartId - CRITICAL for checkout
  };
  cartItems: {
    subProduct: {
      id: string;
      productName: string;
      sellingPrice: number;
      productImageList: { id: string }[];
    };
    quantity: number;
    sellingPricePerUnit: number;
  }[];
}
```

**POST /addtocart Request:**
```typescript
{
  subProduct: { id: string };
  quantity: number;
}
```

**POST /addtocart Response:**
```typescript
{
  success: boolean;
  message?: string;
  // Potentially updated cart data
}
```

### **Order API Responses**

**POST /order Request Headers:**
```
cartId: string
addressId: string
```

**POST /order Request Body:**
```typescript
{
  paymentMethod: "COD" | "Online";
  totalAmount: number;
  // Potentially additional order metadata
}
```

**POST /order Response:**
```typescript
{
  orderId: string;
  status: string;
  orderDate: string;
  totalAmount: number;
  paymentMethod: string;
  // Potentially more order details
}
```

**GET /order Response:**
```typescript
{
  orderId: string;
  orderDate: string;
  status: "Confirmed" | "Packed" | "Shipped" | "Delivered";
  totalAmount: number;
  paymentMethod: string;
  orderItems: {
    subProduct: {
      id: string;
      productName: string;
      sellingPrice: number;
      productImageList: { id: string }[];
    };
    quantity: number;
    sellingPricePerUnit: number;
  }[];
  address: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}[]
```

### **Address API Responses**

**GET /address Response:**
```typescript
{
  addressId: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  type: "Home" | "Work" | "Other";
}[]
```

**POST /address Request:**
```typescript
{
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  type: "Home" | "Work" | "Other";
}
```

---

## 13. ERROR HANDLING PATTERNS

### **API Error Interception**
```typescript
// apiClient.ts interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 403) {
      // Clear all auth data
      localStorage.removeItem("emailId");
      localStorage.removeItem("password");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```

### **Service Level Error Handling**
```typescript
// Pattern used in all services
export const getProducts = async () => {
  checkAuth(); // Throws and redirects if not authenticated
  try {
    const res = await apiClient.get(endpoint);
    return res.data;
  } catch (error) {
    // Errors bubble up to components
    throw error;
  }
};
```

### **Component Level Error Handling**
```typescript
// Pattern in hooks
const fetchProducts = async () => {
  try {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
  } catch (err) {
    console.error("Failed to fetch products:", err);
    // UI shows loading state indefinitely on error
    // Consider implementing error boundaries
  } finally {
    setLoading(false);
  }
};
```

**Backend Error Requirements:**
- All error responses should include a `message` field
- Authentication failures MUST return 403 status
- Validation errors should return 400 with descriptive messages
- Server errors should return 500 with generic error message

---

## 14. PERFORMANCE & CACHING CONSIDERATIONS

### **Product Caching Strategy**
```typescript
// useProducts.ts caching implementation
let cachedProducts: Product[] = [];

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(cachedProducts);
  const [loading, setLoading] = useState(!cachedProducts.length);

  useEffect(() => {
    if (cachedProducts.length > 0) return; // Skip if cached
    // Fetch and cache products
  }, []);
};
```

**Implications:**
- Products fetched once per session and cached in memory
- Cache persists until page refresh
- Large catalogs may cause memory issues
- No cache invalidation strategy implemented

### **Cart State Synchronization**
```typescript
// Global cart state with listener pattern
let globalCartItems: any[] = [];
let listeners: Array<(items: any[], cartId: string) => void> = [];

export const refreshCart = async () => {
  const data = await getCart();
  const mapped = data.map(mapCartItem);
  globalCartItems = mapped;
  listeners.forEach((l) => l(mapped, globalCartId));
};
```

**Performance Characteristics:**
- Cart refetched after every mutation
- No optimistic updates
- Multiple cart operations trigger multiple API calls
- Listener pattern ensures all components stay synchronized

---

## 15. DEPLOYMENT & CONFIGURATION

### **Environment Variables**
```typescript
// config/api.ts
export const BASE_URL = 
  (import.meta.env.VITE_API_URL as string) || "http://localhost:8080/ecommerce";
```

**Required Environment Variables:**
- `VITE_API_URL`: Base URL for backend API
- Default: `http://localhost:8080/ecommerce`

### **Build Configuration**
- **Vite** build system
- **TypeScript** strict mode enabled
- **PWA** configuration with service worker
- **TailwindCSS** for styling
- **React Router** for navigation

### **Image Serving**
```typescript
// Image URL construction
export const getImage = (id: string | number | undefined) => {
  if (!id) return "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=200&h=200&fit=crop&auto=format&q=80";
  return `http://localhost:8080/ecommerce/productimage?productImageId=${id}`;
};
```

**Backend Image Service Requirements:**
- **Endpoint**: `GET /productimage`
- **Query Parameter**: `productImageId={id}`
- **Response**: Binary image data
- **Fallback**: Unsplash placeholder image used when no ID provided

---

## 16. CRITICAL BACKEND INTEGRATION POINTS

### **Authentication System**
1. **Header-based auth** on ALL requests
2. **Plain text password** transmission (NOT token-based)
3. **Immediate redirect** on 403 responses
4. **Session persistence** via localStorage

### **Product Catalog System**
1. **Three-tier hierarchy**: Primary > Subcategory > Products
2. **Sequential fetching** required (no bulk endpoint)
3. **Image ID mapping** critical for display
4. **Brand association** via nested brand objects

### **Cart Management**
1. **SubProduct-centric** operations
2. **CartId extraction** for checkout
3. **Real-time synchronization** required
4. **Quantity management** via POST operations

### **Order Processing**
1. **Header-based cart/address binding**
2. **Status tracking** through order lifecycle
3. **Item structure** mirrors cart items
4. **Address integration** required

---

## 17. TESTING CONSIDERATIONS

### **Frontend Testing Requirements**
- Mock API responses for component testing
- Test authentication flows and redirects
- Verify cart synchronization across components
- Test error handling and loading states

### **Backend Testing Requirements**
- Test header-based authentication
- Verify product hierarchy responses
- Test cart operations with subProduct structure
- Verify order placement with proper headers

### **Integration Testing**
- Test complete user flows from login to order
- Verify error handling across API boundaries
- Test image serving and fallbacks
- Verify state synchronization patterns

---

## 18. SECURITY CONSIDERATIONS

### **Current Security Model**
- **Plain text password transmission** in headers
- **No token-based authentication**
- **No CSRF protection**
- **localStorage persistence** of credentials

### **Recommended Security Enhancements**
- Implement JWT or session-based authentication
- Add CSRF tokens for state-changing operations
- Implement secure credential storage
- Add request rate limiting
- Implement input validation and sanitization

---

## 19. SCALABILITY CONCERNS

### **Current Limitations**
1. **Sequential product fetching** - O(n*m) API calls
2. **In-memory caching** - No persistence across sessions
3. **Global state management** - May cause memory leaks
4. **No pagination** in product fetching

### **Recommended Improvements**
1. **Bulk product endpoints** for efficient loading
2. **Persistent caching** with invalidation strategies
3. **Pagination** for large catalogs
4. **Optimistic updates** for better UX
5. **Background sync** for offline support 
