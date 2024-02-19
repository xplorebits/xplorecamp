const { Schema, model } = require('mongoose')

// Define the User schema
const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
    select: false
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: true
});

// Define a virtual property 'id' that's computed from '_id'.
userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Pre-save hook to hash password before saving
userSchema.pre('save', async function (next: Function) {
  if (!this.isModified('password')) return next();

  try {
    this.password = await Bun.password.hash(this.password);
    next();
  } catch (err) {
    next(err);
  }
})

// Pre-update hook to hash password before saving
userSchema.pre('updateOne', async function (next: Function) {
  const update = this.getUpdate();

  if (update.password) {
    try {
      update.password = await Bun.password.hash(update.password);
    } catch (err) {
      return next(err);
    }
  }
  next();
})

// Create the User model from the schema
const User: any = model('User', userSchema);

export default User;
