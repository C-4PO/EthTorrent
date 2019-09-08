import pyaes
import json
import binascii
import sys

def get_encrypted_data(data, aesKeyFile):
    with open(aesKeyFile, 'r') as file:
        key = file.read().replace('\n', '')

    iv = "InitializationVe"

    ciphertext = ''

    # We can encrypt one line at a time, regardles of length
    encrypter = pyaes.Encrypter(pyaes.AESModeOfOperationCBC(key, iv))
    ciphertext += encrypter.feed(data)

    # Make a final call to flush any remaining bytes and add padding
    ciphertext += encrypter.feed()

    return ciphertext

def get_json_data_item_key(mode, data, aesKeyFile):
    if mode != 1:
        return data
    return json.dumps(binascii.b2a_base64(get_encrypted_data(data, aesKeyFile)))

def main():
    data = sys.argv[1]
    aesKeyFile = 'src/hack.aes'
    print(get_json_data_item_key(1, data, aesKeyFile))

if __name__ == '__main__':
    main()
