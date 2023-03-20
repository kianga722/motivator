import mongoose from 'mongoose';

const { Schema } = mongoose;

interface IVideo {
  url: string;
  title: string;
}

// Create Schema
const VideoSchema = new Schema<IVideo>({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

export const Video = mongoose.model<IVideo>('video', VideoSchema);
