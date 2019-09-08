import pyaes
import json
import binascii
import sys

def get_decrypted_data(data, aesKeyFile):
    with open(aesKeyFile, 'r') as file:
        key = file.read().replace('\n', '')

    iv = "InitializationVe"

    decryptedData = ''

    # We can encrypt one line at a time, regardles of length
    decrypter = pyaes.Decrypter(pyaes.AESModeOfOperationCBC(key, iv))
    decryptedData += decrypter.feed(data)

    # Make a final call to flush any remaining bytes and add padding
    decryptedData += decrypter.feed()

    return decryptedData


def get_response(data, aesKeyFile):
    decodeBin = binascii.a2b_base64(data)
    return get_decrypted_data(decodeBin, aesKeyFile)

def main():
    responseData = sys.argv[1]
    aesKeyFile = './hack.aes'
    print(get_response(responseData, aesKeyFile))


if __name__ == '__main__':
    main()
