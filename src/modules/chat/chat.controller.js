const chatService = require("./chat.service");

const sendMessage = async (req, res, next) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        success: false,
        message: "messages massivi taqdim etilishi shart."
      });
    }

    const reply = await chatService.getChatResponse(messages);
    res.status(200).json({
      success: true,
      data: {
        reply
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { sendMessage };
