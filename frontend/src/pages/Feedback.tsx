'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

// 1. Zod schema for validation
const feedbackSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// 2. Infer form type from schema
type FeedbackForm = z.infer<typeof feedbackSchema>;

const FeedBack = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackForm>({
    resolver: zodResolver(feedbackSchema),
  });

  const onSubmit = async (data: FeedbackForm) => {
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success('Feedback submitted successfully!');
        reset();
      } else {
        toast.error('Something went wrong. Try again.');
      }
    } catch (error) {
      toast.error('Submission failed. Please try later.');
    }
  };

  return (
    <div className="max-w-xl mt-26 mb-10 mx-auto p-6 border rounded-lg shadow-sm bg-background">
      <h2 className="text-2xl font-semibold mb-4">Send Us Your Feedback</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <Label htmlFor="name" className='mb-3'>Name</Label>
          <Input
            id="name"
            placeholder="Your name"
            {...register('name')}
          />
          {errors.name && (
            <p className="text-sm text-destructive mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className='mb-3'>Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <Label htmlFor="message " className='mb-3'>Message</Label>
          <Textarea
            id="message"
            rows={5}
            placeholder="Write your message here..."
            {...register('message')}
          />
          {errors.message && (
            <p className="text-sm text-destructive mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin w-4 h-4" />
              Sending...
            </span>
          ) : (
            'Submit Feedback'
          )}
        </Button>
      </form>
    </div>
  );
};

export default FeedBack;
