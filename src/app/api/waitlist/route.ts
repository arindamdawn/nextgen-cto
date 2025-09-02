import { NextRequest, NextResponse } from 'next/server';
import { waitlistFormSchema } from '@/lib/validations';
import jwt from 'jsonwebtoken';

// Google Sheets configuration
const GOOGLE_SHEETS_ID = '1et5vnMqLptGodbs9W7jzoLpnItKxdB6XK1E6NSAPui8';
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

interface GoogleSheetsRow {
  values: (string | number)[][];
}

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
    console.error('OAuth error:', errorText);
    throw new Error('Failed to get access token');
  }

  const data = await response.json();
  return data.access_token;
}

async function appendToGoogleSheet(email: string, name: string = ''): Promise<void> {
  const accessToken = await getGoogleSheetsAccessToken();
  
  const row = {
    values: [[
      new Date().toISOString(),
      email,
      name,
      'NextGen-CTO Landing Page'
    ]]
  };

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}/values/Sheet1:append?valueInputOption=RAW`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(row),
    }
  );

  if (!response.ok) {
    const errorData = await response.text();
    console.error('Google Sheets API error:', errorData);
    throw new Error('Failed to add to Google Sheets');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the form data
    const validationResult = waitlistFormSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid form data',
          errors: validationResult.error.issues 
        },
        { status: 400 }
      );
    }

    const { email, name } = validationResult.data;

    try {
      // Try to add to Google Sheets
      await appendToGoogleSheet(email, name || '');
      
      return NextResponse.json({
        success: true,
        message: `Thanks for joining${name ? `, ${name}` : ''}! We'll notify you when courses are available.`
      });
    } catch (sheetsError) {
      // If Google Sheets fails, log the data and still return success
      console.error('Google Sheets error:', sheetsError);
      console.log('Waitlist submission (Sheets failed):', { email, name, timestamp: new Date().toISOString() });
      
      return NextResponse.json({
        success: true,
        message: `Thanks for joining${name ? `, ${name}` : ''}! We'll notify you when courses are available.`
      });
    }

  } catch (error) {
    console.error('Waitlist submission error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Something went wrong. Please try again later.' 
      },
      { status: 500 }
    );
  }
}