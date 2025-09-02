import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const GOOGLE_SHEETS_ID = '1et5vnMqLptGodbs9W7jzoLpnItKxdB6XK1E6NSAPui8';
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

async function testGoogleSheetsConnection(): Promise<{ success: boolean; message: string }> {
  try {
    if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      return {
        success: false,
        message: 'Google service account credentials not configured'
      };
    }

    // Test JWT token generation
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    };

    const privateKey = GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
    const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });

    // Test OAuth token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: token,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      return {
        success: false,
        message: `OAuth failed: ${errorText}`
      };
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Test sheet access
    const sheetResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    if (!sheetResponse.ok) {
      const errorText = await sheetResponse.text();
      return {
        success: false,
        message: `Sheet access failed: ${errorText}`
      };
    }

    return {
      success: true,
      message: 'Google Sheets connection successful!'
    };

  } catch (error) {
    return {
      success: false,
      message: `Connection test failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

export async function GET() {
  const result = await testGoogleSheetsConnection();
  
  return NextResponse.json(result, {
    status: result.success ? 200 : 500
  });
}