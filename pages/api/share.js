import {sendNotification} from "../../utility/telegram";

const handler = async (request, response) => {
    switch (request.method) {
        case "POST":
            const {text, parseMode} = request.body;
            await sendNotification(text, parseMode);
            response.status(200)
                .json({message: 'Details shared successfully'});
            break;
        default:
            response.status(405)
                .end("This method is not allowed for this route.");
    }
};

export default handler;
