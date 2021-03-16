import Liveprice from './models/liveprice.js';

export const removeData = async (req, res) => {
    try {
        const data = await Liveprice.deleteMany({});
        res.status(200).json({ message: "successsssss" });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
};