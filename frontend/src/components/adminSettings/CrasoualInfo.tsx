import {z} from 'zod'

// Define the schema for CrasoualInfo
const CrasoualInfoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Invalid URL").optional(),
  link: z.string().url("Invalid URL").optional(),
});

// Define the type based on the schema
export type CrasoualInfoType = z.infer<typeof CrasoualInfoSchema>;


const CrasoualInfo = () => {
  return (
    <div>

    </div>
  )
}

export default CrasoualInfo