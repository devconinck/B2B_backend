const { NlpManager, NerManager  } = require('node-nlp');
const manager = new NlpManager({ languages: ['en'] });

/****************
 *   GREETINGS  *
 ***************/
manager.addDocument('en','hello','greeting');
manager.addDocument('en','hello there','greeting');
manager.addDocument('en','hi','greeting');
manager.addDocument('en','hey there','greeting');
manager.addDocument('en','good morning','greeting');
manager.addDocument('en','good afternoon','greeting');
manager.addDocument('en','yow','greeting');

// common typo's
manager.addDocument('en', 'helo', 'greeting');  // Common typo for "hello"
manager.addDocument('en', 'hlelo', 'greeting'); // Typo variation for "hello"
manager.addDocument('en', 'heyllo', 'greeting'); // Typo variation for "hello"
manager.addDocument('en', 'hii', 'greeting');   // Common typo for "hi"
manager.addDocument('en', 'hie', 'greeting');   // Typo variation for "hi"
manager.addDocument('en', 'hy', 'greeting');    // Typo variation for "hi"
manager.addDocument('en', 'hey tehre', 'greeting'); // Typo for "hey there"
manager.addDocument('en', 'hey thr', 'greeting'); // Typo for "hey there"
manager.addDocument('en', 'hey tehre', 'greeting'); // Typo for "hey there"
manager.addDocument('en', 'good mroning', 'greeting'); // Typo for "good morning"
manager.addDocument('en', 'god morning', 'greeting'); // Typo for "good morning"
manager.addDocument('en', 'good morinng', 'greeting'); // Typo for "good morning"
manager.addDocument('en', 'good afternon', 'greeting'); // Typo for "good afternoon"
manager.addDocument('en', 'good afternnon', 'greeting'); // Typo for "good afternoon"
manager.addDocument('en', 'godo afternoon', 'greeting'); // Typo for "good afternoon"
manager.addDocument('en', 'yoow', 'greeting');  // Typo for "yow"
manager.addDocument('en', 'ywo', 'greeting');   // Typo for "yow"
manager.addDocument('en', 'youw', 'greeting');  // Typo for "yow"
manager.addDocument('en', 'gow', 'greeting');   // Typo that might sound like "yow"
manager.addDocument('en', 'yoww', 'greeting');  // Typo for "yow"

/****************
 *     HELP     *
 ***************/
manager.addDocument('en','help', 'help');
manager.addDocument('en','hepl', 'help');
manager.addDocument('en','hepl', 'ehlp');
manager.addDocument('en','hepl', 'hzlp');
manager.addDocument('en','hepl', 'hrlp');
manager.addDocument('en','hepl', 'hekp');
manager.addDocument('en','Help me', 'help');

/****************
 *     INFO     *
 ***************/
manager.addDocument('en','What can you do', 'info');
manager.addDocument('en','How can you help', 'info');
manager.addDocument('en','Tell me what to do', 'info');
manager.addDocument('en','Tell me what you do', 'info');

/********************
 *  INVOICE STATUS  *
 *******************/
// Adding phrases to check invoice status
manager.addRegexEntity('orderid', 'en', /\d+/);

manager.addDocument('en', 'I need details for order %orderid%', 'orderStatus');
manager.addDocument('en', 'What is the status of invoice %orderid%?', 'orderStatus');
manager.addDocument('en', 'Can you check invoice %orderid% for me?', 'orderStatus');
manager.addDocument('en', '%orderid%', 'orderStatus');
manager.addDocument('en', 'The orderid is %orderid%', 'orderStatus');
manager.addAnswer('en', 'orderStatus', "The status of invoice #{{orderid}} is ");

manager.addDocument('en', "Where can I find my invoice history?", 'checkInvoiceHistory');
manager.addDocument('en', "How can I access the records of my past invoices?", 'checkInvoiceHistory');
manager.addDocument('en', "Is there a way to see all my previous invoices?", 'checkInvoiceHistory');
manager.addDocument('en', "Can I see the history of my payments and invoices?", 'checkInvoiceHistory');
manager.addDocument('en', "What is the process to check my invoice history on your platform?", 'checkInvoiceHistory');
manager.addDocument('en', "Help me understand where to find my past invoices.", 'checkInvoiceHistory');

manager.addAnswer('en', 'checkInvoiceHistory', "You can view the status and history of your invoices in your account dashboard under the 'My Orders' section.");

/********************
 *     WEATHER      *
 *******************/

manager.addDocument('en', 'What’s the weather like today?', 'weather');
manager.addDocument('en', 'Is it going to rain tomorrow?', 'weather');
manager.addDocument('en', 'Do I need an umbrella today?', 'weather');
manager.addDocument('en', 'Will it be cold this weekend?', 'weather');
manager.addDocument('en', 'What is the temperature outside?', 'weather');
manager.addDocument('en', 'Tell me the weather forecast for this week', 'weather');
manager.addDocument('en', 'Is there a storm coming?', 'stormWarning');

manager.addAnswer('en', 'weather', "I'd tell you a weather joke but it's all over the map.");
manager.addAnswer('en', 'weather', "It's schrödinger's weather today: until you look outside, it could be anything!");
manager.addAnswer('en', 'weather', "I predict... yes, definitely, it might rain tomorrow. Or not.");
manager.addAnswer('en', 'weather', "Let me check my crystal ball... Nope, still foggy on the weekend weather.");
manager.addAnswer('en', 'weather', "Bring an umbrella. If it doesn’t rain, you can use it as a sunshade!");
manager.addAnswer('en', 'weather', "Umbrella or not? I'd say yes. It's better to be safe than soggy.");
manager.addAnswer('en', 'weather', "It's cooler than a snowman in sunglasses outside.");
manager.addAnswer('en', 'weather', "Expect a mix of weather this week. If you're lucky, some of it might even be nice!");

// Answers for different intents
manager.addAnswer('en','greeting','Hi, I am DelBot, your virtual assistent!');
manager.addAnswer('en','greeting','Hi, how can I help');
manager.addAnswer('en','greeting',"What's up? I'm  Delbot, your virtual assistent!");
// Adding more responses to the greeting intent
manager.addAnswer('en', 'greeting', 'Hello! How can I assist you today?');
manager.addAnswer('en', 'greeting', 'Greetings! What can I do for you?');
manager.addAnswer('en', 'greeting', 'Good day! How may I help you?');
manager.addAnswer('en', 'greeting', 'Hey! Ready to help, just ask.');
manager.addAnswer('en', 'greeting', 'Hello there! Need any assistance?');
manager.addAnswer('en', 'greeting', 'Hi! What brings you here today?');
manager.addAnswer('en', 'greeting', 'Welcome! How can I make your day better?');
manager.addAnswer('en', 'greeting', 'Good to see you! What can I help you with today?');
manager.addAnswer('en', 'greeting', "Hey, how’s it going? Anything I can help with?");
manager.addAnswer('en', 'greeting', "Hi there! How’s everything?");
manager.addAnswer('en', 'greeting', 'Hello! Anything particular you need help with today?');
manager.addAnswer('en', 'greeting', 'Welcome back! How can I assist you further?');
manager.addAnswer('en', 'greeting', 'Good to have you here! How can I serve you today?');
manager.addAnswer('en', 'greeting', "Hi! Let me know if there's anything I can do for you.");
manager.addAnswer('en', 'greeting', "Hello! I’m here to help, just tell me what you need.");
manager.addAnswer('en', 'greeting', "Hey there! Looking for help? You’re in the right place.");
manager.addAnswer('en', 'greeting', 'Welcome! What information are you seeking today?');
manager.addAnswer('en', 'greeting', 'Hello! Feel free to ask me anything.');
manager.addAnswer('en', 'greeting', 'Hi, how are things? Let me know if you need help.');
manager.addAnswer('en', 'greeting', 'Good day to you! What assistance do you require?');

/********************
 *      THANKS      *
 *******************/
manager.addDocument('en', 'Thank you so much!', 'thanks');
manager.addDocument('en', 'Thanks a lot!', 'thanks');
manager.addDocument('en', 'I really appreciate it.', 'thanks');
manager.addDocument('en', 'Thanks for your help!', 'thanks');
manager.addDocument('en', 'Thank you, that was very helpful!', 'thanks');
manager.addDocument('en', 'Thanks, you’ve been great!', 'thanks');
manager.addDocument('en', 'Much appreciated!', 'thanks');
manager.addDocument('en', 'Thanks a ton!', 'thanks');
manager.addDocument('en', "I can't thank you enough.", 'thanks');
manager.addDocument('en', 'Thanks for everything!', 'thanks');
manager.addDocument('en', 'thx', 'thanks');
manager.addDocument('en', 'thnx', 'thanks');
manager.addDocument('en', 'ty', 'thanks');
manager.addDocument('en', 'Thanks', 'thanks');
manager.addDocument('en', 'Ait', 'thanks');
manager.addDocument('en', 'Aight', 'thanks');

manager.addAnswer('en', 'thanks', 'You’re welcome! I’m here to help anytime.');
manager.addAnswer('en', 'thanks', 'It’s my pleasure to assist you!');
manager.addAnswer('en', 'thanks', 'No problem at all, glad I could help!');
manager.addAnswer('en', 'thanks', 'You’re welcome! Let me know if there’s anything else I can do for you.');
manager.addAnswer('en', 'thanks', 'I’m always here to help, don’t hesitate to reach out.');
manager.addAnswer('en', 'thanks', 'Happy to help, anytime!');
manager.addAnswer('en', 'thanks', 'You’re very welcome! Feel free to ask any more questions.');
manager.addAnswer('en', 'thanks', 'Glad to be of service. Have a great day!');
manager.addAnswer('en', 'thanks', 'Thank you for your kind words! Let me know if you need more assistance.');
manager.addAnswer('en', 'thanks', 'Always a pleasure to assist you! Reach out anytime you need help.');


manager.addAnswer('en','help','How can I help');

manager.addAnswer('en','info','I can help with FAQ\'s and provice information about invoices.');



module.exports = manager;