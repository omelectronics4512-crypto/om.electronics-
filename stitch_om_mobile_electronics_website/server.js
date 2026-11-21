/* =========================================================================
   OM MOBILE & ELECTRONICS (Branch No. 4, Dhanore, Pune)
   Secure Production Backend Server (Node.js Zero-Dependency Architecture)
   ========================================================================= */

const http = require('http');
const fs = require('fs');
const path = require('path');

// 1. Load .env Configuration securely
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.substring(0, eqIdx).trim();
        let val = trimmed.substring(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.substring(1, val.length - 1);
        }
        process.env[key] = val;
      }
    });
  }
}
loadEnv();

const PORT = parseInt(process.env.PORT, 10) || 3000;
const SUPABASE_URL = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';
const ADMIN_USER = (process.env.ADMIN_USERNAME || 'guarav bhosle').trim().toLowerCase();
const ADMIN_PASS = (process.env.ADMIN_PASSWORD || 'guarav@omelectronics');

function isCloudActive() {
  return Boolean(
    SUPABASE_URL && 
    SUPABASE_KEY && 
    SUPABASE_URL.startsWith('http') && 
    !SUPABASE_URL.includes('your-project')
  );
}

// Local server fallback file storage
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'products.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]', 'utf8');
  }
}
ensureDataDir();

function getLocalFileProducts() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function saveLocalFileProducts(products) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), 'utf8');
    return true;
  } catch (e) {
    console.error('Error saving local file products:', e);
    return false;
  }
}

// Mappers between Supabase snake_case and Frontend camelCase
function dbToProduct(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    name: row.name || 'Device',
    category: row.category || 'smartphones',
    brand: row.brand || 'Apple',
    price: Number(row.price) || 0,
    originalPrice: Number(row.original_price != null ? row.original_price : row.price) || 0,
    emiPerMonth: Number(row.emi_per_month) || 0,
    rating: Number(row.rating) || 4.8,
    reviews: Number(row.reviews) || 0,
    tag: row.tag || 'New',
    tagColor: row.tag_color || 'bg-primary text-white',
    stockStatus: row.stock_status || 'In Stock',
    image: row.image || '',
    description: row.description || '',
    specs: (typeof row.specs === 'object' && row.specs !== null) ? row.specs : {},
    colors: Array.isArray(row.colors) ? row.colors : [],
    createdAt: row.created_at || new Date().toISOString()
  };
}

function productToDb(p) {
  return {
    id: String(p.id),
    name: p.name,
    category: p.category || 'smartphones',
    brand: p.brand || 'Other',
    price: Number(p.price) || 0,
    original_price: Number(p.originalPrice) || Number(p.price) || 0,
    emi_per_month: Number(p.emiPerMonth) || 0,
    rating: Number(p.rating) || 4.8,
    reviews: Number(p.reviews) || 0,
    tag: p.tag || 'New Arrival',
    tag_color: p.tagColor || 'bg-primary text-white',
    stock_status: p.stockStatus || 'In Stock',
    image: p.image || '',
    description: p.description || '',
    specs: p.specs || {},
    colors: Array.isArray(p.colors) ? p.colors : [],
    updated_at: new Date().toISOString()
  };
}

// Supabase REST Call Helpers
async function supabaseFetch(endpoint, options = {}) {
  const url = `${SUPABASE_URL}/rest/v1${endpoint}`;
  const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };
  return fetch(url, { ...options, headers });
}

// MIME Types Map
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.sql': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8'
};

// Request Body Parser Helper
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 10 * 1024 * 1024) { // 10MB limit for image uploads
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

// Main HTTP Server
const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // -------------------------------------------------------------------------
  // REST API ENDPOINTS
  // -------------------------------------------------------------------------
  if (pathname.startsWith('/api/')) {
    
    // 1. System Status
    if (pathname === '/api/status' && req.method === 'GET') {
      return sendJson(res, 200, {
        status: 'online',
        cloudConfigured: isCloudActive(),
        storageEngine: isCloudActive() ? 'Supabase PostgreSQL' : 'Local File Storage',
        storeName: 'OM Mobile & Electronics (Branch No. 4, Dhanore)',
        version: '2.0.0-production'
      });
    }

    // 2. Admin Authentication
    if (pathname === '/api/admin/login' && req.method === 'POST') {
      const { username, password } = await parseBody(req);
      const userClean = (username || '').trim().toLowerCase();
      if (userClean === ADMIN_USER && password === ADMIN_PASS) {
        return sendJson(res, 200, {
          success: true,
          message: 'Authenticated successfully',
          adminName: 'Gaurav Bhosle',
          branch: 'Branch No. 4, Dhanore'
        });
      } else {
        return sendJson(res, 401, {
          success: false,
          message: 'Invalid username or password'
        });
      }
    }

    // 3. Products: GET ALL
    if (pathname === '/api/products' && req.method === 'GET') {
      if (isCloudActive()) {
        try {
          const resp = await supabaseFetch('/products?select=*&order=created_at.desc');
          if (resp.ok) {
            const data = await resp.json();
            return sendJson(res, 200, data.map(dbToProduct));
          } else {
            const err = await resp.text();
            console.warn('Supabase GET failed, falling back to local file:', err);
          }
        } catch (e) {
          console.warn('Supabase network error:', e.message);
        }
      }
      return sendJson(res, 200, getLocalFileProducts());
    }

    // 4. Products: CREATE
    if (pathname === '/api/products' && req.method === 'POST') {
      const product = await parseBody(req);
      const id = product.id || 'om-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
      const newProduct = { ...product, id, createdAt: new Date().toISOString() };

      if (isCloudActive()) {
        try {
          const resp = await supabaseFetch('/products', {
            method: 'POST',
            headers: { 'Prefer': 'return=representation' },
            body: JSON.stringify([productToDb(newProduct)])
          });
          if (resp.ok) {
            const data = await resp.json();
            return sendJson(res, 201, dbToProduct(data[0]));
          }
        } catch (e) {
          console.error('Supabase insert failed:', e);
        }
      }

      // Local fallback
      const current = getLocalFileProducts();
      current.unshift(newProduct);
      saveLocalFileProducts(current);
      return sendJson(res, 201, newProduct);
    }

    // 5. Products: UPDATE (PUT /api/products/:id)
    if (pathname.startsWith('/api/products/') && req.method === 'PUT') {
      const id = decodeURIComponent(pathname.substring('/api/products/'.length));
      const updates = await parseBody(req);

      if (isCloudActive()) {
        try {
          const resp = await supabaseFetch(`/products?id=eq.${encodeURIComponent(id)}`, {
            method: 'PATCH',
            headers: { 'Prefer': 'return=representation' },
            body: JSON.stringify(productToDb({ ...updates, id }))
          });
          if (resp.ok) {
            const data = await resp.json();
            return sendJson(res, 200, dbToProduct(data[0]));
          }
        } catch (e) {
          console.error('Supabase update failed:', e);
        }
      }

      const current = getLocalFileProducts();
      const idx = current.findIndex(p => p.id === id);
      if (idx !== -1) {
        current[idx] = { ...current[idx], ...updates, updatedAt: new Date().toISOString() };
        saveLocalFileProducts(current);
        return sendJson(res, 200, current[idx]);
      }
      return sendJson(res, 404, { error: 'Product not found' });
    }

    // 6. Products: DELETE (DELETE /api/products/:id)
    if (pathname.startsWith('/api/products/') && req.method === 'DELETE') {
      const id = decodeURIComponent(pathname.substring('/api/products/'.length));

      if (isCloudActive()) {
        try {
          await supabaseFetch(`/products?id=eq.${encodeURIComponent(id)}`, {
            method: 'DELETE'
          });
        } catch (e) {
          console.error('Supabase delete failed:', e);
        }
      }

      let current = getLocalFileProducts();
      current = current.filter(p => p.id !== id);
      saveLocalFileProducts(current);
      return sendJson(res, 200, { success: true, deletedId: id });
    }

    // 7. Load 16 Sample Products
    if (pathname === '/api/products/sample' && req.method === 'POST') {
      const storeModule = require('./store.js');
      const samples = storeModule.OM_SAMPLE_PRODUCTS || [];

      if (isCloudActive()) {
        try {
          await supabaseFetch('/products', {
            method: 'POST',
            headers: { 'Prefer': 'resolution=merge-duplicates' },
            body: JSON.stringify(samples.map(productToDb))
          });
        } catch (e) {
          console.error('Supabase sample load failed:', e);
        }
      }

      saveLocalFileProducts(samples);
      return sendJson(res, 200, { success: true, count: samples.length, products: samples });
    }

    // 8. Clear All Products
    if (pathname === '/api/products/clear' && req.method === 'POST') {
      if (isCloudActive()) {
        try {
          await supabaseFetch('/products?id=neq.___non_existent___', {
            method: 'DELETE'
          });
        } catch (e) {
          console.error('Supabase clear failed:', e);
        }
      }

      saveLocalFileProducts([]);
      return sendJson(res, 200, { success: true, count: 0 });
    }

    return sendJson(res, 404, { error: 'API route not found' });
  }

  // -------------------------------------------------------------------------
  // STATIC FILE SERVING
  // -------------------------------------------------------------------------
  let filePath = '';
  if (pathname === '/' || pathname === '/index.html') {
    filePath = path.join(__dirname, 'index.html');
  } else if (pathname === '/products' || pathname === '/products.html') {
    filePath = path.join(__dirname, 'products.html');
  } else if (pathname === '/admin' || pathname === '/admin/' || pathname === '/admin.html' || pathname === '/admin/index.html') {
    filePath = path.join(__dirname, 'admin.html');
  } else {
    filePath = path.join(__dirname, pathname);
  }

  // Prevent directory traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Access Denied');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for single-page routing
      const fallback = path.join(__dirname, 'index.html');
      fs.readFile(fallback, (err2, content) => {
        if (err2) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(content);
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log('================================================================');
  console.log(` OM MOBILE & ELECTRONICS (Branch No. 4 - Dhanore, Pune)`);
  console.log(` Production Backend Server Running at http://localhost:${PORT}`);
  console.log(` Mode: ${isCloudActive() ? '🟢 Supabase Cloud Active' : '🟡 Local Secure File Storage'}`);
  console.log(` Storefront: http://localhost:${PORT}`);
  console.log(` Products:   http://localhost:${PORT}/products`);
  console.log(` Admin:      http://localhost:${PORT}/admin`);
  console.log('================================================================');
});
