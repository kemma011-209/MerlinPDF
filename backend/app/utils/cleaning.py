import re
import dateparser

def normalize_units(text):
    # Weight: g -> kg
    text = re.sub(r'(\d+(\.\d+)?)\s?g', lambda m: f"{float(m.group(1))/1000} kg", text)
    # Height: m -> m (just standardize decimals)
    text = re.sub(r'(\d+(\.\d+)?)\s?m', lambda m: f"{float(m.group(1))} m", text)
    # Currency: $ -> USD
    text = re.sub(r'\$(\d+(\.\d+)?)', lambda m: f"{float(m.group(1))} USD", text)
    return text

def normalize_dates(text):
    date_pattern = r'\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b'
    def repl(m):
        dt = dateparser.parse(m.group(0))
        if dt:
            return dt.strftime('%Y-%m-%d')
        return m.group(0)
    return re.sub(date_pattern, repl, text)