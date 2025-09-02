import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const GOOGLE_SHEETS_ID = '1et5vnMqLptGodbs9W7jzoLpnItKxdB6XK1E6NSAPui8';
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

async function getGoogleSheetsAccessToken(): Promise<string> {
  if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
    throw new Error('Google service account credentials not configured');
  }
  
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

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: token,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OAuth failed: ${errorText}`);
  }

  const data = await response.json();
  return data.access_token;
}

export async function GET() {
  try {
    const accessToken = await getGoogleSheetsAccessToken();
    
    // Get sheet metadata to see available sheets
    const metadataResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    if (!metadataResponse.ok) {
      const errorText = await metadataResponse.text();
      return NextResponse.json({
        success: false,
        message: `Failed to get sheet metadata: ${errorText}`
      });
    }

    const metadata = await metadataResponse.json();
    
    // Try to append a test row
    const testRow = {
      values: [[
        new Date().toISOString(),
        'debug@test.com',
        'Debug User',
        'Debug Test'
      ]]
    };

    const appendResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}/values/Sheet1:append?valueInputOption=RAW`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testRow),
      }
    );

    const appendResult = await appendResponse.text();
    
    return NextResponse.json({
      success: true,
      metadata: {
        title: metadata.properties?.title,
        sheets: metadata.sheets?.map((sheet: { properties?: { title?: string; sheetId?: number; gridProperties?: unknown } }) => ({
          title: sheet.properties?.title,
          sheetId: sheet.properties?.sheetId,
          gridProperties: sheet.properties?.gridProperties
        }))
      },
      appendResponse: {
        status: appendResponse.status,
        statusText: appendResponse.statusText,
        result: appendResult
      }
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: `Debug failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}