import Overview from "../models/Overview.js";
// Get All Content for an Overview
const overviewContent = async (req, res, next) => {
    try {
        const overview = await Overview.find();
        // const overview = await Product.find({}); if that dont work try this
        res.status(200).json(overview);
      } catch (err) {
        next(err);
      }
}

export default overviewContent;