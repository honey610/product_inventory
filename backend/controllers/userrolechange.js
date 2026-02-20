import User from "../models/user.model.js";
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["USER", "ADMIN"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "User role updated",
      user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};