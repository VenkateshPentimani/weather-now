const mongoose = require("mongoose");

const searchHistorySchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    searchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const SearchHistory = mongoose.model(
  "SearchHistory",
  searchHistorySchema
);

module.exports = SearchHistory;