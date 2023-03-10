from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes, CallbackQueryHandler

from telegram import InlineKeyboardButton, InlineKeyboardMarkup

number_map = {
        1: 'A',
        2: 'B',
        3: 'C',
        4: 'D',
    }

quiz_questions = [
    {
    'question_text': 'This is a quiz question: ',
    'choice_texts': [
        'A. This is choice text for choice A',
        'B. This is choice text for choice B',
        'C. This is choice text for choice C',
        'D. This is choice text for choice D'
    ]
    },
    {
    'question_text': 'This is a quiz question: ',
    'choice_texts': [
        'A. This is choice text for choice A',
        'B. This is choice text for choice B',
        'C. This is choice text for choice C',
        'D. This is choice text for choice D'
    ]
    },
    {
    'question_text': 'This is a quiz question: ',
    'choice_texts': [
        'A. This is choice text for choice A',
        'B. This is choice text for choice B',
        'C. This is choice text for choice C',
        'D. This is choice text for choice D'
    ]
    },
    {
    'question_text': 'This is a quiz question: ',
    'choice_texts': [
        'A. This is choice text for choice A',
        'B. This is choice text for choice B',
        'C. This is choice text for choice C',
        'D. This is choice text for choice D'
    ]
    },
]

user_answers = ['E'] * len(quiz_questions)

async def submitHandler(update, context):
    print(user_answers)
    # print([number_map[user_answers[i]] if user_answers[i]!=None else 'E' for i in range(len(user_answers))])

async def send_quiz(update: Update, context: ContextTypes.DEFAULT_TYPE):
    for idx, question in enumerate(quiz_questions):
        print(question)
        q = {
            'idx' : idx,
            'choice_texts': question['choice_texts'],
            'question_text': question['question_text']
        }

        await send_question(update, context, q)


    submit_button = {
        "text": "Submit",
        "callback_data": "submit"
    }

    reply_markup = InlineKeyboardMarkup([[submit_button]])

    await update.message.reply_text(text='Did you finish the quiz?', reply_markup=reply_markup)
        


async def send_question(update: Update, context: ContextTypes.DEFAULT_TYPE, question):
    print(question)
    question_number, question_text, choice_texts = question['idx'], question['question_text'], question['choice_texts']
    question_number = int(question_number)

    the_whole_question = f'''
    {question_text}
    {choice_texts[0]}
    {choice_texts[1]}
    {choice_texts[2]}
    {choice_texts[3]}
    '''

    choices = [
        [InlineKeyboardButton("A", callback_data = f'{question_number}-1'),
         InlineKeyboardButton("B", callback_data = f'{question_number}-2'),
         InlineKeyboardButton("C", callback_data = f'{question_number}-3'),
         InlineKeyboardButton("D", callback_data = f'{question_number}-4'),
         ],
    ]

    reply_markup = InlineKeyboardMarkup(choices)
    await update.message.reply_text(the_whole_question, reply_markup=reply_markup)

async def button(update, context):
    query = update.callback_query
    question_number, choice = map(int, query.data.split('-'))

    user_answers[question_number] = number_map[choice]

    new_keyboard = []
    for i in range(4):
        if i == choice-1:
            c = InlineKeyboardButton(f'{number_map[i+1]} ✓', callback_data = f'{question_number}-{i+1}')
        else:
            c = InlineKeyboardButton(number_map[i+1], callback_data = f'{question_number}-{i+1}')

        new_keyboard.append(c)
    
    question = quiz_questions[question_number]
    question_text, choice_texts =  question['question_text'], question['choice_texts']
    question_number = int(question_number)

    the_whole_question = f'''
    {question_text}
    {choice_texts[0]}
    {choice_texts[1]}
    {choice_texts[2]}
    {choice_texts[3]}
    '''
    
    new_reply_markup = InlineKeyboardMarkup([new_keyboard])
    await query.edit_message_text(text=the_whole_question, reply_markup=new_reply_markup)


async def handle_start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:

    user = update.effective_user

    # Register this user in the db if he's not registered already else show a welcome Message


TOKEN = '6011738815:AAHI6KD9xHWEKeLPscRAaKx1S1uP42FeTI4'
app = ApplicationBuilder().token(TOKEN).build()

# Handlers
app.add_handler(CommandHandler("start", handle_start))
app.add_handler(CommandHandler("quiz", send_quiz))

# Handler for buttons
app.add_handler(CallbackQueryHandler(submitHandler, pattern='^submit$'))
app.add_handler(CallbackQueryHandler(button))

# RUN THE BOTT
app.run_polling()