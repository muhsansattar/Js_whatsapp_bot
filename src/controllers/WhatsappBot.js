import { google } from 'googleapis';
import dotenv from 'dotenv';
import twilio from 'twilio';
dotenv.config();

const {
  // SID: accountSid,
  // KEY: TwilloAuthToken,
  GOOGLEAPIKEY: googleApiKey,
  SEARCHENGINEID: cx
} = process.env;

// twilio(accountSid, TwilloAuthToken);
const { MessagingResponse } = twilio.twiml;
const customsearch = google.customsearch('v1');

/**
 * @class WhatsappBot
 * @description class will implement bot functionality
 */
class WhatsappBot {
  /**
   * @memberof WhatsappBot
   * @param {object} req - Request sent to the route
   * @param {object} res - Response sent from the controller
   * @param {object} next - Error handler
   * @returns {object} - Object representing response message
   */
  static async googleSearch(req, res, next) {
    const botResponse = new MessagingResponse();
    const q = req.body.Body;
    const options = { cx, q, auth: googleApiKey };

    try {
      const result = await customsearch.cse.list(options);
      const firstResult = result.data.items[0];
      const secondResult = result.data.items[1];
      const thirdResult = result.data.items[2];
      const fourthResult = result.data.items[3];
      const fifthResult = result.data.items[4];
      const searchData1 = firstResult.snippet;
      const searchData2 = secondResult.snippet;
      const searchData3 = thirdResult.snippet;
      const searchData4 = fourthResult.snippet;
      const searchData5 = fifthResult.snippet;
      const link1 = firstResult.link;
      const link2 = secondResult.link;
      const link3 = thirdResult.link;
      const link4 = fourthResult.link;
      const link5 = fifthResult.link;

      botResponse.message(`*Here are the top 5 items from google search:*

1. ${searchData1} ${link1}

2. ${searchData2} ${link2}

3. ${searchData3} ${link3}

4. ${searchData4} ${link4}

5. ${searchData5} ${link5}`);

      res.set('Content-Type', 'text/xml');

      return res.status(200).send(botResponse.toString());
    } catch (error) {
      return next(error);
    }
  }
}

export default WhatsappBot;