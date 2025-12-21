import express from 'express';
import sql from 'mssql';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Use environment variables for secrets in production
const sqlConfig = {
  server: process.env.SQL_SERVER || 'fsdcir.database.windows.net',
  database: process.env.SQL_DATABASE || 'mbgo',
  user: process.env.SQL_USER || 'mbgoadmin',
  password: process.env.SQL_PASSWORD || 'MBgop@ssw0rd2025',
  encrypt: true,
  trustServerCertificate: false,
  connectionTimeout: 30000,
  requestTimeout: 30000
};

// Test connection
async function testConnection() {
  try {
    const pool = new sql.ConnectionPool(sqlConfig);
    await pool.connect();
    console.log('✅ Connected to MS SQL Server (mbgo database)');
    await pool.close();
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

testConnection();

// Serve Vite build (React frontend)
app.use(express.static(path.join(__dirname, 'dist')));

// API Endpoints
app.post('/api/database/query', async (req, res) => {
  const { query: sqlQuery, params } = req.body;

  try {
    const pool = new sql.ConnectionPool(sqlConfig);
    await pool.connect();

    const request = pool.request();

    // Add parameters to request
    if (params && typeof params === 'object') {
      Object.keys(params).forEach(key => {
        request.input(key, params[key]);
      });
    }

    const result = await request.query(sqlQuery);
    await pool.close();

    console.log(`✅ Query executed: ${sqlQuery.substring(0, 50)}...`);
    res.json({
      success: true,
      data: result.recordset || [],
      rowsAffected: result.rowsAffected
    });
  } catch (error) {
    console.error('❌ Query error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.post('/api/database/schema', async (req, res) => {
  const { tables } = req.body;

  try {
    const pool = new sql.ConnectionPool(sqlConfig);
    await pool.connect();

    console.log('📋 Creating database tables...');

    for (const table of tables) {
      const columnDefs = table.columns
        .map(col => {
          const nullable = col.nullable ? 'NULL' : 'NOT NULL';
          const defaultVal = col.default ? `DEFAULT ${col.default}` : '';
          return `[${col.name}] ${col.type} ${nullable} ${defaultVal}`.trim();
        })
        .join(',\n  ');

      const createTableSQL = `
        IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '${table.name}')
        BEGIN
          CREATE TABLE [${table.name}] (
            ${columnDefs}
          )
          PRINT 'Table ${table.name} created'
        END
        ELSE
        BEGIN
          PRINT 'Table ${table.name} already exists'
        END
      `;

      await pool.request().query(createTableSQL);
    }

    await pool.close();

    console.log('✅ Database schema initialized successfully');
    res.json({
      success: true,
      message: 'Database schema initialized'
    });
  } catch (error) {
    console.error('❌ Schema initialization error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
