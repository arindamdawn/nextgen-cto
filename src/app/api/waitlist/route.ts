import { NextRequest, NextResponse } from 'next/server';
import { waitlistFormSchema } from '@/lib/validations';
import { prisma } from '@/lib/prisma';

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
      // Add to database using Prisma
      await prisma.waitlist.create({
        data: {
          email,
          name: name || null,
        },
      });
      
      return NextResponse.json({
        success: true,
        message: `Thanks for joining${name ? `, ${name}` : ''}! We'll notify you when courses are available.`
      });
    } catch (dbError: unknown) {
      // Handle duplicate email error
      if (
        typeof dbError === 'object' &&
        dbError !== null &&
        'code' in dbError &&
  (dbError as { code?: string }).code === 'P2002'
      ) {
        return NextResponse.json({
          success: false,
          message: 'This email is already on our waitlist!'
        }, { status: 409 });
      }
      
      // Log other database errors
      console.error('Database error:', dbError);
      throw dbError;
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