const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  items: { type: [Schema.Types.Mixed], required: true },
  total: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  // TODO: we can add enum
  paymentMethode: { type: String, required: true, default:'cash' },
  selectedAddress: { type: Schema.Types.Mixed, required: true },
  status: { type: String, default: "pending" },
  discount:{type:Number}
});
const virtual = orderSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, set) {
    delete set._id;
  },
});

exports.Order = mongoose.model("Order", orderSchema);
