import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    email: { type: String, required: true, trim: true, maxlength: 200 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    read: { type: Boolean, default: false },
    source: { type: String, default: 'portfolio-contact-form' },
  },
  { timestamps: true }
)

messageSchema.index({ name: 'text', email: 'text', message: 'text' })

export const Message = mongoose.model('Message', messageSchema)
