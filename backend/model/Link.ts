import {Document, model, Schema} from 'mongoose';
import { LinkType } from '../schemas/link.schema';


interface ILink extends LinkType, Document {}

const LinkSchema = new Schema<ILink>({
    title: {
        type: String,
        required: true,
    },
    des: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    category: {
        type: [String],
        required: true,
    },
},
 {
    timestamps: true
}
)

const Link = model<ILink>('link', LinkSchema);
export default Link;