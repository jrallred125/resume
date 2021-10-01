import json
import random
import sys
def convert_number(num):
    pass

def convert_letter(cha):
    vowel = ['a','e','i','o','u']
    constant = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z']
    numbers = ['0','1','2','3','4','5','6','7','8','9']
    
    if cha.lower() in vowel:
        if cha.islower():
            return random.choice(vowel)
        else:
            return random.choice(vowel).upper()
    elif cha.isalpha():
        if cha.islower():
            return random.choice(constant)
        else:
            return random.choice(constant).upper()
    elif cha in numbers:
        return random.choice(numbers)
    else:
        return cha
    
def build_string(string):
    if string.startswith('https') or string.contains():
        return string
    return_string =''
    for char in string:
        return_string += convert_letter(char)
    return return_string

def build_list(cur_list):
    new_list = []
    for obj in cur_list:
        if isinstance(obj,str):
            new_list.append(build_string(obj))
        if isinstance(obj, list):
            new_list.append(build_list(obj))
        if isinstance(obj, dict):
            new_list.append(build_dict(obj))
    return new_list

def build_dict(cur_dict):
    new_dict = {}
    for key in cur_dict:
        if isinstance(cur_dict[key],str):
            new_dict[key] = build_string(cur_dict[key])
        if isinstance(cur_dict[key], list):
            new_dict[key] = build_list(cur_dict[key])
        if isinstance(cur_dict[key], dict):
            new_dict[key] = build_dict(cur_dict[key])
    return new_dict

def parse_json(file):
    if isinstance(file,list):
        return build_list(file)
    if isinstance(file, dict):
        return build_dict(file)
    if isinstance(file,str):
        return build_string(file)



def main(argv):
    with open(argv[1], 'r', encoding='utf-8') as infile:
        json_obj = json.load(infile)


    with open(f'greeked{argv[1]}', 'w', encoding='utf-8') as outfile:
        json.dump(parse_json(json_obj), outfile, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    main(sys.argv)