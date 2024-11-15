import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; 

const videoSchema = new Schema(
    {
        videoFile: {
            type: Stringh, //cloudinary url
            required: true
        },
        thumbnail: {
            type: String, //cloundinary url
            required: true
        },
        tittle: {
            type: String, //cloundinary url
            required: true
        },
        description: {
            type: String, //cloundinary url
            required: true
        },
        duration: {
            type: Number, //cloundinary url
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Type.ObjectId,
            ref: "User"
        },
    }, 
    {
        timestamps: true
    },
)  
videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)