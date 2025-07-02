// components/UsefulLinks.tsx
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { axiosInstance } from '@/api/axios';
import { useFetch } from '@/hooks/useFetchHook';
import { usefulLinkSchema, type UsefulLinkFormValues, type IUseFulLink } from '@/schemas/usefulLinkSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage
} from '@/components/ui/form';
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import Loading from '@/components/loading/Loading';
import { Pencil, Trash2 } from 'lucide-react'; // icons

const UsefulLinks: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const { data, loading, error } = useFetch<{ data: IUseFulLink[] }>('/api/links', { method: 'GET' });

  const form = useForm<UsefulLinkFormValues>({
    resolver: zodResolver(usefulLinkSchema),
    defaultValues: { title: '', link: '', des: '', category: '' },
  });

  useEffect(() => {
    if (!open) {
      form.reset();
      setEditId(null);
    }
  }, [open]);

  const onSubmit = async (values: UsefulLinkFormValues) => {
    const payload = { ...values, category: values.category.trim().split(',') };

    try {
      if (editId) {
        const res = await axiosInstance.put(`/api/links/${editId}`, payload);
        if (res.status === 200) {
          toast.success('Link updated!');
        } else {
          toast.error('Failed to update link');
        }
      } else {
        const res = await axiosInstance.post('/api/links', payload);
        if (res.status === 201) {
          toast.success('Link added!');
        } else {
          toast.error('Failed to add link');
        }
      }
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    }
  };

  const handleEdit = (link: IUseFulLink) => {
    form.setValue('title', link.title);
    form.setValue('link', link.link);
    form.setValue('des', link.des);
    form.setValue('category', link.category);
    setEditId(link._id);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/api/links/${id}`);
      if (res.status === 200) {
        toast.success('Link deleted');
      } else {
        toast.error('Failed to delete');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    }
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500">Failed to load links.</p>;

  return (
    <div className="space-y-4 p-6 bg-background border rounded-lg shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Useful Links</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">{editId ? 'Edit Link' : '+ Add Link'}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editId ? 'Edit Link' : 'Add New Useful Link'}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {(['title', 'link', 'des', 'category'] as const).map((name) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{name.charAt(0).toUpperCase() + name.slice(1)}</FormLabel>
                        <FormControl>
                          <Input placeholder={name === 'link' ? 'https://...' : `Enter ${name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <DialogFooter>
                  <Button type="submit">{editId ? 'Update' : 'Save'}</Button>
                  <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {data?.data?.map(link => (
          <div key={link._id} className="p-4 border rounded flex flex-col gap-2 relative group">
            <div className="absolute right-2 top-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="icon" onClick={() => handleEdit(link)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(link._id)}>
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
            </div>
            <a href={link.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium">
              {link.title}
            </a>
            <p>{link.des}</p>
            <small className="text-muted-foreground">Category: {link.category}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsefulLinks;
