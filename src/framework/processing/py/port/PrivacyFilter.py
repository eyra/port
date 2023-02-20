import re
import os
import importlib.resources as pkg_resources
from port.Processor import KeywordProcessor
import port.privacyfilterdatasets as pt

class PrivacyFilter:

    def __init__(self):
        # case sensitive or not? regarding recognizing names
        self.keyword_processor = KeywordProcessor(case_sensitive=True)
        self.url_re = None
        self.initialised = False
        self.nr_keywords = 0
        self.use_wordlist = False
        self.use_re = False
        self.numbers_to_zero = False
        ##### CONSTANTS #####
        self._punctuation = ['.', ',', ' ', ':', ';', '?', '!']
        self._capture_words = ["PROPN", "NOUN"]
        self._nlp_blacklist_entities = ["WORK_OF_ART"]

    def to_string(self):
        return 'PrivacyFiter(use_wordlist=' + str(self.use_wordlist) + ')'

    def file_to_list(self, filename, drop_first=True):
        items_count = 0
        items = []
        print('file_to_list: ', filename)
        with  pkg_resources.open_text(pt, filename) as f:
            if drop_first:
                f.readline()

            for line in f.readlines():
                items_count += 1
                line = line.rstrip()
                items.append(line)

        self.nr_keywords += items_count
        return items

    def initialize_from_file(self):



        wordlist_filter = True
        regular_expressions = True
        numbers_to_zero = True
        datadir = 'privacyfilterdatasets'

        fields = {
            'firstnames.csv': {"replacement": "<NAAM>",
                                                        "punctuation": self._punctuation},
            'lastnames.csv': {"replacement": "<NAAM>",
                                                       "punctuation":  self._punctuation}
        }

        self.initialize(wordlist_filter=wordlist_filter,
                        regular_expressions=regular_expressions,
                        numbers_to_zero=numbers_to_zero,
                        fields=fields)

    def initialize(self, wordlist_filter=False,
                   regular_expressions=True, numbers_to_zero=False, fields=None):

        # Add words with an append character to prevent replacing partial words by tags.
        # E.g. there is a street named AA and a verb AABB, with this additional character
        # would lead to <ADRES>BB which is incorrect. Another way to solve this might be the
        # implementation of a token based algorithm.
        if not fields:
            fields = {
                'firstnames.csv': {"replacement": "<NAAM>",
                                                             "punctuation": self._punctuation},
                'lastnames.csv': {"replacement": "<NAAM>",
                                                            "punctuation": self._punctuation},
            }

        for field in fields:
            # If there is a punctuation list, use it.
            if fields[field]["punctuation"] is not None:
                for name in self.file_to_list(field):
                    for c in self._punctuation:
                        self.keyword_processor.add_keyword(
                            "{n}{c}".format(n=name, c=c),
                            "{n}{c}".format(n=fields[field]["replacement"], c=c)
                        )
            else:
                for name in self.file_to_list(field):
                    self.keyword_processor.add_keyword(name, fields[field]["replacement"])

        for name in self.file_to_list('firstnames.csv'):
            self.keyword_processor.add_keyword(name, "<NAAM>")

        for name in self.file_to_list('lastnames.csv'):
            self.keyword_processor.add_keyword(name, "<NAAM>")

        # Make the URL regular expression
        # https://stackoverflow.com/questions/827557/how-do-you-validate-a-url-with-a-regular-expression-in-python
        ul = '\u00a1-\uffff'  # Unicode letters range (must not be a raw string).

        # IP patterns
        ipv4_re = r'(?:0|25[0-5]|2[0-4]\d|1\d?\d?|[1-9]\d?)(?:\.(?:0|25[0-5]|2[0-4]\d|1\d?\d?|[1-9]\d?)){3}'
        ipv6_re = r'\[?((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,'\
                  r'4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{'\
                  r'1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2['\
                  r'0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,'\
                  r'3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|['\
                  r'1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,'\
                  r'2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|((['\
                  r'0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2['\
                  r'0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:['\
                  r'0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2['\
                  r'0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,'\
                  r'5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\]?'

        # Host patterns
        hostname_re = r'[a-z' + ul + r'0-9](?:[a-z' + ul + r'0-9-]{0,61}[a-z' + ul + r'0-9])?'
        # Max length for domain name labels is 63 characters per RFC 1034 sec. 3.1
        domain_re = r'(?:\.(?!-)[a-z' + ul + r'0-9-]{1,63}(?<!-))*'
        tld_re = (
                r'\.'                                # dot
                r'(?!-)'                             # can't start with a dash
                r'(?:[a-z' + ul + '-]{2,63}'         # domain label
                r'|xn--[a-z0-9]{1,59})'              # or punycode label
                r'(?<!-)'                            # can't end with a dash
                r'\.?'                               # may have a trailing dot
        )
        host_re = '(' + hostname_re + domain_re + tld_re + '|localhost)'

        self.url_re = re.compile(
            r'([a-z0-9.+-]*:?//)?'                                       # scheme is validated separately
            r'(?:[^\s:@/]+(?::[^\s:@/]*)?@)?'                           # user:pass authentication
            r'(?:' + ipv4_re + '|' + ipv6_re + '|' + host_re + ')'
            r'(?::\d{2,5})?'                                            # port
            r'(?:[/?#][^\s]*)?',                                        # resource path
            re.IGNORECASE
        )


        self.use_wordlist = wordlist_filter
        self.use_re = regular_expressions
        self.numbers_to_zero = numbers_to_zero

        self.initialised = True

    @staticmethod
    def remove_numbers(text, numbers_to_zero):
        if numbers_to_zero:
            return re.sub('\d', '0', text).strip()
        else:
            return re.sub(r'\w*\d\w*', '<GETAL>', text).strip()


    @staticmethod
    def remove_email(text):
        return re.sub("(([a-zA-Z0-9_+]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?))"
                      "(?![^<]*>)",
                      "<EMAIL>",
                      text)

    def remove_url(self, text):
        text = re.sub(self.url_re, "<URL>", text)
        return text

    @staticmethod
    def remove_postal_codes(text):
        return re.sub(r"\b([0-9]{4}\s?[a-zA-Z]{2})\b", "<POSTCODE>", text)

    def filter(self, text):
        if not self.initialised:
            self.initialize()
        text = str(text)

        if self.use_re:
            text = self.filter_regular_expressions(text)

        if self.use_wordlist:
            text = self.filter_static(text)

        return text

    def filter_keyword_processors(self, text):
        text = self.keyword_processor.replace_keywords(text)
        return text

    def filter_regular_expressions(self, text):
        text = self.remove_url(text)
        text = self.remove_email(text)
        text = self.remove_postal_codes(text)
        text = self.remove_numbers(text, self.numbers_to_zero)
        return text

    @staticmethod
    def cleanup_text(result):
        result = re.sub("<[A-Z _]+>", "<FILTERED>", result)
        result = re.sub(" ([ ,.:;?!])", "\\1", result)
        result = re.sub(" +", " ", result)                          # remove multiple spaces
        result = re.sub("\n +", "\n", result)                       # remove space after newline
        result = re.sub("( <FILTERED>)+", " <FILTERED>", result)    # remove multiple consecutive <FILTERED> tags
        return result.strip()

    def filter_static(self, text):
        text = " " + text + " "
        text = self.filter_regular_expressions(text)
        text = self.filter_keyword_processors(text)
        return text
