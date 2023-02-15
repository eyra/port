import re
import logging 

logging.basicConfig(level=logging.DEBUG)


SIMPLIFIED_REGEXES = [
    r'^%m/%d/%y, %H:%M - %name: %chat_message$',
    r'^\[%d/%m/%y, %H:%M:%S\] %name: %chat_message$',
    r'^%d-%m-%y %H:%M - %name: %chat_message$',
    r'^\[%d-%m-%y %H:%M:%S\] %name: %chat_message$',
    r'^\[%m/%d/%y, %H:%M:%S\] %name: %chat_message$',
    r'^%d/%m/%y, %H:%M – %name: %chat_message$',
    r'^%d/%m/%y, %H:%M - %name: %chat_message$',
    r'^%d.%m.%y, %H:%M – %name: %chat_message$',
    r'^%d.%m.%y, %H:%M - %name: %chat_message$',
    r'^%m.%d.%y, %H:%M - %name: %chat_message$',
    r'^%m.%d.%y %H:%M - %name: %chat_message$',
    r'^\[%d/%m/%y, %H:%M:%S %P\] %name: %chat_message$',
    r'^\[%m/%d/%y, %H:%M:%S %P\] %name: %chat_message$',
    r'^\[%d.%m.%y, %H:%M:%S\] %name: %chat_message$',
    r'^\[%m/%d/%y %H:%M:%S\] %name: %chat_message$',
    r'^\[%m-%d-%y, %H:%M:%S\] %name: %chat_message$',
    r'^\[%m-%d-%y %H:%M:%S\] %name: %chat_message$',
    r'^%m-%d-%y %H:%M - %name: %chat_message$',
    r'^%m-%d-%y, %H:%M - %name: %chat_message$',
    r'^%m-%d-%y, %H:%M , %name: %chat_message$',
    r'^%m/%d/%y, %H:%M , %name: %chat_message$', 
    r'^%d-%m-%y, %H:%M , %name: %chat_message$',
    r'^%d/%m/%y, %H:%M , %name: %chat_message$',
    r'^%d.%m.%y %H:%M – %name: %chat_message$', 
    r'^%m.%d.%y, %H:%M – %name: %chat_message$',
    r'^%m.%d.%y %H:%M – %name: %chat_message$',
    r'^\[%d.%m.%y %H:%M:%S\] %name: %chat_message$',
    r'^\[%m.%d.%y, %H:%M:%S\] %name: %chat_message$',
    r'^\[%m.%d.%y %H:%M:%S\] %name: %chat_message$'
]


REGEX_CODES = {
    '%Y': r'(?P<year>\d{2,4})',
    '%y': r'(?P<year>\d{2,4})',
    '%m': r'(?P<month>\d{1,2})',
    '%d': r'(?P<day>\d{1,2})',
    '%H': r'(?P<hour>\d{1,2})',
    '%I': r'(?P<hour>\d{1,2})',
    '%M': r'(?P<minutes>\d{2})',
    '%S': r'(?P<seconds>\d{2})',
    '%P': r'(?P<ampm>[AaPp].? ?[Mm].?)',
    '%p': r'(?P<ampm>[AaPp].? ?[Mm].?)',
    '%name': r'(?P<name>[^:]*)',
    '%chat_message': r'(?P<chat_message>.*)'
}

    
def generate_regexes(simplified_regexes):
    """
    Create the final regular expression by substituting REGEX_CODES
    into SIMPLIFIED_REGEXES
    """

    final_regexes = []

    for simplified_regex in simplified_regexes:

        codes = re.findall(r'\%\w*', simplified_regex)
        for code in codes:
            try:
                simplified_regex = simplified_regex.replace(code, REGEX_CODES[code])
            except KeyError:
                logging.error(f"Could find regular expression for : {code}")

        final_regexes.append(simplified_regex)

    return final_regexes


REGEXES =  generate_regexes(SIMPLIFIED_REGEXES)



def determine_regex_from_chat(lines):
    """
    Read lines of chat return the first regex that matches
    That regex is used to process the chatfile
    """

    length_lines = len(lines)
    for index, line in enumerate(lines):
        for regex in REGEXES:

            if re.match(regex, line):
                logging.debug(f"Matched regex: {regex}")
                return regex

            if index > length_lines or index > 100:
                logging.error(f"No matching regex found: {regex}")
                return None


def construct_message(current_line, next_line, regex):
    """
    Helper function: determines whether the next line matches the regex
    if not than the line belongs to the message on the current line
    """

    match_next_line = re.match(regex, next_line)
    if match_next_line:
        return True, current_line
    else:
        current_line = current_line + next_line
        current_line = current_line.replace("\n", " ")
        return False, current_line



def parse_chat(chat_file):
    """
    FUNCTION NOTE DONE
    SPLIT OPENING FROM READING

    Read in chat process lines
    """
    out = []
    with open(chat_file) as f:
        lines = f.readlines()
        ## Remove all bytes, this also removes emoji's tweak later
        #lines = [re.sub(r'[^\x00-\x7F]+','', line) for line in lines]

    regex = determine_regex_from_chat(lines)

    current_line = lines.pop(0)
    next_line = lines.pop(0)

    while True:
        try:
            match_next_line, message = construct_message(current_line, next_line, regex)

            while not match_next_line:
                next_line = lines.pop(0)
                match_next_line, message = construct_message(message, next_line, regex)

            # STILL TO IMPLEMENT CAPTURE GROUPS HERE
            # THEY DONT PLAY NICE WITH POSSIBLE FALLBACK REGEX
            out.append(message)

            current_line = next_line
            next_line = lines.pop(0)

        except IndexError:
            out.append(current_line)
            break

    return out




PATH_TO_CHAT = "/home/turbo/Downloads/WhatsApp-chat met Niek De Schipper.txt"
PATH_TO_CHAT = "/home/turbo/ddp-inspector/example_ddps/whatsapp/whatsapp_bojan/_chat.txt"        
parse_chat(PATH_TO_CHAT)
