"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { waitlistFormSchema, type WaitlistFormData, type FormSubmissionState } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Mock API call function
const submitToWaitlist = async (data: WaitlistFormData): Promise<{ success: boolean; message: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Log the data for demonstration (in real app, this would be sent to API)
  console.log('Waitlist submission:', data);
  
  // Mock success/failure (90% success rate)
  const success = Math.random() > 0.1;
  
  if (success) {
    return {
      success: true,
      message: `Thanks for joining${data.name ? `, ${data.name}` : ''}! We'll notify you when courses are available.`
    };
  } else {
    return {
      success: false,
      message: "Something went wrong. Please try again later."
    };
  }
};

export default function Waitlist() {
  const [submissionState, setSubmissionState] = useState<FormSubmissionState>('idle');
  const [submissionMessage, setSubmissionMessage] = useState<string>('');

  const form = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      email: '',
      name: '',
    },
  });

  const onSubmit = async (data: WaitlistFormData) => {
    setSubmissionState('loading');
    setSubmissionMessage('');

    try {
      const result = await submitToWaitlist(data);
      
      if (result.success) {
        setSubmissionState('success');
        setSubmissionMessage(result.message);
        form.reset();
      } else {
        setSubmissionState('error');
        setSubmissionMessage(result.message);
      }
    } catch {
      setSubmissionState('error');
      setSubmissionMessage('Network error. Please check your connection and try again.');
    }
  };

  // Temporarily disable all motion animations
  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="text-center">
        <div className="mb-8 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Join Waitlist Now
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Be the first to know when our comprehensive CTO courses launch. 
            Get exclusive early access and special pricing.
          </p>
        </div>

        <div className="max-w-md mx-auto px-4">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-xl border border-gray-700/50 p-6 sm:p-8">
            {submissionState === 'success' ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-2">
                  You&apos;re In!
                </h3>
                <p className="text-gray-300">
                  {submissionMessage}
                </p>
                <Button
                  onClick={() => {
                    setSubmissionState('idle');
                    setSubmissionMessage('');
                  }}
                  variant="outline"
                  className="mt-4"
                >
                  Join Another Email
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-left block text-gray-300 font-medium">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                              placeholder="Enter your email address"
                              className="pl-10 h-12 text-lg bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                              {...field}
                              disabled={submissionState === 'loading'}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-left block text-gray-300 font-medium">
                          Name (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            className="h-12 text-lg bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                            {...field}
                            disabled={submissionState === 'loading'}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {submissionState === 'error' && (
                    <div className="flex items-center gap-2 text-red-400 bg-red-900/20 p-3 rounded-lg border border-red-800/30">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <p className="text-sm">{submissionMessage}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={submissionState === 'loading'}
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {submissionState === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Joining Waitlist...
                      </>
                    ) : (
                      'Join the Waitlist'
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm text-gray-400">
            No spam, ever. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
}