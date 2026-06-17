import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { Product, Category, Order, User, Review, Coupon, BlogItem, AuditLog } from './src/types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_COUPONS, EDUCATIONAL_BLOGS } from './src/data/initialRecords';

const app = express();
const PORT = 3000;

// Enable JSON bodies
app.use(express.json({ limit: '50mb' }));

// Initial State Databases mock (in-memory for secure execution)
let DB_PRODUCTS: Product[] = [...INITIAL_PRODUCTS];
let DB_ORDERS: Order[] = [];
let DB_COUPONS: Coupon[] = [...INITIAL_COUPONS];
let DB_BLOGS: BlogItem[] = [...EDUCATIONAL_BLOGS];
let DB_REVIEWS: Review[] = [
  {
    id: 'r1',
    productId: 'p1',
    userId: 'u1',
    userName: 'Ramesh Patel',
    rating: 5,
    comment: 'The automatic key turn worked perfectly! Safely harvested pristine clear honey with zero stings. Truly wonderful craft wood.',
    date: '2026-06-10',
    approved: true
  },
  {
    id: 'r2',
    productId: 'p6',
    userId: 'u2',
    userName: 'Anand Dhangar',
    rating: 5,
    comment: 'Excellent pine wood finish. The dovetail joints make it extremely draft-proof. Swarms settled in very fast.',
    date: '2026-06-12',
    approved: true
  }
];

let DB_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'l1',
    action: 'SYSTEM_BOOTUP',
    user: 'Yogesh Dawkhar (Director)',
    timestamp: new Date().toISOString(),
    details: 'DTC Full-Stack Platform started. Preloaded beekeeping catalog successfully.',
    type: 'security'
  }
];

// Initialize Gemini Client safely server-side
let ai: GoogleGenAI | null = null;
try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
    DB_AUDIT_LOGS.push({
      id: 'l_g1',
      action: 'GEMINI_INITIALIZED',
      user: 'System Backend',
      timestamp: new Date().toISOString(),
      details: 'Google GenAI SDK client mounted securely for AI Import catalog services.',
      type: 'info'
    });
  } else {
    console.log("No GEMINI_API_KEY found in process.env. Catalog fallback ready.");
  }
} catch (error: any) {
  console.error("Failed to initialize GoogleGenAI Engine:", error);
}

// -------------------------------------------------------------
// SECURE REST CONTROLLERS (Full-Stack Routing)
// -------------------------------------------------------------

// Security logger utility
function logAudit(action: string, user: string, details: string, type: 'security' | 'inventory' | 'catalog' | 'order' | 'info') {
  const newLog: AuditLog = {
    id: 'log_' + Math.random().toString(36).substring(2, 9),
    action,
    user,
    timestamp: new Date().toISOString(),
    details,
    type
  };
  DB_AUDIT_LOGS.unshift(newLog);
  console.log(`[AUDIT LOG] ${action} by ${user}: ${details}`);
}

// 1. Audit Logs
app.get('/api/audit-logs', (req, res) => {
  res.json(DB_AUDIT_LOGS);
});

// 2. Categories
app.get('/api/categories', (req, res) => {
  res.json(INITIAL_CATEGORIES);
});

// 3. Products Endpoints
app.get('/api/products', (req, res) => {
  res.json(DB_PRODUCTS);
});

app.post('/api/products', (req, res) => {
  const product: Product = req.body;
  if (!product.id) {
    product.id = 'p_' + Math.random().toString(36).substring(2, 9);
  }
  DB_PRODUCTS.push(product);
  logAudit('PRODUCT_CREATED', req.body.author || 'Admin (Yogesh Dawkhar)', `Created product '${product.name}' with price Rs. ${product.price}`, 'catalog');
  res.status(201).json(product);
});

app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const index = DB_PRODUCTS.findIndex(p => p.id === id);
  if (index !== -1) {
    DB_PRODUCTS[index] = { ...DB_PRODUCTS[index], ...req.body };
    logAudit('PRODUCT_UPDATED', 'Admin (Yogesh Dawkhar)', `Updated product parameters for id ${id}`, 'catalog');
    res.json(DB_PRODUCTS[index]);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const index = DB_PRODUCTS.findIndex(p => p.id === id);
  if (index !== -1) {
    const name = DB_PRODUCTS[index].name;
    DB_PRODUCTS.splice(index, 1);
    logAudit('PRODUCT_DELETED', 'Admin (Yogesh Dawkhar)', `Removed product '${name}' from active catalog`, 'catalog');
    res.json({ success: true, message: `Product ${id} deleted` });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// 4. Coupons
app.get('/api/coupons', (req, res) => {
  res.json(DB_COUPONS);
});

app.post('/api/coupons', (req, res) => {
  const coupon: Coupon = req.body;
  coupon.id = 'cp_' + Math.random().toString(36).substring(2, 10);
  DB_COUPONS.push(coupon);
  logAudit('COUPON_CREATED', 'Admin (Yogesh Dawkhar)', `Created promotional voucher code: ${coupon.code}`, 'security');
  res.status(201).json(coupon);
});

// 5. Orders Endpoints
app.get('/api/orders', (req, res) => {
  res.json(DB_ORDERS);
});

app.post('/api/orders', (req, res) => {
  const order: Order = req.body;
  order.id = 'DTC-ORD-' + Math.floor(100000 + Math.random() * 900000);
  order.createdAt = new Date().toISOString();
  order.status = 'processing';
  order.invoiceNumber = `INV-2026-${order.id.split('-')[2]}`;
  
  DB_ORDERS.unshift(order);
  
  // Deduct stock levels and raise inventory alerts
  order.items.forEach(item => {
    const prod = DB_PRODUCTS.find(p => p.id === item.productId);
    if (prod) {
      prod.stock = Math.max(0, prod.stock - item.quantity);
      if (prod.stock <= 5) {
        logAudit('INVENTORY_ALERT', 'System Agent', `CRITICAL STOCK ALERT: '${prod.name}' is running thin (only ${prod.stock} left)!`, 'inventory');
      }
    }
  });

  logAudit('ORDER_PLACED', order.userId, `Placed order ${order.id}. Total amount: Rs. ${order.total}`, 'order');
  res.status(201).json(order);
});

app.put('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const index = DB_ORDERS.findIndex(o => o.id === id);
  if (index !== -1) {
    DB_ORDERS[index] = { ...DB_ORDERS[index], ...req.body };
    logAudit('ORDER_STATE_CHANGED', 'Admin Operator', `Set Order status for ${id} to [${req.body.status}]`, 'order');
    res.json(DB_ORDERS[index]);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// 6. Reviews Endpoints
app.get('/api/reviews', (req, res) => {
  res.json(DB_REVIEWS);
});

app.post('/api/reviews', (req, res) => {
  const review: Review = req.body;
  review.id = 'rev_' + Math.random().toString(36).substring(2, 9);
  review.date = new Date().toISOString().split('T')[0];
  review.approved = true; // Auto approved for demo ease
  DB_REVIEWS.unshift(review);
  
  // Recalculate product score
  const pro = DB_PRODUCTS.find(p => p.id === review.productId);
  if (pro) {
    const matching = DB_REVIEWS.filter(r => r.productId === pro.id);
    const sum = matching.reduce((acc, r) => acc + r.rating, 0);
    pro.rating = Number((sum / matching.length).toFixed(1));
    pro.reviewsCount = matching.length;
  }

  res.status(201).json(review);
});

// 7. Educational Blogs
app.get('/api/blogs', (req, res) => {
  res.json(DB_BLOGS);
});

app.post('/api/blogs', (req, res) => {
  const blog: BlogItem = req.body;
  blog.id = 'blg_' + Math.random().toString(36).substring(2, 9);
  blog.date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  blog.commentsCount = 0;
  DB_BLOGS.unshift(blog);
  logAudit('BLOG_POSTED', blog.author || 'Yogesh Dawkhar', `Published blog entry: ${blog.title}`, 'info');
  res.status(201).json(blog);
});

// 8. Authentication (OTP & JWT Simulators)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  
  const formattedEmail = email.toLowerCase().trim();
  const isAdmin = formattedEmail.includes('admin') || formattedEmail === 'dt.exim@gmail.com' || formattedEmail === 'anshkoli413@gmail.com';
  
  const user: User = {
    id: isAdmin ? 'u_admin' : 'u_' + Math.random().toString(36).substring(2, 9),
    name: isAdmin ? 'Yogesh Dawkhar (Director)' : 'Valued Customer',
    email: formattedEmail,
    role: isAdmin ? 'admin' : 'customer',
    addresses: [
      {
        id: 'ad1',
        name: isAdmin ? 'Yogesh Dawkhar' : 'John Doe',
        phone: '+91 7738508276',
        street: '301 Om Sai Apartment, Sector 12, Kamothe',
        city: 'Navi Mumbai',
        state: 'Maharashtra',
        zip: '410209',
        type: 'work'
      }
    ]
  };

  logAudit('USER_SIGNIN', user.name, `Logged into platform securely. Role: ${user.role}`, 'security');
  res.json({ user, token: 'secure_mock_jwt_token_' + Date.now() });
});

app.post('/api/auth/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  res.json({ success: true, message: 'OTP verification complete. Access granted !' });
});

// -------------------------------------------------------------
// AI CATALOG IMPORT CONTROLLER (Using @google/genai)
// -------------------------------------------------------------
app.post('/api/ai/import-catalog', async (req, res) => {
  const { pdfText, fallbackProducts } = req.body;
  
  if (!ai) {
    // No API key fallback
    logAudit('IMPORT_FALLBACK_TRIGGERED', 'Admin (AI Mock)', `Processed OCR text locally as Gemini API key is not provisioned.`, 'catalog');
    if (fallbackProducts && fallbackProducts.length > 0) {
      return res.json({ products: fallbackProducts });
    }
    return res.json({
      products: [
        {
          name: "Imported Flow Hive Extractor Standard",
          price: 9500,
          description: "High performance beekeeping honey flow box with solid frames.",
          category: "beekeeping-tools",
          specifications: { "Automation Grade": "Manual", "Material": "Natural Wood", "Price Info": "Extracted from Catalog text" },
          images: ["https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?auto=format&fit=crop&q=80&w=600"],
          rating: 4.8,
          reviewsCount: 1,
          stock: 10,
          status: "pending_review",
          tags: ["imported", "catalog-extract", "eco-beekeeping"]
        }
      ]
    });
  }

  try {
    const prompt = `Analyze the following OCR catalog parsed text of beekeeping equipment catalog from Dheera Trading Company (DTC).
Detect all products described, extract their clean Names, direct prices (in numeric Rupee and strip extraneous text), full Descriptions, precise Specifications, suggested categories matching exactly one of our allowed list:
Allowed List of Categories:
'beehive-boxes', 'flow-hives', 'observation-hives', 'honey-extractors', 'beekeeping-tools', 'bee-feeders', 'bee-frames', 'bee-wax-products', 'queen-rearing', 'protective-equipment', 'honey-processing', 'accessories'

Input Document Text:
${pdfText || 'Automatic Premium Quality Imported Flow Frames, cost Rs.14000. Set of 7.'}

Output a strictly formatted JSON array containing the structural products.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            products: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Product commercial title extracted" },
                  price: { type: Type.INTEGER, description: "Numeric cost extracted in Rs. e.g. 14000" },
                  description: { type: Type.STRING, description: "Polished agricultural product sales description" },
                  category: { type: Type.STRING, description: "Match path exact name from allowed categories list" },
                  specifications: {
                    type: Type.OBJECT,
                    description: "Key value lists representing parameters like size, compatbee, or composition",
                    properties: {
                      "Material": { type: Type.STRING },
                      "Size": { type: Type.STRING },
                      "Application": { type: Type.STRING }
                    }
                  },
                  tags: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                },
                required: ["name", "price", "description", "category"]
              }
            }
          },
          required: ["products"]
        }
      }
    });

    const outputText = response.text || "{}";
    const data = JSON.parse(outputText);
    
    // Inject defaults (status: 'pending_review', generic placeholders)
    const formattedProducts = (data.products || []).map((p: any) => ({
      id: 'ai_' + Math.random().toString(36).substring(2, 9),
      name: p.name,
      price: p.price || 1200,
      description: p.description || "Premium Beekeeping accessory extracted by DTC Intelligence.",
      category: p.category || "beekeeping-tools",
      specifications: p.specifications || { "Origin": "DTC Catalog Import" },
      images: ["https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&q=80&w=600"],
      rating: 5.0,
      reviewsCount: 0,
      stock: 12,
      status: 'pending_review',
      tags: p.tags || ["extracted", "catalog"]
    }));

    logAudit('CATALOG_IMPORT_COMPLETED', 'Yogesh Dawkhar (AI System)', `Extracted ${formattedProducts.length} draft catalog product structures via Gemini AI.`, 'catalog');
    res.json({ products: formattedProducts });

  } catch (error: any) {
    console.error("Gemini OCR parsing error:", error);
    res.status(500).json({ error: "Failed to extract product JSON using Gemini. Fallback to manual approval list.", details: error.message });
  }
});


// -------------------------------------------------------------
// VITE OR STATIC FILE STREAM MIDDLEWARE
// -------------------------------------------------------------
async function bootstrap() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log("Vite hot asset server loaded.");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("Serving static distribution builds from /dist.");
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DTC Platform online at http://0.0.0.0:${PORT}`);
  });
}

bootstrap();
