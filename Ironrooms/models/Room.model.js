const { Schema, model } = require("mongoose");

const roomSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imgUrl: {
      type: String,
      default: 'https://travelfotografia.com/wp-content/uploads/2019/05/24Getaway-Hotels-vs-Airbnb-articleLarge.jpg'
    },
    owner: {
      type: Schema.Types.ObjectId, ref: 'User'
    },
    reviews: []
  },
  {
    timestamps: true,
  }
);

const Room = model("Room", roomSchema);

module.exports = Room;
