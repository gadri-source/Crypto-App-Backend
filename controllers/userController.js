export const userProfile = async (req, res) => {
    try {
        const user = req.user;

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                memberSince: user.createdAt
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};