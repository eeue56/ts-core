def main():
    with open('../README.md') as f:
        lines = [line.rstrip() for line in f.readlines()]

    code_examples = []

    is_in_code = False

    for line in lines:
        if line == '```javascript':
            is_in_code = True
            print(line)
        elif is_in_code:
            if line == '```':
                code_examples.append('')
                code_examples.append('')
                is_in_code = False
            else:
                code_examples.append(line)

    with open('./src/index.ts', 'w') as f:
        f.write('\n'.join(code_examples))

if __name__ == '__main__':
    main()