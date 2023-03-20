import mongoose from 'mongoose';

const { Schema } = mongoose;

interface IQuote {
  quote: string;
  author: string;
}

// Create Schema
const QuoteSchema = new Schema<IQuote>({
  quote: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

export const Quote = mongoose.model<IQuote>('quote', QuoteSchema);
