const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DetailorderSchema = new Schema({
  Id_order: { type: Schema.Types.ObjectId, ref: "Pesanan" },
  Id_product: { type: Schema.Types.ObjectId, ref: "Produk" },
  total: { type: Number },
});

const Detail_Order = mongoose.model("detail-order", DetailorderSchema);

module.exports = Detail_Order;
